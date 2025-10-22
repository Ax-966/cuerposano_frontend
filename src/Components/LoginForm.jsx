import { useState, useContext } from 'react';
import { login as loginApi } from '../services/AuthService';
import { AuthContext } from '../Context/AuthContext';

function LoginForm({ onLoginSuccess }) {
  const [credenciales, setCredenciales] = useState({ username: '', password: '', rol: 'Empleado' });
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext); // ✅ usamos el login del contexto

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginApi(credenciales);
      login(res.data.token); // ✅ actualiza el contexto
      onLoginSuccess(); // ✅ redirige
    } catch (err) {
      setError('Usuario o contraseña inválida.');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Ingreso al sistema</h2>
      <input
        type="text"
        placeholder="Usuario"
        value={credenciales.username}
        onChange={(e) => setCredenciales({ ...credenciales, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={credenciales.password}
        onChange={(e) => setCredenciales({ ...credenciales, password: e.target.value })}
      />
      <select
        value={credenciales.rol}
        onChange={(e) => setCredenciales({ ...credenciales, rol: e.target.value })}
      >
      </select>
      <button type="submit">Ingresar</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default LoginForm;
