import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true); // ✅ nuevo estado

  const decodificarToken = (token) => {
    try {
      const decoded = jwtDecode(token);
      console.log("Token decodificado:", decoded);

      const username =
        decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];

      const rol =
        decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

      setUsuario({ username, rol });
    } catch (err) {
      console.error("Error al decodificar token:", err);
      setUsuario(null);
    }
  };

  useEffect(() => {
    if (token) {
      decodificarToken(token);
    } else {
      setUsuario(null);
    }
    setCargando(false); 
  }, [token]);

const login = (nuevoToken) => {
  localStorage.setItem('token', nuevoToken);
  setToken(nuevoToken);
  decodificarToken(nuevoToken); // ✅ decodifica inmediatamente
  setCargando(false); // ✅ ya está listo
};

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUsuario(null);
    setCargando(false);
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout, cargando }}>
      {children}
    </AuthContext.Provider>
  );
}
