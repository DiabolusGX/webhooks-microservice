import { Router } from 'express';

import webhooks from './webhook.js';
import user from './user.js';

const router = new Router();

router.use('/webhooks', webhooks);
router.use('/user', user);

export default router;