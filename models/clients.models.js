
const {Schema, model } = require('mongoose')
const ClientSchema = Schema({

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
    imgUrl: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    google: {
        type: Boolean,
        default: false
    },
    dateOfBirth: {
        type: String,
    },
    telephone: {
        type: String
    }, 
    homeAddress: {
        type: String,
    },
    gender: {
        type: String,
    },
    status: {
        type: Boolean,
        default: true
    },
    executingUnitID: {

    },
    positionHeld: {
        type: String,
    },
    directorate: {
        type: String,
    }
});

ClientSchema.method('toJSON', function(){
    const { __v, _id, password, ...object} = this.toObject();
    object.uid = _id;
    return object;
});


module.exports = model('Client', ClientSchema);