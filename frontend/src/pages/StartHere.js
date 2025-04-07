import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, 
  faDownload, 
  faListCheck, 
  faComments,
  faInfoCircle,
  faArrowRight,
  faFileAlt,
  faVideo,
  faLink
} from '@fortawesome/free-solid-svg-icons';
import '../assets/styles/starthere.css';

const StartHere = () => {
  const [activeTab, setActiveTab] = useState('apps');
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  return (
    <div className="starthere-container">
      <div className="page-header">
        <h1 className="page-title">Start Here</h1>
        <p className="page-description">
          Welcome to Sovereign! This section will help you get started with everything you need to succeed.
        </p>
      </div>
      
      <div className="starthere-tabs">
        <div 
          className={`starthere-tab ${activeTab === 'apps' ? 'active' : ''}`}
          onClick={() => handleTabChange('apps')}
        >
          <FontAwesomeIcon icon={faDownload} className="starthere-tab-icon" />
          <span>Apps & Access</span>
        </div>
        <div 
          className={`starthere-tab ${activeTab === 'routine' ? 'active' : ''}`}
          onClick={() => handleTabChange('routine')}
        >
          <FontAwesomeIcon icon={faHome} className="starthere-tab-icon" />
          <span>Daily Routine</span>
        </div>
        <div 
          className={`starthere-tab ${activeTab === 'checklist' ? 'active' : ''}`}
          onClick={() => handleTabChange('checklist')}
        >
          <FontAwesomeIcon icon={faListCheck} className="starthere-tab-icon" />
          <span>First Day Checklist</span>
        </div>
        <div 
          className={`starthere-tab ${activeTab === 'pitch' ? 'active' : ''}`}
          onClick={() => handleTabChange('pitch')}
        >
          <FontAwesomeIcon icon={faComments} className="starthere-tab-icon" />
          <span>Pitch / Script</span>
        </div>
      </div>
      
      <div className="starthere-content">
        {activeTab === 'apps' && (
          <div className="starthere-section">
            <h2 className="section-title">Essential Apps & Access</h2>
            <p className="section-description">
              Download and set up these essential tools to get started with Sovereign Solar.
            </p>
            
            <div className="app-grid">
              <div className="app-card">
                <div className="app-icon">
                  <FontAwesomeIcon icon={faHome} />
                </div>
                <div className="app-content">
                  <h3 className="app-title">Sovereign CRM</h3>
                  <p className="app-description">
                    Our customer relationship management system for tracking leads and sales.
                  </p>
                  <div className="app-actions">
                    <a href="https://crm.sovereign.com" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                      Access CRM
                    </a>
                    <a href="/tech-tools" className="btn btn-outline btn-sm">
                      View Tutorial
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="app-card">
                <div className="app-icon">
                  <FontAwesomeIcon icon={faHome} />
                </div>
                <div className="app-content">
                  <h3 className="app-title">Field App</h3>
                  <p className="app-description">
                    Mobile app for door-to-door sales, lead capture, and proposal generation.
                  </p>
                  <div className="app-actions">
                    <a href="#" className="btn btn-primary btn-sm">
                      Download iOS
                    </a>
                    <a href="#" className="btn btn-primary btn-sm">
                      Download Android
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="app-card">
                <div className="app-icon">
                  <FontAwesomeIcon icon={faHome} />
                </div>
                <div className="app-content">
                  <h3 className="app-title">Proposal Tool</h3>
                  <p className="app-description">
                    Create professional solar proposals for potential customers.
                  </p>
                  <div className="app-actions">
                    <a href="https://proposals.sovereign.com" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                      Access Tool
                    </a>
                    <a href="/tech-tools" className="btn btn-outline btn-sm">
                      View Tutorial
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="app-card">
                <div className="app-icon">
                  <FontAwesomeIcon icon={faHome} />
                </div>
                <div className="app-content">
                  <h3 className="app-title">Team Communication</h3>
                  <p className="app-description">
                    Join our team communication channels to stay connected.
                  </p>
                  <div className="app-actions">
                    <a href="https://slack.com" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                      Join Slack
                    </a>
                    <a href="https://zoom.us" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                      Zoom Link
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="starthere-note">
              <div className="note-icon">
                <FontAwesomeIcon icon={faInfoCircle} />
              </div>
              <div className="note-content">
                <h3 className="note-title">Need Help?</h3>
                <p className="note-text">
                  If you're having trouble accessing any of these tools, please contact your team leader or email <a href="mailto:support@sovereign.com">support@sovereign.com</a>.
                </p>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'routine' && (
          <div className="starthere-section">
            <h2 className="section-title">Daily Routine</h2>
            <p className="section-description">
              Follow this recommended daily schedule to maximize your productivity and success.
            </p>
            
            <div className="routine-timeline">
              <div className="routine-item">
                <div className="routine-time">7:00 AM</div>
                <div className="routine-content">
                  <h3 className="routine-title">Morning Preparation</h3>
                  <p className="routine-description">
                    Review your goals for the day, check the team calendar for any meetings, and prepare your materials.
                  </p>
                </div>
              </div>
              
              <div className="routine-item">
                <div className="routine-time">8:00 AM</div>
                <div className="routine-content">
                  <h3 className="routine-title">Team Huddle</h3>
                  <p className="routine-description">
                    Join the daily team huddle to discuss goals, share successes, and address any challenges.
                  </p>
                </div>
              </div>
              
              <div className="routine-item">
                <div className="routine-time">9:00 AM</div>
                <div className="routine-content">
                  <h3 className="routine-title">Field Work - Morning Session</h3>
                  <p className="routine-description">
                    Head to your assigned territory and begin door-to-door prospecting. Focus on quality conversations.
                  </p>
                </div>
              </div>
              
              <div className="routine-item">
                <div className="routine-time">12:00 PM</div>
                <div className="routine-content">
                  <h3 className="routine-title">Lunch Break</h3>
                  <p className="routine-description">
                    Take time to refuel, update your CRM with morning leads, and prepare for the afternoon.
                  </p>
                </div>
              </div>
              
              <div className="routine-item">
                <div className="routine-time">1:00 PM</div>
                <div className="routine-content">
                  <h3 className="routine-title">Field Work - Afternoon Session</h3>
                  <p className="routine-description">
                    Return to the field for afternoon prospecting. This is often the most productive time for finding homeowners.
                  </p>
                </div>
              </div>
              
              <div className="routine-item">
                <div className="routine-time">5:00 PM</div>
                <div className="routine-content">
                  <h3 className="routine-title">Evening Appointments</h3>
                  <p className="routine-description">
                    Conduct scheduled appointments with potential customers. Be prepared with your presentation materials.
                  </p>
                </div>
              </div>
              
              <div className="routine-item">
                <div className="routine-time">7:00 PM</div>
                <div className="routine-content">
                  <h3 className="routine-title">Daily Wrap-up</h3>
                  <p className="routine-description">
                    Update your CRM with all leads and appointments, schedule follow-ups, and plan for tomorrow.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="starthere-note">
              <div className="note-icon">
                <FontAwesomeIcon icon={faInfoCircle} />
              </div>
              <div className="note-content">
                <h3 className="note-title">Pro Tip</h3>
                <p className="note-text">
                  Consistency is key to success in solar sales. Stick to your daily routine and track your metrics to continuously improve your performance.
                </p>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'checklist' && (
          <div className="starthere-section">
            <h2 className="section-title">First Day Checklist</h2>
            <p className="section-description">
              Complete these essential tasks on your first day to set yourself up for success.
            </p>
            
            <div className="checklist">
              <div className="checklist-item">
                <div className="checklist-checkbox">
                  <input type="checkbox" id="check1" />
                  <label htmlFor="check1"></label>
                </div>
                <div className="checklist-content">
                  <h3 className="checklist-title">Set up your Sovereign account</h3>
                  <p className="checklist-description">
                    Activate your account and set your password for the rep portal.
                  </p>
                </div>
              </div>
              
              <div className="checklist-item">
                <div className="checklist-checkbox">
                  <input type="checkbox" id="check2" />
                  <label htmlFor="check2"></label>
                </div>
                <div className="checklist-content">
                  <h3 className="checklist-title">Download required apps</h3>
                  <p className="checklist-description">
                    Install the Field App, CRM mobile app, and team communication tools.
                  </p>
                </div>
              </div>
              
              <div className="checklist-item">
                <div className="checklist-checkbox">
                  <input type="checkbox" id="check3" />
                  <label htmlFor="check3"></label>
                </div>
                <div className="checklist-content">
                  <h3 className="checklist-title">Complete onboarding training</h3>
                  <p className="checklist-description">
                    Watch the introductory videos in the Training Library section.
                  </p>
                </div>
              </div>
              
              <div className="checklist-item">
                <div className="checklist-checkbox">
                  <input type="checkbox" id="check4" />
                  <label htmlFor="check4"></label>
                </div>
                <div className="checklist-content">
                  <h3 className="checklist-title">Review the sales pitch</h3>
                  <p className="checklist-description">
                    Familiarize yourself with the standard sales pitch and key talking points.
                  </p>
                </div>
              </div>
              
              <div className="checklist-item">
                <div className="checklist-checkbox">
                  <input type="checkbox" id="check5" />
                  <label htmlFor="check5"></label>
                </div>
                <div className="checklist-content">
                  <h3 className="checklist-title">Meet your team leader</h3>
                  <p className="checklist-description">
                    Schedule a one-on-one meeting with your team leader to discuss goals and expectations.
                  </p>
                </div>
              </div>
              
              <div className="checklist-item">
                <div className="checklist-checkbox">
                  <input type="checkbox" id="check6" />
                  <label htmlFor="check6"></label>
                </div>
                <div className="checklist-content">
                  <h3 className="checklist-title">Join team communication channels</h3>
                  <p className="checklist-description">
                    Join the Slack channels and WhatsApp groups for team communication.
                  </p>
                </div>
              </div>
              
              <div className="checklist-item">
                <div className="checklist-checkbox">
                  <input type="checkbox" id="check7" />
                  <label htmlFor="check7"></label>
                </div>
                <div className="checklist-content">
                  <h3 className="checklist-title">Review territory map</h3>
                  <p className="checklist-description">
                    Familiarize yourself with your assigned sales territory and target neighborhoods.
                  </p>
                </div>
              </div>
              
              <div className="checklist-item">
                <div className="checklist-checkbox">
                  <input type="checkbox" id="check8" />
                  <label htmlFor="check8"></label>
                </div>
                <div className="checklist-content">
                  <h3 className="checklist-title">Set up your CRM profile</h3>
                  <p className="checklist-description">
                    Complete your profile in the CRM system and learn how to log leads.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="starthere-note">
              <div className="note-icon">
                <FontAwesomeIcon icon={faInfoCircle} />
              </div>
              <div className="note-content">
                <h3 className="note-title">First Day Support</h3>
                <p className="note-text">
                  Your team leader will be available throughout your first day to answer questions and provide assistance. Don't hesitate to reach out!
                </p>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'pitch' && (
          <div className="starthere-section">
            <h2 className="section-title">Solar Sales Pitch Guide</h2>
            <p className="section-description">
              Use this standardized pitch as a starting point for your conversations with potential customers.
            </p>
            
            <div className="pitch-sections">
              <div className="pitch-section">
                <h3 className="pitch-section-title">1. Introduction</h3>
                <div className="pitch-content">
                  <p className="pitch-paragraph">
                    "Hi, my name is [Your Name] with Sovereign Solar. We're helping homeowners in [Neighborhood/Area] reduce their electricity bills and switch to clean, renewable energy. Have you ever considered going solar for your home?"
                  </p>
                  <div className="pitch-tips">
                    <h4 className="tips-title">Tips:</h4>
                    <ul className="tips-list">
                      <li>Be confident and friendly</li>
                      <li>Mention if you're working with neighbors on their solar projects</li>
                      <li>Keep the introduction brief - aim to engage, not overwhelm</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="pitch-section">
                <h3 className="pitch-section-title">2. Discovery Questions</h3>
                <div className="pitch-content">
                  <p className="pitch-paragraph">
                    "May I ask what your average monthly electricity bill is? How long have you been in your home? Do you plan to stay here for the next few years?"
                  </p>
                  <div className="pitch-tips">
                    <h4 className="tips-title">Tips:</h4>
                    <ul className="tips-list">
                      <li>Listen actively and take notes</li>
                      <li>Qualify the prospect during this stage</li>
                      <li>Show genuine interest in their current situation</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="pitch-section">
                <h3 className="pitch-section-title">3. Value Proposition</h3>
                <div className="pitch-content">
                  <p className="pitch-paragraph">
                    "Based on what you've shared, I believe we could help you save approximately [X%] on your electricity bills with solar. Our customers typically see savings of $[Amount] per month, which adds up to $[Amount] over 25 years."
                  </p>
                  <div className="pitch-tips">
                    <h4 className="tips-title">Tips:</h4>
                    <ul className="tips-list">
                      <li>Use the solar calculator app to show potential savings</li>
                      <li>Focus on long-term financial benefits</li>
                      <li>Emphasize the environmental impact as well</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="pitch-section">
                <h3 className="pitch-section-title">4. Handling Objections</h3>
                <div className="pitch-content">
                  <h4 className="objection-title">"It's too expensive."</h4>
                  <p className="pitch-paragraph">
                    "I understand your concern about the cost. The great news is that with our financing options, you can often start saving immediately with no money down. Your monthly solar payment is typically less than your current electric bill, so you're saving from day one."
                  </p>
                  
                  <h4 className="objection-title">"I need to think about it."</h4>
                  <p className="pitch-paragraph">
                    "I completely understand. This is an important decision. What specific aspects would you like more time to consider? I'd be happy to provide any additional information that would help you make your decision."
                  </p>
                  
                  <h4 className="objection-title">"What about when it's cloudy?"</h4>
                  <p className="pitch-paragraph">
                    "Great question! Solar panels still generate electricity on cloudy days, just at a reduced rate. Our systems are designed with your local weather patterns in mind, and we account for cloudy days in our production estimates. Plus, with net metering, excess energy generated on sunny days is credited to your account for use when production is lower."
                  </p>
                </div>
              </div>
              
              <div className="pitch-section">
                <h3 className="pitch-section-title">5. Closing</h3>
                <div className="pitch-content">
                  <p className="pitch-paragraph">
                    "Based on our conversation and the potential savings we've identified, would you be interested in scheduling a free, no-obligation consultation where we can create a custom solar proposal for your home? We can meet [suggest specific time/date options]."
                  </p>
                  <div className="pitch-tips">
                    <h4 className="tips-title">Tips:</h4>
                    <ul className="tips-list">
                      <li>Always ask for the appointment</li>
                      <li>Provide clear next steps</li>
                      <li>Express gratitude for their time regardless of outcome</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="starthere-note">
              <div className="note-icon">
                <FontAwesomeIcon icon={faInfoCircle} />
              </div>
              <div className="note-content">
                <h3 className="note-title">Resources</h3>
                <p className="note-text">
                  For more detailed scripts and roleplay exercises, visit the Training Library section. Practice with team members to refine your delivery and confidence.
                </p>
                <div className="note-links">
                  <a href="/training-library" className="resource-link">
                    <FontAwesomeIcon icon={faVideo} className="link-icon" />
                    Pitch Training Videos
                  </a>
                  <a href="/resources/pitch-guide.pdf" className="resource-link">
                    <FontAwesomeIcon icon={faFileAlt} className="link-icon" />
                    Downloadable Pitch Guide
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StartHere;