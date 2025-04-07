import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope, faBookOpen, faWrench, faCalendarAlt, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';
import '../assets/styles/login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    // For demo purposes, we'll accept any email/password with simple validation
    if (!email || !password) {
      setError('Please enter both email and password');
      setLoading(false);
      return;
    }
    
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Invalid email or password');
      setLoading(false);
    }
  };
  
  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-logo">
          <img src="/assets/images/sovereign-logo.png" alt="Sovereign" height="80" />
          <div className="login-logo-text">Sovereign Rep Portal</div>
        </div>
        
        <div className="login-form">
          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">Sign in to access your rep portal</p>
          
          {error && (
            <div className="login-error">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="login-form-group">
              <label htmlFor="email" className="login-label">Email Address</label>
              <div className="input-with-icon">
                <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
                <input
                  type="email"
                  id="email"
                  className="login-input"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="login-form-group">
              <label htmlFor="password" className="login-label">Password</label>
              <div className="input-with-icon">
                <FontAwesomeIcon icon={faLock} className="input-icon" />
                <input
                  type="password"
                  id="password"
                  className="login-input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="login-options">
              <div className="login-remember">
                <input
                  type="checkbox"
                  id="remember"
                  className="login-remember-checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="remember" className="login-remember-label">Remember me</label>
              </div>
              
              <Link to="/forgot-password" className="login-forgot">Forgot password?</Link>
            </div>
            
            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          
          <div className="login-footer">
            <p>Demo credentials: demo@sovereign.com / password</p>
            <p>Need help? <a href="mailto:support@sovereign.com">Contact Support</a></p>
          </div>
        </div>
      </div>
      
      <div className="login-right">
        <div className="login-right-content">
          <h2 className="login-right-title">Sovereign Rep Portal</h2>
          <p className="login-right-description">
            Access all the tools and resources you need to succeed as a Sovereign solar sales representative.
          </p>
          
          <ul className="login-features">
            <li className="login-feature">
              <FontAwesomeIcon icon={faBookOpen} className="login-feature-icon" />
              <span className="login-feature-text">Comprehensive training resources</span>
            </li>
            <li className="login-feature">
              <FontAwesomeIcon icon={faWrench} className="login-feature-icon" />
              <span className="login-feature-text">Sales tools and tech support</span>
            </li>
            <li className="login-feature">
              <FontAwesomeIcon icon={faCalendarAlt} className="login-feature-icon" />
              <span className="login-feature-text">Team calendar and events</span>
            </li>
            <li className="login-feature">
              <FontAwesomeIcon icon={faTrophy} className="login-feature-icon" />
              <span className="login-feature-text">Leaderboards and contests</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Login;
