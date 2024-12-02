// src/components/Layout.tsx
import React from "react";
import { Link } from "react-router-dom";
import "../index.css";

//component that wraps authenticated pages in a standard layout
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <header>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/favorites">Favorites</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
      <footer>
        <p>&copy; 2024 Flanagan</p>
      </footer>
    </div>
  );
};

export default Layout;
