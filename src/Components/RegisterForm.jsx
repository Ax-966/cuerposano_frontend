import { useState } from 'react';
import { register } from '../services/AuthService';

function RegisterForm({ onRegisterSuccess }) {
  const [datos, setDatos] = useState({
    username: '',
    password: '',
    nombre: '',
    apellido: '',
    dni: '',
    direccion: '',
    telefono: '',
    fechaNacimiento: '',
    correoElectronico: '',
    rolId: 2 // Por defecto "Empleado"
  });

  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await register(datos);
      localStorage.setItem('token', res.data.token);
      onRegisterSuccess();
    } catch (err) {
  console.error('Error al registrar:', err.response?.data || err.message);
  setError(err.response?.data?.message || 'Error al registrar usuario.');
}

  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registro de usuario</h2>
      <input type="text" placeholder="Usuario" value={datos.username} onChange={(e) => setDatos({ ...datos, username: e.target.value })} />
      <input type="password" placeholder="Contraseña" value={datos.password} onChange={(e) => setDatos({ ...datos, password: e.target.value })} />
      <input type="text" placeholder="Nombre" value={datos.nombre} onChange={(e) => setDatos({ ...datos, nombre: e.target.value })} />
      <input type="text" placeholder="Apellido" value={datos.apellido} onChange={(e) => setDatos({ ...datos, apellido: e.target.value })} />
      <input type="number" placeholder="DNI" value={datos.dni} onChange={(e) => setDatos({ ...datos, dni: e.target.value })} />
      <input type="text" placeholder="Dirección" value={datos.direccion} onChange={(e) => setDatos({ ...datos, direccion: e.target.value })} />
      <input type="text" placeholder="Teléfono" value={datos.telefono} onChange={(e) => setDatos({ ...datos, telefono: e.target.value })} />
      <input type="date" value={datos.fechaNacimiento} onChange={(e) => setDatos({ ...datos, fechaNacimiento: e.target.value })} />
      <input type="email" placeholder="Correo electrónico" value={datos.correoElectronico} onChange={(e) => setDatos({ ...datos, correoElectronico: e.target.value })} />
      <select value={datos.rolId} onChange={(e) => setDatos({ ...datos, rolId: parseInt(e.target.value) })}>
        <option value={1}>Administrador</option>
        <option value={2}>Empleado</option>
        <option value={3}>Dueño</option>
      </select>
      <button type="submit">Registrarse</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default RegisterForm;
