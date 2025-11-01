function FacturaCard({ factura }) {
  return (
    <div className="factura-card">
      <h3>Factura #{factura.numeroFactura || factura.facturaId}</h3>
      <p><strong>Fecha de emisión:</strong> {new Date(factura.fechaEmision).toLocaleDateString()}</p>
      <p><strong>Estado:</strong> {factura.estado}</p>
      <p><strong>Total:</strong> ${factura.total}</p>

      <h4>Cobros asociados:</h4>
      <ul>
        {factura.cobros.map((cobro) => (
          <li key={cobro.cobroId}>
            ${cobro.monto} - {new Date(cobro.fechaCobro).toLocaleDateString()} - {cobro.metodoPago} ({cobro.estado})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FacturaCard;
