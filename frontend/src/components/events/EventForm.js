import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCalendarAlt, 
  faClock, 
  faMapMarkerAlt, 
  faUser,
  faTimes,
  faCheck,
  faRepeat,
  faGraduationCap,
  faRunning,
  faTrophy,
  faGlassCheers,
  faHandshake,
  faCalendarDay,
  faUsers,
  faPalette,
  faSun,
  faMoon
} from '@fortawesome/free-solid-svg-icons';

import { EVENT_CATEGORIES, RECURRENCE_PATTERNS } from './EventService';

const EventForm = ({ event, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    id: null,
    title: '',
    type: 'Meeting',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    description: '',
    host: '',
    status: 'upcoming',
    recurrence: 'none',
    color: '',
    isAllDay: false,
    reminders: [],
    url: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});
  const [showColorPicker, setShowColorPicker] = useState(false);
  
  // Initialize form with event data if editing
  useEffect(() => {
    if (event) {
      const startDate = new Date(event.start);
      const endDate = new Date(event.end);
      
      // Get default color from category if not specified
      const categoryInfo = EVENT_CATEGORIES[event.type?.toLowerCase()] || EVENT_CATEGORIES.other;
      const eventColor = event.color || categoryInfo.color;
      
      setFormData({
        id: event.id,
        title: event.title || '',
        type: event.type || 'Meeting',
        date: startDate.toISOString().split('T')[0],
        startTime: startDate.toTimeString().split(' ')[0].substring(0, 5),
        endTime: endDate.toTimeString().split(' ')[0].substring(0, 5),
        location: event.location || '',
        description: event.description || '',
        host: event.host || '',
        status: event.status || 'upcoming',
        recurrence: event.recurrence || 'none',
        color: eventColor,
        isAllDay: event.isAllDay || false,
        reminders: event.reminders || [],
        url: event.url || '',
        notes: event.notes || ''
      });
    } else {
      // Set default color for new events based on type
      const categoryInfo = EVENT_CATEGORIES[formData.type?.toLowerCase()] || EVENT_CATEGORIES.other;
      setFormData(prev => ({
        ...prev,
        color: categoryInfo.color
      }));
    }
  }, [event]);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Handle checkbox inputs differently
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));
    
    // Update color when type changes
    if (name === 'type') {
      const categoryInfo = EVENT_CATEGORIES[value.toLowerCase()] || EVENT_CATEGORIES.other;
      setFormData(prev => ({
        ...prev,
        [name]: value,
        color: categoryInfo.color
      }));
    }
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };
  
  const handleColorChange = (color) => {
    setFormData(prev => ({
      ...prev,
      color
    }));
    setShowColorPicker(false);
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.startTime) newErrors.startTime = 'Start time is required';
    if (!formData.endTime) newErrors.endTime = 'End time is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    
    // Check if end time is after start time
    if (formData.startTime && formData.endTime) {
      const start = new Date(`${formData.date}T${formData.startTime}`);
      const end = new Date(`${formData.date}T${formData.endTime}`);
      
      if (end <= start) {
        newErrors.endTime = 'End time must be after start time';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        // Convert form data to event object
        let startDate, endDate;
        
        if (formData.isAllDay) {
          // Set to beginning and end of day
          startDate = new Date(`${formData.date}T00:00:00`);
          endDate = new Date(`${formData.date}T23:59:59`);
        } else {
          startDate = new Date(`${formData.date}T${formData.startTime}`);
          endDate = new Date(`${formData.date}T${formData.endTime}`);
        }
        
        const eventData = {
          id: formData.id || Date.now(), // Use existing ID or create a new one
          title: formData.title,
          type: formData.type,
          start: startDate,
          end: endDate,
          location: formData.location,
          description: formData.description,
          host: formData.host,
          status: formData.status,
          recurrence: formData.recurrence,
          color: formData.color,
          isAllDay: formData.isAllDay,
          reminders: formData.reminders,
          url: formData.url,
          notes: formData.notes
        };
        
        onSave(eventData);
      } catch (error) {
        console.error('Error creating event:', error);
        // Set a generic error to inform user
        setErrors(prev => ({
          ...prev,
          general: 'Error creating event. Please check all fields and try again.'
        }));
      }
    }
  };
  
  return (
    <div className="event-form-container">
      <div className="event-form-header">
        <h2>{event ? 'Edit Event' : 'Add New Event'}</h2>
        <button className="modal-close" onClick={onCancel}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="event-form">
        {errors.general && (
          <div className="error-message general-error">
            {errors.general}
          </div>
        )}
        
        <div className="form-group">
          <label htmlFor="title">
            Event Title <span className="required">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
            value={formData.title}
            onChange={handleChange}
          />
          {errors.title && <div className="error-message">{errors.title}</div>}
        </div>
        
        <div className="form-row">
          <div className="form-group flex-1">
            <label htmlFor="type">Event Type</label>
            <select
              id="type"
              name="type"
              className="form-control"
              value={formData.type}
              onChange={handleChange}
            >
              {Object.entries(EVENT_CATEGORIES).map(([key, category]) => (
                <option key={key} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-group flex-1">
            <label htmlFor="color">Color</label>
            <div className="color-picker-container">
              <div 
                className="color-preview" 
                style={{ backgroundColor: formData.color }}
                onClick={() => setShowColorPicker(!showColorPicker)}
              ></div>
              <input
                type="text"
                id="color"
                name="color"
                className="form-control color-input"
                value={formData.color}
                onChange={handleChange}
              />
              
              {showColorPicker && (
                <div className="color-picker-dropdown">
                  {Object.values(EVENT_CATEGORIES).map(category => (
                    <div 
                      key={category.name} 
                      className="color-option"
                      style={{ backgroundColor: category.color }}
                      onClick={() => handleColorChange(category.color)}
                      title={category.name}
                    ></div>
                  ))}
                  <div className="custom-colors">
                    <div className="color-option" style={{ backgroundColor: '#e53e3e' }} onClick={() => handleColorChange('#e53e3e')}></div>
                    <div className="color-option" style={{ backgroundColor: '#dd6b20' }} onClick={() => handleColorChange('#dd6b20')}></div>
                    <div className="color-option" style={{ backgroundColor: '#d69e2e' }} onClick={() => handleColorChange('#d69e2e')}></div>
                    <div className="color-option" style={{ backgroundColor: '#38a169' }} onClick={() => handleColorChange('#38a169')}></div>
                    <div className="color-option" style={{ backgroundColor: '#3182ce' }} onClick={() => handleColorChange('#3182ce')}></div>
                    <div className="color-option" style={{ backgroundColor: '#805ad5' }} onClick={() => handleColorChange('#805ad5')}></div>
                    <div className="color-option" style={{ backgroundColor: '#d53f8c' }} onClick={() => handleColorChange('#d53f8c')}></div>
                    <div className="color-option" style={{ backgroundColor: '#718096' }} onClick={() => handleColorChange('#718096')}></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group flex-1">
            <label htmlFor="date">
              Date <span className="required">*</span>
            </label>
            <div className="input-with-icon">
              <FontAwesomeIcon icon={faCalendarAlt} className="input-icon" />
              <input
                type="date"
                id="date"
                name="date"
                className={`form-control ${errors.date ? 'is-invalid' : ''}`}
                value={formData.date}
                onChange={handleChange}
              />
            </div>
            {errors.date && <div className="error-message">{errors.date}</div>}
          </div>
          
          <div className="form-group flex-1">
            <label htmlFor="recurrence">Repeats</label>
            <div className="input-with-icon">
              <FontAwesomeIcon icon={faRepeat} className="input-icon" />
              <select
                id="recurrence"
                name="recurrence"
                className="form-control"
                value={formData.recurrence}
                onChange={handleChange}
              >
                {Object.entries(RECURRENCE_PATTERNS).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        <div className="form-group all-day-option">
          <label className="checkbox-container">
            <input
              type="checkbox"
              id="isAllDay"
              name="isAllDay"
              checked={formData.isAllDay}
              onChange={handleChange}
            />
            <span className="checkbox-label">All day event</span>
          </label>
        </div>
        
        {!formData.isAllDay && (
          <div className="form-row">
            <div className="form-group flex-1">
              <label htmlFor="startTime">
                Start Time <span className="required">*</span>
              </label>
              <div className="input-with-icon">
                <FontAwesomeIcon icon={faClock} className="input-icon" />
                <input
                  type="time"
                  id="startTime"
                  name="startTime"
                  className={`form-control ${errors.startTime ? 'is-invalid' : ''}`}
                  value={formData.startTime}
                  onChange={handleChange}
                />
              </div>
              {errors.startTime && <div className="error-message">{errors.startTime}</div>}
            </div>
            
            <div className="form-group flex-1">
              <label htmlFor="endTime">
                End Time <span className="required">*</span>
              </label>
              <div className="input-with-icon">
                <FontAwesomeIcon icon={faClock} className="input-icon" />
                <input
                  type="time"
                  id="endTime"
                  name="endTime"
                  className={`form-control ${errors.endTime ? 'is-invalid' : ''}`}
                  value={formData.endTime}
                  onChange={handleChange}
                />
              </div>
              {errors.endTime && <div className="error-message">{errors.endTime}</div>}
            </div>
          </div>
        )}
        
        <div className="form-group">
          <label htmlFor="location">
            Location <span className="required">*</span>
          </label>
          <div className="input-with-icon">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="input-icon" />
            <input
              type="text"
              id="location"
              name="location"
              className={`form-control ${errors.location ? 'is-invalid' : ''}`}
              value={formData.location}
              onChange={handleChange}
              placeholder="Office, Zoom, etc."
            />
          </div>
          {errors.location && <div className="error-message">{errors.location}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="url">URL (Optional)</label>
          <input
            type="text"
            id="url"
            name="url"
            className="form-control"
            value={formData.url}
            onChange={handleChange}
            placeholder="https://zoom.us/meeting/..."
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="host">Event Host</label>
          <div className="input-with-icon">
            <FontAwesomeIcon icon={faUser} className="input-icon" />
            <input
              type="text"
              id="host"
              name="host"
              className="form-control"
              value={formData.host}
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            value={formData.description}
            onChange={handleChange}
            rows="4"
          ></textarea>
        </div>
        
        <div className="form-group">
          <label htmlFor="notes">Private Notes</label>
          <textarea
            id="notes"
            name="notes"
            className="form-control"
            value={formData.notes}
            onChange={handleChange}
            rows="2"
            placeholder="Notes only visible to you"
          ></textarea>
        </div>
        
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            <FontAwesomeIcon icon={faCheck} className="btn-icon" />
            {event ? 'Update Event' : 'Create Event'}
          </button>
          <button type="button" className="btn btn-outline" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;