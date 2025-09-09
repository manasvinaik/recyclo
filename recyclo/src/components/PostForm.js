import React, { useState, useEffect } from "react";
import api from "../api";

const PostForm = ({ onCreated, onClose }) => {
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [photoFiles, setPhotoFiles] = useState([]);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  // Get user location on load
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLatitude(pos.coords.latitude);
          setLongitude(pos.coords.longitude);
        },
        (err) => {
          console.error("Geolocation error:", err);
        }
      );
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("description", description);
    formData.append("location_text", location);
    if (latitude) formData.append("latitude", latitude);
    if (longitude) formData.append("longitude", longitude);

    photoFiles.forEach((file) => formData.append("images", file));

    try {
      const res = await api.post("/posts/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Reset form fields
      setDescription("");
      setLocation("");
      setPhotoFiles([]);

      // Notify parent Feed.js
      if (onCreated) onCreated(res.data);

      // Hide the form (go back to feed)
      if (onClose) onClose();
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white shadow-md rounded-lg flex flex-col gap-3"
    >
      <textarea
        placeholder="Describe the issue..."
        className="p-2 border rounded"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Enter location"
        className="p-2 border rounded"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
      />
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => setPhotoFiles(Array.from(e.target.files))}
      />
      <button
        type="submit"
        className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Submit Report
      </button>
    </form>
  );
};

export default PostForm;
