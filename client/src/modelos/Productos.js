import { useState, useEffect } from "react";
import Axios from "axios";

function Productos() {
    const [referencia, setReferencia] = useState("");
    const [nombre, setNombre] = useState("");
    const [valor, setValor] = useState("");
    const [idEditando, setIdEditando] = useState(null);
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        obtenerProductos();
    }, []);

    const obtenerProductos = () => {
        Axios.get("http://localhost:3001/productos")
            .then((res) => setProductos(res.data))
            .catch((err) => console.error(err));
    };

    const guardarProducto = () => {
        if (!referencia || !nombre || !valor) {
            alert("Por favor completa todos los campos");
            return;
        }

        if (idEditando) {
            Axios.put(`http://localhost:3001/productos/${idEditando}`, {
                referencia,
                nombre,
                valor,
            })
                .then(() => {
                    limpiarFormulario();
                    obtenerProductos();
                })
                .catch((err) => console.error(err));
        } else {
            Axios.post("http://localhost:3001/productos", {
                referencia,
                nombre,
                valor,
            })
                .then(() => {
                    limpiarFormulario();
                    obtenerProductos();
                })
                .catch((err) => console.error(err));
        }
    };

    const eliminarProducto = (id) => {
        if (window.confirm("¿Seguro que quieres eliminar este producto?")) {
            Axios.delete(`http://localhost:3001/productos/${id}`)
                .then(() => obtenerProductos())
                .catch((err) => console.error(err));
        }
    };

    const editarProducto = (producto) => {
        setReferencia(producto.referencia);
        setNombre(producto.nombre);
        setValor(producto.valor);
        setIdEditando(producto.id_producto);
    };

    const limpiarFormulario = () => {
        setReferencia("");
        setNombre("");
        setValor("");
        setIdEditando(null);
    };

    return (
        <div>
            <h1>CRUD Productos</h1>

            <div className="form">
                <input
                    type="text"
                    placeholder="Referencia"
                    value={referencia}
                    onChange={(e) => setReferencia(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Valor"
                    value={valor}
                    onChange={(e) => setValor(e.target.value)}
                />

                <button onClick={guardarProducto}>
                    {idEditando ? "Actualizar" : "Agregar"}
                </button>
                {idEditando && <button onClick={limpiarFormulario}>Cancelar</button>}
            </div>

            <table border="1" cellPadding="5" style={{ marginTop: "20px" }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Referencia</th>
                        <th>Nombre</th>
                        <th>Valor</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((p) => (
                        <tr key={p.id_producto}>
                            <td>{p.id_producto}</td>
                            <td>{p.referencia}</td>
                            <td>{p.nombre}</td>
                            <td>${p.valor}</td>
                            <td>
                                <button onClick={() => editarProducto(p)}>Editar</button>
                                <button onClick={() => eliminarProducto(p.id_producto)}>
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Productos;
