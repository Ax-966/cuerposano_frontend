import { useNavigate } from 'react-router-dom';
import RegisterForm from '../Components/RegisterForm';

function Register() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '2rem' }}>
      <RegisterForm onRegisterSuccess={() => navigate('/dashboard')} />
      <p>¿Ya tenés cuenta? <button onClick={() => navigate('/login')}>Iniciar sesión</button></p>
    </div>
  );
}

export default Register;
