import React from 'react';
import { useLocation } from 'react-router-dom';
import './navBar.scss';

const NavBar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="nav-bar">
      <div className="logo">Bright Minds</div>
      {location.pathname !== '/login' && (
        <ul className="nav-links">
          <li><a href="/home">Home</a></li>
          <li><a href="/add-question">Add Question</a></li>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
