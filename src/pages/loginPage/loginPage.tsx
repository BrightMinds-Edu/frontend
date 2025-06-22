import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './loginPage.scss';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Hardcoded email and password for testing
    const hardcodedEmail = 'test@example.com';
    const hardcodedPassword = 'password123';

    if (email === hardcodedEmail && password === hardcodedPassword) {
      navigate('/home'); // Redirect to home page after successful login
    } else {
      setError('Invalid email or password');
    }
  };

  const handleGoogleLogin = () => {
    // Placeholder for Google login functionality
    alert('Google login clicked');
  };

  const handleSignup = () => {
    navigate('/signup'); // Redirect to signup page
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      <div className="login-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        <button className="google-login" onClick={handleGoogleLogin}>
          <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google logo" />
          Login with Google
        </button>
        {error && <p className="error">{error}</p>}
        <p className="signup-text">
          Don't have an account? <span onClick={handleSignup}>Sign up</span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
