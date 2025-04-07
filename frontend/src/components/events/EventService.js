/**
 * Service for managing events with localStorage persistence
 */

const EVENTS_STORAGE_KEY = 'sovereign_portal_events';

/**
 * Get all events from storage
 * @param {Object} options Options for retrieving events
 * @param {boolean} options.includeRecurring Whether to expand recurring events (default: false)
 * @param {Date} options.startDate Start date for recurring events range
 * @param {Date} options.endDate End date for recurring events range
 * @param {number} options.recurringCount Max number of recurring instances to generate
 * @returns {Array} Array of event objects
 */
export const getEvents = (options = {}) => {
  const {
    includeRecurring = false,
    startDate = new Date(),
    endDate = new Date(startDate.getFullYear() + 1, startDate.getMonth(), startDate.getDate()),
    recurringCount = 52 // Default to one year of weekly events
  } = options;
  
  try {
    const eventsJson = localStorage.getItem(EVENTS_STORAGE_KEY);
    if (!eventsJson) return [];
    
    // Parse events and validate each event object
    const events = JSON.parse(eventsJson);
    
    // Make sure we have a valid array
    if (!Array.isArray(events)) {
      console.error('Events data is not an array, resetting');
      return [];
    }
    
    // Filter out any invalid events and convert dates
    const validEvents = events.filter(event => {
      try {
        // Check if event has required fields
        if (!event || typeof event !== 'object') return false;
        if (!event.id || !event.title) return false;
        
        // Check if dates are valid
        const startDate = new Date(event.start);
        const endDate = new Date(event.end);
        
        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
          console.warn('Filtering out event with invalid dates:', event);
          return false;
        }
        
        // Convert strings to dates for valid events
        event.start = startDate;
        event.end = endDate;
        
        return true;
      } catch (e) {
        console.warn('Error validating event, filtering it out:', e);
        return false;
      }
    });
    
    // If we don't need to expand recurring events, just return the valid events
    if (!includeRecurring) {
      return validEvents;
    }
    
    // Generate recurring instances
    const expandedEvents = [];
    
    validEvents.forEach(event => {
      if (event.recurrence && event.recurrence !== 'none') {
        // This is a recurring event - generate instances
        const instances = generateRecurringEvents(
          event,
          startDate,
          endDate,
          recurringCount
        );
        expandedEvents.push(...instances);
      } else {
        // Regular event - add as is
        expandedEvents.push(event);
      }
    });
    
    return expandedEvents;
  } catch (error) {
    console.error('Error loading events from localStorage', error);
    return [];
  }
};

/**
 * Save all events to storage
 * @param {Array} events Array of event objects to save
 */
export const saveEvents = (events) => {
  try {
    localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(events));
  } catch (error) {
    console.error('Error saving events to localStorage', error);
  }
};

/**
 * Add or update an event
 * @param {Object} event Event object to save
 * @returns {Object} Saved event with ID
 */
export const saveEvent = (event) => {
  const events = getEvents();
  
  // Generate event dates from form data if needed
  const eventWithDates = ensureEventDates(event);
  
  if (eventWithDates.id) {
    // Update existing event
    const index = events.findIndex(e => e.id === eventWithDates.id);
    if (index >= 0) {
      events[index] = eventWithDates;
    } else {
      events.push(eventWithDates);
    }
  } else {
    // Add new event with generated ID
    eventWithDates.id = Date.now();
    events.push(eventWithDates);
  }
  
  saveEvents(events);
  return eventWithDates;
};

/**
 * Delete an event by ID
 * @param {number} eventId ID of the event to delete
 * @returns {boolean} True if event was found and deleted
 */
export const deleteEvent = (eventId) => {
  const events = getEvents();
  const index = events.findIndex(e => e.id === eventId);
  
  if (index >= 0) {
    events.splice(index, 1);
    saveEvents(events);
    return true;
  }
  
  return false;
};

/**
 * Get an event by ID
 * @param {number} eventId ID of the event to retrieve
 * @returns {Object|null} Event object or null if not found
 */
export const getEventById = (eventId) => {
  const events = getEvents();
  return events.find(e => e.id === eventId) || null;
};

/**
 * Helper to ensure event has proper Date objects for start and end
 * @param {Object} event Event object to process
 * @returns {Object} Event with proper Date objects
 */
const ensureEventDates = (event) => {
  try {
    // If start and end are already Date objects or date strings, parse them to ensure they're saved correctly
    if (event.start && event.end) {
      // Check if the dates are valid before setting them
      const startDate = new Date(event.start);
      const endDate = new Date(event.end);
      
      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        console.error('Invalid date detected in event', event);
        throw new Error('Invalid date format');
      }
      
      return {
        ...event,
        start: startDate,
        end: endDate
      };
    }
  } catch (error) {
    console.error('Error processing event dates:', error);
    // Return original event if error occurs
  }
  
  // Return original event if we couldn't process the dates
  return event;
};

/**
 * Event categories with default colors
 */
export const EVENT_CATEGORIES = {
  'meeting': { 
    name: 'Meeting', 
    color: '#3174ad',
    icon: 'users'
  },
  'training': { 
    name: 'Training', 
    color: '#5cb85c',
    icon: 'graduation-cap'
  },
  'blitz': { 
    name: 'Blitz', 
    color: '#f0ad4e',
    icon: 'running'
  },
  'contest': { 
    name: 'Contest', 
    color: '#9c27b0',
    icon: 'trophy'
  },
  'social': { 
    name: 'Social', 
    color: '#ff7043',
    icon: 'glass-cheers'
  },
  'appointment': { 
    name: 'Appointment', 
    color: '#00bcd4',
    icon: 'handshake'
  },
  'other': { 
    name: 'Other', 
    color: '#607d8b',
    icon: 'calendar-day'
  }
};

/**
 * Recurrence patterns
 */
export const RECURRENCE_PATTERNS = {
  'none': 'None',
  'daily': 'Daily',
  'weekly': 'Weekly',
  'biweekly': 'Bi-weekly',
  'monthly': 'Monthly',
  'yearly': 'Yearly'
};

/**
 * Get category info by type
 * @param {string} type The event type
 * @returns {Object} The category info (name, color, icon)
 */
export const getCategoryByType = (type) => {
  const normalizedType = type ? type.toLowerCase() : 'other';
  return EVENT_CATEGORIES[normalizedType] || EVENT_CATEGORIES.other;
};

/**
 * Generate recurring event instances
 * @param {Object} baseEvent The base event template
 * @param {Date} startDate Date to start recurring from
 * @param {Date} endDate End date for recurrence (optional)
 * @param {number} count Number of instances to generate (optional)
 * @returns {Array} Array of event instances
 */
export const generateRecurringEvents = (baseEvent, startDate, endDate, count = 10) => {
  if (!baseEvent || !baseEvent.recurrence || baseEvent.recurrence === 'none') {
    return [baseEvent]; // Not recurring
  }

  const events = [];
  const start = new Date(startDate || baseEvent.start);
  let currentDate = new Date(start);
  const eventDuration = baseEvent.end - baseEvent.start; // Duration in ms
  
  // Default end date is 1 year from start if not provided
  const maxEndDate = endDate || new Date(start.getFullYear() + 1, start.getMonth(), start.getDate());
  
  let instanceCount = 0;
  while ((currentDate <= maxEndDate) && (instanceCount < count)) {
    const eventStart = new Date(currentDate);
    const eventEnd = new Date(eventStart.getTime() + eventDuration);
    
    // Create instance with unique ID but linked to parent
    events.push({
      ...baseEvent,
      id: baseEvent.id + '_' + instanceCount,
      parentEventId: baseEvent.id,
      start: eventStart,
      end: eventEnd,
      isRecurring: true,
      recurrenceIndex: instanceCount
    });
    
    instanceCount++;
    
    // Advance to next occurrence based on pattern
    switch (baseEvent.recurrence) {
      case 'daily':
        currentDate.setDate(currentDate.getDate() + 1);
        break;
      case 'weekly':
        currentDate.setDate(currentDate.getDate() + 7);
        break;
      case 'biweekly':
        currentDate.setDate(currentDate.getDate() + 14);
        break;
      case 'monthly':
        currentDate.setMonth(currentDate.getMonth() + 1);
        break;
      case 'yearly':
        currentDate.setFullYear(currentDate.getFullYear() + 1);
        break;
      default:
        return events; // Unknown pattern, just return what we have
    }
  }
  
  return events;
};

/**
 * Initialize the events store with sample data if empty
 */
export const initializeEvents = () => {
  const events = getEvents();
  
  if (events.length === 0) {
    // Sample events data
    const sampleEvents = [
      {
        id: 1,
        title: 'Weekly Team Meeting',
        start: new Date(2025, 3, 8, 9, 0),
        end: new Date(2025, 3, 8, 10, 0),
        type: 'meeting',
        location: 'Zoom',
        description: 'Weekly team meeting to discuss goals, challenges, and celebrate wins.',
        host: 'Sarah Johnson',
        status: 'upcoming',
        recurrence: 'weekly',
        color: '#3174ad',
        isAllDay: false,
        reminders: [{ type: 'email', time: 15 }]
      },
      {
        id: 2,
        title: 'Sales Training Workshop',
        start: new Date(2025, 3, 10, 14, 0),
        end: new Date(2025, 3, 10, 16, 0),
        type: 'training',
        location: 'Office - Training Room',
        description: 'Advanced sales techniques workshop focused on objection handling and closing strategies.',
        host: 'Michael Rodriguez',
        status: 'upcoming',
        recurrence: 'none',
        color: '#5cb85c',
        isAllDay: false
      },
      {
        id: 3,
        title: 'Monthly Blitz Day',
        start: new Date(2025, 3, 12, 8, 0),
        end: new Date(2025, 3, 12, 18, 0),
        type: 'blitz',
        location: 'North County Territory',
        description: 'Team door-knocking event in the North County area. High potential neighborhood with recent solar installations.',
        host: 'David Wilson',
        status: 'upcoming',
        recurrence: 'monthly',
        color: '#f0ad4e',
        isAllDay: true
      },
      {
        id: 4,
        title: 'Team Building - Bowling Night',
        start: new Date(2025, 3, 15, 18, 0),
        end: new Date(2025, 3, 15, 21, 0),
        type: 'social',
        location: 'Strike Lanes Bowling Alley',
        description: 'Team social event to build camaraderie and have fun outside of work.',
        host: 'HR Team',
        status: 'upcoming',
        recurrence: 'none',
        color: '#ff7043',
        isAllDay: false
      },
      {
        id: 5,
        title: 'Quarterly Sales Contest',
        start: new Date(2025, 3, 1, 0, 0),
        end: new Date(2025, 5, 30, 23, 59),
        type: 'contest',
        location: 'Company-wide',
        description: 'Quarterly contest to incentivize and reward top performers.',
        host: 'Sales Management',
        status: 'upcoming',
        recurrence: 'none',
        color: '#9c27b0',
        isAllDay: true
      }
    ];
    
    saveEvents(sampleEvents);
  }
};