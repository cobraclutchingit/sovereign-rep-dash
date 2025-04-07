import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCalendarAlt, 
  faClock, 
  faMapMarkerAlt, 
  faUser,
  faPlus,
  faFilter,
  faInfoCircle,
  faVideo,
  faUsers,
  faRunning,
  faEdit,
  faTrash,
  faTimes,
  faPrint,
  faFileExport,
  faSun,
  faMoon,
  faGraduationCap,
  faTrophy,
  faHandshake,
  faGlassCheers,
  faRepeat,
  faCalendarDay,
  faArrowsUpDownLeftRight
} from '@fortawesome/free-solid-svg-icons';
import '../assets/styles/teamcalendar.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import EventForm from '../components/events/EventForm';
import { getEvents, saveEvent, deleteEvent, initializeEvents, EVENT_CATEGORIES } from '../components/events/EventService';

// Setup the localizer for react-big-calendar
const localizer = momentLocalizer(moment);

// Create a DnD Calendar component
const DnDCalendar = withDragAndDrop(Calendar);

const TeamCalendar = () => {
  const [view, setView] = useState('month');
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [showEditEventModal, setShowEditEventModal] = useState(false);
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [dateRange, setDateRange] = useState({
    start: new Date(new Date().setDate(1)), // First day of current month
    end: new Date(new Date().getFullYear(), new Date().getMonth() + 2, 0) // Last day of next month
  });
  const [showDateRange, setShowDateRange] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    meeting: true,
    training: true,
    blitz: true,
    contest: true,
    social: true,
    appointment: true,
    other: true
  });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showWeekNumbers, setShowWeekNumbers] = useState(false);
  const [showShortcutsHelp, setShowShortcutsHelp] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Toggle dark mode
  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    // Apply theme to root element
    document.documentElement.classList.toggle('dark-mode', newDarkMode);
    
    // Save preference
    localStorage.setItem('calendar_dark_mode', newDarkMode ? 'true' : 'false');
  };
  
  // Initialize dark mode preference
  useEffect(() => {
    const savedPreference = localStorage.getItem('calendar_dark_mode');
    if (savedPreference === 'true') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark-mode');
    }
  }, []);
  
  // Initialize and load events
  useEffect(() => {
    setIsLoading(true);
    // Initialize events with sample data if empty
    initializeEvents();
    
    // Load events from storage
    loadEvents();
    
    // Simulate loading time for smoother transitions
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Setup keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Only apply shortcuts when not typing in an input field
      if (e.target.tagName.toLowerCase() === 'input' || 
          e.target.tagName.toLowerCase() === 'textarea') {
        return;
      }
      
      // Check for keyboard shortcuts
      // n - New event
      if (e.key === 'n' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        handleAddEvent();
      }
      
      // t - Today
      if (e.key === 't' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        setCalendarDate(new Date());
      }
      
      // d - Day view
      if (e.key === 'd' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        handleViewChange('day');
      }
      
      // w - Week view
      if (e.key === 'w' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        handleViewChange('week');
      }
      
      // m - Month view
      if (e.key === 'm' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        handleViewChange('month');
      }
      
      // a - Agenda view
      if (e.key === 'a' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        handleViewChange('agenda');
      }
      
      // f - Toggle filters
      if (e.key === 'f' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        toggleFilters();
      }
      
      // Left/Right arrows - Navigate through dates
      if (e.key === 'ArrowLeft' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        const newDate = new Date(calendarDate);
        
        if (view === 'month') {
          newDate.setMonth(newDate.getMonth() - 1);
        } else if (view === 'week') {
          newDate.setDate(newDate.getDate() - 7);
        } else {
          newDate.setDate(newDate.getDate() - 1);
        }
        
        setCalendarDate(newDate);
      }
      
      if (e.key === 'ArrowRight' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        const newDate = new Date(calendarDate);
        
        if (view === 'month') {
          newDate.setMonth(newDate.getMonth() + 1);
        } else if (view === 'week') {
          newDate.setDate(newDate.getDate() + 7);
        } else {
          newDate.setDate(newDate.getDate() + 1);
        }
        
        setCalendarDate(newDate);
      }
      
      // Escape - Close modals
      if (e.key === 'Escape') {
        if (selectedEvent) {
          handleCloseModal();
        } else if (showAddEventModal || showEditEventModal) {
          handleCloseEventForm();
        }
      }
    };
    
    // Add event listener
    window.addEventListener('keydown', handleKeyDown);
    
    // Return cleanup function
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [calendarDate, view, selectedEvent, showAddEventModal, showEditEventModal]);
  
  const loadEvents = () => {
    // Get events based on the selected date range
    const rangeStart = dateRange.start || new Date();
    const rangeEnd = dateRange.end || new Date(rangeStart.getFullYear(), rangeStart.getMonth() + 2, 0);
    
    // Get events with recurring events expanded
    const storedEvents = getEvents({
      includeRecurring: true,
      startDate: rangeStart,
      endDate: rangeEnd,
      recurringCount: 52
    });
    
    // Events are already formatted by the getEvents function with recurring events expanded
    setEvents(storedEvents);
  };
  
  // Handle date range change
  const handleDateRangeChange = (newRange) => {
    setDateRange(newRange);
    // Reload events with new date range
    const storedEvents = getEvents({
      includeRecurring: true,
      startDate: newRange.start,
      endDate: newRange.end,
      recurringCount: 52
    });
    setEvents(storedEvents);
  };
  
  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };
  
  const handleCloseModal = () => {
    setSelectedEvent(null);
  };
  
  const handleViewChange = (newView) => {
    setView(newView);
  };
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  const updateFilter = (type) => {
    setFilters({
      ...filters,
      [type]: !filters[type]
    });
  };
  
  const handleAddEvent = () => {
    setShowAddEventModal(true);
  };
  
  const handleEditEvent = () => {
    setShowEditEventModal(true);
  };
  
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  const handleDeletePrompt = () => {
    setShowDeleteConfirm(true);
  };
  
  const handleDeleteEvent = () => {
    if (selectedEvent) {
      deleteEvent(selectedEvent.id);
      loadEvents();
      setSelectedEvent(null);
      setShowDeleteConfirm(false);
    }
  };
  
  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
  };
  
  const handleSaveEvent = (eventData) => {
    saveEvent(eventData);
    loadEvents();
    setShowAddEventModal(false);
    setShowEditEventModal(false);
    setSelectedEvent(null);
  };
  
  const handleCloseEventForm = () => {
    setShowAddEventModal(false);
    setShowEditEventModal(false);
  };
  
  // Handle event drag and drop
  const handleEventDrop = ({ event, start, end }) => {
    const updatedEvent = { ...event, start, end };
    saveEvent(updatedEvent);
    loadEvents();
    
    // Show feedback
    const feedback = document.createElement('div');
    feedback.className = 'drag-feedback';
    feedback.textContent = 'Event moved successfully';
    document.body.appendChild(feedback);
    
    setTimeout(() => {
      feedback.classList.add('show');
      setTimeout(() => {
        feedback.classList.remove('show');
        setTimeout(() => {
          document.body.removeChild(feedback);
        }, 300);
      }, 2000);
    }, 10);
  };
  
  // Handle event resize
  const handleEventResize = ({ event, start, end }) => {
    const updatedEvent = { ...event, start, end };
    saveEvent(updatedEvent);
    loadEvents();
    
    // Show feedback
    const feedback = document.createElement('div');
    feedback.className = 'resize-feedback';
    feedback.textContent = 'Event duration updated';
    document.body.appendChild(feedback);
    
    setTimeout(() => {
      feedback.classList.add('show');
      setTimeout(() => {
        feedback.classList.remove('show');
        setTimeout(() => {
          document.body.removeChild(feedback);
        }, 300);
      }, 2000);
    }, 10);
  };
  
  // Apply filters to events
  const filteredEvents = events.filter(event => {
    const eventType = event.type?.toLowerCase() || 'other';
    if (eventType === 'meeting' && !filters.meeting) return false;
    if (eventType === 'training' && !filters.training) return false;
    if (eventType === 'blitz' && !filters.blitz) return false;
    if (!['meeting', 'training', 'blitz'].includes(eventType) && !filters.other) return false;
    return true;
  });
  
  const eventStyleGetter = (event) => {
    // Use custom color if available, otherwise use type-based color
    let backgroundColor;
    
    if (event.color) {
      backgroundColor = event.color;
    } else {
      // Fallback to type-based colors
      const categoryInfo = EVENT_CATEGORIES[event.type?.toLowerCase()] || EVENT_CATEGORIES.other;
      backgroundColor = categoryInfo.color;
    }
    
    const style = {
      backgroundColor,
      borderRadius: '5px',
      color: 'white',
      border: 'none',
      display: 'block',
      fontWeight: event.isAllDay ? 'bold' : 'normal'
    };
    
    // Add styles for recurring events
    if (event.isRecurring) {
      style.borderLeft = '3px solid rgba(255,255,255,0.5)';
    }
    
    return {
      style
    };
  };
  
  // Get upcoming events for display in the side panel
  const getUpcomingEvents = () => {
    const now = new Date();
    return events
      .filter(event => new Date(event.start) > now)
      .sort((a, b) => new Date(a.start) - new Date(b.start))
      .slice(0, 3);
  };
  
  const upcomingEvents = getUpcomingEvents();
  
  // Print calendar view
  const handlePrintCalendar = () => {
    const printWindow = window.open('', '_blank');
    const calendarEl = document.querySelector('.rbc-calendar');
    
    if (!calendarEl || !printWindow) {
      alert('Unable to print calendar');
      return;
    }
    
    // Clone calendar element to avoid modifying the visible one
    const calendarClone = calendarEl.cloneNode(true);
    
    // Create HTML for print window
    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Sovereign Portal Calendar - ${moment(calendarDate).format('MMMM YYYY')}</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
        <style>
          body {
            font-family: 'Inter', sans-serif;
            padding: 20px;
          }
          h1 {
            text-align: center;
            margin-bottom: 20px;
          }
          .print-date {
            text-align: right;
            margin-bottom: 20px;
            font-size: 12px;
            color: #666;
          }
          ${document.querySelector('style')?.innerHTML || ''}
          .rbc-header {
            padding: 10px;
            background-color: #f3f4f6;
          }
          .rbc-day-bg.rbc-today {
            background-color: #e5e7eb;
          }
          .rbc-event {
            padding: 4px 8px;
            border-radius: 2px;
            margin-bottom: 2px;
          }
          @media print {
            @page { size: landscape; }
          }
        </style>
      </head>
      <body>
        <h1>Sovereign Portal Calendar - ${moment(calendarDate).format('MMMM YYYY')}</h1>
        <div class="print-date">Printed on ${moment().format('MMMM D, YYYY h:mm A')}</div>
        ${calendarClone.outerHTML}
      </body>
      </html>
    `;
    
    printWindow.document.open();
    printWindow.document.write(printContent);
    printWindow.document.close();
    
    // Wait for styles to load
    setTimeout(() => {
      printWindow.print();
    }, 500);
  };
  
  // Export calendar as iCal
  const handleExportCalendar = () => {
    // Create iCal content
    let iCalContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Sovereign Portal//Calendar//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:Sovereign Portal Calendar
X-WR-TIMEZONE:UTC
BEGIN:VTIMEZONE
TZID:UTC
END:VTIMEZONE
`;
    
    // Add events
    filteredEvents.forEach(event => {
      // Format dates for iCal (YYYYMMDDTHHmmssZ format)
      const startDate = moment(event.start).utc().format('YYYYMMDDTHHmmss') + 'Z';
      const endDate = moment(event.end).utc().format('YYYYMMDDTHHmmss') + 'Z';
      
      iCalContent += `BEGIN:VEVENT
UID:${event.id}@sovereignportal.com
DTSTAMP:${moment().utc().format('YYYYMMDDTHHmmss')}Z
DTSTART:${startDate}
DTEND:${endDate}
SUMMARY:${event.title}
LOCATION:${event.location || ''}
DESCRIPTION:${event.description || ''}
STATUS:CONFIRMED
END:VEVENT
`;
    });
    
    iCalContent += 'END:VCALENDAR';
    
    // Create and download file
    const blob = new Blob([iCalContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'sovereign_calendar.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <div className="calendar-header-left">
          <h1 className="calendar-title">Team Calendar</h1>
          <p className="calendar-subtitle">
            Stay updated with team events, trainings, and important dates
          </p>
        </div>
        <div className="calendar-header-right">
          <div className="calendar-action-group">
            <button className="btn btn-primary" onClick={handleAddEvent}>
              <FontAwesomeIcon icon={faPlus} className="btn-icon" />
              <span className="btn-text">Add Event</span>
            </button>
            <button className="btn btn-outline date-range-btn" onClick={() => setShowDateRange(!showDateRange)}>
              <FontAwesomeIcon icon={faCalendarAlt} className="btn-icon" />
              <span className="btn-text">
                {moment(dateRange.start).format('MMM D')} - {moment(dateRange.end).format('MMM D, YYYY')}
              </span>
            </button>
          </div>
          <div className="calendar-actions">
            <button className="btn btn-outline" onClick={toggleFilters} title="Filter Events">
              <FontAwesomeIcon icon={faFilter} className="btn-icon" />
              <span className="btn-text-sm">Filter</span>
            </button>
            <button className="btn btn-outline" onClick={handlePrintCalendar} title="Print Calendar">
              <FontAwesomeIcon icon={faPrint} className="btn-icon" />
            </button>
            <button className="btn btn-outline" onClick={handleExportCalendar} title="Export Calendar (iCal)">
              <FontAwesomeIcon icon={faFileExport} className="btn-icon" />
            </button>
            <div className="theme-toggle" onClick={toggleTheme} title="Toggle Dark Mode">
              <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
            </div>
            <button 
              className="btn btn-outline keyboard-shortcut-btn" 
              onClick={() => setShowShortcutsHelp(!showShortcutsHelp)}
              title="Keyboard Shortcuts"
            >
              ⌨️
            </button>
          </div>
        </div>
      </div>
      
      {showDateRange && (
        <div className="date-range-picker-overlay" onClick={() => setShowDateRange(false)}>
          <div className="date-range-picker" onClick={e => e.stopPropagation()}>
            <div className="date-range-header">
              <h3>Select Date Range</h3>
              <button className="modal-close" onClick={() => setShowDateRange(false)}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <div className="date-range-content">
              <div className="date-range-presets">
                <button 
                  className="preset-btn" 
                  onClick={() => {
                    const today = new Date();
                    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
                    handleDateRangeChange({
                      start: today,
                      end: nextMonth
                    });
                  }}
                >
                  Current Month
                </button>
                <button 
                  className="preset-btn" 
                  onClick={() => {
                    const today = new Date();
                    const nextThreeMonths = new Date(today.getFullYear(), today.getMonth() + 3, 0);
                    handleDateRangeChange({
                      start: today,
                      end: nextThreeMonths
                    });
                  }}
                >
                  Next 3 Months
                </button>
                <button 
                  className="preset-btn" 
                  onClick={() => {
                    const today = new Date();
                    const nextSixMonths = new Date(today.getFullYear(), today.getMonth() + 6, 0);
                    handleDateRangeChange({
                      start: today,
                      end: nextSixMonths
                    });
                  }}
                >
                  Next 6 Months
                </button>
                <button 
                  className="preset-btn" 
                  onClick={() => {
                    const today = new Date();
                    const endOfYear = new Date(today.getFullYear(), 11, 31);
                    handleDateRangeChange({
                      start: today,
                      end: endOfYear
                    });
                  }}
                >
                  Rest of Year
                </button>
              </div>
              
              <div className="date-range-custom">
                <div className="date-input-group">
                  <label>Start Date</label>
                  <input 
                    type="date" 
                    value={moment(dateRange.start).format('YYYY-MM-DD')}
                    onChange={(e) => {
                      const newStart = new Date(e.target.value);
                      handleDateRangeChange({
                        start: newStart,
                        end: dateRange.end
                      });
                    }}
                    className="date-input"
                  />
                </div>
                <div className="date-input-group">
                  <label>End Date</label>
                  <input 
                    type="date" 
                    value={moment(dateRange.end).format('YYYY-MM-DD')}
                    onChange={(e) => {
                      const newEnd = new Date(e.target.value);
                      handleDateRangeChange({
                        start: dateRange.start,
                        end: newEnd
                      });
                    }}
                    className="date-input"
                  />
                </div>
              </div>
              
              <div className="date-range-actions">
                <button 
                  className="btn btn-primary" 
                  onClick={() => setShowDateRange(false)}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {showShortcutsHelp && (
        <div className="shortcuts-help-overlay" onClick={() => setShowShortcutsHelp(false)}>
          <div className="shortcuts-help-modal" onClick={e => e.stopPropagation()}>
            <div className="shortcuts-help-header">
              <h3>Keyboard Shortcuts</h3>
              <button className="modal-close" onClick={() => setShowShortcutsHelp(false)}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <div className="shortcuts-help-content">
              <div className="shortcuts-section">
                <h4>Navigation</h4>
                <div className="shortcut-item">
                  <div className="shortcut-key">→</div>
                  <div className="shortcut-description">Next day/week/month</div>
                </div>
                <div className="shortcut-item">
                  <div className="shortcut-key">←</div>
                  <div className="shortcut-description">Previous day/week/month</div>
                </div>
                <div className="shortcut-item">
                  <div className="shortcut-key">T</div>
                  <div className="shortcut-description">Today</div>
                </div>
              </div>
              
              <div className="shortcuts-section">
                <h4>Views</h4>
                <div className="shortcut-item">
                  <div className="shortcut-key">D</div>
                  <div className="shortcut-description">Day view</div>
                </div>
                <div className="shortcut-item">
                  <div className="shortcut-key">W</div>
                  <div className="shortcut-description">Week view</div>
                </div>
                <div className="shortcut-item">
                  <div className="shortcut-key">M</div>
                  <div className="shortcut-description">Month view</div>
                </div>
                <div className="shortcut-item">
                  <div className="shortcut-key">A</div>
                  <div className="shortcut-description">Agenda view</div>
                </div>
              </div>
              
              <div className="shortcuts-section">
                <h4>Actions</h4>
                <div className="shortcut-item">
                  <div className="shortcut-key">N</div>
                  <div className="shortcut-description">New event</div>
                </div>
                <div className="shortcut-item">
                  <div className="shortcut-key">F</div>
                  <div className="shortcut-description">Toggle filters</div>
                </div>
                <div className="shortcut-item">
                  <div className="shortcut-key">Esc</div>
                  <div className="shortcut-description">Close modal/panel</div>
                </div>
              </div>
              
              <div className="shortcuts-help-note">
                <FontAwesomeIcon icon={faInfoCircle} className="info-icon" />
                You can also drag and drop events to reschedule them, or drag the edges to resize.
              </div>
            </div>
          </div>
        </div>
      )}
      
      {showFilters && (
        <div className="calendar-filters">
          <div className="filter-title">Event Types:</div>
          <div className="filter-options">
            {Object.entries(EVENT_CATEGORIES).map(([key, category]) => (
              <label key={key} className="filter-option">
                <input 
                  type="checkbox" 
                  checked={filters[key]} 
                  onChange={() => updateFilter(key)} 
                />
                <span className="filter-color" style={{ backgroundColor: category.color }}></span>
                {category.name}
              </label>
            ))}
          </div>
          
          <div className="calendar-view-options">
            <label className="checkbox-container">
              <input
                type="checkbox"
                checked={showWeekNumbers}
                onChange={() => setShowWeekNumbers(!showWeekNumbers)}
              />
              <span className="checkbox-label">Show Week Numbers</span>
            </label>
          </div>
        </div>
      )}
      
      <div className="view-selector">
        <button 
          className={`view-btn ${view === 'month' ? 'active' : ''}`}
          onClick={() => handleViewChange('month')}
        >
          Month
        </button>
        <button 
          className={`view-btn ${view === 'week' ? 'active' : ''}`}
          onClick={() => handleViewChange('week')}
        >
          Week
        </button>
        <button 
          className={`view-btn ${view === 'day' ? 'active' : ''}`}
          onClick={() => handleViewChange('day')}
        >
          Day
        </button>
        <button 
          className={`view-btn ${view === 'agenda' ? 'active' : ''}`}
          onClick={() => handleViewChange('agenda')}
        >
          Agenda
        </button>
      </div>
      
      <div className="calendar-main">
        <div className="calendar-toolbar">
          <div className="drag-instructions animated-fade-in">
            <FontAwesomeIcon icon={faArrowsUpDownLeftRight} className="drag-icon" />
            <span>Drag and drop events to reschedule, or drag edges to resize</span>
          </div>
          <div className="date-range-display">
            <span className="date-range-text">
              Showing events: {moment(dateRange.start).format('MMM D, YYYY')} - {moment(dateRange.end).format('MMM D, YYYY')}
            </span>
          </div>
        </div>
        
        {isLoading ? (
          <div className="calendar-loading">
            <div className="loading-spinner"></div>
            <div className="loading-text">Loading calendar events...</div>
            <div className="skeleton-calendar">
              <div className="skeleton-header"></div>
              <div className="skeleton-grid">
                {Array(7).fill().map((_, colIndex) => (
                  <div key={colIndex} className="skeleton-column">
                    {Array(5).fill().map((_, rowIndex) => (
                      <div key={rowIndex} className="skeleton-cell">
                        <div className="skeleton-day"></div>
                        {Math.random() > 0.7 && <div className="skeleton-event"></div>}
                        {Math.random() > 0.8 && <div className="skeleton-event"></div>}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="calendar-wrapper animated-fade-in">
            <DnDCalendar
              localizer={localizer}
              events={filteredEvents}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 'calc(100vh - 360px)', minHeight: '400px' }}
              view={view}
              onView={handleViewChange}
              onSelectEvent={handleSelectEvent}
              eventPropGetter={eventStyleGetter}
              date={calendarDate}
              onNavigate={date => setCalendarDate(date)}
              onEventDrop={handleEventDrop}
              onEventResize={handleEventResize}
              resizable
              selectable
              draggableAccessor={() => true}
              showMultiDayTimes
              popup
              components={{
                event: props => (
                  <div className="custom-event-wrapper">
                    <div className="event-title">
                      {props.title}
                    </div>
                    {!view.includes('month') && (
                      <div className="event-details">
                        <div className="event-time">
                          {moment(props.event.start).format('h:mm A')} - {moment(props.event.end).format('h:mm A')}
                        </div>
                        <div className="event-location">{props.event.location}</div>
                      </div>
                    )}
                  </div>
                ),
                toolbar: props => (
                  <div className="rbc-toolbar custom-toolbar">
                    <span className="rbc-btn-group">
                      <button type="button" onClick={() => props.onNavigate('TODAY')}>Today</button>
                      <button type="button" onClick={() => props.onNavigate('PREV')}>
                        <span role="img" aria-label="Previous">◀</span>
                      </button>
                      <button type="button" onClick={() => props.onNavigate('NEXT')}>
                        <span role="img" aria-label="Next">▶</span>
                      </button>
                    </span>
                    <span className="rbc-toolbar-label animated-scale-in">{props.label}</span>
                    <span className="rbc-btn-group">
                      {['month', 'week', 'day', 'agenda'].map(viewName => (
                        <button
                          key={viewName}
                          type="button"
                          className={viewName === view ? 'rbc-active' : ''}
                          onClick={() => props.onView(viewName)}
                        >
                          {viewName.charAt(0).toUpperCase() + viewName.slice(1)}
                        </button>
                      ))}
                    </span>
                  </div>
                )
              }}
              formats={{
                weekdayFormat: (date, culture, localizer) => 
                  localizer.format(date, 'dddd', culture),
                timeGutterFormat: (date, culture, localizer) => 
                  localizer.format(date, 'h:mm A', culture),
                dayRangeHeaderFormat: ({ start, end }, culture, localizer) => 
                  `${localizer.format(start, 'MMM D', culture)} - ${localizer.format(end, 'D, YYYY', culture)}`
              }}
              dayPropGetter={date => {
                const isToday = moment(date).isSame(new Date(), 'day');
                return {
                  className: isToday ? 'today-cell' : '',
                  style: isToday ? { backgroundColor: 'rgba(240, 180, 41, 0.1)' } : {}
                };
              }}
            />
          </div>
        )}
      </div>
      
      {selectedEvent && (
        <div className="event-modal-overlay">
          <div className="event-modal">
            <div className="event-modal-header">
              <h2 className="event-title">{selectedEvent.title}</h2>
              <button className="modal-close" onClick={handleCloseModal}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <div className="event-modal-body">
              <div className="event-type">
                <div className={`event-type-icon ${selectedEvent.type?.toLowerCase() || 'meeting'}`}>
                  {selectedEvent.type?.toLowerCase() === 'meeting' && <FontAwesomeIcon icon={faUsers} />}
                  {selectedEvent.type?.toLowerCase() === 'training' && <FontAwesomeIcon icon={faUsers} />}
                  {selectedEvent.type?.toLowerCase() === 'blitz' && <FontAwesomeIcon icon={faRunning} />}
                  {!['meeting', 'training', 'blitz'].includes(selectedEvent.type?.toLowerCase()) && <FontAwesomeIcon icon={faCalendarAlt} />}
                </div>
                <span className="event-type-text">
                  {selectedEvent.type || 'Event'}
                </span>
              </div>
              
              <div className="event-details">
                <div className="event-detail">
                  <FontAwesomeIcon icon={faClock} className="detail-icon" />
                  <div className="detail-content">
                    <div className="detail-label">Date & Time</div>
                    <div className="detail-text">
                      {moment(selectedEvent.start).format('MMM D, YYYY')} • {moment(selectedEvent.start).format('h:mm A')} - {moment(selectedEvent.end).format('h:mm A')}
                    </div>
                  </div>
                </div>
                
                <div className="event-detail">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="detail-icon" />
                  <div className="detail-content">
                    <div className="detail-label">Location</div>
                    <div className="detail-text">
                      {selectedEvent.location}
                    </div>
                  </div>
                </div>
                
                <div className="event-detail">
                  <FontAwesomeIcon icon={faUser} className="detail-icon" />
                  <div className="detail-content">
                    <div className="detail-label">Host</div>
                    <div className="detail-text">
                      {selectedEvent.host}
                    </div>
                  </div>
                </div>
                
                {selectedEvent.url && (
                  <div className="event-detail">
                    <FontAwesomeIcon icon={faVideo} className="detail-icon" />
                    <div className="detail-content">
                      <div className="detail-label">Meeting Link</div>
                      <div className="detail-text">
                        <a href={selectedEvent.url} target="_blank" rel="noopener noreferrer">
                          Join Meeting
                        </a>
                      </div>
                    </div>
                  </div>
                )}
                
                {selectedEvent.description && (
                  <div className="event-description">
                    <div className="description-label">Description</div>
                    <p className="description-text">
                      {selectedEvent.description}
                    </p>
                  </div>
                )}
              </div>
              
              <div className="event-actions">
                <button className="btn btn-primary" onClick={handleEditEvent}>
                  <FontAwesomeIcon icon={faEdit} className="btn-icon" />
                  Edit Event
                </button>
                <button className="btn btn-danger" onClick={handleDeletePrompt}>
                  <FontAwesomeIcon icon={faTrash} className="btn-icon" />
                  Delete
                </button>
              </div>
              
              {showDeleteConfirm && (
                <div className="delete-confirm">
                  <p>Are you sure you want to delete this event?</p>
                  <div className="delete-confirm-actions">
                    <button className="btn btn-danger" onClick={handleDeleteEvent}>
                      Yes, Delete
                    </button>
                    <button className="btn btn-outline" onClick={handleCancelDelete}>
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Add Event Modal */}
      {showAddEventModal && (
        <div className="event-modal-overlay">
          <EventForm
            onSave={handleSaveEvent}
            onCancel={handleCloseEventForm}
          />
        </div>
      )}
      
      {/* Edit Event Modal */}
      {showEditEventModal && (
        <div className="event-modal-overlay">
          <EventForm
            event={selectedEvent}
            onSave={handleSaveEvent}
            onCancel={handleCloseEventForm}
          />
        </div>
      )}
      
      <div className="calendar-info">
        <div className="info-icon">
          <FontAwesomeIcon icon={faInfoCircle} />
        </div>
        <div className="info-content">
          <h3 className="info-title">Calendar Updates</h3>
          <p className="info-text">
            This calendar is regularly updated with team events, trainings, and important dates. Click on any event for more details.
          </p>
        </div>
      </div>
      
      <div className="upcoming-events">
        <h3 className="section-title">Upcoming Events</h3>
        <div className="event-list">
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map(event => (
              <div className="event-card" key={event.id} onClick={() => handleSelectEvent(event)}>
                <div className="event-card-date">
                  <div className="event-month">{moment(event.start).format('MMM').toUpperCase()}</div>
                  <div className="event-day">{moment(event.start).format('D')}</div>
                </div>
                <div className="event-card-content">
                  <h4 className="event-card-title">{event.title}</h4>
                  <div className="event-card-details">
                    <span className="event-time">
                      <FontAwesomeIcon icon={faClock} className="event-detail-icon" />
                      {moment(event.start).format('h:mm A')} - {moment(event.end).format('h:mm A')}
                    </span>
                    <span className="event-location">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="event-detail-icon" />
                      {event.location}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-events-message">
              No upcoming events. Click "Add Event" to create one.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamCalendar;