const { response } = require('express');
const Employee = require('../models/employees.models');

const getEmployees = async (req, res) => {

    const employees = await Employee.find()
                                .populate('user', 'name')
                                .populate('executingUnit', 'name');

    res.json({
        ok: true,
        employees
    });
}

const createEmployees = async (req, res = response ) => {

    const { email } = req.body;   

    const employee = new Employee( {
        user: req.uid,
        ...req.body
    } );  
  
    try {

        const emailExists = await Employee.findOne({ email });

        if( emailExists ){
            return res.status(400).json({
                ok: false,
                message: 'El empleado ya esta registrado'
            });
        }

        const employeeDB = await employee.save()
        res.json({
            ok: true,
            employee: employeeDB
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            ok: false,
            message: 'Error en la base de datos'
        });        
    }
}   

const updateEmployees = async (req, res = response) => {

    const empId = req.params.id;

    try {

        const empleyeeDB = await Employee.findById( empId );
        if( !empleyeeDB ){
            return res.status(404).json({
                ok: false,
                message: 'No existe el empleado en la base de datos'
            });
        }

        // Employee update
        const {user, ...fields}  = req.body;

        const updatedEmployee = await Employee.findByIdAndUpdate( empId, fields, {new: true});

        res.json({
            ok: true,
            employee: updatedEmployee
        }) 
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            ok: false,
            
            message: 'Error en la base de datos'
        });         
    }
}

const deleteEmployees = async (req, res = response) => {
    
    const empId = req.params.id;

    try {
        const employeeDB = await Employee.findById( empId );
        if( !employeeDB ){
            return res.status(404).json({
                ok: false,
                message: 'No existe el usuario en la base de datos 1'
            });
        }
        
        // Delete Employee

         if( employeeDB.status ){       

            let changeStatus = {
                status: false
            };

            const updatedEmployee = await Employee.findByIdAndUpdate( empId, changeStatus, {new: true});
            
            res.json({
                ok: true,
                employee: updatedEmployee
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
    getEmployees,
    createEmployees,
    updateEmployees,
    deleteEmployees
}