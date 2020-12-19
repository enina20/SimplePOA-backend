/*
    Path: 'api/login'
*/


const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../Controllers/auth.controller');
const {validateInformation} = require('../Middlewares/validate-information');

const router = Router();

router.post('/',
    [
        check('password', 'La contrasenha es requerida').not().isEmpty(),
        check('email', 'El email es requerida').isEmail(),
        validateInformation,
    ],
    login

);




module.exports = router;