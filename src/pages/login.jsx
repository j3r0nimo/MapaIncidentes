import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importante para redireccionar sin recargar

export default function LoginAdmin() {
  const [error, setError] = useState(""); // Para mostrar mensajes de error en pantalla
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      const response = await fetch(`http://localhost:3001/admins?username=${username}&password=${password}`);
      const users = await response.json();

      if (users.length > 0) {

        localStorage.setItem('isAdmin', 'true');
        localStorage.setItem('adminName', users[0].nombre);

        navigate('/administracion',{replace: true});
      } else {
        setError("Usuario o contraseña incorrectos");
      }
    } catch (err) {
      console.error("Error conectando con json-server", err);
      setError("Error de conexión con el servidor");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Acceso Administrativo</h2>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Usuario</label>
            <input
              type="text"
              name="username"
              className="form-control"
              required
              autoFocus
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              name="password"
              className="form-control"
              required
            />
          </div>

          {error && (
            <div className="alert alert-danger text-center p-2" role="alert">
              {error}
            </div>
          )}

          <button type="submit" className="btn btn-dark w-100 mt-2">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
};
