import { model, Schema } from 'mongoose';

const Webhook = new Schema({
    url: {
        type: String,
        required: true
    },
});

export default model('Webhook', Webhook);