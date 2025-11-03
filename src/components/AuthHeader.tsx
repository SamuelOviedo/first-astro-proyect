// src/components/AuthHeader.tsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function AuthHeader() {
  const [user, setUser] = useState<any>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar sesión actual
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      setLoading(false);
    };

    checkAuth();

    // Escuchar cambios en la autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  if (loading) {
    return null; // O un skeleton loader
  }

  if (!user) {
    // Usuario no autenticado - mostrar botón de login
    // Obtener la ruta actual para el redirect
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';
    const loginUrl = currentPath === '/login' ? '/login' : `/login?redirect=${encodeURIComponent(currentPath)}`;
    const registerUrl = currentPath === '/login' ? '/login?register=true' : `/login?register=true&redirect=${encodeURIComponent(currentPath)}`;
    
    return (
      <div className="flex items-center gap-4">
        <a
          href={loginUrl}
          className="hidden sm:flex items-center gap-2 text-white hover:text-orange-500 transition-colors duration-300"
        >
          <i className="fas fa-sign-in-alt"></i>
          <span>Iniciar Sesión</span>
        </a>
        <a
          href={registerUrl}
          className="bg-gradient-to-r from-orange-800 to-orange-500 px-6 py-2.5 rounded-full font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-500/40 flex items-center gap-2"
        >
          <i className="fas fa-user-plus"></i>
          <span className="hidden sm:inline">Registrarse</span>
          <span className="sm:hidden">Login</span>
        </a>
      </div>
    );
  }

  // Usuario autenticado - mostrar menú de usuario
  return (
    <div className="relative">
      <button
        onClick={() => setShowUserMenu(!showUserMenu)}
        className="flex items-center gap-3 bg-white/10 hover:bg-white/20 px-4 py-2.5 rounded-full transition-all duration-300 border border-white/20 group"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-800 to-orange-500 flex items-center justify-center text-white font-semibold">
          {user.user_metadata?.full_name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || 'U'}
        </div>
        <div className="hidden md:block text-left">
          <p className="text-white text-sm font-semibold leading-tight">
            {user.user_metadata?.full_name || 'Usuario'}
          </p>
          <p className="text-gray-400 text-xs leading-tight">
            {user.email}
          </p>
        </div>
        <i className={`fas fa-chevron-down text-gray-400 text-xs transition-transform duration-300 ${showUserMenu ? 'rotate-180' : ''}`}></i>
      </button>

      {/* Dropdown Menu */}
      {showUserMenu && (
        <>
          {/* Overlay para cerrar el menú */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowUserMenu(false)}
          ></div>
          
          {/* Menú desplegable */}
          <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-gray-900 border border-white/20 rounded-xl shadow-2xl overflow-hidden z-50 animate-fadeIn max-h-[85vh] overflow-y-auto">
            {/* Header del menú */}
            <div className="bg-gradient-to-r from-orange-800 to-orange-500 p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-lg">
                  {user.user_metadata?.full_name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || 'U'}
                </div>
                <div>
                  <p className="text-white font-semibold">
                    {user.user_metadata?.full_name || 'Usuario'}
                  </p>
                  <p className="text-white/80 text-sm">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Opciones del menú */}
            <div className="p-2">
              {/* Información de la cuenta */}
              <div className="px-4 py-3 bg-white/5 rounded-lg mb-3">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Estado de cuenta</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-400 font-medium">Activa</span>
                </div>
              </div>

              {/* Estadísticas rápidas */}
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div className="px-3 py-2 bg-white/5 rounded-lg">
                  <p className="text-xs text-gray-500">Solicitudes</p>
                  <p className="text-lg font-bold text-white">0</p>
                </div>
                <div className="px-3 py-2 bg-white/5 rounded-lg">
                  <p className="text-xs text-gray-500">Completadas</p>
                  <p className="text-lg font-bold text-green-400">0</p>
                </div>
              </div>

              <div className="border-t border-white/10 my-2"></div>

              {/* Configuración y ayuda */}
              <button
                className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-400 hover:bg-white/5 rounded-lg transition-all duration-200 group text-sm"
                onClick={() => alert('Próximamente: Configuración de cuenta')}
              >
                <i className="fas fa-cog w-4"></i>
                <span className="group-hover:text-gray-300">Configuración</span>
              </button>

              <a
                href="/#contacto"
                className="flex items-center gap-3 px-4 py-2.5 text-gray-400 hover:bg-white/5 rounded-lg transition-all duration-200 group text-sm"
              >
                <i className="fas fa-question-circle w-4"></i>
                <span className="group-hover:text-gray-300">Ayuda y soporte</span>
              </a>

              <div className="border-t border-white/10 my-2"></div>

              {/* Cerrar sesión */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200 group"
              >
                <i className="fas fa-sign-out-alt w-4"></i>
                <span className="group-hover:text-red-300 font-medium">Cerrar Sesión</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
