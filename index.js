require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');


//Create the express server
const app = express();

//Configure CORS
app.use( cors() );

//Reading and parsing of information in the body
app.use(express.json());

//Conexion a la base de datos
dbConnection();

//Directorio publico
app.use(express.static('public'))

//Routes
app.use( '/api/usuarios', require('./Routes/clients.routes'));
app.use( '/api/empleados', require('./Routes/employees.routes'));
app.use( '/api/unidades', require('./Routes/unidades.routes'));
app.use( '/api/programas', require('./Routes/programas.routes'));
app.use( '/api/proyectos', require('./Routes/proyectos.routes'));
app.use( '/api/login', require('./Routes/auth.routes'));
app.use( '/api/buscar', require('./Routes/search.routes'));
app.use( '/api/subir', require('./Routes/uploads.routes'));


app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
})