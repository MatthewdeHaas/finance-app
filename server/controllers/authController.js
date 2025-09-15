const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Token = require('../models/tokenModel');

const generateAccessToken = (user) => { 
  return jwt.sign({ id: user.id, username: user.username }, 
    process.env.JWT_SECRET, 
    { expiresIn: '15m' }
  );
};

const generateRefreshToken = () => {
  return require('crypto').randomBytes(64).toString('hex');
};


const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  path: '/',
};

const register = async (req, res, next) => {
  try {

    const { username, password } = req.body;
    const hash = await bcrypt.hash(password, 12);

    const newUser = await User.create(username, hash);

    res.status(201).json({ id: newUser.id, username: newUser.username });

  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {

  try {
  
    const { username, password } = req.body;
    const user = await User.findByUsername(username);
    if (!user) return res.status(401).json({ error: 'Invalid username' });

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(401).json({ error: 'Invalid password' });
  
    const accessToken = generateAccessToken(user);

    const storedRefreshToken = await User.getRefreshToken(username);

    if (!storedRefreshToken || storedRefreshToken.length < 1) {

      const newRefreshToken = generateRefreshToken();
      await Token.save(user.id, newRefreshToken);

      res.cookie('refreshToken', newRefreshToken , {
        ...cookieOptions,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

    } else {


      console.log(`\n\n\n ${ storedRefreshToken } \n\n\n`)

      res.cookie('refreshToken', storedRefreshToken.token , {
        ...cookieOptions,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });
        

    } 

    res.cookie('accessToken', accessToken, {
      httpOnly: true,  
      sameSite: 'lax', // or 'none' if using https
      secure: false,   // Set to truw in production
      maxAge:  15 * 60 * 1000 // 15 mins
    });
    

    res.json({ user: { id: user.id, username: user.username } });
  } catch (err) {
    next(err);
  }
}

const refresh = async (req, res, next) => {
  try {

    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);

    const token = await Token.find(refreshToken);
    if (!token) return res.sendStatus(403);

    const user = await User.findById(token.user_id);
    const accessToken = generateAccessToken(user);

    res.cookie('accessToken', accessToken, {
      ...cookieOptions,
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.json({ message: 'Access token refreshed' });

  } catch (err) {
    next(err);
  }
}

const logout = async (req, res, next) =>  {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) await Token.revoke(refreshToken);

    res.clearCookie('accessToken', cookieOptions);
    res.clearCookie('refreshToken', cookieOptions);

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
}


const me = async (req, res, next) => {

  try {
    const token = req.cookies.accessToken;
    if (!token) {
      return res.sendStatus(401);
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.id);
    if (!user) return res.sendStatus(404);

    res.json({ user: { id: user.id, username: user.username } });
  } catch (err) {
    console.error(err);
    res.sendStatus(401);
  }
  
};


module.exports = { register, login, refresh, logout, me};
