
const {Schema, model } = require('mongoose')

const ProgramaSchema = Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },
    direccion: {
        type: String,
        default: 'Consejo municipal'
    },
    status: {
        type: Boolean,
        default: true
    },
    fondo: {
        type: String,
        default: 'Fondo de funcionamiento'
    },
    tipo: {
        type: String,
        default: 'Funcionamiento'
    },
    proyectos: {
        type: String
    }
});




module.exports = model('Programa', ProgramaSchema);