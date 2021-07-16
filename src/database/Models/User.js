import mongoose from 'mongoose';
const { model, Schema } = mongoose;
import passportLocalMongoose from 'passport-local-mongoose';

// create user schema
const User = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

// Add passportLocalMongoose plugin
User.plugin(passportLocalMongoose);

export default model('User', User);