import express from 'express';  //Routes banane ke liye
import {upload} from '../middleware/uploadMiddleware.js';
import { transcribeAudio } from '../controllers/transcribeController.js';

const router = express.Router();

// 3. Audio Transcribe POST Route [Route -> Middleware (Multer) -> Controller]
router.post('/transcribe', upload.single('audio'), transcribeAudio);

export default router;