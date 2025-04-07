import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGift, 
  faTrophy, 
  faCalendarAlt, 
  faInfoCircle,
  faFilter,
  faSearch,
  faChartLine,
  faClock,
  faUsers,
  faCoins,
  faAward,
  faCheck,
  faTools,
  faHeart
} from '@fortawesome/free-solid-svg-icons';
import '../assets/styles/contests.css';

const Contests = () => {
  const [activeTab, setActiveTab] = useState('current');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filterType, setFilterType] = useState('all');
  
  // Sample contests data
  const contests = {
    current: [
      {
        id: 1,
        title: 'Summer Sales Sprint',
        description: 'Achieve the highest sales volume during the summer months to win amazing prizes!',
        type: 'sales',
        startDate: '2025-04-01',
        endDate: '2025-06-30',
        prizes: [
          { place: '1st', reward: '$1,000 Cash Bonus + Trophy' },
          { place: '2nd', reward: '$500 Cash Bonus' },
          { place: '3rd', reward: '$250 Cash Bonus' }
        ],
        progress: 35,
        yourRank: 4,
        totalParticipants: 25,
        featured: true
      },
      {
        id: 2,
        title: 'Appointment Setting Challenge',
        description: 'Set the most qualified appointments in a month to earn rewards.',
        type: 'appointments',
        startDate: '2025-04-01',
        endDate: '2025-04-30',
        prizes: [
          { place: '1st', reward: '$500 Cash Bonus' },
          { place: '2nd', reward: '$250 Cash Bonus' },
          { place: '3rd', reward: '$100 Cash Bonus' }
        ],
        progress: 60,
        yourRank: 2,
        totalParticipants: 25,
        featured: true
      },
      {
        id: 3,
        title: 'Referral Rewards Program',
        description: 'Earn points for every qualified referral you bring in.',
        type: 'referrals',
        startDate: '2025-01-01',
        endDate: '2025-12-31',
        prizes: [
          { place: 'Tier 1 (10+ referrals)', reward: '$50 per referral' },
          { place: 'Tier 2 (20+ referrals)', reward: '$75 per referral' },
          { place: 'Tier 3 (30+ referrals)', reward: '$100 per referral' }
        ],
        progress: 40,
        yourRank: 7,
        totalParticipants: 25,
        ongoing: true
      },
      {
        id: 4,
        title: 'Installation Quality Challenge',
        description: 'Achieve the highest customer satisfaction ratings for your installations.',
        type: 'installations',
        startDate: '2025-04-01',
        endDate: '2025-06-30',
        prizes: [
          { place: '1st', reward: 'Weekend Getaway Package' },
          { place: '2nd', reward: '$300 Gift Card' },
          { place: '3rd', reward: '$150 Gift Card' }
        ],
        progress: 25,
        yourRank: 5,
        totalParticipants: 15
      }
    ],
    upcoming: [
      {
        id: 5,
        title: 'Fall Sales Blitz',
        description: 'Maximize your sales during our fall promotion period.',
        type: 'sales',
        startDate: '2025-09-01',
        endDate: '2025-11-30',
        prizes: [
          { place: '1st', reward: '$1,500 Cash Bonus + Trophy' },
          { place: '2nd', reward: '$750 Cash Bonus' },
          { place: '3rd', reward: '$350 Cash Bonus' }
        ]
      },
      {
        id: 6,
        title: 'Customer Satisfaction Challenge',
        description: 'Achieve the highest customer satisfaction ratings over a 3-month period.',
        type: 'customer',
        startDate: '2025-07-01',
        endDate: '2025-09-30',
        prizes: [
          { place: '1st', reward: 'All-Expenses Paid Vacation' },
          { place: '2nd', reward: 'Weekend Getaway Package' },
          { place: '3rd', reward: '$300 Gift Card' }
        ]
      },
      {
        id: 7,
        title: 'Team Collaboration Contest',
        description: 'Work together with your team to achieve the highest combined sales.',
        type: 'team',
        startDate: '2025-08-01',
        endDate: '2025-10-31',
        prizes: [
          { place: 'Winning Team', reward: '$500 Bonus per Team Member + Team Dinner' }
        ]
      }
    ],
    past: [
      {
        id: 8,
        title: 'Winter Sales Challenge',
        description: 'Highest sales volume during the winter months.',
        type: 'sales',
        startDate: '2025-01-01',
        endDate: '2025-03-31',
        prizes: [
          { place: '1st', reward: '$1,000 Cash Bonus' },
          { place: '2nd', reward: '$500 Cash Bonus' },
          { place: '3rd', reward: '$250 Cash Bonus' }
        ],
        winners: [
          { place: '1st', name: 'Michael Johnson' },
          { place: '2nd', name: 'Sarah Williams' },
          { place: '3rd', name: 'David Rodriguez' }
        ],
        yourPlace: '5th'
      },
      {
        id: 9,
        title: 'New Customer Acquisition',
        description: 'Bring in the most new customers in a month.',
        type: 'sales',
        startDate: '2025-02-01',
        endDate: '2025-02-28',
        prizes: [
          { place: '1st', reward: '$750 Cash Bonus' },
          { place: '2nd', reward: '$350 Cash Bonus' },
          { place: '3rd', reward: '$150 Cash Bonus' }
        ],
        winners: [
          { place: '1st', name: 'Jennifer Lee' },
          { place: '2nd', name: 'Michael Johnson' },
          { place: '3rd', name: 'Emily Davis' }
        ],
        yourPlace: '2nd'
      },
      {
        id: 10,
        title: 'Quarterly Performance Challenge',
        description: 'Best overall performance across multiple metrics.',
        type: 'performance',
        startDate: '2025-01-01',
        endDate: '2025-03-31',
        prizes: [
          { place: '1st', reward: '$1,200 Cash Bonus + Recognition Award' },
          { place: '2nd', reward: '$600 Cash Bonus' },
          { place: '3rd', reward: '$300 Cash Bonus' }
        ],
        winners: [
          { place: '1st', name: 'Sarah Williams' },
          { place: '2nd', name: 'Robert Chen' },
          { place: '3rd', name: 'Michael Johnson' }
        ],
        yourPlace: '3rd'
      }
    ]
  };
  
  // Filter contests based on active tab, search term, and filter type
  const getFilteredContests = () => {
    const tabContests = contests[activeTab] || [];
    
    return tabContests.filter(contest => {
      const matchesSearch = contest.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           contest.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || contest.type === filterType;
      
      return matchesSearch && matchesType;
    });
  };
  
  const filteredContests = getFilteredContests();
  
  // Get featured contests
  const featuredContests = contests.current.filter(contest => contest.featured);
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Calculate days remaining
  const getDaysRemaining = (endDate) => {
    const end = new Date(endDate);
    const today = new Date();
    const diffTime = end - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  // Get contest type icon
  const getContestTypeIcon = (type) => {
    switch(type) {
      case 'sales':
        return faChartLine;
      case 'appointments':
        return faCalendarAlt;
      case 'referrals':
        return faUsers;
      case 'installations':
        return faTools;
      case 'customer':
        return faHeart;
      case 'team':
        return faUsers;
      case 'performance':
        return faTrophy;
      default:
        return faGift;
    }
  };
  
  return (
    <div className="contests-container">
      <div className="page-header">
        <h1 className="page-title">Contests & Incentives</h1>
        <p className="page-description">
          Participate in contests and earn rewards for your outstanding performance.
        </p>
      </div>
      
      <div className="contests-tabs">
        <div 
          className={`contests-tab ${activeTab === 'current' ? 'active' : ''}`}
          onClick={() => setActiveTab('current')}
        >
          <FontAwesomeIcon icon={faTrophy} className="contests-tab-icon" />
          <span>Current Contests</span>
        </div>
        <div 
          className={`contests-tab ${activeTab === 'upcoming' ? 'active' : ''}`}
          onClick={() => setActiveTab('upcoming')}
        >
          <FontAwesomeIcon icon={faCalendarAlt} className="contests-tab-icon" />
          <span>Upcoming Contests</span>
        </div>
        <div 
          className={`contests-tab ${activeTab === 'past' ? 'active' : ''}`}
          onClick={() => setActiveTab('past')}
        >
          <FontAwesomeIcon icon={faClock} className="contests-tab-icon" />
          <span>Past Contests</span>
        </div>
      </div>
      
      <div className="contests-controls">
        <div className="contests-search">
          <div className="search-input-wrapper">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search contests..."
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
        <div className="contests-filters">
          <div className="filter-group">
            <h3 className="filter-title">Contest Type</h3>
            <div className="filter-options">
              <button 
                className={`filter-option ${filterType === 'all' ? 'active' : ''}`}
                onClick={() => setFilterType('all')}
              >
                All Types
              </button>
              <button 
                className={`filter-option ${filterType === 'sales' ? 'active' : ''}`}
                onClick={() => setFilterType('sales')}
              >
                Sales
              </button>
              <button 
                className={`filter-option ${filterType === 'appointments' ? 'active' : ''}`}
                onClick={() => setFilterType('appointments')}
              >
                Appointments
              </button>
              <button 
                className={`filter-option ${filterType === 'referrals' ? 'active' : ''}`}
                onClick={() => setFilterType('referrals')}
              >
                Referrals
              </button>
              <button 
                className={`filter-option ${filterType === 'installations' ? 'active' : ''}`}
                onClick={() => setFilterType('installations')}
              >
                Installations
              </button>
              <button 
                className={`filter-option ${filterType === 'team' ? 'active' : ''}`}
                onClick={() => setFilterType('team')}
              >
                Team
              </button>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'current' && featuredContests.length > 0 && searchTerm === '' && filterType === 'all' && (
        <div className="featured-contests">
          <h2 className="section-title">Featured Contests</h2>
          <div className="featured-grid">
            {featuredContests.map(contest => (
              <div className="featured-card" key={contest.id}>
                <div className="featured-header">
                  <div className="featured-badge">Featured</div>
                  <div className={`contest-type-badge ${contest.type}`}>
                    <FontAwesomeIcon icon={getContestTypeIcon(contest.type)} className="contest-type-icon" />
                    <span>
                      {contest.type === 'sales' ? 'Sales Contest' :
                       contest.type === 'appointments' ? 'Appointments Contest' :
                       contest.type === 'referrals' ? 'Referrals Program' :
                       contest.type === 'installations' ? 'Installations Contest' :
                       contest.type === 'customer' ? 'Customer Satisfaction' :
                       contest.type === 'team' ? 'Team Contest' :
                       contest.type === 'performance' ? 'Performance Challenge' : 'Contest'}
                    </span>
                  </div>
                </div>
                
                <h3 className="featured-title">{contest.title}</h3>
                <p className="featured-description">{contest.description}</p>
                
                <div className="featured-details">
                  <div className="featured-detail">
                    <div className="detail-label">Duration</div>
                    <div className="detail-value">
                      {formatDate(contest.startDate)} - {formatDate(contest.endDate)}
                    </div>
                  </div>
                  
                  <div className="featured-detail">
                    <div className="detail-label">Status</div>
                    <div className="detail-value">
                      {contest.ongoing ? (
                        <span className="status ongoing">Ongoing</span>
                      ) : (
                        <span className="status active">Active</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="featured-detail">
                    <div className="detail-label">Time Remaining</div>
                    <div className="detail-value">
                      {getDaysRemaining(contest.endDate)} days
                    </div>
                  </div>
                </div>
                
                <div className="featured-progress">
                  <div className="progress-label">
                    <span>Progress</span>
                    <span>{contest.progress}%</span>
                  </div>
                  <div className="progress">
                    <div className="progress-bar" style={{ width: `${contest.progress}%` }}></div>
                  </div>
                </div>
                
                <div className="featured-prizes">
                  <div className="prizes-title">Prizes</div>
                  <ul className="prizes-list">
                    {contest.prizes.map((prize, index) => (
                      <li className="prize-item" key={index}>
                        <div className="prize-place">{prize.place}</div>
                        <div className="prize-reward">{prize.reward}</div>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="featured-rank">
                  <div className="rank-label">Your Current Rank</div>
                  <div className="rank-value">
                    <span className="rank-number">{contest.yourRank}</span>
                    <span className="rank-total">of {contest.totalParticipants}</span>
                  </div>
                </div>
                
                <div className="featured-actions">
                  <a href={`/contests/${contest.id}`} className="btn btn-primary">
                    View Details
                  </a>
                  <a href={`/leaderboard?contest=${contest.id}`} className="btn btn-outline">
                    See Leaderboard
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="contests-list">
        <h2 className="section-title">
          {activeTab === 'current' ? 'Current Contests' :
           activeTab === 'upcoming' ? 'Upcoming Contests' :
           activeTab === 'past' ? 'Past Contests' : 'Contests'}
        </h2>
        
        {filteredContests.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">
              <FontAwesomeIcon icon={faSearch} />
            </div>
            <h3 className="empty-state-title">No contests found</h3>
            <p className="empty-state-description">
              We couldn't find any contests matching your search criteria. Try adjusting your filters or search term.
            </p>
            <button 
              className="btn btn-primary"
              onClick={() => {
                setSearchTerm('');
                setFilterType('all');
              }}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="contests-grid">
            {filteredContests.map(contest => (
              <div className="contest-card" key={contest.id}>
                <div className="contest-header">
                  <div className={`contest-type-badge ${contest.type}`}>
                    <FontAwesomeIcon icon={getContestTypeIcon(contest.type)} className="contest-type-icon" />
                    <span>
                      {contest.type === 'sales' ? 'Sales' :
                       contest.type === 'appointments' ? 'Appointments' :
                       contest.type === 'referrals' ? 'Referrals' :
                       contest.type === 'installations' ? 'Installations' :
                       contest.type === 'customer' ? 'Customer' :
                       contest.type === 'team' ? 'Team' :
                       contest.type === 'performance' ? 'Performance' : 'Contest'}
                    </span>
                  </div>
                  
                  {activeTab === 'current' && (
                    contest.ongoing ? (
                      <div className="contest-status ongoing">Ongoing</div>
                    ) : (
                      <div className="contest-status active">Active</div>
                    )
                  )}
                </div>
                
                <h3 className="contest-title">{contest.title}</h3>
                <p className="contest-description">{contest.description}</p>
                
                <div className="contest-details">
                  <div className="contest-dates">
                    <FontAwesomeIcon icon={faCalendarAlt} className="contest-dates-icon" />
                    <span>{formatDate(contest.startDate)} - {formatDate(contest.endDate)}</span>
                  </div>
                  
                  {activeTab === 'current' && (
                    <div className="contest-remaining">
                      <FontAwesomeIcon icon={faClock} className="contest-remaining-icon" />
                      <span>{getDaysRemaining(contest.endDate)} days remaining</span>
                    </div>
                  )}
                </div>
                
                {activeTab === 'current' && (
                  <>
                    <div className="contest-progress">
                      <div className="progress-label">
                        <span>Progress</span>
                        <span>{contest.progress}%</span>
                      </div>
                      <div className="progress">
                        <div className="progress-bar" style={{ width: `${contest.progress}%` }}></div>
                      </div>
                    </div>
                    
                    <div className="contest-rank">
                      <div className="rank-label">Your Current Rank</div>
                      <div className="rank-value">
                        <span className="rank-number">{contest.yourRank}</span>
                        <span className="rank-total">of {contest.totalParticipants}</span>
                      </div>
                    </div>
                  </>
                )}
                
                {activeTab === 'past' && (
                  <div className="contest-winners">
                    <div className="winners-title">Winners</div>
                    <ul className="winners-list">
                      {contest.winners.map((winner, index) => (
                        <li className="winner-item" key={index}>
                          <div className="winner-place">{winner.place}</div>
                          <div className="winner-name">{winner.name}</div>
                        </li>
                      ))}
                    </ul>
                    
                    {contest.yourPlace && (
                      <div className="your-place">
                        <div className="your-place-label">Your Place</div>
                        <div className="your-place-value">{contest.yourPlace}</div>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="contest-prizes">
                  <div className="prizes-title">
                    <FontAwesomeIcon icon={faGift} className="prizes-icon" />
                    <span>Prizes</span>
                  </div>
                  <ul className="prizes-list">
                    {contest.prizes.slice(0, 1).map((prize, index) => (
                      <li className="prize-item" key={index}>
                        <div className="prize-place">{prize.place}</div>
                        <div className="prize-reward">{prize.reward}</div>
                      </li>
                    ))}
                    {contest.prizes.length > 1 && (
                      <li className="prize-more">
                        +{contest.prizes.length - 1} more prizes
                      </li>
                    )}
                  </ul>
                </div>
                
                <div className="contest-actions">
                  <a href={`/contests/${contest.id}`} className="btn btn-primary btn-sm">
                    {activeTab === 'upcoming' ? 'View Details' : 
                     activeTab === 'past' ? 'View Results' : 'View Details'}
                  </a>
                  {activeTab === 'current' && (
                    <a href={`/leaderboard?contest=${contest.id}`} className="btn btn-outline btn-sm">
                      Leaderboard
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="contests-note">
        <div className="note-icon">
          <FontAwesomeIcon icon={faInfoCircle} />
        </div>
        <div className="note-content">
          <h3 className="note-title">Contest Rules</h3>
          <p className="note-text">
            All contests are subject to our standard contest rules and eligibility requirements. For more information, please contact your team leader or visit the <a href="/contests/rules">Contest Rules</a> page.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contests;
