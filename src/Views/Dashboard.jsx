import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';

function Dashboard() {
  const { usuario } = useContext(AuthContext);

  return (
    <div>
      <h2>Bienvenido, {usuario?.username}</h2>
      <p>Rol: {usuario?.rol}</p>

      {usuario?.rol === 'Administrador' && (
        <button>Panel de administración</button>
      )}

      {usuario?.rol === 'Empleado' && (
        <p>Acceso limitado</p>
      )}
      {usuario?.rol === 'Dueño' && (
        <p>Acceso a reportes</p>
      )}
    </div>
  );
}

export default Dashboard;
