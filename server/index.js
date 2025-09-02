const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
// Configura Express para usar CORS y JSON en las solicitudes HTTP (MIDDLEWARES)
app.use(cors());
app.use(express.json());
// Configura la conexión a la base de datos MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user:  'root',
    password: '901019Fn.',
    database: 'ecommerce'
});

//------------------- LOGIN USUARIOS POR ROL -------------------
// Metodo post para el login de usuarios por rol.  Este endpoint permite autenticar a un usuario en función de su rol (administrador, vendedor o comprador)
app.post('/login', (req, res) => {
const { correo, password } = req.body;
db.query(
    'SELECT id, nombres, apellidos, id_rol FROM comprador WHERE correo=? AND contraseña=?',
    [correo, password],
    (err, results) => {
    if (err) return res.status(500).json({ error: 'Error en el servidor' });
    if (results.length === 0) return res.status(401).json({ error: 'Credenciales incorrectas' });
      // Devuelve el usuario y su rol
    res.json({
        id: results[0].id,
        nombres: results[0].nombres,
        apellidos: results[0].apellidos,
        id_rol: results[0].id_rol,
        correo: results[0].correo
    });
    }
);
});

//------------------- CRUD COMPRADORES -------------------
// Metodo post para registrar un comprador.  Este endpoint permite registrar un nuevo comprador en la base de datos
app.post('/registrar', (req, res) => {
    const nombres = req.body.nombre;
    const apellidos = req.body.apellido; 
    const tipoDocumento = req.body.tipoDocumento;
    const numeroDocumento = req.body.numeroDocumento;
    const fechaNacimiento = req.body.fechaNacimiento;
    const correo = req.body.correo;
    const password = req.body.password;
    const departamento = req.body.departamento;
    const ciudad = req.body.ciudad;
    const direccion = req.body.direccion;

    // Inserta los todos los datos del comprador en la base de datos
    // Utiliza una consulta SQL para insertar los datos en la tabla 'comprador'
    db.query('INSERT INTO comprador (nombres, apellidos, tipo_documento, numero_documento, fecha_nacimiento, correo, contraseña, departamento, ciudad, direccion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [nombres, apellidos, tipoDocumento, numeroDocumento, fechaNacimiento, correo, password, departamento, ciudad, direccion],
        (error, result) => {
            if (error) {
                console.log("Error al registrar el comprador: ", error);
            }else {
            res.send('Comprador REGISTRADO exitosamente', result);
            }
        }
    );
});

// Metodo get para obtener todos los compradores.  Este endpoint permite obtener todos los compradores registrados en la base de datos
app.get('/compradores', (req, res) => {
    db.query('SELECT * FROM comprador', 
        (error, result) => {
            if (error) {
                console.log(error);
            }else {
            res.send(result);
            }
        }
    );
});

// Metodo put para actualizar un comprador.  Este endpoint permite actualizar los datos de un comprador en la base de datos
app.put('/actualizar', (req, res) => {
    const id = req.body.id;
    const nombres = req.body.nombres;
    const apellidos = req.body.apellidos; 
    const tipo_documento = req.body.tipo_documento;
    const numero_documento = req.body.numero_documento;
    const fecha_nacimiento = req.body.fecha_nacimiento;
    const correo = req.body.correo;
    const password = req.body.password;
    const departamento = req.body.departamento;
    const ciudad = req.body.ciudad;
    const direccion = req.body.direccion;

    // Inserta los todos los datos del comprador en la base de datos.  Utiliza una consulta SQL para insertar los datos en la tabla 'comprador'
    db.query('UPDATE comprador SET nombres=?, apellidos=?, tipo_documento=?, numero_documento=?, fecha_nacimiento=?, correo=?, contraseña=?, departamento=?, ciudad=?, direccion=? WHERE id=?', 
        [nombres, apellidos, tipo_documento, numero_documento, fecha_nacimiento, correo, password, departamento, ciudad, direccion, id],
        (error, result) => {
            if (error) {
                console.log("Error al actualizar el comprador: ", error);
            }else {
            res.send('Comprador ACTUALIZADO exitosamente', result);
            }
        }
    );
});

// Metodo delete para eliminar un comprador.  Este endpoint permite eliminar un comprador de la base de datos 
app.delete('/eliminar/:id', (req, res) => {
    const id = req.params.id;// Obtiene el ID del comprador a eliminar desde los parámetros de la URL con req.params.id, ya no al cuerpo de la solicitud

    // Inserta los todos los datos del comprador en la base de datos.  Utiliza una consulta SQL para insertar los datos en la tabla 'comprador'
    db.query('DELETE FROM comprador WHERE id=?', id,
        (error, result) => {
            if (error) {
                console.log("Error al eliminar el comprador: ", error);
            }else {
            res.send('Comprador ELIMINADO exitosamente', result);
            }
        }
    );
});

/* ------------------- CRUD PRODUCTOS -------------------
// Crear producto (POST)
app.post('/productos', (req, res) => {
    const { referencia, nombre, valor } = req.body;

    db.query(
        'INSERT INTO productos (referencia, nombre, valor) VALUES (?, ?, ?)',
        [referencia, nombre, valor],
        (error, result) => {
            if (error) {
                console.error('Error al registrar el producto:', error);
                return res.status(500).send('Error al registrar el producto');
            }
            res.send({ mensaje: 'Producto REGISTRADO exitosamente', id: result.insertId });
        }
    );
});

// Listar productos (GET)
app.get('/productos', (req, res) => {
    db.query('SELECT * FROM productos', (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Error al obtener productos');
        }
        res.send(result);
    });
});

// Actualizar producto (PUT)
app.put('/productos/:id', (req, res) => {
    const id = req.params.id;
    const { referencia, nombre, valor } = req.body;

    db.query(
        'UPDATE productos SET referencia=?, nombre=?, valor=? WHERE id_producto=?',
        [referencia, nombre, valor, id],
        (error, result) => {
            if (error) {
                console.error('Error al actualizar el producto:', error);
                return res.status(500).send('Error al actualizar el producto');
            }
            res.send({ mensaje: 'Producto ACTUALIZADO exitosamente' });
        }
    );
});

// Eliminar producto (DELETE)
app.delete('/productos/:id', (req, res) => {
    const id = req.params.id;

    db.query('DELETE FROM productos WHERE id_producto=?', [id], (error, result) => {
        if (error) {
            console.error('Error al eliminar el producto:', error);
            return res.status(500).send('Error al eliminar el producto');
        }
        res.send({ mensaje: 'Producto ELIMINADO exitosamente' });
    });
});
*/

app.listen(3001, () => {
    console.log('Servidor corriendo en el puerto 3001...');
});
