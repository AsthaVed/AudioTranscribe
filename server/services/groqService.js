import fs from 'fs'; // Node.js ka built-in tool jisse computer ki files ko read (fs.createReadStream) ya delete (fs.unlinkSync) karte hain.
import Groq from 'groq-sdk'; //Whisper AI model se speech-to-text convert



export const transcribeWithGroq = async (filePath) => {

  // NOTE: ES Module imports 'dotenv.config()' se pehle chalte hain, isliye Groq ko function ke andar initialize kiya taaki API_KEY undefined na mile.  
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
 
  const transcription = await groq.audio.transcriptions.create({
    file: fs.createReadStream(filePath),
    model: 'whisper-large-v3',
    response_format: 'json',
  });

  return transcription.text;
};
