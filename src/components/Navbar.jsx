import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link to="/">MyShop</Link>
        </h1>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:text-yellow-400">Products</Link>
          </li>
          <li>
            <Link to="/cart" className="hover:text-yellow-400">My Cart</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
