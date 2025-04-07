import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTools, 
  faLink, 
  faSearch, 
  faFilter,
  faExternalLinkAlt,
  faInfoCircle,
  faQuestionCircle,
  faLaptop,
  faMobileAlt,
  faTabletAlt,
  faFileAlt,
  faClock
} from '@fortawesome/free-solid-svg-icons';
import '../assets/styles/techtools.css';

const TechTools = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  // Sample tech tools data
  const tools = [
    {
      id: 1,
      title: 'Sovereign CRM',
      description: 'Our customer relationship management system for tracking leads and sales.',
      category: 'crm',
      platform: ['web', 'mobile'],
      url: 'https://crm.sovereign.com',
      thumbnail: '/assets/images/sovereign-logo.png',
      featured: true
    },
    {
      id: 2,
      title: 'Field App',
      description: 'Mobile app for door-to-door sales, lead capture, and proposal generation.',
      category: 'field',
      platform: ['mobile'],
      url: 'https://apps.apple.com/us/app/sovereign-field',
      androidUrl: 'https://play.google.com/store/apps/details?id=com.sovereign.field',
      thumbnail: '/assets/images/sovereign-logo.png',
      featured: true
    },
    {
      id: 3,
      title: 'Proposal Generator',
      description: 'Create professional solar proposals for potential customers.',
      category: 'sales',
      platform: ['web'],
      url: 'https://proposals.sovereign.com',
      thumbnail: '/assets/images/sovereign-logo.png',
      featured: true
    },
    {
      id: 4,
      title: 'Solar Calculator',
      description: 'Calculate potential solar savings based on location, roof size, and electricity usage.',
      category: 'sales',
      platform: ['web', 'mobile'],
      url: 'https://calculator.sovereign.com',
      thumbnail: '/assets/images/sovereign-logo.png',
      featured: false
    },
    {
      id: 5,
      title: 'Territory Mapper',
      description: 'Map out and manage your sales territories efficiently.',
      category: 'field',
      platform: ['web', 'mobile'],
      url: 'https://territories.sovereign.com',
      thumbnail: '/assets/images/sovereign-logo.png',
      featured: false
    },
    {
      id: 6,
      title: 'Training Portal',
      description: 'Access all training materials, videos, and courses.',
      category: 'training',
      platform: ['web'],
      url: 'https://training.sovereign.com',
      thumbnail: '/assets/images/sovereign-logo.png',
      featured: false
    },
    {
      id: 7,
      title: 'Commission Calculator',
      description: 'Calculate your commission based on sales performance.',
      category: 'sales',
      platform: ['web'],
      url: 'https://commissions.sovereign.com',
      thumbnail: '/assets/images/sovereign-logo.png',
      featured: false
    },
    {
      id: 8,
      title: 'Document Library',
      description: 'Access and download all necessary sales and legal documents.',
      category: 'resource',
      platform: ['web'],
      url: 'https://documents.sovereign.com',
      thumbnail: '/assets/images/sovereign-logo.png',
      featured: false
    }
  ];
  
  // Sample tutorial data
  const tutorials = [
    {
      id: 1,
      title: 'Getting Started with CRM',
      type: 'Video',
      duration: '15 min',
      description: 'Learn the basics of using the Sovereign CRM system.',
      link: '/tech-tools/tutorial/crm'
    },
    {
      id: 2,
      title: 'Field App Complete Guide',
      type: 'PDF',
      pages: 25,
      description: 'Comprehensive guide to using the Field App for door-to-door sales.',
      link: '/tech-tools/tutorial/field-app'
    },
    {
      id: 3,
      title: 'Creating Winning Proposals',
      type: 'Video',
      duration: '22 min',
      description: 'Step-by-step tutorial on creating effective proposals that close deals.',
      link: '/tech-tools/tutorial/proposals'
    },
    {
      id: 4,
      title: 'Solar Calculator Tutorial',
      type: 'Video',
      duration: '12 min',
      description: 'Learn how to effectively demonstrate potential savings to homeowners.',
      link: '/tech-tools/tutorial/calculator'
    }
  ];
  
  // Filter tools based on active category and search term
  const filteredTools = tools.filter(tool => {
    const categoryMatch = activeCategory === 'all' || tool.category === activeCategory;
    const searchMatch = tool.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && searchMatch;
  });
  
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  return (
    <div className="techtools-container">
      <div className="techtools-header">
        <div className="header-left">
          <h1 className="page-title">Tech & Tools</h1>
          <p className="page-description">
            Access all the digital tools and resources you need for solar sales success.
          </p>
        </div>
        <div className="header-right">
          <div className="search-container">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search tools..." 
              className="search-input"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <button className="filter-button" onClick={toggleFilters}>
            <FontAwesomeIcon icon={faFilter} />
            <span>Filter</span>
          </button>
        </div>
      </div>
      
      {showFilters && (
        <div className="filter-panel">
          <div className="filter-section">
            <h3 className="filter-title">Categories</h3>
            <div className="filter-options">
              <label className="filter-option">
                <input 
                  type="radio" 
                  name="category"
                  checked={activeCategory === 'all'}
                  onChange={() => handleCategoryChange('all')}
                />
                <span className="filter-label">All Tools</span>
              </label>
              <label className="filter-option">
                <input 
                  type="radio" 
                  name="category"
                  checked={activeCategory === 'crm'}
                  onChange={() => handleCategoryChange('crm')}
                />
                <span className="filter-label">CRM</span>
              </label>
              <label className="filter-option">
                <input 
                  type="radio" 
                  name="category"
                  checked={activeCategory === 'field'}
                  onChange={() => handleCategoryChange('field')}
                />
                <span className="filter-label">Field Tools</span>
              </label>
              <label className="filter-option">
                <input 
                  type="radio" 
                  name="category"
                  checked={activeCategory === 'sales'}
                  onChange={() => handleCategoryChange('sales')}
                />
                <span className="filter-label">Sales Tools</span>
              </label>
              <label className="filter-option">
                <input 
                  type="radio" 
                  name="category"
                  checked={activeCategory === 'training'}
                  onChange={() => handleCategoryChange('training')}
                />
                <span className="filter-label">Training</span>
              </label>
              <label className="filter-option">
                <input 
                  type="radio" 
                  name="category"
                  checked={activeCategory === 'resource'}
                  onChange={() => handleCategoryChange('resource')}
                />
                <span className="filter-label">Resources</span>
              </label>
            </div>
          </div>
        </div>
      )}
      
      <div className="featured-tools">
        <h2 className="section-title">Featured Tools</h2>
        <div className="tools-grid featured">
          {tools.filter(tool => tool.featured).map(tool => (
            <div className="tool-card featured" key={tool.id}>
              <div className="tool-thumbnail">
                <img src={tool.thumbnail} alt={tool.title} className="tool-image" />
              </div>
              <div className="tool-content">
                <h3 className="tool-title">{tool.title}</h3>
                <p className="tool-description">{tool.description}</p>
                <div className="tool-meta">
                  <div className="tool-category">
                    <span className={`category-tag ${tool.category}`}>
                      {tool.category === 'crm' && 'CRM'}
                      {tool.category === 'field' && 'Field Tool'}
                      {tool.category === 'sales' && 'Sales Tool'}
                      {tool.category === 'training' && 'Training'}
                      {tool.category === 'resource' && 'Resource'}
                    </span>
                  </div>
                  <div className="tool-platforms">
                    {tool.platform.includes('web') && (
                      <span className="platform-icon" title="Web Application">
                        <FontAwesomeIcon icon={faLaptop} />
                      </span>
                    )}
                    {tool.platform.includes('mobile') && (
                      <span className="platform-icon" title="Mobile App">
                        <FontAwesomeIcon icon={faMobileAlt} />
                      </span>
                    )}
                  </div>
                </div>
                <div className="tool-actions">
                  <a href={tool.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    <FontAwesomeIcon icon={faExternalLinkAlt} className="btn-icon" />
                    Open Tool
                  </a>
                  <a href={`/tech-tools/tutorial/${tool.id}`} className="btn btn-outline">
                    <FontAwesomeIcon icon={faQuestionCircle} className="btn-icon" />
                    Tutorial
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="all-tools">
        <div className="section-header">
          <h2 className="section-title">All Tools</h2>
          <div className="section-actions">
            <div className="category-tabs">
              <button 
                className={`category-tab ${activeCategory === 'all' ? 'active' : ''}`}
                onClick={() => handleCategoryChange('all')}
              >
                All
              </button>
              <button 
                className={`category-tab ${activeCategory === 'crm' ? 'active' : ''}`}
                onClick={() => handleCategoryChange('crm')}
              >
                CRM
              </button>
              <button 
                className={`category-tab ${activeCategory === 'field' ? 'active' : ''}`}
                onClick={() => handleCategoryChange('field')}
              >
                Field
              </button>
              <button 
                className={`category-tab ${activeCategory === 'sales' ? 'active' : ''}`}
                onClick={() => handleCategoryChange('sales')}
              >
                Sales
              </button>
              <button 
                className={`category-tab ${activeCategory === 'training' ? 'active' : ''}`}
                onClick={() => handleCategoryChange('training')}
              >
                Training
              </button>
              <button 
                className={`category-tab ${activeCategory === 'resource' ? 'active' : ''}`}
                onClick={() => handleCategoryChange('resource')}
              >
                Resources
              </button>
            </div>
          </div>
        </div>
        
        {filteredTools.length === 0 ? (
          <div className="no-results">
            <FontAwesomeIcon icon={faSearch} className="no-results-icon" />
            <p className="no-results-text">No tools found matching your search criteria.</p>
            <button className="btn btn-outline" onClick={() => {setSearchTerm(''); setActiveCategory('all');}}>
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="tools-grid">
            {filteredTools.map(tool => (
              <div className="tool-card" key={tool.id}>
                <h3 className="tool-title">{tool.title}</h3>
                <p className="tool-description">{tool.description}</p>
                <div className="tool-meta">
                  <div className="tool-category">
                    <span className={`category-tag ${tool.category}`}>
                      {tool.category === 'crm' && 'CRM'}
                      {tool.category === 'field' && 'Field Tool'}
                      {tool.category === 'sales' && 'Sales Tool'}
                      {tool.category === 'training' && 'Training'}
                      {tool.category === 'resource' && 'Resource'}
                    </span>
                  </div>
                  <div className="tool-platforms">
                    {tool.platform.includes('web') && (
                      <span className="platform-icon" title="Web Application">
                        <FontAwesomeIcon icon={faLaptop} />
                      </span>
                    )}
                    {tool.platform.includes('mobile') && (
                      <span className="platform-icon" title="Mobile App">
                        <FontAwesomeIcon icon={faMobileAlt} />
                      </span>
                    )}
                  </div>
                </div>
                <div className="tool-actions">
                  <a href={tool.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                    <FontAwesomeIcon icon={faExternalLinkAlt} className="btn-icon" />
                    Open Tool
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="tutorials-section">
        <h2 className="section-title">Tool Tutorials</h2>
        <div className="tutorials-grid">
          {tutorials.map(tutorial => (
            <div className="tutorial-card" key={tutorial.id}>
              <div className="tutorial-type">
                <FontAwesomeIcon icon={tutorial.type === 'Video' ? faLaptop : faFileAlt} className="tutorial-type-icon" />
                <span className="tutorial-type-text">{tutorial.type}</span>
              </div>
              <h3 className="tutorial-title">{tutorial.title}</h3>
              <p className="tutorial-description">
                {tutorial.description}
              </p>
              <a href={tutorial.link} className="tutorial-link">
                View Tutorial
                <FontAwesomeIcon icon={faExternalLinkAlt} className="link-icon" />
              </a>
              <div className="tutorial-meta">
                {tutorial.duration && (
                  <span className="tutorial-duration">
                    <FontAwesomeIcon icon={faClock} className="meta-icon" />
                    {tutorial.duration}
                  </span>
                )}
                {tutorial.pages && (
                  <span className="tutorial-pages">
                    <FontAwesomeIcon icon={faFileAlt} className="meta-icon" />
                    {tutorial.pages} pages
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="support-section">
        <div className="support-icon">
          <FontAwesomeIcon icon={faInfoCircle} />
        </div>
        <div className="support-content">
          <h3 className="support-title">Need Help?</h3>
          <p className="support-text">
            If you're having trouble with any tools or access, please contact our tech support team.
          </p>
          <div className="support-actions">
            <a href="mailto:support@sovereign.com" className="btn btn-outline">
              Email Support
            </a>
            <a href="tel:5551234567" className="btn btn-outline">
              Call Support: (555) 123-4567
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechTools;