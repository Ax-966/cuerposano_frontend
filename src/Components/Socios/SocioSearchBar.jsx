import { useSocioContext } from '../../Context/SocioContext';

function SocioSearchBar() {
  const { query, setQuery, setResultados } = useSocioContext();

  const handleBuscar = async () => {
    if (query.length < 3) return;
    try {
      const res = await Api.get(`/Socios/buscar?dni=${query}`);
      setResultados(res.data);
    } catch (err) {
      setResultados([]);
    }
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      <input
        type="text"
        placeholder="Buscar socio por DNI o nombre"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: '0.5rem', width: '70%' }}
      />
      <button onClick={handleBuscar} style={{ marginLeft: '1rem' }}>
        Buscar
      </button>
    </div>
  );
}

export default SocioSearchBar;
