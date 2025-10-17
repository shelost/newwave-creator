import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreatorLandingPage from './components/CreatorLandingPage';
import Manifesto from './components/Manifesto';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<CreatorLandingPage />} />
          <Route path="/manifesto" element={<Manifesto />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
