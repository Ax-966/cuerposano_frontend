import { useNavigate } from 'react-router-dom';
import LoginForm from '../Components/LoginForm';

function Login() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '2rem' }}>
      <LoginForm onLoginSuccess={() => navigate('/dashboard')} />
      <p>¿No tenés cuenta? <button onClick={() => navigate('/register')}>Registrate</button></p>
    </div>
  );
}

export default Login;
