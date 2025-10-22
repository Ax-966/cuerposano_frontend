import { useEffect, useState } from 'react';
import {
  getAllSocios,
  getSocioById,
  createSocio,
  updateSocio,
  deleteSocio
} from '../services/SocioService'; // 👈 Servicio centralizado

function Socios() {
  const [miembros, setMiembros] = useState([]);
  const [miembroEditado, setMiembroEditado] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  const [resultados, setResultados] = useState([]);

  // 🔄 Cargar todos los socios al montar el componente
  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await getAllSocios();
        setMiembros(res.data);
      } catch (err) {
        console.error('Error al cargar socios:', err);
      }
    };

    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('⚠️ No hay token JWT en localStorage. El backend responderá 401.');
      return;
    }

    cargar();
  }, []);

  // 🔍 Buscar socios por nombre o email
  useEffect(() => {
    const buscar = async () => {
      try {
        if (busqueda.length > 2) {
          const res = await getAllSocios(); // Podés reemplazar por un endpoint de búsqueda si lo tenés
          const filtrados = res.data.filter(s =>
            s.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
            s.correoElectronico.toLowerCase().includes(busqueda.toLowerCase())
          );
          setResultados(filtrados);
        } else {
          setResultados([]);
        }
      } catch (err) {
        console.error('Error al buscar socios:', err);
      }
    };

    buscar();
  }, [busqueda]);

  const mostrar = busqueda.length > 2 ? resultados : miembros;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Vista Socios.jsx funcionando ✅</h1>

      <input
        placeholder="Buscar por nombre o email"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        style={{ padding: '8px', width: '300px', marginBottom: '1rem' }}
      />

      <p>Total de miembros mostrados: <strong>{mostrar.length}</strong></p>

      <ul>
        {mostrar.map((socio) => (
          <li key={socio.socioId}>
            {socio.nombre} {socio.apellido} — {socio.correoElectronico}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Socios;
