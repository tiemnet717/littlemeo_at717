// src/Framepage.js
import './Framepage.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import bgImage from './assets/pick_frame.png';
import buttonNext from './assets/button_takingpicture.png';
import buttonNextHover from './assets/button_takingpicture2.png';

import rockstarText from './assets/rockstar_text.png';
import wwClubText from './assets/ww_club.png';
import previousEventText from './assets/previous_event.png';

import frame1Icon from './assets/cat_rockstar.png';
import frame1Preview from './assets/my cat is a rockstar.png';
import frame2Icon from './assets/cat_1.png';
import frame2Preview from './assets/1.png';
import frame3Icon from './assets/cat_2.png';
import frame3Preview from './assets/2.png';
import frame4Icon from './assets/cat_3.png';
import frame4Preview from './assets/4.png';
import frame5Icon from './assets/cat_4.png';
import frame5Preview from './assets/3.png';
import frame6Icon from './assets/evmmww.png';
import frame6Preview from './assets/evmmww_frame.png';
import frame7Icon from './assets/tamagyuchi.png';
import frame7Preview from './assets/tamagyuchi_frame.png';

import backArrow from './assets/red_muiten.png';

function Framepage() {
  const [selected, setSelected] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const frames = [
    { icon: frame1Icon, preview: frame1Preview, key: 'cat_rockstar' },
    { icon: frame2Icon, preview: frame2Preview, key: 'cat_1' },
    { icon: frame3Icon, preview: frame3Preview, key: 'cat_2' },
    { icon: frame4Icon, preview: frame4Preview, key: 'cat_3' },
    { icon: frame5Icon, preview: frame5Preview, key: 'cat_4' },
    { icon: frame6Icon, preview: frame6Preview, key: 'evmmww' },
    { icon: frame7Icon, preview: frame7Preview, key: 'tamagyuchi' },
  ];

  const handleNext = () => {
    navigate('/capture', { state: { selectedFrame: frames[selected].key } });
  };

  return (
    <div className="frame-page">
      <img src={bgImage} className="bg" alt="background" />
      <img src={backArrow} alt="back" className="back-arrow" onClick={() => navigate('/')} />

      {/* Title PNGs */}
      <img src={rockstarText} className="text-rockstar title-img" alt="rockstar" />
      <img src={wwClubText} className="text-wwclub title-img" alt="wwclub" />
      <img src={previousEventText} className="text-previous title-img" alt="previous" />

      {/* Fixed positioned icons */}
      <img
        src={frame1Icon}
        className={`icon icon-cat-rockstar ${selected === 0 ? 'selected' : ''}`}
        alt="Frame 1"
        onClick={() => setSelected(0)}
      />
      <img
        src={frame2Icon}
        className={`icon icon-cat-1 ${selected === 1 ? 'selected' : ''}`}
        alt="Frame 2"
        onClick={() => setSelected(1)}
      />
      <img
        src={frame3Icon}
        className={`icon icon-cat-2 ${selected === 2 ? 'selected' : ''}`}
        alt="Frame 3"
        onClick={() => setSelected(2)}
      />
      <img
        src={frame4Icon}
        className={`icon icon-cat-3 ${selected === 3 ? 'selected' : ''}`}
        alt="Frame 4"
        onClick={() => setSelected(3)}
      />
      <img
        src={frame5Icon}
        className={`icon icon-cat-4 ${selected === 4 ? 'selected' : ''}`}
        alt="Frame 5"
        onClick={() => setSelected(4)}
      />
      <img
        src={frame6Icon}
        className={`icon icon-evmmww ${selected === 5 ? 'selected' : ''}`}
        alt="Frame 6"
        onClick={() => setSelected(5)}
      />
      <img
        src={frame7Icon}
        className={`icon icon-tamagyuchi ${selected === 6 ? 'selected' : ''}`}
        alt="Frame 7"
        onClick={() => setSelected(6)}
      />

      {/* Preview box */}
      <div className="preview-box">
        <img src={frames[selected].preview} alt="Preview" className="preview-img" />
      </div>

      {/* Next button */}
      <img
        src={isHovered ? buttonNextHover : buttonNext}
        className="next-btn"
        alt="next"
        onClick={handleNext}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />

      {/* Footer */}
      <div className="footer-credit">
        For Wonwoo's lovers (CLUB) ㅡ Small project for Wonwoo's 29th Birthday! ♡ <br />
        Designed & Web developed by{' '}
        <a href="https://www.facebook.com/meonho.at717" className="underline" target="_blank" rel="noopener noreferrer">
          @tiemnet717
        </a>.
      </div>
    </div>
  );
}

export default Framepage;
