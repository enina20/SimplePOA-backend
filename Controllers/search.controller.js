
const { response } = require('express');
const bcrypt = require('bcryptjs');

const Client = require('../models/usuarios.models');
const Employee = require('../models/employees.models');
const Unidad = require('../models/executingUnit.models');

const getBusqueda = async (req, res = response) => {

    const termino = req.params.termino;
    const regex = new RegExp( termino, 'i');

    const [ clients, employees, unidades ] = await Promise.all([
        Client.find({ name: regex}),
        Employee.find({ name: regex}),
        Unidad.find({ name: regex}),
    ]);

    res.json({
        ok: true,
        clients,
        employees,
        unidades

    });
}


const getBusquedaPorColeccion = async (req, res = response) => {

    const termino = req.params.termino;
    const coleccion = req.params.coleccion;
    const regex = new RegExp( termino, 'i');

    let data = [];

    switch (coleccion) {
        case 'clients':
            data = await Client.find({ name: regex});
            break;
        case 'unidades':
            data = await Unidad.find({ name: regex})
                               .populate('manager', 'name');
            break;

        case 'empleados':
            data = await Employee.find({ name: regex})
                               .populate('user', 'name')
                               .populate('executingUnit', 'name');
            break;        
    
        default:
            res.status(400).json({ 
                ok: false,
                message: 'Error en las colecciones'
            });  
            break;
    }

    res.json({
        ok: true,
        resultados: data

    });
}


module.exports = {
    getBusqueda,
    getBusquedaPorColeccion
}