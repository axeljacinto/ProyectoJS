import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import { ThemeContext } from './context/ThemeContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { AppRouter } from './routes/AppRouter';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 2, // 2 minutos
      retry: 1,
    },
  },
});

export function App() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('pcbuilder-theme') || 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem('pcbuilder-theme', theme);
    } catch {
      // La interfaz sigue funcionando si el navegador bloquea el almacenamiento local.
    }
  }, [theme]);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeContext.Provider value={theme}>
          <AuthProvider>
            <div className="app-shell flex flex-col min-h-screen">
              <Navbar theme={theme} onToggleTheme={() => setTheme((actual) => actual === 'light' ? 'dark' : 'light')} />
              <div className="flex-1">
                <AppRouter />
              </div>
              <Footer />
            </div>
          </AuthProvider>
        </ThemeContext.Provider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

