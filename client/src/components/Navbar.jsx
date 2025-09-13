import { NavLink } from 'react-router-dom';

const Navbar = () => {

  const logout = async (e) => {
    
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/logout`, {
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
      <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "underline font-bold" : "")}>Dashboard</NavLink>
      <NavLink to="/accounts" className={({ isActive }) => (isActive ? "underline font-bold" : "")}>Accounts</NavLink>
      <NavLink to="/budget" className={({ isActive }) => (isActive ? "underline font-bold" : "")}>Budget</NavLink>
      <button onClick={logout}>Logout</button>
  </nav>
  );
};

export default Navbar;
