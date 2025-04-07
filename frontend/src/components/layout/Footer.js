import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import '../../assets/styles/layout.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="main-footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-info">
            <div className="footer-logo">
              <img src="/assets/images/sovereign-logo.png" alt="Sovereign" height="40" />
              <span>Sovereign</span>
            </div>
            <p className="footer-description">
              Empowering solar sales representatives with the tools and resources they need to succeed.
            </p>
          </div>
          
          <div className="footer-column">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li className="footer-link">
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li className="footer-link">
                <Link to="/start-here">Start Here</Link>
              </li>
              <li className="footer-link">
                <Link to="/training-library">Training Library</Link>
              </li>
              <li className="footer-link">
                <Link to="/tech-tools">Tech & Tools</Link>
              </li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3 className="footer-title">Resources</h3>
            <ul className="footer-links">
              <li className="footer-link">
                <Link to="/team-calendar">Team Calendar</Link>
              </li>
              <li className="footer-link">
                <Link to="/leaderboard">Leaderboard</Link>
              </li>
              <li className="footer-link">
                <Link to="/contests">Contests & Incentives</Link>
              </li>
              <li className="footer-link">
                <Link to="/help">Help Center</Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-copyright">
            &copy; {currentYear} Sovereign Solar. All rights reserved.
          </div>
          <div className="footer-legal">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
