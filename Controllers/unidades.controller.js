const { response } = require('express');

const Unidad = require('../models/executingUnit.models');

const getUnidades = async (req, res) => {

    const unidades = await Unidad.find();

    res.json({
        ok: true,
        unidades
    });
}

const createUnidades = async (req, res = response ) => {

    const { name } = req.body;     
    
    try {
        const nameExists = await Unidad.findOne({name});

        if( nameExists ){
            return res.status(400).json({
                ok: false,
                message: 'La unidad ya esta registrada'
            });
        }

        const unidad = new Unidad( {
            manager: req.uid,
            ...req.body
        } );  

        const unidadBD = await unidad.save();

        res.json({
            ok: true,
            unidad: unidadBD
            
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            ok: false,
            message: 'Error en la base de datos'
        });        
    }
}   

const updateUnidad = async (req, res = response) => {

    const unitId = req.params.id;

    try {

        const unidadDB = await Unidad.findById( unitId );
        if( !unidadDB ){
            return res.status(404).json({
                ok: false,
                message: 'No existe la unidad ejecutora en la base de datos'
            });
        }

        // Unidad update
        const fields = req.body;
      
        const updatedUnidad = await Unidad.findByIdAndUpdate( unitId, fields, {new: true});

        res.json({
            ok: true,
            unidad: updatedUnidad
        })    
    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            ok: false,            
            message: 'Error en la base de datos'
        });         
    }
}

const deleteUnidad = async (req, res = response) => {
    
    const unitId = req.params.id;

    try {
         // Delete client
        let changeStatus = {
            status: false
        };

        const updatedUnidad = await Unidad.findByIdAndUpdate( unitId, changeStatus, {new: true});      
        
        res.json({
            ok: true,
            client: updatedUnidad
        }) 

    } catch (error) {
        res.status(500).json({ 
            ok: false,
            message: 'Error en la base de datos 3'
        });         
    }
}


module.exports = {
    getUnidades,
    createUnidades,
    updateUnidad,
    deleteUnidad
}