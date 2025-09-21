
import { useState } from "react";
import { login } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { email, password });
  };

  return (
    <Box sx={{ width: '100vw', height: '100vh', background: 'linear-gradient(90deg, #e3f2fd 0%, #fff 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Montserrat, Inter, Segoe UI, Roboto, sans-serif' }}>
      <Container maxWidth="xs">
        <Typography variant="h3" align="center" sx={{ fontWeight: 700, color: '#1976d2', mb: 3, letterSpacing: 1 }}>
          Study Sphere
        </Typography>
        <Paper elevation={4} sx={{ p: 4, borderRadius: 3, background: '#f5faff', boxShadow: '0 2px 12px rgba(33,150,243,0.08)' }}>
          <Typography variant="h5" align="center" sx={{ fontWeight: 500, mb: 2, color: '#1565c0' }}>
            Sign In
          </Typography>
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              fullWidth
            />
            <Button onClick={handleClick} disabled={isFetching} variant="contained" size="large" sx={{ mt: 2, fontWeight: 600, background: '#1976d2', textTransform: 'none', borderRadius: 2, boxShadow: 'none', '&:hover': { background: '#1565c0' } }}>
              LOGIN
            </Button>
            {error && <Alert severity="error">Something went wrong...</Alert>}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
              <Typography variant="body2" sx={{ color: '#1976d2' }}>
                Need an account?
                <Link to="/register" style={{ textDecoration: "none", marginLeft: 6, color: '#1565c0', fontWeight: 600 }}>
                  SIGN UP
                </Link>
              </Typography>
              <Typography variant="body2" sx={{ color: '#1976d2' }}>
                <Link to="/" style={{ textDecoration: "none", color: '#1565c0', fontWeight: 600 }}>
                  Skip
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;