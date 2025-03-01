import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { pythonApi } from "@/services/api"; // ✅ Correct path

const FileUpload = () => {
  const [files, setFiles] = useState([]); // Stores selected files
  const [uploadStatus, setUploadStatus] = useState(""); // Stores upload status
  const [uploadedFiles, setUploadedFiles] = useState([]); // Stores previous uploads

  // 🟢 Handle Drag & Drop Files
  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles);
    setUploadStatus(""); // Reset status when a new file is added
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ".csv,.xlsx,.json", // Only allow specific file types
  });

  // 🔥 Handle File Upload
  const handleUpload = async () => {
    if (files.length === 0) {
      setUploadStatus("❌ No file selected!");
      return;
    }

    const formData = new FormData();
    formData.append("file", files[0]); // Only upload the first file

    setUploadStatus("⏳ Uploading...");

    try {
      const response = await pythonApi.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        setUploadStatus("✅ File uploaded successfully!");
        setUploadedFiles((prev) => [...prev, files[0].name]); // Store file history
        setFiles([]); // Reset selected files
      } else {
        setUploadStatus(`❌ Upload failed: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Upload Error:", error);
      setUploadStatus("❌ Upload error! Check console for details.");
    }
  };

  return (
    <div className="file-upload-container">
      {/* Drag and Drop Area */}
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <p>📂 Drag & drop a file here, or click to select one.</p>
      </div>

      {/* Selected File Preview */}
      {files.length > 0 && (
        <div className="file-preview">
          <p>📝 Selected File: {files[0].name}</p>
          <button onClick={handleUpload} className="upload-btn">
            🚀 Upload File
          </button>
        </div>
      )}

      {/* Upload Status */}
      {uploadStatus && <p className="status-message">{uploadStatus}</p>}

      {/* Previously Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <div className="upload-history">
          <h3>📜 Upload History:</h3>
          <ul>
            {uploadedFiles.map((file, index) => (
              <li key={index}>✅ {file}</li>
            ))}
          </ul>
        </div>
      )}

      {/* CSS Styling */}
      <style jsx>{`
        .file-upload-container {
          max-width: 400px;
          margin: auto;
          text-align: center;
        }
        .dropzone {
          padding: 20px;
          border: 2px dashed #0070f3;
          border-radius: 8px;
          cursor: pointer;
          background-color: #f9f9f9;
          color: #000;
          transition: background 0.3s;
        }
        .dropzone:hover {
          background-color: #e0f2ff;
        }
        .file-preview {
          margin-top: 10px;
        }
        .upload-btn {
          background-color: #0070f3;
          color: white;
          border: none;
          padding: 10px;
          cursor: pointer;
          border-radius: 5px;
          margin-top: 10px;
        }
        .upload-btn:hover {
          background-color: #005bb5;
        }
        .status-message {
          margin-top: 10px;
          font-weight: bold;
        }
        .upload-history {
          margin-top: 20px;
          text-align: left;
        }
      `}</style>
    </div>
  );
};

export default FileUpload;
