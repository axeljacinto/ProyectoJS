import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authApi } from '../api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  // Carga inicial del perfil si hay una cookie válida
  const cargarPerfil = useCallback(async () => {
    try {
      setCargando(true);
      const res = await authApi.obtenerPerfil();
      if (res.ok && res.data) {
        setUsuario(res.data);
      }
    } catch {
      setUsuario(null);
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    cargarPerfil();

    // Escuchar evento de token expirado o no autorizado
    const handleUnauthorized = () => {
      setUsuario(null);
    };

    window.addEventListener('auth:unauthorized', handleUnauthorized);
    return () => window.removeEventListener('auth:unauthorized', handleUnauthorized);
  }, [cargarPerfil]);

  const login = async (credenciales) => {
    const res = await authApi.login(credenciales);
    if (res.ok && res.data?.usuario) {
      setUsuario(res.data.usuario);
    }
    return res;
  };

  const registro = async (datos) => {
    const res = await authApi.registro(datos);
    if (res.ok && res.data?.usuario) {
      setUsuario(res.data.usuario);
    }
    return res;
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } finally {
      setUsuario(null);
    }
  };

  const tienePermiso = (permiso) => {
    if (!usuario || !usuario.permisos) return false;
    return usuario.permisos.includes(permiso);
  };

  const esRol = (...rolesPermitidos) => {
    if (!usuario) return false;
    return rolesPermitidos.includes(usuario.rol);
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        cargando,
        login,
        registro,
        logout,
        tienePermiso,
        esRol,
        recargarPerfil: cargarPerfil,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
  }
  return context;
}

