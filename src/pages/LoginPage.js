import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import '../styles/LoginPage.css';
import { FaEnvelope, FaLock } from 'react-icons/fa'; 
import { loginApi } from '../api/authApi'; 

function LoginPage() {
  const [email, setEmail] = useState('test@dev.com');
  const [password, setPassword] = useState('#Test@123');
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await loginApi(email, password);

      if (response.token) {
        localStorage.setItem('authToken', response.token);
        navigate('/dashboard');
      } else {
        setError('Invalid credentials, please try again.');
      }
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="login-page">
    <div className="main-container">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>

      <div className="card">
        <h2>Welcome Back!</h2>
        {error && <div className="alert">{error}</div>}

        <form>
          <div className="field-container">
            <label className="form-label" htmlFor="email">Email</label>
            <div className="input-container">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="field-container">
            <label className="form-label" htmlFor="password">Password</label>
            <div className="input-container">
              <FaLock className="input-icon" />
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="d-flex">
            <button
              type="button"
              className="btn-link"
              style={{ color: '#F43899' }}
              onClick={() => alert('Forgot password')}
            >
              Forgot Password?
            </button>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="rememberMe"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <label className="form-check-label" htmlFor="rememberMe">
                Remember Me
              </label>
            </div>
          </div>

          <button
            type="button"
            className="btn btn-primary"
            onClick={handleLogin}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
    </div>
  );
}

export default LoginPage;
