import { useEffect, useRef, useState, useCallback } from 'react';
import { type CarouselApi } from '@/components/ui/carousel';

interface UseCarouselAnimationOptions {
  interval?: number; // Интервал между переключениями (мс)
  showIndicatorDuration?: number; // Длительность показа индикатора (мс)
  indicatorDelay?: number; // Задержка перед показом индикатора (мс)
}

export const useCarouselAnimation = (
  api: CarouselApi | null,
  itemCount: number,
  options: UseCarouselAnimationOptions = {}
) => {
  const {
    interval = 5000,
    showIndicatorDuration = 2000,
    indicatorDelay = 500
  } = options;

  const [current, setCurrent] = useState(0);
  const [showIndicator, setShowIndicator] = useState(false);
  const [autoSwitching, setAutoSwitching] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const indicatorTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const autoSwitchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Показываем индикатор кликабельности при автопереключении
  const showClickabilityIndicator = useCallback(() => {
    // Очищаем предыдущие таймауты
    if (indicatorTimeoutRef.current) {
      clearTimeout(indicatorTimeoutRef.current);
    }
    
    // Показываем индикатор с задержкой
    indicatorTimeoutRef.current = setTimeout(() => {
      setShowIndicator(true);
      
      // Скрываем индикатор через указанное время
      const hideTimeout = setTimeout(() => {
        setShowIndicator(false);
      }, showIndicatorDuration);
      
      // Сохраняем ссылку на таймаут скрытия для очистки
      indicatorTimeoutRef.current = hideTimeout;
    }, indicatorDelay);
  }, [indicatorDelay, showIndicatorDuration]);

  // Обработчик переключения слайда
  const handleSlideChange = useCallback(() => {
    if (!api) return;

    const newCurrent = api.selectedScrollSnap();
    setCurrent(newCurrent);
    
    // Показываем индикатор кликабельности для центрального элемента
    showClickabilityIndicator();
  }, [api, showClickabilityIndicator, current]);

  // Запускаем автопереключение
  const startAutoSwitch = useCallback(() => {
    if (!api || autoSwitching) {
      return;
    }

    setAutoSwitching(true);
    
    intervalRef.current = setInterval(() => {
      if (api) {
        api.scrollNext();
      }
    }, interval);
  }, [api, interval, autoSwitching]);

  // Останавливаем автопереключение
  const stopAutoSwitch = useCallback(() => {
    setAutoSwitching(false);
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    if (indicatorTimeoutRef.current) {
      clearTimeout(indicatorTimeoutRef.current);
      indicatorTimeoutRef.current = null;
    }
    
    if (autoSwitchTimeoutRef.current) {
      clearTimeout(autoSwitchTimeoutRef.current);
      autoSwitchTimeoutRef.current = null;
    }
    
    setShowIndicator(false);
  }, []);

  // Обработчик ручного переключения
  const handleManualSwitch = useCallback((index: number) => {
    if (!api) return;
    
    // Останавливаем автопереключение
    stopAutoSwitch();
    
    // Переключаем на выбранный слайд
    api.scrollTo(index);
    
    // Перезапускаем автопереключение через задержку
    autoSwitchTimeoutRef.current = setTimeout(() => {
      startAutoSwitch();
    }, interval);
  }, [api, stopAutoSwitch, startAutoSwitch, interval]);

  // Инициализация при изменении API
  useEffect(() => {
    if (!api) return;

    // Устанавливаем начальное состояние
    setCurrent(api.selectedScrollSnap());

    // Подписываемся на события
    api.on("select", handleSlideChange);

    // Запускаем автопереключение
    startAutoSwitch();

    // Очистка при размонтировании
    return () => {
      api.off("select", handleSlideChange);
      stopAutoSwitch();
    };
  }, [api]); // Убираем зависимости, которые могут вызывать бесконечные перерисовки

  // Очистка при размонтировании компонента
  useEffect(() => {
    return () => {
      stopAutoSwitch();
    };
  }, [stopAutoSwitch]);

  return {
    current,
    showIndicator,
    // autoSwitching, // Убрано, так как не используется
    handleManualSwitch,
    // stopAutoSwitch, // Убрано, так как не используется
    // startAutoSwitch // Убрано, так как не используется
 };
};