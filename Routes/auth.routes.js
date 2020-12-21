/*
    Path: 'api/login'
*/


const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../Controllers/auth.controller');
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

router.post('/google',
    [
        check('token', 'La teken de google es requerida').not().isEmpty(),
        validateInformation,
    ],
    googleSignIn

);




module.exports = router;