import Api from '../Api/api';

export const getAllSocios = () => Api.get('/socios');
export const getSocioById = (id) => Api.get(`/socios/${id}`);
export const createSocio = (data) => Api.post('/socios', data);
export const updateSocio = (id, data) => Api.put(`/socios/${id}`, data);
export const deleteSocio = (id) => Api.delete(`/socios/${id}`);
