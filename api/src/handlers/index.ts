import express, { Router } from 'express';

import cors from '../middlewares/cors';

import login from './login';
import register from './register';
import health from './health';
import newCredit from './newCredit';

const router = Router();
router.use(cors);
router.use(express.json());
router.use(express.urlencoded( {extended: true} ));

router.post('/register', register);
router.post('/login', login);
router.post('/newCredit', newCredit);

router.get('/health', health);

export default router;
