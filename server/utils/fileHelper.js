import fs from 'fs';

// File ko safely delete karne ke liye helper function
export const deleteFile = (filePath) => {
  if (filePath && fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};