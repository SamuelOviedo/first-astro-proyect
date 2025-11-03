// src/components/AuthGuard.tsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Verificar sesión actual
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        setIsAuthenticated(true);
        setUser(session.user);
      } else {
        setIsAuthenticated(false);
        // Redirigir a login con la página actual como redirect
        const currentPath = window.location.pathname;
        window.location.href = `/login?redirect=${encodeURIComponent(currentPath)}`;
      }
    };

    checkAuth();

    // Escuchar cambios en la autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setIsAuthenticated(true);
        setUser(session.user);
      } else {
        setIsAuthenticated(false);
        const currentPath = window.location.pathname;
        window.location.href = `/login?redirect=${encodeURIComponent(currentPath)}`;
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Mostrar loading mientras verifica
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center">
          <i className="fas fa-spinner fa-spin text-orange-500 text-5xl mb-4"></i>
          <p className="text-white text-xl">Verificando sesión...</p>
        </div>
      </div>
    );
  }

  // Si está autenticado, mostrar el contenido
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // Si no está autenticado, no mostrar nada (ya redirigió)
  return null;
}
