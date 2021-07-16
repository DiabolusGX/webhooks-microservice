import { Router } from 'express';

import { createWebhook, listWebhooks, updateWebhook, deleteWebhook } from '../controllers/webhook.js';
import { isAdmin } from '../Middleware/user.js';

const router = new Router();

router.post('/register', isAdmin, createWebhook);
router.get('/list', isAdmin, listWebhooks);
router.patch('/update', isAdmin, updateWebhook);
router.delete('/delete', isAdmin, deleteWebhook);

export default router;