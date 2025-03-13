import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/Authentification/page3";
import SignupPage from "../pages/Authentification/page2";
import HomeLoginPage from "../pages/Authentification/page1";
import Home from "../pages/Home/Home"; 
import Hello from "../pages/Home/Hello"; 
const AuthRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/Home" element={<Home />} />

      
      {/* Routes pour les pages de connexion et d'inscription */}
      <Route path="/Hello/:username" element={<Hello />} />
      <Route path="/" element={<HomeLoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
};

export default AuthRoutes;
