import mongoose from 'mongoose';
const { model, Schema } = mongoose;

const Webhook = new Schema({
    url: {
        type: String,
        required: true
    },
}, { timestamps: true });

export default model('Webhook', Webhook);