import Webhook from '../database/Models/Webhook.js';
import broker from '../services/webhooks.service.js';

// create webhook
export const createWebhook = async (req, res) => {
    try {
        const webhook = await broker.call('webhooks.register', { targetUrl: req.query.targetUrl });
        return res.status(201).json({
            message: 'Webhook created',
            webhook
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// update webhook
export const updateWebhook = async (req, res) => {
    try {
        const webhook = await Webhook.findOne({ _id: req.query.id });
        if (!webhook) {
            return res.status(404).json({ error: 'Webhook not found' });
        }
        const newWebhook = await broker.call('webhooks.update', { id: req.query.id, targetUrl: req.query.targetUrl });
        return res.status(200).json({
            message: 'Webhook updated',
            webhook: newWebhook
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

// list all webhooks from database
export const listWebhooks = async (req, res) => {
    try {
        const webhooks = await broker.call('webhooks.list');
        return res.status(200).json({
            message: 'Successfully fetched all webhooks',
            webhooks
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

// trigger webhook
export const triggerWebhook = async (req, res) => {
    try {
        const ip = (req.headers['x-forwarded-for'] || '').split(',').pop().trim() ||
            req.socket.remoteAddress;
        await broker.call('webhooks.trigger', { ipAddress: ip });
        return res.status(200).json({
            message: 'Webhook triggered successfully'
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

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