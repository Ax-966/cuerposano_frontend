import Api from '../Api/api';

export const getAllSocios = () => Api.get('/api/socios');
export const getSocioById = (id) => Api.get(`/api/socios/${id}`);
export const createSocio = (data) => Api.post('/api/socios', data);
export const updateSocio = (id, data) => Api.put(`/api/socios/${id}`, data);
export const deleteSocio = (id) => Api.delete(`/api/socios/${id}`);
