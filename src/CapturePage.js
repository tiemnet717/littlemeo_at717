import { useRef, useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Webcam from 'react-webcam';
import './CapturePage.css';

// Assets
import bg from './assets/pick_frame.png';
import shutterSound from './assets/camera_shutter.wav';

import rock1 from './assets/rock_1.png';
import rock2 from './assets/rock_2.png';
import rock3 from './assets/rock_3.png';
import rock4 from './assets/rock_4.png';
import c1_1 from './assets/c1.1.png'; import c1_2 from './assets/c1.2.png'; import c1_3 from './assets/c1.3.png'; import c1_4 from './assets/c1.4.png';
import c2_1 from './assets/c2.1.png'; import c2_2 from './assets/c2.2.png'; import c2_3 from './assets/c2.3.png'; import c2_4 from './assets/c2.4.png';
import c3_1 from './assets/c3.1.png'; import c3_2 from './assets/c3.2.png'; import c3_3 from './assets/c3.3.png'; import c3_4 from './assets/c3.4.png';
import c4_1 from './assets/c4.1.png'; import c4_2 from './assets/c4.2.png'; import c4_3 from './assets/c4.3.png'; import c4_4 from './assets/c4.4.png';
import evmmww1 from './assets/evmmww1.png'; import evmmww2 from './assets/evmmww2.png'; import evmmww3 from './assets/evmmww3.png'; import evmmww4 from './assets/evmmww4.png';
import tamagyuchi1 from './assets/tamagyuchi1.png'; import tamagyuchi2 from './assets/tamagyuchi2.png'; import tamagyuchi3 from './assets/tamagyuchi3.png'; import tamagyuchi4 from './assets/tamagyuchi4.png';

import right_rockstar from './assets/my cat is a rockstar_1.png';
import right_c1 from './assets/1.1.png'; import right_c2 from './assets/2.1.png'; import right_c3 from './assets/3.1.png'; import right_c4 from './assets/4.1.png';
import right_evmmww from './assets/evmmww_frame1.png';
import right_tamagyuchi from './assets/tamagyuchi_frame1.png';

import deleteIcon from './assets/button_delete.png';
import backArrow from './assets/red_muiten.png';
import downloadIcon from './assets/button_download.png';
import downloadIconHover from './assets/button_download2.png';
import countdownLabel from './assets/countdown.png';
import clickIcon from './assets/click_to.png';
import clickIconHover from './assets/click_to2.png';
import autoIcon from './assets/auto.png';
import autoIconHover from './assets/auto2.png';
import retakeIcon from './assets/retake.png';
import retakeIconHover from './assets/retake2.png';
import filterTitle from './assets/filter.png';
import filterBg from './assets/filter_bg.png';
import filterNormal from './assets/normal.png';
import filterCold from './assets/cold.png';
import filterWarm from './assets/warm.png';

// ✅ FIX: Đưa filterStyles ra ngoài component để tránh warning của React Hook ESLint
const filterStyles = {
  normal: 'brightness(1.25) saturate(1.5) contrast(1.05)',
  cold: 'brightness(1.05) saturate(1.1) contrast(1.02) hue-rotate(-10deg)',
  warm: 'brightness(1.05) saturate(1.1) contrast(1.02) hue-rotate(10deg)',
};

function CapturePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const webcamRef = useRef(null);
  const shutterAudio = useRef(new Audio(shutterSound));

  const selectedFrame = location.state?.selectedFrame || 'cat_rockstar';

  const [photos, setPhotos] = useState([]);
  const [previewStep, setPreviewStep] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState('normal');
  const [delay, setDelay] = useState(3);
  const [countdown, setCountdown] = useState(null);
  const [isAuto, setIsAuto] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(null);
  const [isDownloadHovered, setIsDownloadHovered] = useState(false);

  const frameSets = {
    cat_rockstar: [rock1, rock2, rock3, rock4],
    cat_1: [c1_1, c1_2, c1_3, c1_4],
    cat_2: [c2_1, c2_2, c2_3, c2_4],
    cat_3: [c3_1, c3_2, c3_3, c3_4],
    cat_4: [c4_1, c4_2, c4_3, c4_4],
    evmmww: [evmmww1, evmmww2, evmmww3, evmmww4],
    tamagyuchi: [tamagyuchi1, tamagyuchi2, tamagyuchi3, tamagyuchi4],
  };

  const frameRightSet = {
    cat_rockstar: right_rockstar,
    cat_1: right_c1,
    cat_2: right_c2,
    cat_3: right_c3,
    cat_4: right_c4,
    evmmww: right_evmmww,
    tamagyuchi: right_tamagyuchi,
  };

  const currentFrameSet = frameSets[selectedFrame] || frameSets.cat_rockstar;
  const frameRight = frameRightSet[selectedFrame] || right_rockstar;

  useEffect(() => {
    if (isAuto && previewStep < 4) {
      setCountdown(delay);
    }
  }, [isAuto, previewStep, delay]);

  const capturePhoto = useCallback(() => {
    if (!webcamRef.current || previewStep >= 4) return;

    shutterAudio.current.currentTime = 0;
    shutterAudio.current.play();

    const video = webcamRef.current.video;
    const canvas = document.createElement('canvas');
    const previewWidth = 800;
    const previewHeight = 600;

    canvas.width = previewWidth;
    canvas.height = previewHeight;

    const ctx = canvas.getContext('2d');

    const videoAspectRatio = video.videoWidth / video.videoHeight;
    const targetAspectRatio = previewWidth / previewHeight;

    let sx, sy, sw, sh;
    if (videoAspectRatio > targetAspectRatio) {
      sh = video.videoHeight;
      sw = sh * targetAspectRatio;
      sx = (video.videoWidth - sw) / 2;
      sy = 0;
    } else {
      sw = video.videoWidth;
      sh = sw / targetAspectRatio;
      sx = 0;
      sy = (video.videoHeight - sh) / 2;
    }

    ctx.filter = filterStyles[selectedFilter] || 'none';
    ctx.drawImage(video, sx, sy, sw, sh, 0, 0, previewWidth, previewHeight);

    const imageDataUrl = canvas.toDataURL('image/png');
    const newPhotos = [...photos];
    newPhotos[previewStep] = imageDataUrl;
    setPhotos(newPhotos);
    setPreviewStep(previewStep + 1);
  }, [photos, previewStep, selectedFilter]);

  useEffect(() => {
    if (countdown === null || countdown <= 0) return;
    const timer = setTimeout(() => {
      if (countdown === 1) {
        capturePhoto();
        setCountdown(null);
      } else {
        setCountdown(countdown - 1);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [countdown, capturePhoto]);

  const deletePhoto = (index) => {
    const newPhotos = [...photos];
    newPhotos.splice(index, 1);
    setPhotos(newPhotos);
    setPreviewStep(Math.max(index, 0));
  };

  const retakeAll = () => {
    setPhotos([]);
    setPreviewStep(0);
    setIsAuto(false);
    setCountdown(null);
  };

  const downloadFinalImage = async () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 1800;
    const imageElements = [];
    const frameImg = new Image();
    frameImg.crossOrigin = 'anonymous';
    frameImg.src = frameRight;

    const loadPhotos = photos.map((src, index) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          imageElements[index] = img;
          resolve();
        };
        img.src = src;
      });
    });

    const positions = [
      { x: 30, y: 201, width: 543, height: 359 },
      { x: 30, y: 601, width: 543, height: 359 },
      { x: 30, y: 1001, width: 543, height: 359 },
      { x: 30, y: 1401, width: 543, height: 359 },
    ];

    await Promise.all([...loadPhotos, new Promise((r) => (frameImg.onload = r))]);

    imageElements.forEach((img, i) => {
      const slot = positions[i];
      const imgRatio = img.width / img.height;
      const slotRatio = slot.width / slot.height;
      let drawWidth, drawHeight;
      if (imgRatio > slotRatio) {
        drawHeight = slot.height;
        drawWidth = drawHeight * imgRatio;
      } else {
        drawWidth = slot.width;
        drawHeight = drawWidth / imgRatio;
      }
      const dx = slot.x + (slot.width - drawWidth) / 2;
      const dy = slot.y + (slot.height - drawHeight) / 2;
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = img.width;
      tempCanvas.height = img.height;
      const tempCtx = tempCanvas.getContext('2d');
      tempCtx.filter = filterStyles[selectedFilter] || 'none';
      tempCtx.drawImage(img, 0, 0);
      ctx.drawImage(tempCanvas, dx, dy, drawWidth, drawHeight);
    });

    ctx.drawImage(frameImg, 0, 0, 600, 1800);
    const finalImage = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = finalImage;
    link.download = 'littlemeo_at717.png';
    link.click();
  };

  return (
    // ... giữ nguyên UI component như bạn đã có
  );
}

export default CapturePage;
