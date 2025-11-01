import { useState } from 'react';
import { registrarCobro } from '../../services/CobroService';

function CuotaForm({ membresiaId, monto, onSuccess }) {
  const [metodoPago, setMetodoPago] = useState('Efectivo');
  const [estado, setEstado] = useState('Pagado');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nuevoCobro = {
      fechaCobro: new Date().toISOString(),
      monto,
      metodoPago,
      estado,
      membresiaId
    };
    await registrarCobro(nuevoCobro);
    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Método de pago:</label>
      <select value={metodoPago} onChange={(e) => setMetodoPago(e.target.value)}>
        <option value="Efectivo">Efectivo</option>
        <option value="Tarjeta">Tarjeta</option>
        <option value="Transferencia">Transferencia</option>
      </select>

      <label>Estado:</label>
      <select value={estado} onChange={(e) => setEstado(e.target.value)}>
        <option value="Pagado">Pagado</option>
        <option value="Pendiente">Pendiente</option>
        <option value="Rechazado">Rechazado</option>
      </select>

      <button type="submit">Registrar cobro</button>
    </form>
  );
}

export default CuotaForm;
