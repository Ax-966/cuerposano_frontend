// src/Layouts/ProtectedLayout.jsx
import LogoutButton from '../Components/LogoutButton';

function ProtectedLayout({ children }) {
  return (
    <div className="layout-protegido">
      <div className="barra-superior">
        <LogoutButton />
      </div>
      <div className="contenido">{children}</div>
    </div>
  );
}

export default ProtectedLayout;
