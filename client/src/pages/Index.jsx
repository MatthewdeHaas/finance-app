import { useState } from 'react'

const Index = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("")
  const [activeTab, setActiveTab] = useState("login")
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("http://localhost:5001/api/auth/login", {
      method: "POST",
      credentials: "include",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
      
    if (res.ok) {
      window.location.href = "/dashboard";
      setMessage("Login successful");
    } else {     
        const err = await res.json();
        setMessage("Invalid credentials");
    }

    setLoading(false);
      
  };
  
  const register = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("http://localhost:5001/api/auth/register", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
      
    if (res.ok) {
      setMessage("Registration successful!");
      setActiveTab("login");
    } else {
        const err = await res.json();
        setMessage("Registration failed")
    }

    setLoading(false);
      
  };


  return (

    <div className="flex flex-col max-w-md mx-auto mt-4 space-y-6">


      <p className="text-3xl font-semi-bold">
        Finance App
      </p>

      {/* Menu */}
      <div className="flex flex-row space-x-4">

          <button onClick={() => setActiveTab("login")} 
                  className={`border-b-2 ${activeTab === "login" ? "border-blue-500 font-bold" : "border-gray-200"}`}
          >
          Login
        </button>

        <button onClick={() => setActiveTab("register")} 
                className={`border-b-2 ${activeTab === "register" ? "border-blue-500 font-bold" : "border-gray-200"}`}
        >
        Register
        </button>

      </div>

      {/* Content */}
      <div className="flex flex-col">
        <p className="font-bold">
          {String(activeTab).charAt(0).toUpperCase() + String(activeTab).slice(1)}
        </p>

        <form onSubmit={activeTab === "login" ? login : register} className="flex flex-col w-fit space-y-4 rounded-md">
          
          <input className="border-2 border-blue-500 rounded-md p-2" 
            type="text" 
            placeholder="Username..." 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input className="border-2 border-blue-500 rounded-md p-2" 
            type="password" 
            placeholder="Password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="border-2 border-blue-500 rounded-md p-2" type="submit">

            {loading && (
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
            )}

            {loading ? "" : "Login"}

          </button>

          {message && <p className="">{message}</p>}


        </form>

      </div>
     
    </div>

  )

};



export default Index;
