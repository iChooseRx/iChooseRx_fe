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
      return mimeTypes[extension] || "application/octet-stream";
    }
    return file.type; // Return original type if it's valid
  };

  // 🟢 Handle Drag & Drop Files with Enhanced MIME Handling
  const onDrop = useCallback((acceptedFiles) => {
    console.log("📥 Dropzone received:", acceptedFiles);
    const validFiles = acceptedFiles.map(file => {
      const newMimeType = determineMimeType(file);
      return new File([file], file.name, { type: newMimeType, lastModified: file.lastModified });
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

    const userId = localStorage.getItem("user_id");
    if (!userId) {
      setUploadStatus("❌ User not authenticated!");
      return;
    }

    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("user_id", userId);

    setUploadStatus("⏳ Uploading...");

    try {
      const response = await pythonApi.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        setUploadStatus("✅ File uploaded successfully!");
        setUploadedFiles((prev) => [...prev, files[0].name]); // Store uploaded files
      } else {
        setUploadStatus(`❌ Upload failed: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Upload Error:", error);
      setUploadStatus("❌ Upload error!");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      {/* Pharmacy Dashboard Header */}
      <h1 className="text-2xl font-semibold text-center text-primary mb-6">
        📦 File Upload
      </h1>

      {/* Drag and Drop Area */}
      <div
        {...getRootProps()}
        className="border-2 border-dashed border-primary p-10 rounded-lg text-center cursor-pointer transition hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <input {...getInputProps()} />
        <p className="text-lg text-gray-700 dark:text-gray-300">
          📂 Drag & drop a file here, or click to select one.
        </p>
      </div>

      {/* Selected File Preview */}
      {files.length > 0 && (
        <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <p className="text-gray-800 dark:text-gray-200">
            📝 Selected File: <strong>{files[0].name}</strong> ({files[0].type})
          </p>
          <button
            onClick={handleUpload}
            className="bg-primary text-white px-4 py-2 rounded-lg mt-3 hover:opacity-90 transition-colors"
          >
            🚀 Upload File
          </button>
        </div>
      )}

      {/* Upload Status */}
      {uploadStatus && (
        <p className={`mt-4 text-sm font-semibold ${uploadStatus.includes("✅") ? "text-green-600" : "text-red-600"}`}>
          {uploadStatus}
        </p>
      )}

      {/* Previously Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
            📜 Upload History:
          </h3>
          <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300">
            {uploadedFiles.map((file, index) => (
              <li key={index} className="mb-1">✅ {file}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
