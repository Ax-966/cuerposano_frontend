// src/Components/LogoutButton.jsx
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

function LogoutButton() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmar = window.confirm('¿Estás seguro de que querés cerrar sesión? Se perderán los cambios no guardados.');
    if (confirmar) {
      logout();
      navigate('/login');
    }
  };

  return (
    <button onClick={handleLogout} className="logout-btn">
      Cerrar sesión
    </button>
  );
}

export default LogoutButton;
