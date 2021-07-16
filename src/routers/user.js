import { Router } from 'express';

import { signup, login, logout, deleteUser, update } from '../controllers/user.js';
import { isAdmin, loginMiddleware, isLoggedIn } from '../Middleware/user.js';

const router = new Router();

// auth paths
router.post("/signup", signup);
router.post("/login", loginMiddleware, login);
router.post("/logout", isLoggedIn, logout);
router.delete("/delete", isAdmin, deleteUser);
router.patch("/update", isAdmin, update);

export default router;