import { useState } from "react";
import { createSocio } from "../../services/SocioService";
import { crearMembresia } from "../../services/MembresiaService";


export default function SimularPago({ socio, onPagoConfirmado }) {
  const [pagoExitoso, setPagoExitoso] = useState(false);
  const [procesando, setProcesando] = useState(false);

  const handleConfirmarPago = async () => {
    setProcesando(true);
    try {
      // Simulamos confirmación del pago (puede ir tu lógica real acá)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // ✅ Ahora sí, recién creamos el socio en la base
      const resSocio = await createSocio(socio);

      // ✅ Luego creamos la membresía asociada
      await crearMembresia({
        socioId: resSocio.idSocio,
        tipo: "Mensual",
        fechaInicio: new Date().toISOString(),
        fechaFin: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString(),
      });

      setPagoExitoso(true);
      onPagoConfirmado(resSocio);
    } catch (error) {
      console.error("Error al confirmar pago:", error);
      alert("Ocurrió un error al procesar el pago.");
    } finally {
      setProcesando(false);
    }
  };

  return (
    <div className="simular-pago">
      {!pagoExitoso ? (
        <>
          <h3>Simular Pago</h3>
          <p>Monto: $10.000</p>
          <button onClick={handleConfirmarPago} disabled={procesando}>
            {procesando ? "Procesando..." : "Confirmar pago"}
          </button>
        </>
      ) : (
        <div className="pago-exitoso">
          <h3>✅ Pago confirmado</h3>
          <p>El socio fue registrado exitosamente.</p>
        </div>
      )}
    </div>
  );
}
