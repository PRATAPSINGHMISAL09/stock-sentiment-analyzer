import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold text-green-400">Stock Sentiment Analyzer</h1>
        <div>
          <Link to="/" className="text-white px-4">Home</Link>
          <Link to="/dashboard" className="text-white px-4">Dashboard</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
