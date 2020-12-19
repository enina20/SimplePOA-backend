
const { response } = require('express');
const bcrypt = require('bcryptjs'); 

const Client= require('../models/clients.models');
const { generateJWT } = require('../Helpers/jwt');

const login = async( req, res = response) => {

    const { email, password } = req.body;

    try {

        //verify email
        const clientDB = await Client.findOne({ email });

        if( !clientDB ){
            return res.status(404).json({
                ok: false,
                message: 'Email no encontrado'
            });
        }
        //verify password
        const validPassword = bcrypt.compareSync( password, clientDB.password)

        if( !validPassword ){
            return res.status(404).json({
                ok: false,
                message: 'Contrasena no valida'
            });
        }

        //Generate token
        const token = await generateJWT(clientDB.id);

        res.json({
            ok: true,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            ok: false,
            message: 'Error en la base de datos'
        });        
    }
}

module.exports = {
    login
}