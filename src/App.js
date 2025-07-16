// src/App.js
import { Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';
import Framepage from './Framepage';
import CapturePage from './CapturePage';

import './CapturePage.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/frame" element={<Framepage />} />
      <Route path="/capture" element={<CapturePage />} />
    </Routes>
  );
}

export default App;
