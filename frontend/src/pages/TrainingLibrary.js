import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGraduationCap, 
  faVideo, 
  faFileAlt, 
  faSearch,
  faFilter,
  faInfoCircle,
  faDownload,
  faPlay,
  faBook,
  faTags
} from '@fortawesome/free-solid-svg-icons';
import '../assets/styles/traininglibrary.css';

const TrainingLibrary = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  // Sample training data
  const trainings = [
    {
      id: 1,
      title: 'Solar 101: Basics of Solar Energy',
      description: 'Learn the fundamentals of solar energy, how solar panels work, and the benefits for homeowners.',
      type: 'video',
      category: 'solar',
      duration: '18 min',
      date: '2025-03-15',
      thumbnail: '/assets/images/training-solar101.jpg',
      featured: true
    },
    {
      id: 2,
      title: 'Objection Handling Masterclass',
      description: 'Master the art of handling common objections in solar sales with proven techniques and scripts.',
      type: 'pdf',
      category: 'sales',
      pages: 24,
      date: '2025-03-10',
      thumbnail: '/assets/images/training-objections.jpg',
      featured: true
    },
    {
      id: 3,
      title: 'Pitch Structure and Flow',
      description: 'Learn the perfect structure for your solar sales pitch to maximize conversions.',
      type: 'video',
      category: 'sales',
      duration: '22 min',
      date: '2025-03-05',
      thumbnail: '/assets/images/training-pitch.jpg'
    },
    {
      id: 4,
      title: 'D2D Sales Mentality',
      description: 'Develop the right mindset for door-to-door sales success and overcome mental barriers.',
      type: 'pdf',
      category: 'mindset',
      pages: 18,
      date: '2025-02-28',
      thumbnail: '/assets/images/training-mindset.jpg'
    },
    {
      id: 5,
      title: 'Closing Techniques for Solar Sales',
      description: 'Advanced closing strategies specifically tailored for the solar industry.',
      type: 'video',
      category: 'sales',
      duration: '25 min',
      date: '2025-02-20',
      thumbnail: '/assets/images/training-closing.jpg'
    },
    {
      id: 6,
      title: 'Solar Savings Calculator Guide',
      description: 'Learn how to effectively demonstrate potential savings to homeowners using our calculator tools.',
      type: 'pdf',
      category: 'tools',
      pages: 12,
      date: '2025-02-15',
      thumbnail: '/assets/images/training-calculator.jpg'
    },
    {
      id: 7,
      title: 'Discovery Questions for Homeowners',
      description: 'Master the art of asking the right questions to qualify leads and personalize your pitch.',
      type: 'pdf',
      category: 'sales',
      pages: 15,
      date: '2025-02-10',
      thumbnail: '/assets/images/training-discovery.jpg'
    },
    {
      id: 8,
      title: 'Understanding Solar Tax Incentives',
      description: 'Comprehensive guide to current solar tax credits, rebates, and incentives for homeowners.',
      type: 'video',
      category: 'solar',
      duration: '20 min',
      date: '2025-02-05',
      thumbnail: '/assets/images/training-incentives.jpg'
    }
  ];
  
  // Filter trainings based on active category and search term
  const filteredTrainings = trainings.filter(training => {
    const matchesCategory = activeCategory === 'all' || training.category === activeCategory;
    const matchesSearch = training.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         training.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  // Get featured trainings
  const featuredTrainings = trainings.filter(training => training.featured);
  
  return (
    <div className="training-container">
      <div className="page-header">
        <h1 className="page-title">Training Library</h1>
        <p className="page-description">
          Access our comprehensive training materials to enhance your solar sales skills and knowledge.
        </p>
      </div>
      
      <div className="training-search-bar">
        <div className="search-input-wrapper">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search for training materials..."
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
      
      {showFilters && (
        <div className="training-filters">
          <div className="filter-group">
            <h3 className="filter-title">Categories</h3>
            <div className="filter-options">
              <button 
                className={`filter-option ${activeCategory === 'all' ? 'active' : ''}`}
                onClick={() => setActiveCategory('all')}
              >
                All
              </button>
              <button 
                className={`filter-option ${activeCategory === 'sales' ? 'active' : ''}`}
                onClick={() => setActiveCategory('sales')}
              >
                Sales Techniques
              </button>
              <button 
                className={`filter-option ${activeCategory === 'solar' ? 'active' : ''}`}
                onClick={() => setActiveCategory('solar')}
              >
                Solar Knowledge
              </button>
              <button 
                className={`filter-option ${activeCategory === 'mindset' ? 'active' : ''}`}
                onClick={() => setActiveCategory('mindset')}
              >
                Mindset & Motivation
              </button>
              <button 
                className={`filter-option ${activeCategory === 'tools' ? 'active' : ''}`}
                onClick={() => setActiveCategory('tools')}
              >
                Tools & Resources
              </button>
            </div>
          </div>
          
          <div className="filter-group">
            <h3 className="filter-title">Content Type</h3>
            <div className="filter-options">
              <button className="filter-option active">All</button>
              <button className="filter-option">Videos</button>
              <button className="filter-option">Documents</button>
              <button className="filter-option">Interactive</button>
            </div>
          </div>
        </div>
      )}
      
      {featuredTrainings.length > 0 && searchTerm === '' && activeCategory === 'all' && (
        <div className="featured-trainings">
          <h2 className="section-title">Featured Training</h2>
          <div className="featured-grid">
            {featuredTrainings.map(training => (
              <div className="featured-card" key={training.id}>
                <div className="featured-thumbnail">
                  <div className="featured-badge">Featured</div>
                  <img src={training.thumbnail || '/assets/images/default-training.jpg'} alt={training.title} />
                  {training.type === 'video' && (
                    <div className="play-button">
                      <FontAwesomeIcon icon={faPlay} />
                    </div>
                  )}
                </div>
                <div className="featured-content">
                  <h3 className="featured-title">{training.title}</h3>
                  <p className="featured-description">{training.description}</p>
                  <div className="featured-meta">
                    <div className="featured-type">
                      <FontAwesomeIcon 
                        icon={training.type === 'video' ? faVideo : faFileAlt} 
                        className="featured-type-icon" 
                      />
                      <span>{training.type === 'video' ? 'Video' : 'Document'}</span>
                    </div>
                    <div className="featured-duration">
                      {training.type === 'video' ? training.duration : `${training.pages} pages`}
                    </div>
                  </div>
                  <div className="featured-actions">
                    <button className="btn btn-primary">
                      {training.type === 'video' ? (
                        <>
                          <FontAwesomeIcon icon={faPlay} className="btn-icon" />
                          Watch Now
                        </>
                      ) : (
                        <>
                          <FontAwesomeIcon icon={faDownload} className="btn-icon" />
                          Download
                        </>
                      )}
                    </button>
                    <button className="btn btn-outline">Save for Later</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="training-categories">
        <h2 className="section-title">
          {activeCategory === 'all' ? 'All Training Materials' : 
           activeCategory === 'sales' ? 'Sales Techniques' :
           activeCategory === 'solar' ? 'Solar Knowledge' :
           activeCategory === 'mindset' ? 'Mindset & Motivation' :
           activeCategory === 'tools' ? 'Tools & Resources' : 'Training Materials'}
        </h2>
        
        {filteredTrainings.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">
              <FontAwesomeIcon icon={faSearch} />
            </div>
            <h3 className="empty-state-title">No training materials found</h3>
            <p className="empty-state-description">
              We couldn't find any training materials matching your search criteria. Try adjusting your filters or search term.
            </p>
            <button 
              className="btn btn-primary"
              onClick={() => {
                setSearchTerm('');
                setActiveCategory('all');
              }}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="training-grid">
            {filteredTrainings.map(training => (
              <div className="training-card" key={training.id}>
                <div className="training-thumbnail">
                  <img src={training.thumbnail || '/assets/images/default-training.jpg'} alt={training.title} />
                  {training.type === 'video' && (
                    <div className="play-button">
                      <FontAwesomeIcon icon={faPlay} />
                    </div>
                  )}
                </div>
                <div className="training-content">
                  <div className="training-category">
                    <span className={`category-badge ${training.category}`}>
                      {training.category === 'sales' ? 'Sales Techniques' :
                       training.category === 'solar' ? 'Solar Knowledge' :
                       training.category === 'mindset' ? 'Mindset & Motivation' :
                       training.category === 'tools' ? 'Tools & Resources' : training.category}
                    </span>
                  </div>
                  <h3 className="training-title">{training.title}</h3>
                  <p className="training-description">{training.description}</p>
                  <div className="training-meta">
                    <div className="training-type">
                      <FontAwesomeIcon 
                        icon={training.type === 'video' ? faVideo : faFileAlt} 
                        className="training-type-icon" 
                      />
                      <span>{training.type === 'video' ? 'Video' : 'Document'}</span>
                    </div>
                    <div className="training-duration">
                      {training.type === 'video' ? training.duration : `${training.pages} pages`}
                    </div>
                  </div>
                </div>
                <div className="training-actions">
                  <button className="btn btn-primary btn-sm">
                    {training.type === 'video' ? (
                      <>
                        <FontAwesomeIcon icon={faPlay} className="btn-icon" />
                        Watch
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faDownload} className="btn-icon" />
                        Download
                      </>
                    )}
                  </button>
                  <button className="btn btn-outline btn-sm">
                    <FontAwesomeIcon icon={faTags} className="btn-icon" />
                    Save
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="training-help">
        <div className="help-icon">
          <FontAwesomeIcon icon={faInfoCircle} />
        </div>
        <div className="help-content">
          <h3 className="help-title">Need Specific Training?</h3>
          <p className="help-text">
            If you can't find what you're looking for, or have suggestions for new training materials, please contact your team leader or email <a href="mailto:training@sovereign.com">training@sovereign.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrainingLibrary;
