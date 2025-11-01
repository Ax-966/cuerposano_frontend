import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

function Dashboard() {
  const { usuario, cargando } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!cargando) {
      if (!usuario) {
        navigate('/login');
      } else {
        const rol = usuario.rol.trim().toLowerCase();
        if (rol === 'administrador') navigate('/admin');
        else if (rol === 'dueño') navigate('/reportes');
        else if (rol === 'empleado') navigate('/empleado');
        else navigate('/unauthorized');
      }
    }
  }, [usuario, cargando]);

  return null; // o un spinner si querés
}

export default Dashboard;
