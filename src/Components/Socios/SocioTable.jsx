function SocioTable({ miembros, onEdit, onDelete }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Email</th>
          <th>Teléfono</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {miembros.map((socio) => (
          <tr key={socio.socioId}>
            <td>{socio.nombre} {socio.apellido}</td>
            <td>{socio.correoElectronico}</td>
            <td>{socio.telefono}</td>
            <td>
              <button onClick={() => onEdit(socio)}>Editar</button>
              <button onClick={() => onDelete(socio.socioId)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default SocioTable;
