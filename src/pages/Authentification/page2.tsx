import  { useState } from 'react';
import { Box, Typography, Button, TextField, InputAdornment } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

const Page2: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();  // Prevent page reload on form submit

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    setError(null); // Clear any previous error message

    // Display the form data before sending to the server
    console.log("Données envoyées au serveur :", {
      username: formData.name,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    });

    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.name,  // Use the form values
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }),
      });

      // Check if the request was successful
      if (!response.ok) {
        throw new Error('Erreur lors de l\'enregistrement');
      }

      const data = await response.json(); // API response in JSON format
      console.log('Réponse du serveur:', data); // Display the server response

      // Redirect to the login page
      navigate('/login');

    } catch (error) {
      console.error('Erreur lors de la requête:', error); // Log the error in the console
    }
  };

  const handleClick = () => {
    navigate('/');
  };

  return (
    <Box sx={{ display: 'flex', width: '100vw', height: '100vh' }}>
      {/* First Section */}
      <Box sx={{ backgroundColor: '#050a30', height: '100%', width: { xs: '100%', sm: '50%' }, position: 'absolute', top: 0, left: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        {/* Logo */}
        <Box sx={{ position: 'absolute', top: 20, left: 20, width: '170px', height: 'auto' }}>
          <img src="/assets/Logo Naxxum_Blanc transparent (1).png" alt="Logo" style={{ width: '100%', height: 'auto' }} />
        </Box>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <img src="assets/symbolic-login-transparent.svg" alt="Login" style={{ maxWidth: '500px', width: '80%', height: 'auto' }} />
        </Box>
        <Box sx={{ position: 'absolute', bottom: '90px', textAlign: 'center', color: 'white', width: '100%' }}>
          <Typography sx={{ fontFamily: 'Poppins', fontWeight: 'bold', marginBottom: 1 }} variant="h5">Connect with every application.</Typography>
          <Typography sx={{ fontFamily: 'Poppins', fontWeight: 'bold', marginBottom: 1 }} variant="h5">Everything you need is an easily customizable dashboard.</Typography>
        </Box>
      </Box>

      {/* Second Section (Responsive) */}
      <Box sx={{ backgroundColor: '#ffffff', height: '100%', width: { xs: '100%', sm: '50%' }, position: 'absolute', top: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3 }}>
        <Box sx={{ position: 'absolute', top: 20, left: 20, width: '170px', display: { xs: 'block', sm: 'none' } }}>
          <img src="/assets/Logo Naxxum PNG Noir.png" alt="Logo" style={{ width: '100%', height: 'auto' }} />
        </Box>

        <Box sx={{ width: 400, mx: 'auto', mt: 4 }}>
          <Typography variant="h5" sx={{ fontFamily: 'Poppins', fontWeight: 'bold', textAlign: 'center', mb: 2, color: '#050a30' }}>Create New Account</Typography>

          {/* Error message */}
          {error && <Typography color="error" variant="body2" sx={{ textAlign: 'center', mb: 2 }}>{error}</Typography>}

          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth sx={{ mb: 2 }}
              InputProps={{ startAdornment: (<InputAdornment position="start"><PersonIcon /></InputAdornment>) }}
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth sx={{ mb: 2 }}
              InputProps={{ startAdornment: (<InputAdornment position="start"><EmailIcon /></InputAdornment>) }}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth sx={{ mb: 2 }}
              InputProps={{ startAdornment: (<InputAdornment position="start"><LockIcon /></InputAdornment>) }}
            />
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              fullWidth sx={{ mb: 2 }}
              InputProps={{ startAdornment: (<InputAdornment position="start"><VpnKeyIcon /></InputAdornment>) }}
            />
            <Button type="submit" variant="contained" fullWidth sx={{ color: '#fff', backgroundColor: '#ffc100', mt: 2 }}>Sign Up</Button>
          </form>
        </Box>

        <Box sx={{ position: 'absolute', bottom: 50, left: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffc100', borderRadius: '50%', padding: 1, cursor: 'pointer' }} onClick={handleClick}>
          <ArrowCircleLeftIcon sx={{ color: '#050a30' }} />
        </Box>
      </Box>
    </Box>
  );
};

export default Page2;
