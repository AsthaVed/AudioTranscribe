import multer from 'multer'; // Audio File upload handle
import path from 'path'; // 👈 1. get file extension .mp3, .wav

// DiskStorage configure
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Audio files 'uploads/' folder me save hongi
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // Extension nikalna (.mp3, .wav)
    cb(null, `${Date.now()}${ext}`);             // Unique naam (e.g. 1728612345.mp3)
  },
});

// Multer instance banayein
export const upload = multer({ storage });
