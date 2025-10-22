function CarnetCard({ socio }) {
  if (!socio) return null;

  return (
    <div className="carnet-card">
      <h3>Carnet de Socio</h3>
      <p><strong>Nombre:</strong> {socio.nombre} {socio.apellido}</p>
      <p><strong>Email:</strong> {socio.correoElectronico}</p>
      <p><strong>Fecha de nacimiento:</strong> {socio.fechaNacimiento}</p>
      <p><strong>Código de socio:</strong> #{socio.socioId}</p>
    </div>
  );
}
export default CarnetCard;
