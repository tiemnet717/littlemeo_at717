// src/Homepage.js
import { useState } from 'react';
import './Homepage.css';
import bgImage from './assets/home.png';
import buttonDefault from './assets/button_getstart.png';
import buttonHover from './assets/button_getstart2.png';
import { useNavigate } from 'react-router-dom';

function Homepage() {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <img src={bgImage} alt="Background" className="home-bg" />
      <img
        src={isHovered ? buttonHover : buttonDefault}
        alt="Get Start"
        className="get-start-btn"
        onClick={() => navigate('/frame')}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
    </div>
  );
}

export default Homepage;
