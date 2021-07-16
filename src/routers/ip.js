import { Router } from 'express';
import broker from '../services/webhooks.service.js';

const router = new Router();

// webhoook trigger
router.post('/', async (req, res) => {
    try {
        const ip = req.headers['x-forwarded-for']?.split(',').shift()
            || req.connection.remoteAddress;
        // service will return a promise and retry 5 times if it fails
        await broker.call('webhooks.trigger', { ipAddress: ip },  {
            timeout: 5000,
            retries: 5,
            fallbackResponse: defaultRecommendation
        });
        return res.status(200).json({
            message: 'Webhook triggered successfully'
        });
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

export default router;