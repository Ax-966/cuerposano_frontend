import Api from '../Api/api';

export const login = (credentials) => Api.post('/api/auth/login', credentials);
export const seedAdmin = () => Api.post('/api/auth/seed-admin');
export const register = (datos) => Api.post('/api/auth/register', datos);