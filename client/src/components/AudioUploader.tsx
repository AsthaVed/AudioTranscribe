import { useState, useRef } from "react";
import axios from "axios";

const AudioUploader = () => {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [transcribedText, setTranscribedText] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAudioFile(file);
    }
  };

  const handleRemove = () => {
    setAudioFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUpload = async () => {
    if (!audioFile) {
      alert("Please select an audio file first!");
      return;
    }

    const formData = new FormData();
    formData.append("audio", audioFile);

    setIsLoading(true);

    try {
      // console.log("🚀 Sending audio to backend...");

      // Axios POST request (Axios automatically 'multipart/form-data' set kar leta hai)
      const response = await axios.post(
        "http://localhost:5000/api/transcribe",
        formData,
      );

      // Axios me 'response.json()' karne ki zaroorat nahi hoti, data sidha 'response.data' me milta hai
      const data = response.data;

      // console.log("✅ Server Response:", data);

      if (data.success) {
        setTranscribedText(data.data.transcribedText);
        // console.log("📝 Transcribed Text:", data.data.transcribedText);
      }
    } catch (error: any) {
      console.error("❌ Error uploading audio:", error);
      // Axios backend ke error message ko 'error.response.data.error' me deta hai
      const errorMessage =
        error.response?.data?.error ||
        "Could not connect to the backend server!";
      alert("Error: " + errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-lg bg-slate-800 p-8 rounded-2xl shadow-2xl shadow-black/60 border border-slate-700 text-center">
          {/* Title */}
          <h1 className="text-3xl font-extrabold mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Audio to Transcript
          </h1>
          <p className="text-sm mb-6 text-slate-400">
            Upload an audio file (.mp3, .wav, .m4a) to convert into text
          </p>

          {/* Upload Box */}
          <label
            htmlFor="audio-upload"
            className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-slate-600 hover:border-cyan-400 rounded-xl cursor-pointer bg-slate-900/50 hover:bg-slate-900 transition-all p-4"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <span className="text-4xl mb-2">🎙️</span>
              <p className="mb-1 text-sm text-slate-300">
                <span className="font-semibold text-cyan-400">
                  Click to upload
                </span>{" "}
                or drag and drop
              </p>
              <p className="text-xs text-slate-500">MP3, WAV, M4A, AAC</p>
            </div>

            {/* Hidden File Input */}
            <input
              id="audio-upload"
              ref={fileInputRef}
              type="file"
              accept="audio/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>

          {/* Audio Preview (On select File) */}
          {audioFile && (
            <div className="mt-6 p-4 bg-slate-700/50 rounded-xl border border-slate-600 text-left">
              <div className="flex items-center justify-between mb-4 gap-3">
                <p className="text-sm font-medium text-slate-200 flex items-center gap-1.5 min-w-0 truncate">
                  <span className="text-base">🎵</span>{" "}
                  <span className="truncate">
                    Selected:{" "}
                    <span className="text-cyan-400 font-semibold">
                      {audioFile.name}
                    </span>
                  </span>
                </p>

                {/* Sleek Pill Remove Button */}
                <button
                  type="button"
                  onClick={handleRemove}
                  className="text-xs px-2.5 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 border border-rose-500/20 hover:border-rose-500/40 transition-all duration-150 cursor-pointer flex items-center gap-1 font-medium shrink-0 shadow-sm"
                >
                  <span className="text-xs leading-none">✕</span>
                  <span>Remove</span>
                </button>
              </div>
              {/* Audio Player to listen preview */}
              <audio
                controls
                src={URL.createObjectURL(audioFile)}
                className="w-full h-10 mt-2"
              />
              {/* Bina server par bheje, user ki chuni hui audio ko turant browser me sunne (preview karne) ke liye URL.createObjectURL se temporary link banta hai. */}
            </div>
          )}

          {/* Action Button */}
          <button
            className="mt-6 w-full py-3 px-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold rounded-xl shadow-lg transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
            onClick={handleUpload}
            disabled={!audioFile || isLoading}
          >
            {isLoading ? "Transcribing... ⏳" : "Audio Transcribe 🚀"}
          </button>
        </div>

        {/* Transcribed Result Output */}
        {transcribedText && (
          <div className="mt-6 p-4 bg-slate-900/80 rounded-xl border border-cyan-500/30 text-left">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-cyan-400">
                📝 Transcribed Text:
              </h3>
              <button
                onClick={() => navigator.clipboard.writeText(transcribedText)}
                className="text-xs text-slate-400 hover:text-white cursor-pointer"
              >
                📋 Copy
              </button>
            </div>
            <p className="text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
              {transcribedText}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default AudioUploader;
