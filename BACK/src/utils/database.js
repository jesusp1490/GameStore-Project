const mongoose = require("mongoose");


const connectDb = async () => {
    try {
        //intenta conectarte a la base de datos
        const dataBase = await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser : true,            
            useUnifiedTopology : true
    })
        const {name, host} = dataBase.connection;
        console.log(`Connected to ${name} DB in host:${host}`);

    } catch (error) {
        console.log("I have an error",error);
    }
}

module.exports = { connectDb }; 