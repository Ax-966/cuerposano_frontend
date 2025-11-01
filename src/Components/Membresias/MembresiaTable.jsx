function MembresiaTable({ membresias, onCobrar, onEditar, onEliminar, onAsignarSocio }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Tipo</th>
          <th>Inicio</th>
          <th>Fin</th>
          <th>Costo</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {membresias.map((m) => (
          <tr key={m.membresiaId}>
            <td>{m.tipo}</td>
            <td>{new Date(m.fechaInicio).toLocaleDateString()}</td>
            <td>{new Date(m.fechaFin).toLocaleDateString()}</td>
            <td>${m.costo}</td>
            <td>{m.estado}</td>
            <td>
              {m.esBorrador ? (
                <button onClick={() => onAsignarSocio(m)}>Asociar socio</button>
              ) : (
                <>
                  <button onClick={() => onCobrar(m)}>Cobrar</button>
                  <button onClick={() => onEditar(m)}>Editar</button>
                  <button onClick={() => onEliminar(m.membresiaId)}>Eliminar</button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default MembresiaTable;
