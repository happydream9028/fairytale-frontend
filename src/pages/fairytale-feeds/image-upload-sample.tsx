import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
const ImageUploader: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageName, setImageName] = useState("");
  const [appId, setAppId] = useState("");
  const [uploading, setUploading] = useState(false);
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
  };
  const handleImageNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setImageName(event.target.value);
  };
  const handleAppIdChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAppId(event.target.value);
  };
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!selectedFile || !imageName || !appId) {
      alert("Please fill in all the fields.");
      return;
    }
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("name", imageName);
    formData.append("app_id", appId);
    try {
      setUploading(true);
      const response = await axios.post("http://localhost:3001/images/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Image uploaded successfully:", response.data);
      // Reset the form
      setSelectedFile(null);
      setImageName("");
      setAppId("");
    } catch (error) {
      console.error("Error uploading image:", error);
      // Handle error here
    } finally {
      setUploading(false);
    }
  };
  return (
    <div>
      <h2>Image Uploader</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="file">Image</label>
          <input type="file" id="file" accept="image/*" onChange={handleFileChange} />
        </div>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" value={imageName} onChange={handleImageNameChange} />
        </div>
        <div>
          <label htmlFor="appId">App ID</label>
          <input type="number" id="appId" value={appId} onChange={handleAppIdChange} />
        </div>
        <button type="submit" disabled={uploading}>
          {uploading ? "Uploading..." : "Upload Image"}
        </button>
      </form>
    </div>
  );
};
export default ImageUploader;
