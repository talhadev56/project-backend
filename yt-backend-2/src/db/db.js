const mongooose = require('mongoose')

async function connectDB(){
    try{
        await mongooose.connect(process.env.MONGODB_URI);
        console.log("Database connected suceesfully");
    }
    catch(error){
        console.error('database connection error:',error);
    }
}

module.exports = connectDB;