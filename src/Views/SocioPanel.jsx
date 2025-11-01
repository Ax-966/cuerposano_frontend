import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllSocios, createSocio, updateSocio, deleteSocio } from '../services/SocioService';

import SocioForm from '../Components/Socios/SocioForm';
import SocioTable from '../Components/Socios/SocioTable';
import CarnetCard from '../Components/Socios/CarnetCard';

function SocioPanel() {
  const navigate = useNavigate(); // 👈 para volver al panel del empleado
  const [socios, setSocios] = useState([]);
  const [socioEditado, setSocioEditado] = useState(null);
  const [socioSeleccionado, setSocioSeleccionado] = useState(null);
  const [vista, setVista] = useState('menu');

  const cargarSocios = async () => {
    const res = await getAllSocios();
    setSocios(res.data);
  };

  useEffect(() => {
    if (vista !== 'menu') {
      cargarSocios();
    }
  }, [vista]);

  const handleSubmit = async (data) => {
    if (socioEditado) {
      await updateSocio(socioEditado.socioId, data);
    } else {
      await createSocio(data);
    }
    setSocioEditado(null);
    cargarSocios();
  };

  const handleEdit = (socio) => {
    setSocioEditado(socio);
    setVista('registrar');
  };

  const handleDelete = async (id) => {
    await deleteSocio(id);
    cargarSocios();
  };

  const handleSelect = (socio) => setSocioSeleccionado(socio);

  return (
    <div className="socio-panel">
      <div className="socio-header">
        <button onClick={() => navigate('/empleado')} className="volver-btn">
          ← Volver al Panel del Empleado
        </button>
        <h2>Gestión de Socios</h2>
      </div>

      {vista === 'menu' && (
        <div className="menu-socio">
          <button onClick={() => setVista('registrar')}>Registrar Socio</button>
          <button onClick={() => setVista('modificar')}>Modificar Socio</button>
          <button onClick={() => setVista('consultar')}>Consultar Socio</button>
          <button onClick={() => setVista('eliminar')}>Eliminar Socio</button>
        </div>
      )}

      {vista === 'registrar' && (
        <>
          <button onClick={() => setVista('menu')}>← Volver</button>
          <SocioForm onSubmit={handleSubmit} socioEditado={socioEditado} />
        </>
      )}

      {vista === 'modificar' && (
        <>
          <button onClick={() => setVista('menu')}>← Volver</button>
          <SocioTable miembros={socios} onEdit={handleEdit} onDelete={handleDelete} />
        </>
      )}

      {vista === 'consultar' && (
        <>
          <button onClick={() => setVista('menu')}>← Volver</button>
          <SocioTable
            miembros={socios}
            onEdit={() => {}}
            onDelete={() => {}}
            onSelect={handleSelect}
          />
          {socioSeleccionado && <CarnetCard socio={socioSeleccionado} />}
        </>
      )}

      {vista === 'eliminar' && (
        <>
          <button onClick={() => setVista('menu')}>← Volver</button>
          <SocioTable miembros={socios} onDelete={handleDelete} />
        </>
      )}
    </div>
  );
}

export default SocioPanel;
