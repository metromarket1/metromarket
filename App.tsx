
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { Dashboard } from './components/Dashboard';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
