import Api from '../Api/api';

export const registrarCobro = (data) => Api.post('/api/Cobros', data);

export const getCobros = () => Api.get('/api/Cobros');

export const getCobroById = (id) => Api.get(`/api/Cobros/${id}`);

export const actualizarCobro = (id, data) => Api.put(`/api/Cobros/${id}`, data);

export const eliminarCobro = (id) => Api.delete(`/api/Cobros/${id}`);
