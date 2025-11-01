import Api from '../Api/api';

export const crearFactura = (data) => Api.post('/api/Factura', data);

export const getFacturas = () => Api.get('/api/Factura');

export const getFacturaById = (id) => Api.get(`/api/Factura/${id}`);

export const actualizarFactura = (id, data) => Api.put(`/api/Factura/${id}`, data);

export const eliminarFactura = (id) => Api.delete(`/api/Factura/${id}`);
