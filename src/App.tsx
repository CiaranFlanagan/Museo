import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import Favorites from "./components/Favorites";

const App: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          </Layout>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/favorites"
        element={
          <Layout>
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          </Layout>
        }
      />
    </Routes>
  );
};

export default App;
