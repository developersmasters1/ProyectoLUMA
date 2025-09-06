import { useState } from "react";
import Axios from "axios";
import "./Login.css";


function Login({ setUsuario }) {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/login", { correo, password })
      .then((res) => {
        setUsuario(res.data);
      })
      .catch(() => setError("Correo o contraseña incorrectos"));
  };

  return (
    <div className="login-bg">
      <header className="login-header">
        <h5>
          <img src="favicon-32x32.png" alt="lumalogo" className="login-logo" />
        </h5>
        <h1 className="login-title">Ingreso de Usuarios</h1>
        <hr className="login-hr" />
      </header>
      <main style={{ width: "100%" }}>
        <div className="login-card shadow-lg">
          <form autoComplete="off" onSubmit={handleLogin}>
            <h4 className="mb-4 text-center fw-semibold text-success">Inicia sesión</h4>
            <div className="mb-3">
              <label className="form-label login-form-label">Usuario o correo</label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fa fa-user"></i>
                </span>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Ingresa tu usuario o correo"
                  value={correo}
                  onChange={e => setCorreo(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="mb-2">
              <label className="form-label login-form-label">Contraseña</label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fa fa-lock"></i>
                </span>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="mb-3 text-end">
              <p className="small text-success">¿Olvidaste tu contraseña?</p>
            </div>
            <button type="submit" className="btn login-btn mb-2">Ingresar</button>
            <div className="text-center mt-2">
              <span>¿No tienes cuenta? <p className="text-success fw-semibold">Regístrate</p></span>
            </div>
            <p className="text-danger mt-3 text-center">{error}</p>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Login;
