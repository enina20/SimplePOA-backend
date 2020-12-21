
const { response } = require('express');
const bcrypt = require('bcryptjs');

const Client = require('../models/usuarios.models');
const { generateJWT } = require('../Helpers/jwt');


const getClients = async (req, res) => {

    let desde = Number(req.query.desde) || 0;
    let limite =  Number( req.query.limite) || 5;

    const [clients, total] = await Promise.all([
        Client.find({}, 'name email role')
                                .skip(desde)
                                .limit(limite),

        Client.countDocuments()
    ]);

    res.json({
        ok: true,
        clients,
        total
    });
}

const getClientById = async (req, res) => {
    if(!mongoose.Types.ObjectId.isValid(promId)) {
        res.status(400).json({ 
            ok: false,            
            message: 'El id no es valido'
        });  

    }

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
    // if(!mongoose.Types.ObjectId.isValid(uid)) {
    //     res.status(400).json({ 
    //         ok: false,            
    //         message: 'El id no es valido'
    //     }); 
    // }

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