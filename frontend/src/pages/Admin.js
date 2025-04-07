import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faShieldAlt, 
  faUsers, 
  faCalendarAlt, 
  faChartLine, 
  faCog, 
  faPlus, 
  faBell, 
  faSearch, 
  faTools, 
  faHeart,
  faTimes,
  faEdit,
  faTrash
} from '@fortawesome/free-solid-svg-icons';
import '../assets/styles/admin.css';
import EventForm from '../components/events/EventForm';
import { getEvents, saveEvent, deleteEvent, initializeEvents } from '../components/events/EventService';
import moment from 'moment';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();
  
  // Event management state
  const [events, setEvents] = useState([]);
  const [showEventModal, setShowEventModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  
  // Initialize and load events
  useEffect(() => {
    // Initialize events with sample data if empty
    initializeEvents();
    
    // Load events from storage
    const storedEvents = getEvents();
    setEvents(storedEvents);
  }, []);
  
  // Sample data for admin dashboard
  const stats = [
    { title: 'Total Users', value: 25, icon: faUsers, change: '+3', isPositive: true },
    { title: 'Active Contests', value: 4, icon: faChartLine, change: '+1', isPositive: true },
    { title: 'Upcoming Events', value: events.filter(e => e.status === 'upcoming').length, icon: faCalendarAlt, change: '+2', isPositive: true },
    { title: 'New Content', value: 12, icon: faPlus, change: '+5', isPositive: true }
  ];
  
  const recentUsers = [
    { id: 1, name: 'John Smith', email: 'john@sovereign.com', role: 'Sales Rep', status: 'active', lastLogin: '2 hours ago' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@sovereign.com', role: 'Team Lead', status: 'active', lastLogin: '1 day ago' },
    { id: 3, name: 'Michael Brown', email: 'michael@sovereign.com', role: 'Sales Rep', status: 'inactive', lastLogin: '1 week ago' }
  ];
  
  const recentContent = [
    { id: 1, title: 'Summer Sales Training', type: 'Training', date: '2 days ago', author: 'Admin' },
    { id: 2, title: 'New Product Announcement', type: 'Announcement', date: '3 days ago', author: 'Marketing' },
    { id: 3, title: 'Sales Script Update', type: 'Document', date: '1 week ago', author: 'Training Team' }
  ];
  
  // Event handlers
  const handleAddEvent = () => {
    setCurrentEvent(null);
    setShowEventModal(true);
  };
  
  const handleEditEvent = (event) => {
    setCurrentEvent(event);
    setShowEventModal(true);
  };
  
  const [eventToDelete, setEventToDelete] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  const handleDeletePrompt = (eventId) => {
    const eventToRemove = events.find(event => event.id === eventId);
    setEventToDelete(eventToRemove);
    setShowDeleteConfirm(true);
  };
  
  const handleDeleteEvent = () => {
    if (eventToDelete) {
      deleteEvent(eventToDelete.id);
      setEvents(events.filter(event => event.id !== eventToDelete.id));
      setShowDeleteConfirm(false);
      setEventToDelete(null);
    }
  };
  
  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
    setEventToDelete(null);
  };
  
  const handleSaveEvent = (eventData) => {
    const savedEvent = saveEvent(eventData);
    
    if (currentEvent) {
      // Update existing event in the state
      setEvents(events.map(event => 
        event.id === savedEvent.id ? savedEvent : event
      ));
    } else {
      // Add new event to the state
      setEvents([...events, savedEvent]);
    }
    
    setShowEventModal(false);
  };
  
  const handleCloseEventModal = () => {
    setShowEventModal(false);
    setCurrentEvent(null);
  };
  
  // Format date for display
  const formatEventDate = (date) => {
    return moment(date).format('MMM D, YYYY');
  };
  
  // Format time for display
  const formatEventTime = (date) => {
    return moment(date).format('h:mm A');
  };
  
  // Get upcoming events for display
  const getUpcomingEvents = () => {
    return events
      .filter(event => event.status === 'upcoming')
      .sort((a, b) => new Date(a.start) - new Date(b.start))
      .slice(0, 5);
  };
  
  const upcomingEvents = getUpcomingEvents();
  
  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1 className="admin-title">Admin Dashboard</h1>
        <p className="admin-description">
          Manage users, content, and settings for the Sovereign Rep Portal.
        </p>
        
        <div className="admin-tabs">
          <div 
            className={`admin-tab ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </div>
          <div 
            className={`admin-tab ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            Users
          </div>
          <div 
            className={`admin-tab ${activeTab === 'content' ? 'active' : ''}`}
            onClick={() => setActiveTab('content')}
          >
            Content Management
          </div>
          <div 
            className={`admin-tab ${activeTab === 'contests' ? 'active' : ''}`}
            onClick={() => setActiveTab('contests')}
          >
            Contests & Events
          </div>
          <div 
            className={`admin-tab ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </div>
        </div>
      </div>
      
      {activeTab === 'dashboard' && (
        <div className="admin-content">
          <div className="admin-stats">
            {stats.map((stat, index) => (
              <div className="admin-stat" key={index}>
                <div className="admin-stat-icon">
                  <FontAwesomeIcon icon={stat.icon} />
                </div>
                <div className="admin-stat-value">{stat.value}</div>
                <div className="admin-stat-label">{stat.title}</div>
              </div>
            ))}
          </div>
          
          <div className="admin-sections">
            <div className="admin-section">
              <div className="admin-section-title">
                <FontAwesomeIcon icon={faUsers} className="admin-section-icon" />
                Recent Users
              </div>
              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Last Login</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentUsers.map(user => (
                      <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>
                          <span className={`admin-status ${user.status}`}>
                            {user.status === 'active' ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td>{user.lastLogin}</td>
                        <td>
                          <div className="admin-table-actions">
                            <button className="admin-table-action" title="Edit">
                              <FontAwesomeIcon icon={faCog} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="admin-section-footer">
                <button className="btn btn-primary btn-sm" onClick={() => setActiveTab('users')}>
                  View All Users
                </button>
              </div>
            </div>
            
            <div className="admin-section">
              <div className="admin-section-title">
                <FontAwesomeIcon icon={faPlus} className="admin-section-icon" />
                Recent Content
              </div>
              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Type</th>
                      <th>Date</th>
                      <th>Author</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentContent.map(content => (
                      <tr key={content.id}>
                        <td>{content.title}</td>
                        <td>{content.type}</td>
                        <td>{content.date}</td>
                        <td>{content.author}</td>
                        <td>
                          <div className="admin-table-actions">
                            <button className="admin-table-action" title="Edit">
                              <FontAwesomeIcon icon={faCog} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="admin-section-footer">
                <button className="btn btn-primary btn-sm" onClick={() => setActiveTab('content')}>
                  Manage Content
                </button>
              </div>
            </div>
          </div>
          
          <div className="admin-alert info">
            <div className="admin-alert-icon">
              <FontAwesomeIcon icon={faBell} />
            </div>
            <div className="admin-alert-content">
              <div className="admin-alert-title">Welcome to the Admin Dashboard</div>
              <div className="admin-alert-message">
                This is where you can manage all aspects of the Sovereign Rep Portal. Use the tabs above to navigate to different sections.
              </div>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'users' && (
        <div className="admin-content">
          <div className="admin-section-header">
            <h2 className="admin-section-title">
              <FontAwesomeIcon icon={faUsers} className="admin-section-icon" />
              User Management
            </h2>
            <div className="admin-section-actions">
              <div className="search-input-wrapper">
                <FontAwesomeIcon icon={faSearch} className="search-icon" />
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search users..."
                />
              </div>
              <button className="btn btn-primary btn-sm">
                <FontAwesomeIcon icon={faPlus} className="btn-icon" />
                Add User
              </button>
            </div>
          </div>
          
          <div className="admin-alert info">
            <div className="admin-alert-icon">
              <FontAwesomeIcon icon={faShieldAlt} />
            </div>
            <div className="admin-alert-content">
              <div className="admin-alert-title">User Management</div>
              <div className="admin-alert-message">
                This is a demo of the user management interface. In a production environment, you would be able to add, edit, and manage users here.
              </div>
            </div>
          </div>
          
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Last Login</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {[...recentUsers, 
                  { id: 4, name: 'Emily Davis', email: 'emily@sovereign.com', role: 'Sales Rep', status: 'active', lastLogin: '3 days ago' },
                  { id: 5, name: 'David Wilson', email: 'david@sovereign.com', role: 'Sales Rep', status: 'active', lastLogin: '5 days ago' },
                  { id: 6, name: 'Jennifer Lee', email: 'jennifer@sovereign.com', role: 'Team Lead', status: 'active', lastLogin: '1 week ago' },
                  { id: 7, name: 'Robert Chen', email: 'robert@sovereign.com', role: 'Sales Rep', status: 'inactive', lastLogin: '2 weeks ago' }
                ].map(user => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <span className={`admin-status ${user.status}`}>
                        {user.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td>{user.lastLogin}</td>
                    <td>
                      <div className="admin-table-actions">
                        <button className="admin-table-action" title="Edit">
                          <FontAwesomeIcon icon={faCog} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="admin-pagination">
            <div className="admin-pagination-item">
              <a href="#" className="admin-pagination-link disabled">
                &laquo;
              </a>
            </div>
            <div className="admin-pagination-item">
              <a href="#" className="admin-pagination-link active">
                1
              </a>
            </div>
            <div className="admin-pagination-item">
              <a href="#" className="admin-pagination-link">
                2
              </a>
            </div>
            <div className="admin-pagination-item">
              <a href="#" className="admin-pagination-link">
                3
              </a>
            </div>
            <div className="admin-pagination-item">
              <a href="#" className="admin-pagination-link">
                &raquo;
              </a>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'content' && (
        <div className="admin-content">
          <div className="admin-section-header">
            <h2 className="admin-section-title">
              <FontAwesomeIcon icon={faPlus} className="admin-section-icon" />
              Content Management
            </h2>
            <div className="admin-section-actions">
              <div className="search-input-wrapper">
                <FontAwesomeIcon icon={faSearch} className="search-icon" />
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search content..."
                />
              </div>
              <button className="btn btn-primary btn-sm">
                <FontAwesomeIcon icon={faPlus} className="btn-icon" />
                Add Content
              </button>
            </div>
          </div>
          
          <div className="admin-alert info">
            <div className="admin-alert-icon">
              <FontAwesomeIcon icon={faShieldAlt} />
            </div>
            <div className="admin-alert-content">
              <div className="admin-alert-title">Content Management</div>
              <div className="admin-alert-message">
                This is a demo of the content management interface. In a production environment, you would be able to add, edit, and manage content here.
              </div>
            </div>
          </div>
          
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Author</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {[...recentContent, 
                  { id: 4, title: 'Customer Objection Handling', type: 'Training', date: '1 week ago', author: 'Training Team', status: 'published' },
                  { id: 5, title: 'Monthly Team Meeting', type: 'Event', date: '1 week ago', author: 'Admin', status: 'published' },
                  { id: 6, title: 'New Referral Program', type: 'Announcement', date: '2 weeks ago', author: 'Marketing', status: 'published' },
                  { id: 7, title: 'Product Comparison Guide', type: 'Document', date: '3 weeks ago', author: 'Product Team', status: 'draft' }
                ].map(content => (
                  <tr key={content.id}>
                    <td>{content.title}</td>
                    <td>{content.type}</td>
                    <td>{content.date}</td>
                    <td>{content.author}</td>
                    <td>
                      <span className={`admin-status ${content.status === 'published' ? 'active' : 'pending'}`}>
                        {content.status === 'published' ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td>
                      <div className="admin-table-actions">
                        <button className="admin-table-action" title="Edit">
                          <FontAwesomeIcon icon={faCog} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="admin-pagination">
            <div className="admin-pagination-item">
              <a href="#" className="admin-pagination-link disabled">
                &laquo;
              </a>
            </div>
            <div className="admin-pagination-item">
              <a href="#" className="admin-pagination-link active">
                1
              </a>
            </div>
            <div className="admin-pagination-item">
              <a href="#" className="admin-pagination-link">
                2
              </a>
            </div>
            <div className="admin-pagination-item">
              <a href="#" className="admin-pagination-link">
                &raquo;
              </a>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'contests' && (
        <div className="admin-content">
          <div className="admin-section-header">
            <h2 className="admin-section-title">
              <FontAwesomeIcon icon={faChartLine} className="admin-section-icon" />
              Contests & Events
            </h2>
            <div className="admin-section-actions">
              <button className="btn btn-primary btn-sm">
                <FontAwesomeIcon icon={faPlus} className="btn-icon" />
                Create Contest
              </button>
              <button className="btn btn-outline btn-sm" onClick={handleAddEvent}>
                <FontAwesomeIcon icon={faCalendarAlt} className="btn-icon" />
                Add Event
              </button>
            </div>
          </div>
          
          <div className="admin-section">
            <div className="admin-section-title">
              <FontAwesomeIcon icon={faChartLine} className="admin-section-icon" />
              Active Contests
            </div>
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Type</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Participants</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Summer Sales Sprint</td>
                    <td>Sales</td>
                    <td>Apr 1, 2025</td>
                    <td>Jun 30, 2025</td>
                    <td>25</td>
                    <td>
                      <span className="admin-status active">Active</span>
                    </td>
                    <td>
                      <div className="admin-table-actions">
                        <button className="admin-table-action" title="Edit">
                          <FontAwesomeIcon icon={faCog} />
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>Appointment Setting Challenge</td>
                    <td>Appointments</td>
                    <td>Apr 1, 2025</td>
                    <td>Apr 30, 2025</td>
                    <td>25</td>
                    <td>
                      <span className="admin-status active">Active</span>
                    </td>
                    <td>
                      <div className="admin-table-actions">
                        <button className="admin-table-action" title="Edit">
                          <FontAwesomeIcon icon={faCog} />
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>Referral Rewards Program</td>
                    <td>Referrals</td>
                    <td>Jan 1, 2025</td>
                    <td>Dec 31, 2025</td>
                    <td>25</td>
                    <td>
                      <span className="admin-status active">Active</span>
                    </td>
                    <td>
                      <div className="admin-table-actions">
                        <button className="admin-table-action" title="Edit">
                          <FontAwesomeIcon icon={faCog} />
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="admin-section">
            <div className="admin-section-title">
              <FontAwesomeIcon icon={faCalendarAlt} className="admin-section-icon" />
              Upcoming Events
            </div>
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {events.length > 0 ? (
                    events.map(event => (
                      <tr key={event.id}>
                        <td>{event.title}</td>
                        <td>{event.type}</td>
                        <td>{formatEventDate(event.start)}</td>
                        <td>{formatEventTime(event.start)} - {formatEventTime(event.end)}</td>
                        <td>{event.location}</td>
                        <td>
                          <span className="admin-status pending">{event.status}</span>
                        </td>
                        <td>
                          <div className="admin-table-actions">
                            <button 
                              className="admin-table-action" 
                              title="Edit"
                              onClick={() => handleEditEvent(event)}
                            >
                              <FontAwesomeIcon icon={faEdit} />
                            </button>
                            <button 
                              className="admin-table-action delete" 
                              title="Delete"
                              onClick={() => handleDeletePrompt(event.id)}
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center">No events found. Click "Add Event" to create one.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'settings' && (
        <div className="admin-content">
          <div className="admin-section-header">
            <h2 className="admin-section-title">
              <FontAwesomeIcon icon={faCog} className="admin-section-icon" />
              Portal Settings
            </h2>
          </div>
          
          <div className="admin-alert info">
            <div className="admin-alert-icon">
              <FontAwesomeIcon icon={faShieldAlt} />
            </div>
            <div className="admin-alert-content">
              <div className="admin-alert-title">Portal Settings</div>
              <div className="admin-alert-message">
                This is a demo of the portal settings interface. In a production environment, you would be able to configure various settings for the portal here.
              </div>
            </div>
          </div>
          
          <div className="admin-section">
            <div className="admin-section-title">General Settings</div>
            <div className="admin-form-group">
              <label htmlFor="portal-name" className="admin-form-label">Portal Name</label>
              <input
                type="text"
                id="portal-name"
                className="admin-form-control"
                defaultValue="Sovereign Rep Portal"
              />
            </div>
            
            <div className="admin-form-group">
              <label htmlFor="company-name" className="admin-form-label">Company Name</label>
              <input
                type="text"
                id="company-name"
                className="admin-form-control"
                defaultValue="Sovereign Solar"
              />
            </div>
            
            <div className="admin-form-group">
              <label htmlFor="support-email" className="admin-form-label">Support Email</label>
              <input
                type="email"
                id="support-email"
                className="admin-form-control"
                defaultValue="support@sovereign.com"
              />
            </div>
            
            <div className="admin-form-group">
              <label htmlFor="timezone" className="admin-form-label">Default Timezone</label>
              <select id="timezone" className="admin-form-select">
                <option value="America/New_York">Eastern Time (ET)</option>
                <option value="America/Chicago">Central Time (CT)</option>
                <option value="America/Denver">Mountain Time (MT)</option>
                <option value="America/Los_Angeles">Pacific Time (PT)</option>
              </select>
            </div>
          </div>
          
          <div className="admin-section">
            <div className="admin-section-title">Appearance</div>
            <div className="admin-form-group">
              <label htmlFor="logo" className="admin-form-label">Logo</label>
              <div className="admin-upload-area">
                <div className="admin-upload-icon">
                  <FontAwesomeIcon icon={faPlus} />
                </div>
                <div className="admin-upload-title">Upload Logo</div>
                <div className="admin-upload-description">
                  Recommended size: 200x50 pixels, PNG or SVG format
                </div>
                <button className="admin-upload-button">
                  <FontAwesomeIcon icon={faPlus} className="admin-upload-button-icon" />
                  Choose File
                </button>
                <input type="file" className="admin-upload-input" />
              </div>
            </div>
            
            <div className="admin-form-group">
              <label htmlFor="primary-color" className="admin-form-label">Primary Color</label>
              <input
                type="color"
                id="primary-color"
                className="admin-form-control"
                defaultValue="#3b82f6"
                style={{ width: '100px', height: '40px' }}
              />
            </div>
          </div>
          
          <div className="admin-section">
            <div className="admin-section-title">Security</div>
            <div className="admin-form-group">
              <label htmlFor="session-timeout" className="admin-form-label">Session Timeout (minutes)</label>
              <input
                type="number"
                id="session-timeout"
                className="admin-form-control"
                defaultValue="60"
                style={{ width: '200px' }}
              />
            </div>
            
            <div className="admin-form-group">
              <label className="admin-form-label">Password Requirements</label>
              <div className="admin-form-check">
                <input type="checkbox" id="require-uppercase" defaultChecked />
                <label htmlFor="require-uppercase">Require uppercase letters</label>
              </div>
              <div className="admin-form-check">
                <input type="checkbox" id="require-numbers" defaultChecked />
                <label htmlFor="require-numbers">Require numbers</label>
              </div>
              <div className="admin-form-check">
                <input type="checkbox" id="require-special" defaultChecked />
                <label htmlFor="require-special">Require special characters</label>
              </div>
              <div className="admin-form-check">
                <input type="checkbox" id="require-length" defaultChecked />
                <label htmlFor="require-length">Minimum length: 8 characters</label>
              </div>
            </div>
          </div>
          
          <div className="admin-form-actions">
            <button className="btn btn-primary">Save Changes</button>
            <button className="btn btn-outline">Cancel</button>
          </div>
        </div>
      )}
      
      {/* Event Form Modal */}
      {showEventModal && (
        <div className="event-modal-overlay">
          <EventForm
            event={currentEvent}
            onSave={handleSaveEvent}
            onCancel={handleCloseEventModal}
          />
        </div>
      )}
      
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="event-modal-overlay">
          <div className="event-modal">
            <div className="event-modal-header">
              <h2>Confirm Deletion</h2>
              <button className="modal-close" onClick={handleCancelDelete}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <div className="event-modal-body">
              <div className="delete-confirm">
                <p>Are you sure you want to delete the event "{eventToDelete?.title}"?</p>
                <p className="delete-warning">This action cannot be undone.</p>
                
                <div className="event-info">
                  <div><strong>Date:</strong> {formatEventDate(eventToDelete?.start)}</div>
                  <div><strong>Time:</strong> {formatEventTime(eventToDelete?.start)} - {formatEventTime(eventToDelete?.end)}</div>
                  <div><strong>Location:</strong> {eventToDelete?.location}</div>
                </div>
                
                <div className="delete-confirm-actions">
                  <button className="btn btn-danger" onClick={handleDeleteEvent}>
                    <FontAwesomeIcon icon={faTrash} className="btn-icon" />
                    Yes, Delete Event
                  </button>
                  <button className="btn btn-outline" onClick={handleCancelDelete}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;