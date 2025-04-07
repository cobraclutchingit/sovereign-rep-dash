import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import '../../assets/styles/layout.css';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);
  
  // Skip breadcrumbs on dashboard
  if (pathnames.length === 0 || (pathnames.length === 1 && pathnames[0] === 'dashboard')) {
    return null;
  }
  
  // Map path segments to readable names
  const getPathName = (path) => {
    const pathMap = {
      'dashboard': 'Dashboard',
      'start-here': 'Start Here',
      'training-library': 'Training Library',
      'tech-tools': 'Tech & Tools',
      'team-calendar': 'Team Calendar',
      'leaderboard': 'Leaderboard',
      'contests': 'Contests & Incentives',
      'admin': 'Admin',
      'profile': 'Profile',
      'settings': 'Settings'
    };
    
    return pathMap[path] || path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');
  };
  
  return (
    <div className="breadcrumbs">
      <div className="breadcrumb-item">
        <Link to="/dashboard">
          <FontAwesomeIcon icon={faHome} className="mr-1" /> Home
        </Link>
      </div>
      
      {pathnames.map((path, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        
        return (
          <div key={path} className={`breadcrumb-item ${isLast ? 'active' : ''}`}>
            {isLast ? (
              getPathName(path)
            ) : (
              <Link to={routeTo}>{getPathName(path)}</Link>
            )}
          </div>
        );
      })}
      
      <div className="back-button">
        <button onClick={() => window.history.back()} className="btn btn-sm btn-outline">
          <FontAwesomeIcon icon={faArrowLeft} className="mr-1" /> Back
        </button>
      </div>
    </div>
  );
};

export default Breadcrumbs;
