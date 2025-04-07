import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/auth/PrivateRoute';
import Header from './components/layout/Header';
import MobileNav from './components/layout/MobileNav';
import Footer from './components/layout/Footer';
import Breadcrumbs from './components/layout/Breadcrumbs';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import StartHere from './pages/StartHere';
import TrainingLibrary from './pages/TrainingLibrary';
import TechTools from './pages/TechTools';
import TeamCalendar from './pages/TeamCalendar';
import Leaderboard from './pages/Leaderboard';
import Contests from './pages/Contests';
import Admin from './pages/Admin';
import './assets/styles/main.css';

// Import FontAwesome library
import { library } from '@fortawesome/fontawesome-svg-core';
import { 
  faArrowRight,
  faArrowUp,
  faArrowDown
} from '@fortawesome/free-solid-svg-icons';

// Add icons to the library for use by string name
library.add(faArrowRight, faArrowUp, faArrowDown);

const App = () => {
  const [user, setUser] = useState(null);
  
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            <Route path="/*" element={
              <PrivateRoute>
                <div className="app-container">
                  <Header onLogout={() => {}} />
                  <main>
                    <div className="content-container">
                      <Breadcrumbs />
                      <Routes>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/start-here" element={<StartHere />} />
                        <Route path="/training-library" element={<TrainingLibrary />} />
                        <Route path="/tech-tools" element={<TechTools />} />
                        <Route path="/team-calendar" element={<TeamCalendar />} />
                        <Route path="/leaderboard" element={<Leaderboard />} />
                        <Route path="/contests" element={<Contests />} />
                        <Route path="/admin" element={<Admin />} />
                        <Route path="/profile" element={<div>Profile Page - Coming Soon</div>} />
                        <Route path="/settings" element={<div>Settings Page - Coming Soon</div>} />
                      </Routes>
                    </div>
                  </main>
                  <Footer />
                  <MobileNav />
                </div>
              </PrivateRoute>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
