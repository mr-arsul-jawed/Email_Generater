import express from 'express';
import { fixGrammar } from '../controllers/email.controllers.js';

const router = express.Router();

router.post('/fix-grammar', fixGrammar);

export default router;
