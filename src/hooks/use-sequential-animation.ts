import { useEffect, useRef, useState, useCallback } from 'react';

interface UseSequentialAnimationOptions {
  interval?: number; // Интервал между анимациями элементов (мс)
  cycleInterval?: number; // Интервал между полными циклами (мс)
  startDelay?: number; // Задержка перед началом анимаций (мс)
  pauseOnHover?: boolean; // Приостанавливать ли анимации при наведении
  direction?: 'left-to-right' | 'top-to-bottom' | 'random'; // Направление анимации
  mobileClickToRestart?: boolean; // Перезапускать ли анимации по клику на мобильных
}

export const useSequentialAnimation = <T extends HTMLElement = HTMLDivElement>(
  itemCount: number,
  options: UseSequentialAnimationOptions = {}
) => {
  const {
    interval = 800,
    cycleInterval = 5000,
    startDelay = 2000,
    pauseOnHover = true,
    direction = 'left-to-right',
    mobileClickToRestart = false
  } = options;

  // Определяем, мобильное ли устройство
  const isMobile = () => {
    return window.innerWidth <= 768; // md breakpoint в Tailwind
  };

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const cycleTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const startDelayTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const elementRefs = useRef<(T | null)[]>([]);

  // Определяем порядок анимации в зависимости от направления
  const getAnimationOrder = useCallback(() => {
    const order = Array.from({ length: itemCount }, (_, i) => i);
    
    switch (direction) {
      case 'top-to-bottom':
        // Для сетки элементов сверху вниз
        return order;
      case 'left-to-right':
        // Слева направо с учетом сеточной структуры
        // Для Benefits (6 элементов в сетке 3x2): [0, 1, 2, 3, 4, 5] - первая строка, потом вторая
        // Для Process (5 элементов в сетке): [0, 1, 2, 3, 4]
        // Для About (3 элемента): [0, 1, 2]
        
        // Определяем структуру сетки на основе количества элементов
        if (itemCount === 6) {
          // Benefits: 3x2 сетка - анимируем построчно
          return [0, 1, 2, 3, 4, 5]; // первая строка, потом вторая
        } else if (itemCount === 5) {
          // Process: 5 элементов - анимируем по порядку
          return [0, 1, 2, 3, 4];
        } else if (itemCount === 3) {
          // About: 3 элемента - анимируем по порядку
          return [0, 1, 2];
        }
        return order;
      case 'random':
        // В случайном порядке
        return order.sort(() => Math.random() - 0.5);
      default:
        return order;
    }
  }, [itemCount, direction]);

  // Запускаем анимацию для конкретного элемента
  const animateElement = useCallback((index: number) => {
    // Очищаем предыдущий таймаут анимации
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
    
    setActiveIndex(index);
    
    // Увеличиваем время анимации до 1000мс для более плавного эффекта
    animationTimeoutRef.current = setTimeout(() => {
      setActiveIndex(null);
      animationTimeoutRef.current = null;
    }, 1000); // Увеличенная длительность анимации
  }, []);

  // Запускаем последовательную анимацию
  const startSequentialAnimation = useCallback(() => {
    if (isPaused || !isVisible) {
      return;
    }

    const order = getAnimationOrder();
    let currentIndex = 0;
    let cycleCount = 0;
    const maxCycles = 5; // Ограничиваем количество циклов

    const animateStep = () => {
      if (isPaused || !isVisible || cycleCount >= maxCycles) {
        return;
      }
      
      animateElement(order[currentIndex]);
      currentIndex = (currentIndex + 1) % order.length;

      // Если завершили полный цикл, увеличиваем счетчик циклов
      if (currentIndex === 0) {
        cycleCount++;
      }

      // Планируем следующий шаг
      const timeout = currentIndex === 0 ? cycleInterval : interval;
      const timeoutRef = currentIndex === 0 ? cycleTimeoutRef : intervalRef;
      
      timeoutRef.current = setTimeout(animateStep, timeout);
    };

    animateStep();
  }, [isPaused, isVisible, getAnimationOrder, animateElement, interval, cycleInterval]);

  // Очищаем таймеры с улучшенной обработкой
  const clearTimers = useCallback(() => {
    if (intervalRef.current) {
      clearTimeout(intervalRef.current);
      intervalRef.current = null;
    }
    if (cycleTimeoutRef.current) {
      clearTimeout(cycleTimeoutRef.current);
      cycleTimeoutRef.current = null;
    }
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
      animationTimeoutRef.current = null;
    }
    if (startDelayTimeoutRef.current) {
      clearTimeout(startDelayTimeoutRef.current);
      startDelayTimeoutRef.current = null;
    }
  }, []);

  // Обработчики наведения для паузы (только на десктопе)
  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover && !isMobile()) {
      setIsPaused(true);
      clearTimers();
      setActiveIndex(null); // Сбрасываем активный индекс при наведении
    }
  }, [pauseOnHover, clearTimers]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover && !isMobile()) {
      setIsPaused(false);
    }
  }, [pauseOnHover]);

  // Обработчик клика для перезапуска анимаций на мобильных
  const handleClick = useCallback(() => {
    if (mobileClickToRestart && isMobile()) {
      clearTimers();
      setActiveIndex(null);
      setTimeout(() => {
        startSequentialAnimation();
      }, 100); // Небольшая задержка перед перезапуском
    }
  }, [mobileClickToRestart, startSequentialAnimation, clearTimers]);

  // Инициализация при появлении элемента в зоне видимости
  const startAnimation = useCallback(() => {
    setIsVisible(true);
    clearTimers();
    
    // Начинаем анимации после задержки
    startDelayTimeoutRef.current = setTimeout(() => {
      startSequentialAnimation();
      startDelayTimeoutRef.current = null;
    }, startDelay);
  }, [clearTimers, startSequentialAnimation, startDelay]);

  // Функция для запуска анимаций после скролла - НЕ ИСПОЛЬЗУЕТСЯ
  // const startAnimationAfterScroll = useCallback(() => {
  //   setTimeout(() => {
  //     startAnimation();
  //   }, 1000); // Задержка 1 секунда после скролла
  // }, [startAnimation]);

  // Остановка анимаций при скрытии элемента
  const stopAnimation = useCallback(() => {
    setIsVisible(false);
    clearTimers();
    setActiveIndex(null);
  }, [clearTimers]);

  // Рефы для элементов
  const setElementRef = useCallback((index: number) => (el: T | null) => {
    // Просто устанавливаем элемент без лишних проверок
    elementRefs.current[index] = el;
  }, []);

  // Очистка при размонтировании
  useEffect(() => {
    return () => {
      clearTimers();
    };
  }, [clearTimers]);

  return {
    activeIndex,
    isPaused,
    isVisible,
    setElementRef,
    startAnimation,
    stopAnimation,
    handleMouseEnter,
    handleMouseLeave,
    handleClick,
    // startAnimationAfterScroll, // Убрано, так как не используется
    // elementRefs // Убрано, так как не используется
  };
};