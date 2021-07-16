import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connection = mongoose.connect(process.env.MONGO_URI, {
    dbName: 'webhooks-microservice',
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
});

export default connection;