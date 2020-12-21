
const {Schema, model } = require('mongoose')
const UsuarioSchema = Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: 'USER_ROLE'
    },
});

UsuarioSchema.method('toJSON', function(){
    const { __v, _id, password, ...object} = this.toObject();
    object.uid = _id;
    return object;
});


module.exports = model('Client', UsuarioSchema);