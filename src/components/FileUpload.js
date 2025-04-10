import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { pythonApi } from "@/services/api";

const FileUpload = () => {
  const [files, setFiles] = useState([]);
  const [uploadStatus, setUploadStatus] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const determineMimeType = (file) => {
    if (!file.type || file.type === "") {
      const extension = file.name.split(".").pop().toLowerCase();
      const mimeTypes = {
        csv: "text/csv",
        json: "application/json",
        xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      };
      return mimeTypes[extension] || "application/octet-stream";
    }
    return file.type;
  };

  const onDrop = useCallback((acceptedFiles) => {
    const validFiles = acceptedFiles.map(file => {
      const newMimeType = determineMimeType(file);
      return new File([file], file.name, { type: newMimeType, lastModified: file.lastModified });
    });
    setFiles(validFiles);
    setUploadStatus("");
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [],
      "application/json": [],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": []
    },
    multiple: false,
  });

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
        setUploadedFiles((prev) => [...prev, files[0].name]);
      } else {
        setUploadStatus(`❌ Upload failed: ${response.data.message}`);
      }
    } catch (error) {
      setUploadStatus("❌ Upload error!");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-semibold text-center text-primary mb-6">
        📦 File Upload
      </h1>

      {/* Dropzone */}
      <div {...getRootProps()} className="dropzone border-2 border-dashed border-primary p-10 rounded-lg text-center cursor-pointer">
        <input {...getInputProps()} />
        <p className="text-lg">
          📂 Drag & drop a file here, or click to select one.
        </p>
      </div>

      {/* File Preview */}
      {files.length > 0 && (
        <div className="mt-4 p-4 border border-borderColor rounded-lg bg-background text-foreground">
          <p className="text-foreground">
            📝 Selected File: <strong>{files[0].name}</strong> ({files[0].type})
          </p>
          <button
            onClick={handleUpload}
            className="btn-primary mt-3"
          >
            🚀 Upload File
          </button>
        </div>
      )}

      {/* Upload Status */}
      {uploadStatus && (
        <p className={`mt-4 text-sm font-semibold ${uploadStatus.includes("✅") ? "text-success" : "text-error"}`}>
          {uploadStatus}
        </p>
      )}

      {/* Uploaded History */}
      {uploadedFiles.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            📜 Upload History:
          </h3>
          <ul className="list-disc pl-5 text-foreground">
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
