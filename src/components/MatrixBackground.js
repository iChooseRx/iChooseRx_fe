'use client';

import { useRef, useEffect } from 'react';

export default function MatrixBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fontSize = 24;
    const lineHeight = fontSize * 1.5;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(0);

    const matrixChars = [
      '💊', 'iChooseRx', 'Conscious Consumer', 'Lisinopril', 'Ibuprofen', 'Adderall',
      'Metformin', 'Pharmacy', 'Rx', 'FDA', 'NDC', 'Atorvastatin', 'Acetaminophen',
      'I Choose iChooseRx', 'Prescribe', 'OTC', '💊', 'Ritalin', 'Medication',
      'iChooseRx', 'Prescription', 'Drug', 'iChooseRx', 'Empower', 'Conscious',
      'Consumer', 'Choice', 'I Choose', 'Pharmicist', 'iChooseRx', 'My Choice',
      'Unwanted Inactive Ingredients',
    ];

    function draw() {
      const bgColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--background')
        .trim();

      const colorMatch = bgColor.match(/\d+/g);
      let trailingFill = 'rgba(255,255,255,0.3)';

      if (colorMatch) {
        const [r, g, b] = colorMatch.map(Number);
        const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
        trailingFill = brightness < 128
          ? `rgba(${r}, ${g}, ${b}, 0.05)`
          : `rgba(${r}, ${g}, ${b}, 0.3)`;
      }

      ctx.fillStyle = trailingFill;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const textColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--foreground')
        .trim();
      ctx.fillStyle = textColor;
      ctx.font = `${fontSize}px var(--font-geist-mono)`;
      ctx.textAlign = 'center';

      for (let i = 0; i < columns; i++) {
        const text = matrixChars[(drops[i] + i) % matrixChars.length];
        const posX = i * fontSize;
        const posY = drops[i] * lineHeight;

        ctx.fillText(text, posX, posY);

        if (Math.random() > 0.95) drops[i]++;
        if (posY > canvas.height && Math.random() > 0.98) drops[i] = 0;
      }

      setTimeout(draw, 100);
    }

    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}