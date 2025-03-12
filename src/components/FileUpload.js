import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { pythonApi } from "@/services/api"; // ✅ Correct path

const FileUpload = () => {
  const [files, setFiles] = useState([]); // Stores selected files
  const [uploadStatus, setUploadStatus] = useState(""); // Stores upload status
  const [uploadedFiles, setUploadedFiles] = useState([]); // Stores previous uploads

  // 🟢 Function to determine MIME type if missing
  const determineMimeType = (file) => {
    if (!file.type || file.type === "") {
      console.warn(`⚠️ File "${file.name}" has no MIME type. Assigning manually.`);

      const extension = file.name.split(".").pop().toLowerCase();
      const mimeTypes = {
        csv: "text/csv",
        json: "application/json",
        xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      };

      return mimeTypes[extension] || "application/octet-stream"; // Default fallback
    }

    return file.type; // Return original type if it's valid
  };

  // 🟢 Handle Drag & Drop Files with Enhanced MIME Handling
  const onDrop = useCallback((acceptedFiles) => {
    console.log("📥 Dropzone received:", acceptedFiles);

    // ✅ Ensure files have valid MIME types
    const validFiles = acceptedFiles.map(file => {
      file.type = determineMimeType(file); // Assign correct MIME type if missing
      return file;
    });

    if (validFiles.length === 0) {
      console.warn("⚠️ No valid files detected. Skipping.");
      return;
    }

    setFiles(validFiles);
    setUploadStatus(""); // Reset status when a new file is added
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [],
      "application/json": [],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": []
    },
    multiple: false, // Allow only one file at a time
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
          <p>📝 Selected File: {files[0].name} ({files[0].type})</p>
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
