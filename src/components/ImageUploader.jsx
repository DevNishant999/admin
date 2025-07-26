// components/ImageUploader.js
import React, { useRef } from "react";

const ImageUploader = ({ label, value, onChange }) => {
  const fileRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.url) {
        onChange(data.url);
      } else {
        alert("Upload failed");
      }
    } catch (err) {
      console.error("Image upload error:", err);
      alert("Upload error");
    }
  };

  return (
    <div>
      {label && (
        <label className="block mb-1 text-lg font-semibold">{label}</label>
      )}
      {value && (
        <img
          src={value}
          alt="Preview"
          className="w-32 h-24 object-contain mb-2 border border-gray-300 bg-white p-2 rounded w-full"
        />
      )}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="border p-2 rounded border-gray-300 text-black bg-white w-full"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ImageUploader;
