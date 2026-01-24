"use client";

import { useEffect } from 'react';
import Mousetrap from 'mousetrap';

export function useKeyboardShortcuts() {
  useEffect(() => {
    // Navegación rápida a secciones
    Mousetrap.bind(['1', 'h'], () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    Mousetrap.bind(['2', 's'], () => {
      document.querySelector('#servicios')?.scrollIntoView({ behavior: 'smooth' });
    });

    Mousetrap.bind(['3', 'n'], () => {
      document.querySelector('#nosotros')?.scrollIntoView({ behavior: 'smooth' });
    });

    Mousetrap.bind(['4', 'c'], () => {
      document.querySelector('#casos')?.scrollIntoView({ behavior: 'smooth' });
    });

    Mousetrap.bind(['5', 'x'], () => {
      document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' });
    });

    // Scroll suave
    Mousetrap.bind('j', () => {
      window.scrollBy({ top: 100, behavior: 'smooth' });
    });

    Mousetrap.bind('k', () => {
      window.scrollBy({ top: -100, behavior: 'smooth' });
    });

    // Scroll a top/bottom
    Mousetrap.bind('g g', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    Mousetrap.bind('shift+g', () => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    });

    // Cleanup
    return () => {
      Mousetrap.unbind(['1', 'h', '2', 's', '3', 'n', '4', 'c', '5', 'x', 'j', 'k', 'g g', 'shift+g']);
    };
  }, []);
}
