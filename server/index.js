const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user:  'root',
    password: '901019Fn.',
    database: 'ecommerce'
});

// Metodo post para registrar un comprador.  Este endpoint permite registrar un nuevo comprador en la base de datos
app.post('/registrar', (req, res) => {
    const nombre = req.body.nombre;
    const apellido = req.body.apellido; 
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
        [nombre, apellido, tipoDocumento, numeroDocumento, fechaNacimiento, correo, password, departamento, ciudad, direccion],
        (error, result) => {
            if (error) {
                console.log("Error al registrar el comprador: ", error);
            }else {
            res.send('Comprador registrado exitosamente');
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
/*app.put('/actualizar', (req, res) => {
    const id = req.body.id;
    const nombre = req.body.nombre;
    const apellido = req.body.apellido; 
    const tipoDocumento = req.body.tipoDocumento;
    const numeroDocumento = req.body.numeroDocumento;
    const fechaNacimiento = req.body.fechaNacimiento;
    const correo = req.body.correo;
    const password = req.body.password;
    const departamento = req.body.departamento;
    const ciudad = req.body.ciudad;
    const direccion = req.body.direccion;

    // Inserta los todos los datos del comprador en la base de datos.  Utiliza una consulta SQL para insertar los datos en la tabla 'comprador'
    db.query('UPDATE comprador SET nombres=?, apellidos=?, tipo_documento=?, numero_documento=?, fecha_nacimiento=?, correo=?, contraseña=?, departamento=?, ciudad=?, direccion=?) WHERE id=?', 
        [nombre, apellido, tipoDocumento, numeroDocumento, fechaNacimiento, correo, password, departamento, ciudad, direccion, id],
        (error, result) => {
            if (error) {
                console.log("Error al registrar el comprador: ", error);
            }else {
            res.send('Comprador ACTUALIZADO exitosamente');
            }
        }
    );
});*/

app.listen(3001, () => {
    console.log('Servidor corriendo en el puerto 3001');
});
