import mongoose from "mongoose"

const dbConnection = async () => {
    const MONGO_HOST = "localhost"
    const MONGO_DB = "users_credentials"

    const URI = `mongodb://${MONGO_HOST}/${MONGO_DB}`;
    
    try {
        await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('🌿 Data base successfully connected');
    }
    catch (error) {
        console.log(error);
        throw new Error('Error with the db')
    }
    
    // try {
    //     await mongoose.connect(process.env.MONGODB_URI, {
    //         useNewUrlParser: true,
    //         useUnifiedTopology: true,
    //     });

    //     console.log('🌿 Data base successfully connected');
    // }
    // catch (error) {
    //     console.log(error);
    //     throw new Error('Error with the db')
    // }
}

export default dbConnection