import { useState, useEffect } from 'react';
import Api from '../../services/api';

function SocioSearch({ onSeleccionar }) {
  const [query, setQuery] = useState('');
  const [resultados, setResultados] = useState([]);

  useEffect(() => {
    const buscar = async () => {
      if (query.length < 3) return;
      const res = await Api.get(`/Socios/buscar?dni=${query}`);
      setResultados(res.data);
    };
    buscar();
  }, [query]);

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar socio por DNI o nombre"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul>
        {resultados.map((socio) => (
          <li key={socio.socioId}>
            {socio.nombre} - DNI: {socio.dni}
            <button onClick={() => onSeleccionar(socio)}>Seleccionar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SocioSearch;
