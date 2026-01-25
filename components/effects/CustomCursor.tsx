"use client";

import { useEffect, useState, useRef } from 'react';
import { gradients as siteGradients } from '@/lib/colors';

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Detectar si es dispositivo táctil o pantalla pequeña
    const checkTouchDevice = () => {
      return (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        // @ts-ignore
        navigator.msMaxTouchPoints > 0 ||
        window.innerWidth < 768 // Considerar tablets y móviles
      );
    };

    setIsTouchDevice(checkTouchDevice());

    if (checkTouchDevice()) {
      return; // No inicializar el cursor en dispositivos táctiles
    }

    const updateMousePosition = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Update cursor position instantly without animation
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px) scale(${isHovering ? 0.5 : 1})`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${e.clientX - 16}px, ${e.clientY - 16}px) scale(${isHovering ? 1.5 : 1})`;
      }
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleHoverStart = () => {
      setIsHovering(true);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px) scale(0.5)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${mouseX - 16}px, ${mouseY - 16}px) scale(1.5)`;
        ringRef.current.style.opacity = '0.6';
      }
    };

    const handleHoverEnd = () => {
      setIsHovering(false);
      if (ringRef.current) {
        ringRef.current.style.opacity = '0.3';
      }
    };

    // Track mouse movement
    window.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Track hoverable elements
    const hoverableElements = document.querySelectorAll(
      'a, button, [role="button"], input, textarea, select, .cursor-pointer'
    );

    hoverableElements.forEach((el) => {
      el.addEventListener('mouseenter', handleHoverStart);
      el.addEventListener('mouseleave', handleHoverEnd);
    });

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);

      hoverableElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleHoverStart);
        el.removeEventListener('mouseleave', handleHoverEnd);
      });
    };
  }, [isVisible, isTouchDevice, isHovering]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Main cursor dot */}
      <div
        ref={dotRef}
        className="custom-cursor-dot"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          background: siteGradients.ia,
          mixBlendMode: 'difference',
          willChange: 'transform',
          transition: 'none',
        }}
      />

      {/* Cursor ring */}
      <div
        ref={ringRef}
        className="custom-cursor-ring"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          border: '2px solid transparent',
          backgroundImage: siteGradients.ia,
          backgroundOrigin: 'border-box',
          backgroundClip: 'padding-box, border-box',
          pointerEvents: 'none',
          zIndex: 9998,
          opacity: 0.3,
          willChange: 'transform, opacity',
          transition: 'none',
        }}
      />
    </>
  );
}
