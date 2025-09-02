import { useState } from "react";
import Axios from "axios";

function Login({ setUsuario }) {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/login", { correo, password })
      .then((res) => {
        setUsuario(res.data); // Guarda el usuario y su rol en el estado global
      })
      .catch(() => setError("Correo o contraseña incorrectos"));
  };

  return (
    <div className="container mt-5">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={e => setCorreo(e.target.value)}
          className="form-control mb-2"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="form-control mb-2"
          required
        />
        <button className="btn btn-primary" type="submit">Ingresar</button>
        {error && <div className="text-danger mt-2">{error}</div>}
      </form>
    </div>
  );
}

export default Login;