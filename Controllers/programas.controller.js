const { response } = require('express');
const  Programa  = require('../models/programs.models');
const mongoose = require('mongoose');


const getPrograma = async (req, res) => {

    let desde = Number(req.query.desde) || 0;
    let limite =  Number( req.query.limite) || 5;

    const [progrmas, total] = await Promise.all([
        Programa.find()
                                .skip(desde)
                                .limit(limite),

        Programa.countDocuments()
    ]);

    res.json({
        ok: true,
        progrmas,
        total
    });
}

const createPrograma = async (req, res = response ) => {
    
    const { name } = req.body;   
    console.log(name);

    try {
        const nameExists = await Programa.findOne({name});

        if( nameExists ){
            return res.status(400).json({
                ok: false,
                message: 'El programa ya esta registrado'
            });
        }
        const programa = new Programa( req.body );

        //Save the client in the database
        await programa.save();

        res.json({
            ok: true,
            programa
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            ok: false,
            message: 'Error en la base de datos'
        });        
    }
}   

const updatePrograma = async (req, res = response) => {

    const promId = req.params.id;

    try {

        const programaDB = await Programa.findById( promId );
        if( !programaDB ){
            return res.status(404).json({
                ok: false,
                message: 'No existe la unidad ejecutora en la base de datos'
            });
        }

        // Unidad update
        const fields = req.body;
      
        const updatedPrograma = await Programa.findByIdAndUpdate( promId, fields, {new: true});

        res.json({
            ok: true,
            unidad: updatedPrograma
        })    
    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            ok: false,            
            message: 'Error en la base de datos'
        });         
    }
}

const deletePrograma = async (req, res = response) => {

    const promId = req.params.id;

    try {
         // Delete client
        let changeStatus = {
            status: false
        };

        const updatedPrograma = await Programa.findByIdAndUpdate( promId, changeStatus, {new: true});      
        
        res.json({
            ok: true,
            client: updatedPrograma
        }) 

    } catch (error) {
        res.status(500).json({ 
            ok: false,
            message: 'Error en la base de datos 3'
        });         
    }
}


module.exports = {
    getPrograma,
    createPrograma,
    updatePrograma,
    deletePrograma
}