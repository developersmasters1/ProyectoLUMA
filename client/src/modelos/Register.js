import "./App.css";
import { useEffect, useState } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from 'sweetalert2';

function Register({ usuario, onLogout }) {
  return (
    <div className="container mt-5">
      <div className="card text-center">
        <div className="card-header bg-primary text-white">
          Bienvenido a LUMA
        </div>
        <div className="card-body">
          <h3 className="card-title">¡Hola, {usuario.nombres}!</h3>
          <p className="card-text">
            Gracias por ser parte de nuestra comunidad de compradores.<br />
            Aquí podrás consultar tus compras, ver productos destacados y mucho más.
          </p>
          <button className="btn btn-outline-danger" onClick={onLogout}>
            Cerrar sesión
          </button>
        </div>
        <div className="card-footer text-muted">
          Tu rol: <b>{usuario.id_rol}</b>
        </div>
      </div>
    </div>
  );
}
// Componente principal de la aplicación
function Reg() {
  // Definición de los estados para cada campo del formulario
  const [usuario, setUsuario] = useState(null);
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [tipoDocumento, setTipoDocumento] = useState("");
  const [numeroDocumento, setNumeroDocumento] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("yyyy-MM-ddT05:00:00.000Z");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [direccion, setDireccion] = useState("");
  const [id, setId] = useState(0);


  const limpiarFormulario = () => {
    setNombres("");
    setApellidos("");
    setTipoDocumento("");
    setNumeroDocumento("");
    setFechaNacimiento("");
    setCorreo("");
    setPassword("");
    setDepartamento("");
    setCiudad("");
    setDireccion("");
    setId(0);
  };
useEffect(() => {
    limpiarFormulario();
}, []);

/// Función para registrar un nuevo comprador en el backend -----------------------------------
  const add = () => {
    // Realiza una petición POST al endpoint de registro con los datos del formulario
    Axios.post("http://localhost:3001/registrar", {
      nombre: nombres,
      apellido: apellidos,
      tipoDocumento: tipoDocumento,
      numeroDocumento: numeroDocumento,
      fechaNacimiento: fechaNacimiento,
      correo: correo,
      password: password,
      departamento: departamento,
      ciudad: ciudad,
      direccion: direccion,
    })
      .then((response) => {
        limpiarFormulario(); // Limpia el formulario en caso de error
        Swal.fire({
          title: "<strong>Comprador REGISTRADO exitosamente!</strong>",
          html: "<i>El comprador <strong>"+nombres+" "+apellidos+"</strong> ha sido guardado en la base de datos.</i>",
          icon: 'success',
          confirmButtonText: 'Aceptar',
          timer: 3000
        });
        //alert("Comprador registrado exitosamente");
      })
      .catch((error) => {
        // Si ocurre un error, lo muestra en consola y alerta al usuario
        console.error("Error al registrar el comprador:", error);
        alert("Error al registrar el comprador");
      });
  };


  
  if (usuario.id_rol === 1|| usuario.id_rol === 2) {
    const obtenerNombreRol = (id_rol) => {
      if (id_rol === 1) return "Administrador";
      if (id_rol === 2) return "Vendedor";
    return "Comprador";
};
  // Renderizado del formulario de registro con los campos necesarios -------------------------------
  return (
    <div className="container mt-5">
      <h2>Bienvenido a LUMA</h2>
      <h5>Gestion Empresarial de Compradores</h5>
      <p>Hola {usuario.nombres}, tu rol {usuario.id_rol} es <b>{obtenerNombreRol(usuario.id_rol)}</b></p>
      <div class="d-grid gap-2 d-md-flex justify-content-md-end">
      <button className="btn btn-outline-danger" onClick={() => setUsuario(null)}>Cerrar sesión</button>
      </div> 
      <div className="card text-center">
        <div className="card-header">REGISTRO DE CLIENTES</div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Nombre:
            </span>
            <input
              type="text"
              onChange={(event) => setNombres(event.target.value)}
              className="form-control"
              placeholder="Ingrese un nombre"
              aria-label="Ingrese un nombre"
              aria-describedby="basic-addon1"
              value={nombres}
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon2">
              Apellido:
            </span>
            <input
              type="text"
              value={apellidos}
              onChange={(event) => setApellidos(event.target.value)}
              className="form-control"
              placeholder="Ingrese un apellido"
              aria-label="Ingrese un apellido"
              aria-describedby="basic-addon2"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon3">
              Tipo de Documento:
            </span>
            <select
              className="form-select"
              value={tipoDocumento}
              onChange={(event) => setTipoDocumento(event.target.value)}
              aria-label="Seleccione el tipo de documento"
              aria-describedby="basic-addon3"
            >
              <option value="">Seleccione...</option>
              <option value="CC">Cédula de Ciudadanía</option>
              <option value="TI">Tarjeta de Identidad</option>
              <option value="CE">Cédula de Extranjería</option>
              <option value="PA">Pasaporte</option>
            </select>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon4">
              Número de Documento:
            </span>
            <input
              type="number"
              value={numeroDocumento}
              onChange={(event) => setNumeroDocumento(event.target.value)}
              className="form-control"
              placeholder="Ingrese el número de documento"
              aria-label="Ingrese el número de documento"
              aria-describedby="basic-addon4"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon5">
              Fecha de Nacimiento:
            </span>
            <input
              type="date"
              value={fechaNacimiento}
              onChange={(event) => setFechaNacimiento(event.target.value)}
              className="form-control"
              aria-label="Elija su fecha de nacimiento"
              aria-describedby="basic-addon5"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon6">
              Correo:
            </span>
            <input
              type="email"
              value={correo}
              onChange={(event) => setCorreo(event.target.value)}
              className="form-control"
              placeholder="Ingrese un correo"
              aria-label="Ingrese un correo"
              aria-describedby="basic-addon6"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon7">
              Contraseña:
            </span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="form-control"
              placeholder="Ingrese la contraseña"
              aria-label="Ingrese la contraseña"
              aria-describedby="basic-addon7"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon8">
              Departamento:
            </span>
            <input
              type="text"
              value={departamento}
              onChange={(event) => setDepartamento(event.target.value)}
              className="form-control"
              placeholder="Ingrese el departamento donde vive"
              aria-label="Ingrese el departamento donde vive"
              aria-describedby="basic-addon8"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon9">
              Ciudad:
            </span>
            <input
              type="text"
              value={ciudad}
              onChange={(event) => setCiudad(event.target.value)}
              className="form-control"
              placeholder="Ingrese la ciudad donde vive"
              aria-label="Ingrese la ciudad donde vive"
              aria-describedby="basic-addon9"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon10">
              Dirección:
            </span>
            <input
              type="text"
              value={direccion}
              onChange={(event) => setDireccion(event.target.value)}
              className="form-control"
              placeholder="Ingrese la dirección donde vive"
              aria-label="Ingrese la dirección donde vive"
              aria-describedby="basic-addon10"
            />
          </div>
        </div>
        <div className="card-footer text-muted">
          {
            <button className="btn btn-success m-2" onClick={add}>Registrar</button>
          }
        </div>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Apellido</th>
            <th scope="col">Tipo Doc</th>
            <th scope="col"># Doc</th>
            <th scope="col">Correo</th>
            <th scope="col">Departamento</th>
            <th scope="col">Ciudad</th>
            <th scope="col">Dirección</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
      </table>
    </div>
  );
}
  return <Register usuario={usuario} onLogout={() => setUsuario(null)} />;
}
export default Reg;
