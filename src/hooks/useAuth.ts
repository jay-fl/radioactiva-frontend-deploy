"use client";
import { useEffect, useState } from 'react';
import { User } from '@/src/schemas';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Hacer una llamada a tu API para obtener el perfil
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/profile`, {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const isAdmin = user?.role === 'admin';
  const isUser = user?.role === 'user';
  const isAuthenticated = !!user;

  return {
    user,
    isAdmin,
    isUser,
    isAuthenticated,
    isLoading
  };
}

// Hook para verificar si es admin en componentes
export function useRequireAdmin() {
  const { isAdmin, isLoading } = useAuth();
  
  return { isAdmin, isLoading };
}

// Hook para verificar autenticación
export function useRequireAuth() {
  const { isAuthenticated, isLoading } = useAuth();
  
  return { isAuthenticated, isLoading };
}