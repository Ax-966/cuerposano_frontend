import { createContext, useContext, useState } from 'react';

const SocioContext = createContext();

export const SocioProvider = ({ children }) => {
  const [query, setQuery] = useState('');
  const [resultados, setResultados] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [socioSeleccionado, setSocioSeleccionado] = useState(null);

  return (
    <SocioContext.Provider value={{
      query, setQuery,
      resultados, setResultados,
      pagina, setPagina,
      socioSeleccionado, setSocioSeleccionado
    }}>
      {children}
    </SocioContext.Provider>
  );
};

export const useSocioContext = () => useContext(SocioContext);
