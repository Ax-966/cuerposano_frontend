import { useState, useEffect } from 'react';
import { getAllSocios } from '../services/SocioService';

function SocioForm({ onSubmit, socioEditado }) {
  const [formData, setFormData] = useState({
    dni: '',
    nombre: '',
    apellido: '',
    direccion: '',
    telefono: '',
    correoElectronico: '',
    fechaNacimiento: ''
  });

  useEffect(() => {
    if (socioEditado) setFormData(socioEditado);
  }, [socioEditado]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      dni: '',
      nombre: '',
      apellido: '',
      direccion: '',
      telefono: '',
      correoElectronico: '',
      fechaNacimiento: ''
    });
  };

  return (
    <form className="socio-form" onSubmit={handleSubmit}>
      <input className="input" name="dni" placeholder="DNI" value={formData.dni} onChange={handleChange} />
      <input className="input" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} />
      <input className="input" name="apellido" placeholder="Apellido" value={formData.apellido} onChange={handleChange} />
      <input className="input" name="direccion" placeholder="Dirección" value={formData.direccion} onChange={handleChange} />
      <input className="input" name="telefono" placeholder="Teléfono" value={formData.telefono} onChange={handleChange} />
      <input className="input" name="correoElectronico" placeholder="Email" value={formData.correoElectronico} onChange={handleChange} />
      <input className="input" name="fechaNacimiento" type="date" value={formData.fechaNacimiento} onChange={handleChange} />
      <button className="btn" type="submit">{socioEditado ? 'Actualizar' : 'Registrar'}</button>
    </form>
  );
}

export default SocioForm;
