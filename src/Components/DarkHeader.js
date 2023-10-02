import React from 'react';
import { Link } from 'react-router-dom';
import './DarkHeader.css';

const DarkHeader = () => {
  return (
    <header className="dark-header">
      <div className="container">
        <h1>My Website</h1>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/cv">CV</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default DarkHeader;
