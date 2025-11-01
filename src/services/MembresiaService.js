import Api from '../Api/api'; 
export const crearMembresia = (data) => Api.post('/api/Membresias', data);

export const getMembresias = () => Api.get('/api/Membresias');

export const getMembresiaById = (id) => Api.get(`/api/Membresias/${id}`);

export const actualizarMembresia = (id, data) => Api.put(`/api/Membresias/${id}`, data);

export const eliminarMembresia = (id) => Api.delete(`/api/Membresias/${id}`);
