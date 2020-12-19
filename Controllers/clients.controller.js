
const { response } = require('express');
const bcrypt = require('bcryptjs');

const Client = require('../models/clients.models');
const { generateJWT } = require('../Helpers/jwt');


const getClients = async (req, res) => {

    const clients = await Client.find({}, 'name email role');
    res.json({
        ok: true,
        clients
    });
}

const getClientById = async (req, res) => {

    const clients = await Client.find({}, 'name email role');
    res.json({
        ok: true,
        clients
    });
}

const createClients = async (req, res = response ) => {

    const { email, password } = req.body;   
    try {
        const emailExists = await Client.findOne({ email });

        if( emailExists ){
            return res.status(400).json({
                ok: false,
                message: 'El correo ya esta registrado'
            });
        }
        const client = new Client( req.body );

        //Password encryption
        const salt = bcrypt.genSaltSync();
        client.password = bcrypt.hashSync( password, salt );

        //Save the client in the database
        await client.save();

        //Generate token
        const token = await generateJWT(client.id);

        res.json({
            ok: true,
            token,
            client
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            ok: false,
            message: 'Error en la base de datos'
        });        
    }
}   

const updateClient = async (req, res = response) => {

    const uid = req.params.id;

    try {

        const clientDB = await Client.findById( uid );
        if( !clientDB ){
            return res.status(404).json({
                ok: false,
                message: 'No existe el usuario en la base de datos'
            });
        }

        // Client update
        const {email, google, role, ...fields}  = req.body;

        if( clientDB.email !== email ){

            const emailExists = await Client.findOne({ email });
            if( emailExists ){
                return res.status(400).json({
                    ok: false,
                    message: 'El correo ya esta registrado'
                });
            }
        }

        fields.email = email;
        const updatedClient = await Client.findByIdAndUpdate( uid, fields, {new: true});

        res.json({
            ok: true,
            client: updatedClient
        })    
    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            ok: false,
            
            message: 'Error en la base de datos'
        });         
    }
}

const deleteClient = async (req, res = response) => {
    
    const uid = req.params.id;

    try {
        const clientDB = await Client.findById( uid );
        if( !clientDB ){
            return res.status(404).json({
                ok: false,
                message: 'No existe el usuario en la base de datos 1'
            });
        }
        
        // Delete client

         if( clientDB.status ){       

            let changeStatus = {
                status: false
            };

            const updatedClient = await Client.findByIdAndUpdate( uid, changeStatus, {new: true});
            
            res.json({
                ok: true,
                client: updatedClient
            })    
   
         }else{
            return res.status(404).json({
                ok: false,
                message: 'No existe el usuario en la base de datos 2'
            });
        }        
        
    } catch (error) {
        res.status(500).json({ 
            ok: false,
            message: 'Error en la base de datos 3'
        });         
    }
}


module.exports = {
    getClients,
    createClients,
    updateClient, 
    deleteClient,
    getClientById
}