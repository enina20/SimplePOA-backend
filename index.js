require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');


//Create the express server
const app = express();

//Configure CORS
app.use( cors() );

//Conexion a la base de datos
dbConnection();

//Routes
app.get( '/', (req, res) => {
    res.json({
        ok: true,
        message: 'Hola mundo'
    });
});


app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
})