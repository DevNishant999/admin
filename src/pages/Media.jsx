import React, { useEffect, useState } from "react";

const DropZone = ({ onUploadSuccess }) => {
  const [dragging, setDragging] = useState(false);
  const API = import.meta.env.VITE_API_URL;

  const handleDrop = async (e) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(`${API}/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.url) {
        alert("Upload successful!");
        onUploadSuccess();
      } else {
        alert("Upload failed");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Something went wrong");
    }
  };

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={() => setDragging(true)}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      className={`border-2 border-dashed p-10 text-center rounded-lg transition ${
        dragging ? "border-green-500 bg-green-50" : "border-gray-400"
      }`}
    >
      <p className="text-gray-600">
        Drag & Drop a file here or click to browse
      </p>
      <input
        type="file"
        accept="image/*,video/*"
        className="hidden"
        id="uploadInput"
        onChange={async (e) => {
          const file = e.target.files[0];
          if (!file) return;

          const formData = new FormData();
          formData.append("image", file);

          try {
            const res = await fetch(`${API}/upload`, {
              method: "POST",
              body: formData,
            });

            const data = await res.json();

            if (data.url) {
              alert("Upload successful!");
              onUploadSuccess(); // ✅ Use this instead
            } else {
              alert("Upload failed");
            }
          } catch (err) {
            console.error("Upload error:", err);
            alert("Something went wrong");
          }
        }}
      />
      <label
        htmlFor="uploadInput"
        className="cursor-pointer block mt-3 text-blue-600 underline"
      >
        Choose File
      </label>
    </div>
  );
};

const Media = () => {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const API = import.meta.env.VITE_API_URL;

  const fetchMedia = async () => {
    try {
      const res = await fetch(`${API}/upload/media`);
      const data = await res.json();

      const sorted = data.sort(
        (a, b) =>
          new Date(b.lastModified).getTime() -
          new Date(a.lastModified).getTime()
      );

      setMedia(sorted);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch media:", err);
      setLoading(false);
    }
  };

  const handleDelete = async (key) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this file?"
    );
    if (!confirm) return;

    try {
      const res = await fetch(`${API}/upload/media`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key }),
      });

      const result = await res.json();

      if (res.ok) {
        alert("File deleted successfully");
        setMedia((prev) => prev.filter((item) => item.key !== key));
      } else {
        alert("Delete failed: " + result.message);
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Something went wrong");
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  return (
    <div>
      {showModal && (
        <div className="fixed inset-0 bg-[#00000040] bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300">
          <div className="bg-white p-6 rounded-lg w-full max-w-md relative shadow-xl scale-100 animate-fade-in">
            <h2 className="text-lg font-bold mb-4">Upload Media</h2>

            <DropZone
              onUploadSuccess={() => {
                setShowModal(false);
                fetchMedia();
              }}
            />

            <button
              className="absolute top-2 right-2 text-gray-600"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <div className="flex justify-between items-end mb-4">
        <h2 className="text-2xl font-semibold">Media Gallery</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#333c29] text-white px-4 py-2 rounded"
        >
          + Upload
        </button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : media.length === 0 ? (
        <p>No media files found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {media.map((item, index) => (
            <div
              key={index}
              className="border border-gray-300 p-2 rounded shadow hover:shadow-lg transition"
            >
              {item.url.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                <img
                  src={item.url}
                  alt={item.key}
                  className="w-full h-40 object-cover border border-gray-300 rounded"
                />
              ) : item.url.match(/\.(mp4|webm|mov)$/i) ? (
                <video
                  src={item.url}
                  controls
                  className="w-full h-40 object-cover rounded"
                />
              ) : (
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  {item.key}
                </a>
              )}

              {/* <p className="text-xs mt-2 break-all">{item.key}</p> */}

              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(item.url);
                    alert("URL copied to clipboard!");
                  }}
                  className="bg-yellow-500 text-white px-2 py-1 rounded w-1/2 text-sm"
                >
                  Copy URL
                </button>

                <button
                  onClick={() => handleDelete(item.key)}
                  className="bg-red-600 text-white px-2 py-1 rounded w-1/2 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Media;
