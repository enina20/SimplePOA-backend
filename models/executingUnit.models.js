
const {Schema, model } = require('mongoose')

const ExecutingUnitSchema = Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: Boolean,
        default: true
    },
    manager: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Employee'
    },
    employees: {
        type: Number,
        default: 12
    },
    programs: {
        type: String,
        default: '10'
    }
}, { collection: 'unidades'});

ExecutingUnitSchema.method('toJSON', function(){
    const { __v, _id, ...object} = this.toObject();
    object.unitId = _id;
    return object;
});


module.exports = model('Unidad', ExecutingUnitSchema);