import { useState } from 'react';
import { Box, Typography, Button, TextField, InputAdornment } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

const Page3: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isEmailValid = /\S+@\S+\.\S+/.test(formData.email); // Validate email
    if (!isEmailValid) {
      alert('Invalid email');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Incorrect credentials');
      }

      const data = await response.json();
      alert('Login successful');

      const email = data.email; // Assuming the server returns an object with 'email'
      if (email) {
        navigate(`/Hello/${email}`); // Redirect with the email
      } else {
        alert('Email not found');
      }
    } catch (err) {
      // Handle errors
      if (err instanceof Error) {
        setError(err.message); // Set the error message here
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  const handleClick = () => {
    navigate('/');
  };

  return (
    <Box sx={{ display: 'flex', width: '100vw', height: '100vh' }}>
      {/* First section */}
      <Box sx={{ backgroundColor: '#050a30', height: '100%', width: { xs: '100%', sm: '50%' }, position: 'absolute', top: 0, left: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
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

      {/* Second section */}
      <Box sx={{ backgroundColor: '#ffffff', height: '100%', width: { xs: '100%', sm: '50%' }, position: 'absolute', top: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3 }}>
        <Box sx={{ position: 'absolute', top: 20, left: 20, width: '170px', display: { xs: 'block', sm: 'none' } }}>
          <img src="/assets/Logo Naxxum PNG Noir.png" alt="Logo" style={{ width: '100%', height: 'auto' }} />
        </Box>
        <Box sx={{ width: 400, mx: 'auto', mt: 4 }}>
          <Typography variant="h5" sx={{ fontFamily: 'Poppins', fontWeight: 'bold', textAlign: 'center', mb: 2 }}>Login</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
              }}
            />
            {error && <Typography color="error">{error}</Typography>} {/* Display error */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ color: '#fff', backgroundColor: '#ffc100', mt: 2 }}
            >
              Login
            </Button>
          </form>
          <Box sx={{ position: 'absolute', bottom: 50, left: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffc100', borderRadius: '50%', padding: 1, cursor: 'pointer'}} onClick={handleClick}>
            <ArrowCircleLeftIcon sx={{ color: '#050a30' }} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Page3;
