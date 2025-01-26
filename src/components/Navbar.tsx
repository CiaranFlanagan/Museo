import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../index.css";

const Navbar: React.FC = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  return (
    <header className="bg-light-beige text-dark-brown shadow-md font-poppins">
      <nav className="container mx-auto p-4 flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link to="/">Museo</Link>
        </div>
        <ul className="flex space-x-4 items-center font-bold">
          <li>
            <Link
              to="/"
              className="hover:text-gray-300 transition duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/favorites"
              className="hover:text-gray-300 transition duration-300"
            >
              Favorites
            </Link>
          </li>
          {user && (
            <>
              <li>
                <button
                  onClick={handleSignOut}
                  className="hover:text-gray-300 transition duration-300"
                >
                  Sign Out
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
