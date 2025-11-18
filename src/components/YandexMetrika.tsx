// Типизация для глобального объекта ym
declare global {
  interface Window {
    ym: (id: number, method: string, ...params: unknown[]) => void;
  }
}

const trackGoal = (goalName: string, params?: Record<string, unknown>) => {
  if (typeof window !== 'undefined' && window.ym) {
    window.ym(105384967, 'reachGoal', goalName, params);
  }
};

const trackUserParams = (params: Record<string, unknown>) => {
  if (typeof window !== 'undefined' && window.ym) {
    window.ym(105384967, 'userParams', params);
  }
};

const trackPageView = (url?: string) => {
  if (typeof window !== 'undefined' && window.ym) {
    window.ym(105384967, 'hit', url || window.location.href);
  }
};

import { useEffect } from 'react';

export const YandexMetrika = () => {
  useEffect(() => {
    // Код уже добавлен в index.html, здесь можно добавить дополнительную логику
    // Отслеживание первого посещения
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      trackGoal('FIRST_VISIT');
      localStorage.setItem('hasVisited', 'true');
    }
  }, []);

  return null;
};

export { trackGoal, trackUserParams, trackPageView };

export default YandexMetrika;