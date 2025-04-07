import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBars, 
  faTachometerAlt, 
  faHome, 
  faGraduationCap, 
  faTools, 
  faCalendarAlt, 
  faTrophy, 
  faGift,
  faUser,
  faSignOutAlt,
  faCog,
  faShieldAlt
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../context/AuthContext';
import '../../assets/styles/layout.css';

const Header = ({ onLogout }) => {
  const { currentUser: user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };
  
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  return (
    <>
      <header className="main-header">
        <div className="header-left">
          <button style={{
            backgroundColor: 'transparent',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            transition: 'all 0.2s ease-in-out',
            marginRight: '16px'
          }} 
          onClick={toggleSidebar}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-light)'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
            <FontAwesomeIcon icon={faBars} />
          </button>
          <Link to="/dashboard" style={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            color: 'var(--text-primary)',
            fontWeight: 700,
            fontSize: '1.5rem'
          }}>
            <img src="/assets/images/sovereign-logo.png" alt="Sovereign" style={{
              height: '40px',
              marginRight: '12px'
            }} />
            <span style={{ color: 'var(--primary)', fontWeight: 700 }}>Sovereign</span>
          </Link>
        </div>
        
        <div className="header-right">
          <div className="user-info" onClick={toggleUserMenu}>
            <span className="user-name">{user?.name || 'Demo User'}</span>
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} className="user-avatar" />
            ) : (
              <div className="user-avatar" style={{
                backgroundColor: 'var(--primary-light)',
                color: 'var(--primary-dark)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 600,
                fontSize: '1.125rem',
                boxShadow: 'var(--shadow-sm)',
                border: '2px solid white'
              }}>{user?.name?.charAt(0) || 'D'}</div>
            )}
            
            {userMenuOpen && (
              <div style={{
                position: 'absolute',
                top: 'calc(100% + 10px)',
                right: 0,
                width: '280px',
                backgroundColor: 'white',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-xl)',
                overflow: 'hidden',
                zIndex: 100,
                border: '1px solid var(--border-color)',
                animation: 'slideIn 0.2s ease-out forwards'
              }}>
                <div style={{ 
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  borderBottom: '1px solid var(--border-color)'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--primary-light)',
                    color: 'var(--primary-dark)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 600,
                    fontSize: '1.125rem',
                    boxShadow: 'var(--shadow-sm)',
                    border: '2px solid white',
                    marginRight: '12px'
                  }}>{user?.name?.charAt(0) || 'D'}</div>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{user?.name || 'Demo User'}</div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{user?.email || 'demo@sovereign.com'}</div>
                  </div>
                </div>
                <div style={{ padding: '8px 0' }}>
                  <Link to="/profile" style={{ 
                    padding: '10px 16px', 
                    display: 'flex', 
                    alignItems: 'center',
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    transition: 'var(--transition)'
                  }}>
                    <FontAwesomeIcon icon={faUser} style={{ marginRight: '12px', width: '16px', color: 'var(--text-secondary)' }} />
                    <span>Profile</span>
                  </Link>
                  {user?.isAdmin && (
                    <Link to="/admin" style={{ 
                      padding: '10px 16px', 
                      display: 'flex', 
                      alignItems: 'center',
                      color: 'var(--text-secondary)',
                      textDecoration: 'none',
                      transition: 'var(--transition)'
                    }}>
                      <FontAwesomeIcon icon={faShieldAlt} style={{ marginRight: '12px', width: '16px', color: 'var(--text-secondary)' }} />
                      <span>Admin</span>
                    </Link>
                  )}
                  <Link to="/settings" style={{ 
                    padding: '10px 16px', 
                    display: 'flex', 
                    alignItems: 'center',
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    transition: 'var(--transition)'
                  }}>
                    <FontAwesomeIcon icon={faCog} style={{ marginRight: '12px', width: '16px', color: 'var(--text-secondary)' }} />
                    <span>Settings</span>
                  </Link>
                </div>
                <div style={{ 
                  borderTop: '1px solid var(--border-color)',
                  padding: '8px 0'
                }}>
                  <button 
                    onClick={logout}
                    style={{ 
                      padding: '10px 16px', 
                      display: 'flex', 
                      alignItems: 'center',
                      color: 'var(--danger)',
                      backgroundColor: 'transparent',
                      border: 'none',
                      width: '100%',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'var(--transition)',
                      fontFamily: 'inherit',
                      fontSize: 'inherit'
                    }}
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} style={{ marginRight: '12px', width: '16px' }} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
      
      <div className={`sidebar ${sidebarOpen ? '' : 'closed'}`}>
        <nav className="sidebar-nav">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/dashboard" className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}>
                <FontAwesomeIcon icon={faTachometerAlt} className="nav-icon" />
                <span>Dashboard</span>
              </Link>
            </li>
            
            <li className="nav-item">
              <Link to="/start-here" className={`nav-link ${isActive('/start-here') ? 'active' : ''}`}>
                <FontAwesomeIcon icon={faHome} className="nav-icon" />
                <span>Start Here</span>
              </Link>
            </li>
            
            <li className="nav-item">
              <Link to="/training-library" className={`nav-link ${isActive('/training-library') ? 'active' : ''}`}>
                <FontAwesomeIcon icon={faGraduationCap} className="nav-icon" />
                <span>Training Library</span>
              </Link>
            </li>
            
            <li className="nav-item">
              <Link to="/tech-tools" className={`nav-link ${isActive('/tech-tools') ? 'active' : ''}`}>
                <FontAwesomeIcon icon={faTools} className="nav-icon" />
                <span>Tech & Tools</span>
              </Link>
            </li>
            
            <li className="nav-item">
              <Link to="/team-calendar" className={`nav-link ${isActive('/team-calendar') ? 'active' : ''}`}>
                <FontAwesomeIcon icon={faCalendarAlt} className="nav-icon" />
                <span>Team Calendar</span>
              </Link>
            </li>
            
            <li className="nav-item">
              <Link to="/leaderboard" className={`nav-link ${isActive('/leaderboard') ? 'active' : ''}`}>
                <FontAwesomeIcon icon={faTrophy} className="nav-icon" />
                <span>Leaderboard</span>
              </Link>
            </li>
            
            <li className="nav-item">
              <Link to="/contests" className={`nav-link ${isActive('/contests') ? 'active' : ''}`}>
                <FontAwesomeIcon icon={faGift} className="nav-icon" />
                <span>Contests & Incentives</span>
              </Link>
            </li>
            
            {user?.isAdmin && (
              <li className="nav-item">
                <Link to="/admin" className={`nav-link ${isActive('/admin') ? 'active' : ''}`}>
                  <FontAwesomeIcon icon={faShieldAlt} className="nav-icon" />
                  <span>Admin</span>
                </Link>
              </li>
            )}
          </ul>
        </nav>
        
        <div className="sidebar-footer">
          © {new Date().getFullYear()} Sovereign Solar
        </div>
      </div>
    </>
  );
};

export default Header;