import express from 'express';
import { getVersion } from '../controllers/settingsController.js';

const router = express.Router();

router.get('/version', getVersion)


export default router;