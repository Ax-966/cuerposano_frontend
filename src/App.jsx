import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Views/Login';
import Register from './Views/Register';
import Dashboard from './Views/Dashboard';
import AdminPanel from './Views/AdminPanel';
import Reportes from './Views/Reportes';
import EmpleadoPanel from './Views/EmpleadoPanel';
import SocioPanel from './Views/SocioPanel'; // ✅ agregado
import Unauthorized from './Views/Unauthorized';
import RoleRoute from './Components/Rol/RoleRoute';
import ProtectedLayout from './Layout/ProtectedLayout';
import MembresiaPanel from './Views/MembresiaPanel'
import { SocioProvider } from './Context/SocioContext';
import SimularPago from './Components/Membresias/SimularPago';


function App() {
  return (
    <Routes>
      {/* Acceso público */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Acceso general post-login */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Rutas protegidas por rol */}
      <Route
        path="/admin"
        element={
          <RoleRoute roles={['Administrador']}>
            <AdminPanel />
          </RoleRoute>
        }
      />

      <Route
        path="/reportes"
        element={
          <RoleRoute roles={['Dueño']}>
            <Reportes />
          </RoleRoute>
        }
      />

      <Route
        path="/empleado"
        element={
          <RoleRoute roles={['Empleado']}>
            <SocioProvider>
              <ProtectedLayout>
                <EmpleadoPanel />
              </ProtectedLayout>  
            </SocioProvider>
          </RoleRoute>
        }
      />
      <Route
  path="/empleado/membresias"
  element={
    <RoleRoute roles={['Empleado']}>
      <SocioProvider>
        <MembresiaPanel />
      </SocioProvider>
    </RoleRoute>
  }
/>

      <Route
        path="/empleado/socios"
        element={
          <RoleRoute roles={['Empleado']}>
            <SocioProvider>
                <ProtectedLayout>
                <SocioPanel />
                </ProtectedLayout>
            </SocioProvider>
          </RoleRoute>
        }
      />
      <Route
  path="/empleado/membresias/simular-pago"
  element={
    <RoleRoute roles={['Empleado']}>
      <SocioProvider>
        <SimularPago />
      </SocioProvider>
    </RoleRoute>
  }
/>

      {/* Ruta para acceso denegado */}
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Redirección por defecto */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
