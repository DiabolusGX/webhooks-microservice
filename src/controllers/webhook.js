import Moleculer from 'moleculer';
import Webhook from '../database/Models/Webhook.js';

// create webhook
export const createWebhook = async (req, res) => {
    const webhook = new Webhook({ url: req.query.targetUrl });
    try {
        const newWebhook = await webhook.save();
        return res.status(200).json({
            message: 'Webhook created successfully',
            webhook: newWebhook
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// trigger webhook
export const triggerWebhook = async (req, res) => {
    const webhook = await Webhook.findOne({ _id: req.query.id });
    if (!webhook) {
        return res.status(404).json({ error: 'Webhook not found' });
    }
    try {
        const ip = (req.headers['x-forwarded-for'] || '').split(',').pop().trim() ||
            req.socket.remoteAddress;
        return res.status(200).json({
            message: 'Webhook triggered successfully'
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// list all webhooks from database
export const listWebhooks = async (req, res) => {
    try {
        const webhooks = await Webhook.find();
        return res.status(200).json({
            message: 'Successfully fetched all webhooks',
            webhooks
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

// update webhook
export const updateWebhook = async (req, res) => {
    try {
        const webhook = await Webhook.findOne({ _id: req.query.id });
        if (!webhook) {
            return res.status(404).json({ error: 'Webhook not found' });
        }
        const updatedWebhook = await Webhook.findByIdAndUpdate(
            req.query.id,
            { url: req.query.targetUrl },
            { new: true }
        );
        return res.status(200).json({
            message: 'Webhook updated successfully',
            updatedWebhook
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

// delete webhook
export const deleteWebhook = async (req, res) => {
    try {
        const webhook = await Webhook.findByIdAndDelete(req.query.id);
        return res.status(200).json({
            message: 'Webhook deleted successfully',
            webhook
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}