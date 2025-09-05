import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
  <nav className="flex gap-4 p-4 bg-white shadow">
      <Link to="/">Login</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/transactions">Transactions</Link>
      <Link to="/budget">Budget</Link>
  </nav>
  );
};

export default Navbar;
