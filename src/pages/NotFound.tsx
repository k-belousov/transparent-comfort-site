import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, Search } from "lucide-react";
import { trackGoal } from "@/components/YandexMetrika";
import { Header } from "@/components/Header";
import { Contact } from "@/components/Contact";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 ошибка: Попытка доступа к несуществующему маршруту:", location.pathname);
    
    // Устанавливаем SEO мета-теги для 404 страницы
    document.title = "Страница не найдена — Прозрачный комфорт";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Запрашиваемая страница не найдена. Вернитесь на главную страницу компании Прозрачный комфорт — мягкие окна премиум-класса в Челябинске.');
    }
  }, [location.pathname]);

  const goToHome = () => {
    trackGoal('404_GO_HOME');
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    trackGoal('404_GO_BACK');
    window.history.back();
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main id="main-content" className="flex items-center justify-center bg-background">
        <div className="text-center max-w-md mx-auto px-4 py-32">
          <div className="mb-8 relative" aria-hidden="true">
            <h1 className="text-9xl font-bold text-accent/20 absolute top-0 left-1/2 transform -translate-x-1/2">404</h1>
            <div className="relative z-10 text-6xl font-bold mt-16 animate-zoom-in">!</div>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Страница не найдена</h2>
          
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            К сожалению, запрашиваемая страница не существует или была перемещена.
          </p>
          
          <div className="space-y-4">
            <Button
              onClick={goToHome}
              size="lg"
              className="w-full bg-gradient-to-r from-accent to-primary hover:from-primary hover:to-accent transition-all duration-300 shadow-lg hover:shadow-xl"
              aria-label="Вернуться на главную страницу"
            >
              <Home className="w-5 h-5 mr-2" aria-hidden="true" />
              Вернуться на главную
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              onClick={goBack}
              className="w-full"
              aria-label="Вернуться на предыдущую страницу"
            >
              <Search className="w-5 h-5 mr-2" aria-hidden="true" />
              Назад
            </Button>
          </div>
          
          <p className="mt-8 text-sm text-muted-foreground">
            Если вы считаете, что это ошибка, пожалуйста, свяжитесь с нами.
          </p>
        </div>
      </main>
      <Contact />
    </div>
  );
};

export default NotFound;
