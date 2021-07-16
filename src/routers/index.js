import { Router } from 'express';

import webhooks from './webhook.js';
import user from './user.js';
import ip from './ip.js';

const router = new Router();

router.use('/webhook', webhooks);
router.use('/user', user);
router.use('/ip', ip);

export default router;