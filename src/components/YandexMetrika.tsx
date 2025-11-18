import { useEffect } from 'react';

// Типизация для глобального объекта ym
declare global {
  interface Window {
    ym: (id: number, method: string, ...params: any[]) => void;
  }
}

export const trackGoal = (goalName: string, params?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.ym) {
    window.ym(105384967, 'reachGoal', goalName, params);
  }
};

export const trackUserParams = (params: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.ym) {
    window.ym(105384967, 'userParams', params);
  }
};

export const trackPageView = (url?: string) => {
  if (typeof window !== 'undefined' && window.ym) {
    window.ym(105384967, 'hit', url || window.location.href);
  }
};

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

export default YandexMetrika;