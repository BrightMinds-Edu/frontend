import React from 'react';
import './navBar.scss';

const NavBar: React.FC = () => {
  return (
    <nav className="nav-bar">
      <div className="logo">Bright Minds</div>
      <ul className="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="/add-question">Add Question</a></li>
      <li><a href="/quiz-list">Quizzes</a></li>
      </ul>
    </nav>
  );
};

export default NavBar;
