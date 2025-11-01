import { useState } from 'react';

function MembresiaForm({ onGuardar }) {
  const [tipo, setTipo] = useState('Mensual');
  const [fechaInicio, setFechaInicio] = useState(new Date().toISOString().slice(0, 10));
  const [fechaFin, setFechaFin] = useState('');
  const [costo, setCosto] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!fechaFin) {
      alert('Por favor completá la fecha de fin.');
      return;
    }

    const nuevaMembresia = {
      membresiaId: Date.now(), // ID temporal para renderizado
      tipo,
      fechaInicio,
      fechaFin,
      costo,
      pagoActivo: false,
      estado: 'Borrador',
      socioId: null,
      esBorrador: true
    };

    onGuardar?.(nuevaMembresia);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Tipo:</label>
      <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
        <option value="Mensual">Mensual</option>
        <option value="Anual">Anual</option>
        <option value="Premium">Premium</option>
      </select>

      <label>Fecha inicio:</label>
      <input type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} />

      <label>Fecha fin:</label>
      <input type="date" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} />

      <label>Costo:</label>
      <input type="number" value={costo} onChange={(e) => setCosto(e.target.value)} />

      <button type="submit">Guardar como borrador</button>
    </form>
  );
}

export default MembresiaForm;
