import "./App.css";
import { useEffect, useState } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from 'sweetalert2';
import Login from "./Login";

function Principal({ usuario, onLogout }) {
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
function App() {
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
  const [editar, setEditar] = useState(false); // Estado para manejar la edición de un comprador
  const [compradoresList, setCompradores] = useState([]); // Estado para almacenar la lista de compradores obtenida del backend
// Formatea la fecha a yyyy-MM-dd para el input date
  const formatearFecha = (fechaISO) => {
  const fecha = new Date(fechaISO);
  const year = fecha.getFullYear();
  const month = String(fecha.getMonth() + 1).padStart(2, '0');
  const day = String(fecha.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

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

  const getCompradores = () => {
    Axios.get("http://localhost:3001/compradores").then((response) => {
      setCompradores(response.data);
    });
  };

  useEffect(() => {
    if (usuario && (usuario.id_rol === 1 || usuario.id_rol === 2)) {
      getCompradores();
    }
  }, [usuario]);

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
        // Si la petición es exitosa, muestra mensaje y loguea la respuesta
        getCompradores(); // Actualiza la lista de compradores
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

/// Función para actualizar un comprador existente en el backend -----------------------------------
  const update = () => {
    // Realiza una petición POST al endpoint de registro con los datos del formulario
    Axios.put("http://localhost:3001/actualizar", {
      id: id,
      nombres: nombres,
      apellidos: apellidos,
      tipo_documento: tipoDocumento,
      numero_documento: numeroDocumento,
      fecha_nacimiento: fechaNacimiento,
      correo: correo,
      password: password,
      departamento: departamento,
      ciudad: ciudad,
      direccion: direccion,
    }).then((response) => {
        getCompradores(); // Actualiza la lista de compradores
        //alert("Comprador ACTUALIZADO exitosamente");
        limpiarFormulario(); // Limpia el formulario después de actualizar
        Swal.fire({
          title: "<strong>Comprador ACTUALIZADO exitosamente!</strong>",
          html: "<i>El comprador <strong>"+nombres+" "+apellidos+"</strong> ha sido actualizado en la base de datos.</i>",
          icon: 'success',
          confirmButtonText: 'Aceptar',
          timer: 4000
        });
        //setEditar(false); // Cambia el estado de edición a falso
    })
    .catch((error) => {
        // Si ocurre un error, lo muestra en consola y alerta al usuario
        console.error("Error al actualizar el comprador:", error);
        alert("Error al actualizar el comprador");
        });
      };

/// Función para eliminar un comprador existente en el backend -----------------------------------
    const deleteComp = (id) => {
      const comprador = compradoresList.find(c => c.id === id);
      // Realiza una petición DELETE al endpoint de eliminar con el ID del comprador
      Swal.fire({
        title: "Confirmación de eliminación",
        html: `<i>Esta seguro que desea eliminar el comprador <strong>${comprador ? comprador.nombres + " " + comprador.apellidos : ""}</strong></i>`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#bd790bff",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, deseo borrarlo!",
      }).then((result) => {
          if (result.isConfirmed) {
            Axios.delete(`http://localhost:3001/eliminar/${id}`) //Acá se elimina por el id del comprador via URL
              .then((response) => {
                getCompradores(); // Actualiza la lista de compradores
                //alert("Comprador ACTUALIZADO exitosamente");
                limpiarFormulario(); // Limpia el formulario después de actualiza
                Swal.fire({
            title: "<strong>¡Eliminado!</strong>",
            html: `<i>El comprador <strong>${comprador ? comprador.nombres + " " + comprador.apellidos : ""}</strong> ha sido eliminado.</i>`,
            icon: "success",
            confirmButtonText: "Aceptar",
            timer: 3000
                });
              });
          }
        }).catch((error) => {
          // Si ocurre un error, lo muestra en consola y alerta al usuario
          console.error("Error al eliminar el comprador:", error);
          Swal.fire({
            title: "Error",
            text: "No se pudo eliminar el comprador.",
            icon: "error",
            confirmButtonText: "Aceptar"
          });
        });
    };
    

  const editarComprador = (val) => {
    // Actualiza los estados con los datos del comprador seleccionado para editar
      setEditar(true);
    // Aca extrae los campos del objeto comprador con val para editarlos
      setNombres(val.nombres);
      setApellidos(val.apellidos);
      setTipoDocumento(val.tipo_documento);
      setNumeroDocumento(val.numero_documento);
      setFechaNacimiento(formatearFecha(val.fecha_nacimiento));
      setCorreo(val.correo);
      setPassword(val.contraseña);
      setDepartamento(val.departamento);
      setCiudad(val.ciudad);
      setDireccion(val.direccion);
      setId(val.id);
  };

  if (!usuario) {
    return <Login setUsuario={setUsuario} />;
  }

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
        <div className="card-header">GESTION DE COMPRADORES</div>
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
            editar? 
            <div>
              <button className="btn btn-warning m-2" onClick={update}>Actualizar</button>
              <button className="btn btn-secondary m-2" onClick={() => {setEditar(false); limpiarFormulario(); }} >Cancelar</button>
            </div>
            : <button className="btn btn-success m-2" onClick={add}>Registrar</button>
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
        <tbody>
          {compradoresList.map((val, key) => {
            return (
              <tr key={val.id}>
                <th>{val.id}</th>
                <td>{val.nombres}</td>
                <td>{val.apellidos}</td>
                <td>{val.tipo_documento}</td>
                <td>{val.numero_documento}</td>
                <td>{val.correo}</td>
                <td>{val.departamento}</td>
                <td>{val.ciudad}</td>
                <td>{val.direccion}</td>
                <td>
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Basic example">
                    <button type="button"
                      onClick={() => editarComprador(val)}
                      className="btn btn-warning">Editar
                    </button>
                    <button type="button" onClick={()=>{
                      deleteComp(val.id);
                    }} className="btn btn-danger">Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
  return <Principal usuario={usuario} onLogout={() => setUsuario(null)} />;
}
export default App;
