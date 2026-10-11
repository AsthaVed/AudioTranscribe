import Transcript from '../models/Transcript.js';  //Database Model
import { transcribeWithGroq } from '../services/groqService.js'; // Service use (AI)
import { deleteFile } from '../utils/fileHelper.js'; 

export const transcribeAudio = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Please upload an audio file' });
    }

    //Audio to text convert
    const text = await transcribeWithGroq(req.file.path);

    //Temp file delete 
    deleteFile(req.file.path);

    //save in DB
    const newTranscript = await Transcript.create({
      fileName: req.file.originalname,
      transcribedText: text,
    });

    res.status(200).json({ success: true, data: newTranscript });
  } catch (error) {
    deleteFile(req.file?.path);
    res.status(500).json({ success: false, error: error.message });
  }
};
