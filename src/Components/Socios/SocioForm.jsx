import { useState } from "react";

export default function SocioForm({ onSubmit }) {
  const [socio, setSocio] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    telefono: "",
    direccion: "",
    correoElectronico: "",
    fechaNacimiento: "",
  });

  const handleChange = (e) => {
    setSocio({ ...socio, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(socio); // ✅ Solo enviamos el socio al padre
  };

  return (
    <form onSubmit={handleSubmit} className="socio-form">
      <h3>Registrar socio</h3>

      <input type="text" name="nombre" placeholder="Nombre" value={socio.nombre} onChange={handleChange} required />
      <input type="text" name="apellido" placeholder="Apellido" value={socio.apellido} onChange={handleChange} required />
      <input type="text" name="dni" placeholder="DNI" value={socio.dni} onChange={handleChange} required />
      <input type="text" name="telefono" placeholder="Teléfono" value={socio.telefono} onChange={handleChange} />
      <input type="text" name="direccion" placeholder="Dirección" value={socio.direccion} onChange={handleChange} />
      <input type="email" name="correoElectronico" placeholder="Correo electrónico" value={socio.correoElectronico} onChange={handleChange} required />
      <input type="date" name="fechaNacimiento" value={socio.fechaNacimiento} onChange={handleChange} required />

      <button type="submit">Continuar al pago</button>
    </form>
  );
}
