import { useEffect, useState } from 'react';
import {
  getMembresias,
  crearMembresia,
  eliminarMembresia,
  actualizarMembresia
} from '../services/MembresiaService';
import { registrarCobro } from '../services/CobroService';
import { crearFactura } from '../services/FacturaService';

import MembresiaForm from '../Components/Membresias/MembresiaForm';
import MembresiaTable from '../Components/Membresias/MembresiaTable';
import FacturaCard from '../Components/Membresias/FacturaCard';

import SocioSearchBar from '../Components/Socios/SocioSearchBar';
import SocioResults from '../Components/Socios/SocioResults';

function MembresiaPanel() {
  const [membresias, setMembresias] = useState([]);
  const [borradores, setBorradores] = useState([]);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [membresiaPendiente, setMembresiaPendiente] = useState(null);
  const [facturaGenerada, setFacturaGenerada] = useState(null);
  const [membresiaEditando, setMembresiaEditando] = useState(null);

  const cargarMembresias = async () => {
    const res = await getMembresias();
    setMembresias(res.data);
  };

  useEffect(() => {
    cargarMembresias();
  }, []);

  const calcularFechas = (tipo) => {
    const inicio = new Date();
    let fin = new Date(inicio);

    switch (tipo) {
      case 'Mensual':
        fin.setDate(inicio.getDate() + 30);
        break;
      case 'Anual':
        fin.setFullYear(inicio.getFullYear() + 1);
        break;
      case 'Premium':
        fin.setMonth(inicio.getMonth() + 6);
        break;
      default:
        fin.setDate(inicio.getDate() + 30);
    }

    return {
      fechaInicio: inicio.toISOString(),
      fechaFin: fin.toISOString()
    };
  };

  const handleCrear = () => {
    setMostrarForm(true);
    setMembresiaEditando(null);
  };

  const handleGuardarBorrador = (borrador) => {
    if (membresiaEditando) {
      const actualizada = { ...borrador, membresiaId: membresiaEditando.membresiaId };
      actualizarMembresia(actualizada.membresiaId, actualizada)
        .then(() => {
          alert('Membresía actualizada');
          cargarMembresias();
        })
        .catch((err) => {
          console.error('Error al actualizar membresía:', err);
          alert('No se pudo actualizar la membresía.');
        });
    } else {
      setBorradores([...borradores, borrador]);
    }

    setMostrarForm(false);
    setMembresiaEditando(null);
  };

  const handleAsignarSocio = (borrador) => {
    setMembresiaPendiente(borrador);
  };

  const confirmarAsociacion = async (socio) => {
    if (!socio?.socioId || !membresiaPendiente) return;

    const { fechaInicio, fechaFin } = calcularFechas(membresiaPendiente.tipo);

    const membresiaFinal = {
      tipo: membresiaPendiente.tipo,
      fechaInicio,
      fechaFin,
      costo: membresiaPendiente.costo,
      socioId: socio.socioId
    };

    try {
      await crearMembresia(membresiaFinal);
      setBorradores(borradores.filter((b) => b !== membresiaPendiente));
      setMembresiaPendiente(null);
      cargarMembresias();
    } catch (error) {
      console.error('Error al crear membresía:', error);
      alert('No se pudo crear la membresía. Verificá los datos.');
    }
  };

  const handleCobrar = async (membresia) => {
    if (membresia.pagoActivo) {
      alert('Esta membresía ya fue cobrada. No se puede emitir otra factura.');
      return;
    }

    try {
      const cobro = {
        fechaCobro: new Date().toISOString(),
        monto: membresia.costo,
        metodoPago: 'Efectivo',
        estado: 'Pagado',
        membresiaId: membresia.membresiaId
      };

      const cobroRes = await registrarCobro(cobro);

      const factura = {
        numeroFactura: `F-${Date.now().toString().slice(-4)}`,
        fechaEmision: new Date().toISOString(),
        estado: 'Emitida',
        cobros: [cobroRes.data.cobroId]
      };

      const res = await crearFactura(factura);
      setFacturaGenerada(res.data);
      cargarMembresias();
    } catch (error) {
      console.error('Error al cobrar:', error);
      alert('No se pudo registrar el cobro.');
    }
  };

  const handleEliminar = async (id) => {
    try {
      await eliminarMembresia(id);
      cargarMembresias();
    } catch (error) {
      console.error('Error al eliminar membresía:', error);
      alert('No se pudo eliminar la membresía.');
    }
  };

  const handleEditar = (membresia) => {
    setMostrarForm(true);
    setMembresiaEditando(membresia);
  };

  return (
    <div>
      <h2>Gestión de Membresías</h2>
      <button onClick={handleCrear}>Nueva membresía</button>

      {mostrarForm && (
        <MembresiaForm
          onGuardar={handleGuardarBorrador}
          membresiaInicial={membresiaEditando}
        />
      )}

      <MembresiaTable
        membresias={[...borradores, ...membresias]}
        onCobrar={handleCobrar}
        onEliminar={handleEliminar}
        onEditar={handleEditar}
        onAsignarSocio={handleAsignarSocio}
      />

      {membresiaPendiente && (
        <div style={{ marginTop: '1rem', padding: '1rem', border: '1px solid #ccc' }}>
          <h4>Buscar y asociar socio</h4>
          <SocioSearchBar />
          <SocioResults membresiaPendiente={membresiaPendiente} />
          <button onClick={() => setMembresiaPendiente(null)}>Cancelar</button>
        </div>
      )}

      {facturaGenerada && <FacturaCard factura={facturaGenerada} />}
    </div>
  );
}

export default MembresiaPanel;
