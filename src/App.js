import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DarkHeader from './Components/DarkHeader';

// Your page components
import Home from './Pages/Home';
import CVPage from './Pages/CV';

function App() {
  return (
    <Router>
      <DarkHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cv" element={<CVPage />} />
      </Routes>
    </Router>
  );
}

export default App;
