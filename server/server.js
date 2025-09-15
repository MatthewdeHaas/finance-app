require("dotenv").config({ path: __dirname + "/.env" });
const express = require('express');
const app = express();
const cors = require('cors')
const PORT = 5001;

const authRoutes = require("./routes/auth");
const accountRoutes = require("./routes/account");
const categoryRoutes = require("./routes/category");
const transactionRoutes = require("./routes/transaction");
const budgetRoutes = require("./routes/budget");

const cookieParser = require('cookie-parser');


// Establish middleware
app.use(express.json());
app.use(cookieParser());
const allowedOrigins = [
  'http://localhost:3000',
  'https://finance-app.mattdehaas.dev'
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps, curl, Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS: ' + origin));
    }
  },
  credentials: true
}));
app.use("/api/auth", authRoutes);
app.use("/api/account", accountRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/transaction", transactionRoutes);
app.use("/api/budget", budgetRoutes);



// Start server
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
