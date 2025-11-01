import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';

function RoleRoute({ children, roles }) {
  const { usuario, cargando } = useContext(AuthContext);

  if (cargando) {
    console.log('Esperando decodificación del token...');
    return null; // o un spinner si querés
  }

  if (!usuario || !usuario.rol) {
    console.warn('Usuario no autenticado o sin rol definido');
    return <Navigate to="/login" />;
  }

  const rolUsuario = usuario.rol.trim().toLowerCase();
  const rolesPermitidos = roles.map(r => r.trim().toLowerCase());

  console.log('Rol del usuario:', rolUsuario);
  console.log('Roles permitidos:', rolesPermitidos);

  if (!rolesPermitidos.includes(rolUsuario)) {
    console.warn(`Acceso denegado: rol "${usuario.rol}" no autorizado para esta ruta`);
    return <Navigate to="/unauthorized" />;
  }

  return children;
}

export default RoleRoute;
