// src/components/UserHeader.tsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function UserHeader() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
      }
    };

    getUser();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      window.location.href = '/login';
    }
  };

  if (!user) return null;

  return (
    <div className="bg-white/5 backdrop-blur-lg border-b border-white/10 mb-8">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center">
              <i className="fas fa-user text-white"></i>
            </div>
            <div>
              <p className="text-white font-semibold">
                {user.user_metadata?.full_name || user.email}
              </p>
              <p className="text-gray-400 text-sm">{user.email}</p>
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all duration-300 border border-red-500/30"
          >
            <i className="fas fa-sign-out-alt"></i>
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </div>
    </div>
  );
}
