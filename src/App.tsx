import React from "react";
import { BrowserRouter } from "react-router-dom";  // Importez BrowserRouter
import { GoogleOAuthProvider } from '@react-oauth/google';  // Importez GoogleOAuthProvider
import AuthRoutes from "./Routes/AuthRoutes"; // Utilisez un chemin relatif
import "./App.css";

const App: React.FC = () => {
  return (

    <GoogleOAuthProvider clientId="135496354061-a7km91rkn0q12mb9h7psf5p6s9gfqdvr.apps.googleusercontent.com">
      <BrowserRouter>
        <AuthRoutes />
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
};

export default App;
