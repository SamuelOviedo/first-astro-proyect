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
    return (
      <div className="flex items-center gap-4">
        <a
          href="/login"
          className="hidden sm:flex items-center gap-2 text-white hover:text-orange-500 transition-colors duration-300"
        >
          <i className="fas fa-sign-in-alt"></i>
          <span>Iniciar Sesión</span>
        </a>
        <a
          href="/login?register=true"
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
          <div className="absolute right-0 mt-2 w-64 bg-gray-900 border border-white/20 rounded-xl shadow-2xl overflow-hidden z-50 animate-fadeIn">
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
              <a
                href="/mantenimiento"
                className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/10 rounded-lg transition-all duration-200 group"
              >
                <i className="fas fa-tools text-orange-500 w-5"></i>
                <span className="group-hover:text-white">Solicitar Mantenimiento</span>
              </a>
              
              <a
                href="/#servicios"
                className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/10 rounded-lg transition-all duration-200 group"
              >
                <i className="fas fa-briefcase text-orange-500 w-5"></i>
                <span className="group-hover:text-white">Servicios</span>
              </a>

              <a
                href="/#contacto"
                className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/10 rounded-lg transition-all duration-200 group"
              >
                <i className="fas fa-envelope text-orange-500 w-5"></i>
                <span className="group-hover:text-white">Contacto</span>
              </a>

              <div className="border-t border-white/10 my-2"></div>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200 group"
              >
                <i className="fas fa-sign-out-alt w-5"></i>
                <span className="group-hover:text-red-300">Cerrar Sesión</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
