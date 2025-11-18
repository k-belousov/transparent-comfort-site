import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { trackUserParams, trackGoal } from "@/components/YandexMetrika";

// Отслеживание параметров посетителей
const userId = localStorage.getItem('userID') || `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
if (!localStorage.getItem('userID')) {
  localStorage.setItem('userID', userId);
}

trackUserParams({
  UserID: userId,
  PageType: 'landing',
  Language: 'ru',
  LandingVersion: '1.0'
});

// Отслеживание загрузки страницы
trackGoal('PAGE_LOAD', {
  timestamp: new Date().toISOString(),
  userAgent: navigator.userAgent,
  referrer: document.referrer || 'direct'
});

createRoot(document.getElementById("root")!).render(<App />);
