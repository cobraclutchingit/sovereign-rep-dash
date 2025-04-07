import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTrophy, 
  faMedal, 
  faChartLine, 
  faUsers,
  faCalendarAlt,
  faFilter,
  faSearch,
  faInfoCircle,
  faStar,
  faArrowUp,
  faArrowDown
} from '@fortawesome/free-solid-svg-icons';
import '../assets/styles/leaderboard.css';

const Leaderboard = () => {
  const [period, setPeriod] = useState('month');
  const [category, setCategory] = useState('sales');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  // Sample leaderboard data
  const leaderboardData = {
    sales: [
      { id: 1, name: 'Michael Johnson', avatar: '/assets/images/avatar1.jpg', sales: 24, change: '+3', rank: 1, lastRank: 1, streak: 2 },
      { id: 2, name: 'Sarah Williams', avatar: '/assets/images/avatar2.jpg', sales: 22, change: '+5', rank: 2, lastRank: 4, streak: 1 },
      { id: 3, name: 'David Rodriguez', avatar: '/assets/images/avatar3.jpg', sales: 19, change: '-1', rank: 3, lastRank: 2, streak: 0 },
      { id: 4, name: 'Jennifer Lee', avatar: '/assets/images/avatar4.jpg', sales: 18, change: '+2', rank: 4, lastRank: 5, streak: 1 },
      { id: 5, name: 'Robert Chen', avatar: '/assets/images/avatar5.jpg', sales: 17, change: '-2', rank: 5, lastRank: 3, streak: 0 },
      { id: 6, name: 'Emily Davis', avatar: '/assets/images/avatar6.jpg', sales: 15, change: '+1', rank: 6, lastRank: 7, streak: 1 },
      { id: 7, name: 'James Wilson', avatar: '/assets/images/avatar7.jpg', sales: 14, change: '-1', rank: 7, lastRank: 6, streak: 0 },
      { id: 8, name: 'Maria Garcia', avatar: '/assets/images/avatar8.jpg', sales: 13, change: '+3', rank: 8, lastRank: 10, streak: 2 },
      { id: 9, name: 'Thomas Brown', avatar: '/assets/images/avatar9.jpg', sales: 12, change: '0', rank: 9, lastRank: 9, streak: 0 },
      { id: 10, name: 'Lisa Martinez', avatar: '/assets/images/avatar10.jpg', sales: 11, change: '+1', rank: 10, lastRank: 11, streak: 1 }
    ],
    appointments: [
      { id: 3, name: 'David Rodriguez', avatar: '/assets/images/avatar3.jpg', appointments: 35, change: '+4', rank: 1, lastRank: 2, streak: 1 },
      { id: 1, name: 'Michael Johnson', avatar: '/assets/images/avatar1.jpg', appointments: 32, change: '-1', rank: 2, lastRank: 1, streak: 0 },
      { id: 4, name: 'Jennifer Lee', avatar: '/assets/images/avatar4.jpg', appointments: 30, change: '+1', rank: 3, lastRank: 4, streak: 1 },
      { id: 2, name: 'Sarah Williams', avatar: '/assets/images/avatar2.jpg', appointments: 28, change: '+2', rank: 4, lastRank: 5, streak: 1 },
      { id: 7, name: 'James Wilson', avatar: '/assets/images/avatar7.jpg', appointments: 26, change: '+3', rank: 5, lastRank: 7, streak: 2 },
      { id: 5, name: 'Robert Chen', avatar: '/assets/images/avatar5.jpg', appointments: 25, change: '-2', rank: 6, lastRank: 3, streak: 0 },
      { id: 8, name: 'Maria Garcia', avatar: '/assets/images/avatar8.jpg', appointments: 24, change: '+1', rank: 7, lastRank: 8, streak: 1 },
      { id: 6, name: 'Emily Davis', avatar: '/assets/images/avatar6.jpg', appointments: 22, change: '-1', rank: 8, lastRank: 6, streak: 0 },
      { id: 10, name: 'Lisa Martinez', avatar: '/assets/images/avatar10.jpg', appointments: 20, change: '+2', rank: 9, lastRank: 10, streak: 1 },
      { id: 9, name: 'Thomas Brown', avatar: '/assets/images/avatar9.jpg', appointments: 18, change: '-1', rank: 10, lastRank: 9, streak: 0 }
    ],
    installs: [
      { id: 1, name: 'Michael Johnson', avatar: '/assets/images/avatar1.jpg', installs: 18, change: '+2', rank: 1, lastRank: 1, streak: 3 },
      { id: 5, name: 'Robert Chen', avatar: '/assets/images/avatar5.jpg', installs: 15, change: '+3', rank: 2, lastRank: 4, streak: 2 },
      { id: 2, name: 'Sarah Williams', avatar: '/assets/images/avatar2.jpg', installs: 14, change: '+1', rank: 3, lastRank: 3, streak: 0 },
      { id: 3, name: 'David Rodriguez', avatar: '/assets/images/avatar3.jpg', installs: 12, change: '-2', rank: 4, lastRank: 2, streak: 0 },
      { id: 6, name: 'Emily Davis', avatar: '/assets/images/avatar6.jpg', installs: 10, change: '+2', rank: 5, lastRank: 6, streak: 1 },
      { id: 4, name: 'Jennifer Lee', avatar: '/assets/images/avatar4.jpg', installs: 9, change: '-1', rank: 6, lastRank: 5, streak: 0 },
      { id: 8, name: 'Maria Garcia', avatar: '/assets/images/avatar8.jpg', installs: 8, change: '+3', rank: 7, lastRank: 9, streak: 1 },
      { id: 7, name: 'James Wilson', avatar: '/assets/images/avatar7.jpg', installs: 7, change: '-1', rank: 8, lastRank: 7, streak: 0 },
      { id: 10, name: 'Lisa Martinez', avatar: '/assets/images/avatar10.jpg', installs: 6, change: '+1', rank: 9, lastRank: 10, streak: 1 },
      { id: 9, name: 'Thomas Brown', avatar: '/assets/images/avatar9.jpg', installs: 5, change: '-1', rank: 10, lastRank: 8, streak: 0 }
    ]
  };
  
  // Get current leaderboard data based on category
  const currentLeaderboard = leaderboardData[category] || [];
  
  // Filter leaderboard data based on search term
  const filteredLeaderboard = currentLeaderboard.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Get category label
  const getCategoryLabel = () => {
    switch(category) {
      case 'sales':
        return 'Sales';
      case 'appointments':
        return 'Appointments';
      case 'installs':
        return 'Installations';
      default:
        return 'Sales';
    }
  };
  
  // Get period label
  const getPeriodLabel = () => {
    switch(period) {
      case 'week':
        return 'This Week';
      case 'month':
        return 'This Month';
      case 'quarter':
        return 'This Quarter';
      case 'year':
        return 'This Year';
      default:
        return 'This Month';
    }
  };
  
  // Get rank change icon and class
  const getRankChange = (change) => {
    const changeNum = parseInt(change);
    if (changeNum > 0) {
      return {
        icon: faArrowUp,
        class: 'positive'
      };
    } else if (changeNum < 0) {
      return {
        icon: faArrowDown,
        class: 'negative'
      };
    } else {
      return {
        icon: null,
        class: 'neutral'
      };
    }
  };
  
  return (
    <div className="leaderboard-container">
      <div className="page-header">
        <h1 className="page-title">Leaderboard</h1>
        <p className="page-description">
          Track your performance and see how you stack up against your teammates.
        </p>
      </div>
      
      <div className="leaderboard-controls">
        <div className="leaderboard-period">
          <div 
            className={`period-option ${period === 'week' ? 'active' : ''}`}
            onClick={() => setPeriod('week')}
          >
            Week
          </div>
          <div 
            className={`period-option ${period === 'month' ? 'active' : ''}`}
            onClick={() => setPeriod('month')}
          >
            Month
          </div>
          <div 
            className={`period-option ${period === 'quarter' ? 'active' : ''}`}
            onClick={() => setPeriod('quarter')}
          >
            Quarter
          </div>
          <div 
            className={`period-option ${period === 'year' ? 'active' : ''}`}
            onClick={() => setPeriod('year')}
          >
            Year
          </div>
        </div>
        
        <div className="leaderboard-search">
          <div className="search-input-wrapper">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search for a rep..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            className="filter-button"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FontAwesomeIcon icon={faFilter} />
            <span>Filter</span>
          </button>
        </div>
      </div>
      
      {showFilters && (
        <div className="leaderboard-filters">
          <div className="filter-group">
            <h3 className="filter-title">Categories</h3>
            <div className="filter-options">
              <button 
                className={`filter-option ${category === 'sales' ? 'active' : ''}`}
                onClick={() => setCategory('sales')}
              >
                Sales
              </button>
              <button 
                className={`filter-option ${category === 'appointments' ? 'active' : ''}`}
                onClick={() => setCategory('appointments')}
              >
                Appointments
              </button>
              <button 
                className={`filter-option ${category === 'installs' ? 'active' : ''}`}
                onClick={() => setCategory('installs')}
              >
                Installations
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="leaderboard-header">
        <h2 className="leaderboard-title">
          {getCategoryLabel()} Leaderboard - {getPeriodLabel()}
        </h2>
        <div className="leaderboard-date">
          Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </div>
      </div>
      
      <div className="leaderboard-top">
        {filteredLeaderboard.slice(0, 3).map((item, index) => (
          <div className={`leaderboard-top-item rank-${index + 1}`} key={item.id}>
            <div className="top-rank">
              {index === 0 ? (
                <div className="rank-icon gold">
                  <FontAwesomeIcon icon={faTrophy} />
                </div>
              ) : index === 1 ? (
                <div className="rank-icon silver">
                  <FontAwesomeIcon icon={faMedal} />
                </div>
              ) : (
                <div className="rank-icon bronze">
                  <FontAwesomeIcon icon={faMedal} />
                </div>
              )}
              <div className="rank-number">{index + 1}</div>
            </div>
            
            <div className="top-avatar">
              {item.avatar ? (
                <img src={item.avatar} alt={item.name} />
              ) : (
                <div className="avatar-placeholder">
                  {item.name.charAt(0)}
                </div>
              )}
              {item.streak > 0 && (
                <div className="streak-badge" title={`${item.streak} week streak`}>
                  <FontAwesomeIcon icon={faStar} />
                  <span>{item.streak}</span>
                </div>
              )}
            </div>
            
            <div className="top-info">
              <div className="top-name">{item.name}</div>
              <div className="top-stats">
                <div className="top-value">
                  {category === 'sales' ? item.sales :
                   category === 'appointments' ? item.appointments :
                   category === 'installs' ? item.installs : item.sales}
                </div>
                <div className="top-label">
                  {category === 'sales' ? 'Sales' :
                   category === 'appointments' ? 'Appointments' :
                   category === 'installs' ? 'Installations' : 'Sales'}
                </div>
              </div>
              <div className={`top-change ${getRankChange(item.change).class}`}>
                {item.change !== '0' && (
                  <FontAwesomeIcon icon={getRankChange(item.change).icon} className="change-icon" />
                )}
                <span>{item.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="leaderboard-table">
        <div className="leaderboard-table-header">
          <div className="table-cell rank">Rank</div>
          <div className="table-cell rep">Representative</div>
          <div className="table-cell value">
            {category === 'sales' ? 'Sales' :
             category === 'appointments' ? 'Appointments' :
             category === 'installs' ? 'Installations' : 'Value'}
          </div>
          <div className="table-cell change">Change</div>
        </div>
        
        <div className="leaderboard-table-body">
          {filteredLeaderboard.slice(3).map((item) => (
            <div className="leaderboard-table-row" key={item.id}>
              <div className="table-cell rank">
                <div className="rank-number">{item.rank}</div>
              </div>
              <div className="table-cell rep">
                <div className="rep-avatar">
                  {item.avatar ? (
                    <img src={item.avatar} alt={item.name} />
                  ) : (
                    <div className="avatar-placeholder">
                      {item.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="rep-info">
                  <div className="rep-name">{item.name}</div>
                  {item.streak > 0 && (
                    <div className="rep-streak">
                      <FontAwesomeIcon icon={faStar} className="streak-icon" />
                      <span>{item.streak} week streak</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="table-cell value">
                {category === 'sales' ? item.sales :
                 category === 'appointments' ? item.appointments :
                 category === 'installs' ? item.installs : item.sales}
              </div>
              <div className={`table-cell change ${getRankChange(item.change).class}`}>
                {item.change !== '0' && (
                  <FontAwesomeIcon icon={getRankChange(item.change).icon} className="change-icon" />
                )}
                <span>{item.change}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="leaderboard-note">
        <div className="note-icon">
          <FontAwesomeIcon icon={faInfoCircle} />
        </div>
        <div className="note-content">
          <h3 className="note-title">How Rankings Work</h3>
          <p className="note-text">
            Rankings are updated daily based on your performance. Streaks are awarded for maintaining or improving your rank for consecutive weeks. Keep up the good work to climb the leaderboard!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
