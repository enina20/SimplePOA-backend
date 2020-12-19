/*
    Ruta: /api/clients
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validateInformation } = require('../Middlewares/validate-information');

const { getClients, createClients, updateClient, deleteClient } = require('../Controllers/clients.controller');
const { validateJWT } = require('../Middlewares/validate-jwt');

const router = Router();

router.get( '/', validateJWT, getClients);

router.post( '/',
 [
     check('name', 'El nombre es requerido').not().isEmpty(),
     check('password', 'La contrasenha es requerida').not().isEmpty(),
     check('email', 'El email es obligatorio').isEmail(),
     validateInformation,
 ],
 createClients
);

router.put( '/:id', validateJWT, updateClient);

router.delete( '/:id', validateJWT, deleteClient);

module.exports = router;