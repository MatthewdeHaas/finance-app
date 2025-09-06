import { useState } from 'react'


const Index = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("")

  const login = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5001/api/auth/login", {
      method: "POST",
      credentials: "include",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
      
    if (res.ok) {
      window.location.href = "/dashboard";
      console.log("LOGIN SUCCESSFUL!")
    } else {
        const err = await res.json();
        console.error(err.error || "Login failed");
    }
      
  };
  
  const register = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5001/api/auth/register", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
      
    if (res.ok) {
      window.location.href = "/";
      console.log("REGISTRATION SUCCESSFUL!")
    } else {
        const err = await res.json();
        console.error(err.error || "Registration failed");
    }
      
  };

  return (
    <div className="flex flex-row space-x-6">

      <form onSubmit={login} className="flex flex-col w-fit space-y-4 border-4 rounded-md  border-blue-700">

        <p>Login</p>

        <input className="border-2 border-blue-500" 
          type="text" 
          placeholder="Username..." 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input className="border-2 border-blue-500" 
          type="password" 
          placeholder="Password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input className="border-2 border-blue-500" type="submit"/>

      </form>

      <form onSubmit={register} className="flex flex-col w-fit space-y-4 border-4 rounded-md  border-blue-700">
        <p>Register</p>

        <input className="border-2 border-blue-500" 
          type="text" 
          placeholder="Username..." 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input className="border-2 border-blue-500" 
          type="password" 
          placeholder="Password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input className="border-2 border-blue-500" type="submit"/>
      </form>

    </div>  
  
  );
};


export default Index;
