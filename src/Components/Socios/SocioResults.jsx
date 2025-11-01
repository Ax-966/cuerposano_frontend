import { useNavigate } from 'react-router-dom';
import { useSocioContext } from '../../Context/SocioContext';
import { useEffect } from 'react';
import Api from '../../Api/api'; // ✅ faltaba esta importación

function SocioResults({ membresiaPendiente }) {
  const {
    query,
    resultados,
    setResultados,
    setSocioSeleccionado
  } = useSocioContext();

  const navigate = useNavigate();

  useEffect(() => {
    const buscar = async () => {
      if (query.length < 3) {
        setResultados([]);
        return;
      }

      try {
        const res = await Api.get(`/api/Socios/buscar?dni=${query}`);

        setResultados(res.data);
      } catch (err) {
        setResultados([]);
      }
    };

    buscar();
  }, [query]);

  if (resultados.length === 0) return null;

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {resultados.map((socio) => (
        <li key={socio.socioId} style={{ marginBottom: '0.5rem', borderBottom: '1px solid #ccc', paddingBottom: '0.5rem' }}>
          <strong>{socio.nombre}</strong> — DNI: {socio.dni}
          <button
            style={{ marginLeft: '1rem' }}
            onClick={() => {
              setSocioSeleccionado(socio);
              navigate('/empleado/membresias/simular-pago', {
                state: { socio, membresia: membresiaPendiente }
              });
            }}
          >
            Seleccionar
          </button>
        </li>
      ))}
    </ul>
  );
}

export default SocioResults;
