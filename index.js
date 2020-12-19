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

//Routes
app.use( '/api/clients', require('./Routes/clients.routes'));
app.use( '/api/login', require('./Routes/auth.routes'));


app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
})