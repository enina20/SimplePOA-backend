
const mongoose = require('mongoose');

const dbConnection = async() => {

    try {
        await mongoose.connect( process.env.BD_CONNECTION, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });     
        console.log('DB online');   
    } catch (error) {
        console.log(error);
        throw new Error('Error en la conexion a la Base de datos');
    }


    
}

module.exports = {
    dbConnection
}