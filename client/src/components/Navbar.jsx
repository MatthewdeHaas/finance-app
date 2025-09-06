import { Link } from 'react-router-dom';

const Navbar = () => {

  const logout = async (e) => {
    
    const res = await fetch("http://localhost:5001/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
        
      if (res.ok) {
        window.location.href = "/";
      } else {
        console.error("Logout failed");
      } 
    };

  

  return (
  <nav className="flex gap-4 p-4 bg-white shadow">
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/transactions">Transactions</Link>
      <Link to="/budget">Budget</Link>
      <button onClick={logout}>Logout</button>
  </nav>
  );
};

export default Navbar;
