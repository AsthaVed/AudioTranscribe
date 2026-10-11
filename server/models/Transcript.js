import mongoose from 'mongoose';

const transcriptSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
  },
  transcribedText: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Transcript = mongoose.model('Transcript', transcriptSchema);

export default Transcript;