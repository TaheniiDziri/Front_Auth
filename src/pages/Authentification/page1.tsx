import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

const Page1: React.FC = () => {
  const navigate = useNavigate();

  // Redirection vers le backend pour l'authentification Microsoft
  const handleMicrosoftLogin = () => {
    console.log('Redirection vers Microsoft...');
    window.location.href = "http://localhost:3000/auth/azure"; // URL du backend pour Microsoft
  };

  // Redirection vers le backend pour l'authentification GitHub
  const handleGithubLogin = () => {
    console.log('Redirection vers GitHub...');
    window.location.href = "http://localhost:3000/auth/github"; // URL du backend pour GitHub
  };

  // Naviguer vers la page de connexion
  const goToLogin = () => {
    console.log('Navigation vers la page de connexion...');
    navigate("/login");
  };

  // Naviguer vers la page d'inscription
  const goToSignup = () => {
    console.log('Navigation vers la page d\'inscription...');
    navigate("/signup");
  };

  // Fonction de gestion du succès de la connexion Google
  const handleGoogleLoginSuccess = (response: any) => {
    console.log("Google Login Successful:", response);

    const token = response.credential; // Token reçu

    if (token) {
      const userData = parseJwt(token); // Fonction pour décoder le JWT

      console.log("Nom de l'utilisateur:", userData.name);
      console.log("Email de l'utilisateur:", userData.email);
      console.log("Image de profil de l'utilisateur:", userData.picture);

      // Enregistrer les informations de l'utilisateur dans le localStorage
      localStorage.setItem("userData", JSON.stringify(userData));
      localStorage.setItem("token", token);  // Enregistrer le token JWT

      // Envoi du token au backend pour validation
      console.log("Envoi du token au backend pour validation...");
      fetch('http://localhost:3000/auth/google/validate', {
        method: 'POST', // Utiliser POST au lieu de GET
        headers: {
          'Content-Type': 'application/json', // Spécifiez le type de contenu comme JSON
        },
        body: JSON.stringify({ token }), // Envoyer le token dans le corps de la requête
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('Réponse du serveur:', data);

          // Si la validation est réussie, rediriger vers la page d'accueil
          if (data.message === 'Token is valid') {
            console.log('Token valide, redirection vers la page d\'accueil...');
            navigate('/Home');  // Rediriger vers la page d'accueil après la validation
          } else {
            console.error('Token invalide');
          }
        })
        .catch((error) => {
          console.error('Erreur lors de la validation du token:', error);
        });
    }
  };

  // Fonction pour décoder un JWT
  const parseJwt = (token: string) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  };

  // Gestion de l'échec de la connexion Google
  const handleGoogleLoginFailure = (error: any) => {
    console.error("Google Login Failed:", error);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100vw',
        height: '100vh',
      }}
    >
      <Box
        sx={{
          backgroundColor: '#050a30',
          height: '100%',
          width: { xs: '100%', sm: '50%' },
          position: 'absolute',
          top: 0,
          left: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 20,
            left: 20,
            width: '170px',
            height: 'auto',
          }}
        >
          <img
            src="/assets/Logo Naxxum_Blanc transparent (1).png"
            alt="Logo"
            style={{ width: '100%', height: 'auto' }}
          />
        </Box>

        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <img
            src="assets/symbolic-login-transparent.svg"
            alt="Login"
            style={{
              maxWidth: '500px',
              width: '80%',
              height: 'auto',
            }}
          />
        </Box>

        <Box
          sx={{
            position: 'absolute',
            bottom: '90px',
            textAlign: 'center',
            color: 'white',
            width: '100%',
          }}
        >
          <Typography sx={{ fontFamily: 'Poppins', fontWeight: 'bold', marginBottom: 1 }} variant="h5">
            Connect with every application.
          </Typography>
          <Typography sx={{ fontFamily: 'Poppins', fontWeight: 'bold', marginBottom: 1 }} variant="h5">
            Everything you need is an easily customizable dashboard.
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          backgroundColor: '#ffffff',
          height: '100%',
          width: { xs: '100%', sm: '50%' },
          position: 'absolute',
          top: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 3,
        }}
      >
        <Typography sx={{ fontFamily: 'Poppins', fontWeight: 'bold', color: '#050a30' }} variant="h5">
          Login with your account
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            padding: 3,
            backgroundColor: '#fff',
            width: { xs: '80%', sm: '85%', md: '60%' },
            boxShadow: '10px 10px 10px rgba(0, 0, 0, 0.1)',
            minHeight: '210px',
            justifyContent: 'center',
          }}
        >
          <Button
            variant="outlined"
            startIcon={<img src="/assets/logo Github.png" alt="Logo" style={{ width: 45, height: 45 }} />}
            onClick={handleGithubLogin}
            sx={{
              width: '100%',
              justifyContent: 'flex-start',
              fontSize: '18px',
              padding: '12px',
              color: "#050a30",
            }}
          >
            GitHub
          </Button>

          <Button
            variant="outlined"
            startIcon={<img src="/assets/logo Microsoft.png" alt="Logo" style={{ width: 50, height: 50 }} />}
            onClick={handleMicrosoftLogin}
            sx={{
              width: '100%',
              justifyContent: 'flex-start',
              fontSize: '18px',
              padding: '12px',
              color: "#050a30",
            }}
          >
            Microsoft
          </Button>

          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={handleGoogleLoginFailure}
            useOneTap
            render={(renderProps) => (
              <Button
                variant="outlined"
                startIcon={<img src="/assets/logo Google.webp" alt="Logo" style={{ width: 50, height: 50 }} />}
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                sx={{
                  width: '100%',
                  justifyContent: 'flex-start',
                  fontSize: '18px',
                  padding: '12px',
                  color: "#050a30",
                }}
              >
                Google
              </Button>
            )}
          />
        </Box>

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" sx={{ fontFamily: 'Poppins, sans-serif', mb: 2, color: '#050a30' }}>
            Did you create an account directly on DevStream? <br />
            <Button onClick={goToLogin} variant="text" sx={{ color: '#ffc100' }}>
              Sign in with your email
            </Button>
          </Typography>

          <Typography variant="body2" sx={{ fontFamily: 'Poppins, sans-serif', mb: 2, color: '#050a30' }}>
            New here? <br />
            <Button onClick={goToSignup} variant="text" sx={{ color: '#ffc100' }}>
              Create a new account
            </Button>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Page1;
