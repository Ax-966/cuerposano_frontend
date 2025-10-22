//import { createContext, useEffect, useState } from 'react';
//import api from '../Api/api';
//
//export const StateContext = createContext();
//
//export const StateProvider = ({ children }) => {
//  const [search, setSearch] = useState({ q: '' });
//  const [results, setResults] = useState({ data: [] });
//
//  const setParam = (k, v) => setSearch(prev => ({ ...prev, [k]: v }));
//
//  const searchResults = async () => {
//    try {
//      if (search.q.length > 2) {
//        const res = await api.get(`/miembros/buscar?q=${encodeURIComponent(search.q)}`);
//        setResults({ data: res.data });
//      }
//    } catch (err) {
//      console.error('Error al buscar miembros:', err);
//      setResults({ data: [] });
//    }
//  };
//
//  useEffect(() => {
//    searchResults();
//  }, [search]);
//
//  return (
//    <StateContext.Provider value={{ search, results, setParam, searchResults }}>
//      {children}
//    </StateContext.Provider>
//  );
//};
//