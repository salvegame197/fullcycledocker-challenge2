import { Router } from 'express';
import homeController from '../controllers/HomeControllers.js';

const router = new Router();

router.get('/', homeController.index);

export default router;
