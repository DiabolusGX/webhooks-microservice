import { ServiceBroker } from "moleculer";
import Webhook from '../database/Models/Webhook.js';
import axios from 'axios';

// Create a ServiceBroker
const broker = new ServiceBroker({
    nodeID: "node-1",
    requestTimeout: 5000,
    // enable retries on failed requests
    retryPolicy: {
        enabled: true, // enable retries
        retries: 5, // number of retries
        delay: 100, // delay between retries
        maxDelay: 2000, // maximum delay
        factor: 2, // multiplier for delay
        check: err => err && !!err.retryable // check if retryable
    },
    // control concurrent request handling
    bulkhead: {
        enabled: true, // enable bulkhead
        concurrency: 20, // max concurrent requests
        maxQueueSize: 20, // max queue size
    },
    errorHandler(err, info) {
        this.logger.warn("Log the error:", err);
        throw err;
    }
});

// Define a service
const svc = broker.createService({
    name: "webhooks",
    settings: {
        server: false
    },
    actions: {

        // Add a new webhook
        register(ctx) {
            return new Webhook({ targetUrl: ctx.targetUrl }).save();
        },

        // Update a webhook
        update(ctx) {
            return Webhook.findByIdAndUpdate(
                ctx.id, { targetUrl: ctx.targetUrl }, { new: true }
            );
        },

        // List all webhooks
        list(_ctx) {
            return Webhook.find();
        },

        // Trigger a webhook
        async trigger(ctx) {
            const webhooks = await Webhook.find().select({ 'targetUrl': 1, '_id': 0 });

            webhooks.forEach(webhook =>
                // retry requsets 5 times
                axios.post(webhook.targetUrl, {
                    ip: ctx.ipAddress || 'no IP found',
                    UNIX_Timestamp: Math.floor(Date.now() / 1000)
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    retry: {
                        retries: 5,
                        delay: 100,
                        maxDelay: 2000,
                        factor: 2,
                        check: err => err && !!err.retryable
                    }
                }).then((res) => {
                    console.log("sent", res);
                }).catch(err => {
                    this.logger.warn(`Webhook failed: ${webhook.targetUrl}`, err);
                })
            );
        }
    }
});

export default broker;