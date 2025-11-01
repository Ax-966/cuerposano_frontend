import { useNavigate } from 'react-router-dom';
import './EmpleadoPanel.css';

function EmpleadoPanel() {
  const navigate = useNavigate();

  return (
    <div className="empleado-panel">
      <h2>Panel del Empleado</h2>
      <p>Seleccioná una sección para comenzar:</p>

      <div className="opciones">
        <button onClick={() => navigate('/empleado/socios')}>Gestión de Miembros</button>
         <button onClick={() => navigate('/empleado/membresias')}>Gestión de Membresías </button>
        <button onClick={() => navigate('/empleado/asistencia')}>Registro de Asistencia</button>
        <button onClick={() => navigate('/empleado/clases')}>Gestión de Clases y Actividades</button>
        <button onClick={() => navigate('/empleado/pagos')}>Gestión de Pagos</button>
      </div>
    </div>
  );
}

export default EmpleadoPanel;
