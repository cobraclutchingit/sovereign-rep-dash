import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTachometerAlt, 
  faHome, 
  faGraduationCap, 
  faTools, 
  faCalendarAlt, 
  faTrophy, 
  faGift,
  faShieldAlt
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../context/AuthContext';
import '../../assets/styles/layout.css';

const MobileNav = () => {
  const { currentUser: user } = useAuth();
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  return (
    <nav className="mobile-nav">
      <ul className="mobile-nav-list">
        <li className="mobile-nav-item">
          <Link to="/dashboard" className={`mobile-nav-link ${isActive('/dashboard') ? 'active' : ''}`}>
            <FontAwesomeIcon icon={faTachometerAlt} className="mobile-nav-icon" />
            <span>Dashboard</span>
          </Link>
        </li>
        
        <li className="mobile-nav-item">
          <Link to="/start-here" className={`mobile-nav-link ${isActive('/start-here') ? 'active' : ''}`}>
            <FontAwesomeIcon icon={faHome} className="mobile-nav-icon" />
            <span>Start Here</span>
          </Link>
        </li>
        
        <li className="mobile-nav-item">
          <Link to="/training-library" className={`mobile-nav-link ${isActive('/training-library') ? 'active' : ''}`}>
            <FontAwesomeIcon icon={faGraduationCap} className="mobile-nav-icon" />
            <span>Training</span>
          </Link>
        </li>
        
        <li className="mobile-nav-item">
          <Link to="/tech-tools" className={`mobile-nav-link ${isActive('/tech-tools') ? 'active' : ''}`}>
            <FontAwesomeIcon icon={faTools} className="mobile-nav-icon" />
            <span>Tech</span>
          </Link>
        </li>
        
        <li className="mobile-nav-item">
          <Link to="/team-calendar" className={`mobile-nav-link ${isActive('/team-calendar') ? 'active' : ''}`}>
            <FontAwesomeIcon icon={faCalendarAlt} className="mobile-nav-icon" />
            <span>Calendar</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default MobileNav;
