import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTachometerAlt, 
  faCalendarCheck, 
  faUsers, 
  faChartLine,
  faBell,
  faGraduationCap,
  faTools,
  faCalendarAlt,
  faTrophy,
  faGift,
  faHome,
  faArrowUp,
  faArrowDown,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';
import '../assets/styles/dashboard.css';

const Dashboard = ({ user }) => {
  const [greeting, setGreeting] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    // Set greeting based on time of day
    const hour = currentTime.getHours();
    if (hour < 12) {
      setGreeting('Good Morning');
    } else if (hour < 18) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Evening');
    }
    
    // Update time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => {
      clearInterval(timer);
    };
  }, []);
  
  // Sample data for dashboard
  const stats = [
    { 
      title: 'Appointments Set', 
      value: 24, 
      change: '+12%', 
      isPositive: true,
      icon: faCalendarCheck
    },
    { 
      title: 'Appointment Sits', 
      value: 18, 
      change: '+8%', 
      isPositive: true,
      icon: faUsers
    },
    { 
      title: 'Sales', 
      value: 12, 
      change: '+15%', 
      isPositive: true,
      icon: faChartLine
    },
    { 
      title: 'Installs', 
      value: 8, 
      change: '+5%', 
      isPositive: true,
      icon: faTools
    }
  ];
  
  const recentTrainings = [
    {
      title: 'Solar 101: Basics of Solar Energy',
      type: 'Video',
      date: '2 days ago',
      icon: faGraduationCap
    },
    {
      title: 'Objection Handling Masterclass',
      type: 'PDF',
      date: '1 week ago',
      icon: faGraduationCap
    },
    {
      title: 'CRM Tutorial: Adding New Leads',
      type: 'Video',
      date: '2 weeks ago',
      icon: faTools
    }
  ];
  
  const upcomingEvents = [
    {
      title: 'Weekly Team Meeting',
      date: 'Tomorrow, 9:00 AM',
      icon: faCalendarAlt
    },
    {
      title: 'Sales Training Workshop',
      date: 'Wednesday, 2:00 PM',
      icon: faGraduationCap
    },
    {
      title: 'Monthly Blitz Day',
      date: 'Friday, All Day',
      icon: faCalendarAlt
    }
  ];
  
  const announcements = [
    {
      title: 'New Summer Sales Contest',
      content: 'Join our summer sales contest with amazing prizes for top performers!',
      date: 'Today',
      type: 'new'
    },
    {
      title: 'Updated Sales Scripts Available',
      content: 'Check the Training Library for the latest sales scripts and objection handling guides.',
      date: '2 days ago',
      type: 'important'
    },
    {
      title: 'System Maintenance Notice',
      content: 'The portal will be down for maintenance this Sunday from 2-4 AM.',
      date: '3 days ago',
      type: 'normal'
    }
  ];
  
  return (
    <div className="dashboard-container">
      <div className="dashboard-welcome">
        <div className="dashboard-welcome-content">
          <h1 className="dashboard-welcome-title">{greeting}, {user?.name || 'Rep'}!</h1>
          <p className="dashboard-welcome-text">
            Welcome to your Sovereign Rep Portal. Here's an overview of your performance and important updates.
          </p>
          <div className="dashboard-welcome-buttons">
            <a href="/start-here" className="btn btn-primary">
              <FontAwesomeIcon icon={faGraduationCap} className="btn-icon" />
              Start Training
            </a>
            <a href="/tech-tools" className="btn btn-outline">
              <FontAwesomeIcon icon={faTools} className="btn-icon" />
              Access Tools
            </a>
          </div>
        </div>
        <div className="dashboard-welcome-image">
          <img src="/assets/images/sovereign-logo.png" alt="Sovereign" height="120" />
        </div>
      </div>
      
      <div className="dashboard-stats">
        {stats.map((stat, index) => (
          <div className="stat-card" key={index}>
            <div className="stat-icon">
              <FontAwesomeIcon icon={stat.icon} />
            </div>
            <div className="stat-title">{stat.title}</div>
            <div className="stat-value">{stat.value}</div>
            <div className={`stat-change ${stat.isPositive ? 'positive' : 'negative'}`}>
              <FontAwesomeIcon icon={stat.isPositive ? faArrowUp : faArrowDown} className="stat-change-icon" />
              {stat.change}
            </div>
          </div>
        ))}
      </div>
      
      <div className="dashboard-sections">
        <div className="dashboard-section">
          <div className="dashboard-section-header">
            <h2 className="dashboard-section-title">
              <FontAwesomeIcon icon={faGraduationCap} className="dashboard-section-icon" />
              Recent Training
            </h2>
            <a href="/training-library" className="btn btn-sm btn-outline">View All</a>
          </div>
          <div className="dashboard-section-body">
            {recentTrainings.map((item, index) => (
              <div className="recent-item" key={index}>
                <div className="recent-item-icon">
                  <FontAwesomeIcon icon={item.icon} />
                </div>
                <div className="recent-item-content">
                  <div className="recent-item-title">{item.title}</div>
                  <div className="recent-item-meta">
                    <span>{item.type}</span>
                    <span className="recent-item-meta-divider"></span>
                    <span>{item.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="dashboard-section-footer">
            <a href="/training-library" className="dashboard-section-link">
              Browse Training Library
              <FontAwesomeIcon icon={faArrowRight} className="dashboard-section-link-icon" />
            </a>
          </div>
        </div>
        
        <div className="dashboard-section">
          <div className="dashboard-section-header">
            <h2 className="dashboard-section-title">
              <FontAwesomeIcon icon={faCalendarAlt} className="dashboard-section-icon" />
              Upcoming Events
            </h2>
            <a href="/team-calendar" className="btn btn-sm btn-outline">View Calendar</a>
          </div>
          <div className="dashboard-section-body">
            {upcomingEvents.map((event, index) => (
              <div className="recent-item" key={index}>
                <div className="recent-item-icon">
                  <FontAwesomeIcon icon={event.icon} />
                </div>
                <div className="recent-item-content">
                  <div className="recent-item-title">{event.title}</div>
                  <div className="recent-item-meta">
                    <FontAwesomeIcon icon={faCalendarAlt} className="recent-item-meta-icon" />
                    <span>{event.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="dashboard-section-footer">
            <a href="/team-calendar" className="dashboard-section-link">
              View Full Calendar
              <FontAwesomeIcon icon={faArrowRight} className="dashboard-section-link-icon" />
            </a>
          </div>
        </div>
        
        <div className="dashboard-section">
          <div className="dashboard-section-header">
            <h2 className="dashboard-section-title">
              <FontAwesomeIcon icon={faBell} className="dashboard-section-icon" />
              Announcements
            </h2>
          </div>
          <div className="dashboard-section-body">
            <ul className="announcements">
              {announcements.map((announcement, index) => (
                <li className="announcement" key={index}>
                  <div className="announcement-title">{announcement.title}</div>
                  <div className="announcement-content">{announcement.content}</div>
                  <div className="announcement-meta">
                    <span className="announcement-date">{announcement.date}</span>
                    {announcement.type !== 'normal' && (
                      <span className={`announcement-badge ${announcement.type}`}>
                        {announcement.type === 'important' ? 'Important' : 'New'}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="dashboard-section">
          <div className="dashboard-section-header">
            <h2 className="dashboard-section-title">
              <FontAwesomeIcon icon={faTrophy} className="dashboard-section-icon" />
              Quick Links
            </h2>
          </div>
          <div className="dashboard-section-body">
            <div className="quick-links">
              <a href="/start-here" className="quick-link">
                <FontAwesomeIcon icon={faHome} className="quick-link-icon" />
                <div className="quick-link-title">Start Here</div>
                <div className="quick-link-description">Onboarding materials</div>
              </a>
              <a href="/training-library" className="quick-link">
                <FontAwesomeIcon icon={faGraduationCap} className="quick-link-icon" />
                <div className="quick-link-title">Training</div>
                <div className="quick-link-description">Videos & playbooks</div>
              </a>
              <a href="/tech-tools" className="quick-link">
                <FontAwesomeIcon icon={faTools} className="quick-link-icon" />
                <div className="quick-link-title">Tech & Tools</div>
                <div className="quick-link-description">CRM & field apps</div>
              </a>
              <a href="/leaderboard" className="quick-link">
                <FontAwesomeIcon icon={faTrophy} className="quick-link-icon" />
                <div className="quick-link-title">Leaderboard</div>
                <div className="quick-link-description">Performance tracking</div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
