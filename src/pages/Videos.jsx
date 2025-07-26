import React, { useEffect, useState } from "react";
import { uploadToS3 } from "../utils/uploadToS3";

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [form, setForm] = useState({
    title: "",
    thumbnail: "",
    videoUrl: "",
    page: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const API = import.meta.env.VITE_API_URL;

  const fetchVideos = async () => {
    const res = await fetch(`${API}/videos`);
    const data = await res.json();
    setVideos(data);
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `${API}/videos/${editingId}` : `${API}/videos`;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm({ title: "", thumbnail: "", videoUrl: "", page: "" });
    setEditingId(null);
    setShowForm(false);
    fetchVideos();
  };

  const handleEdit = (v) => {
    setForm(v);
    setEditingId(v._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this video?"
    );
    if (!confirmDelete) return;

    await fetch(`${API}/videos/${id}`, { method: "DELETE" });
    fetchVideos();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        {!showForm && <h2 className="text-2xl font-semibold">Manage Videos</h2>}
        {showForm && <h2 className="text-2xl font-semibold">Add Video</h2>}
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-[#333c29] text-white px-4 py-2 rounded"
          >
            + Add Video
          </button>
        )}
        {showForm && (
          <button
            type="button"
            onClick={() => {
              setForm({ title: "", thumbnail: "", videoUrl: "", page: "" });
              setEditingId(null);
              setShowForm(false);
            }}
            className="bg-gray-700  rounded text-white px-4 py-2"
          >
            Cancel ×
          </button>
        )}
      </div>

      {showForm && (
        <>
          <form
            onSubmit={handleSubmit}
            className="space-y-4 mb-6 bg-gray-100 p-5"
          >
            <input
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="border border-gray-300 rounded bg-white p-2 w-full"
            />
            <input
              type="file"
              accept="image/*"
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
                    setForm((prev) => ({ ...prev, thumbnail: data.url }));
                  } else {
                    alert("Upload failed");
                  }
                } catch (err) {
                  console.error("Upload error:", err);
                  alert("Image upload failed");
                }
              }}
              className="border border-gray-300 rounded bg-white p-2 w-full"
            />

            {/* ✅ Video URL input with prefix */}
            <div className="flex border border-gray-300 rounded bg-white w-full">
              <span className="bg-gray-100 text-black px-2 flex items-center">
                https://www.youtube.com/embed/
              </span>
              <input
                placeholder="YouTube ID"
                value={form.videoUrl}
                onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
                className="p-2 flex-1 outline-none"
              />
            </div>

            <div className="flex border border-gray-300 rounded bg-white w-full">
              <span className="bg-gray-100 text-black px-2 flex items-center">
                https://qhtclinic.com/
              </span>
              <input
                placeholder="Page Slug"
                value={form.page}
                onChange={(e) => setForm({ ...form, page: e.target.value })}
                className="p-2 flex-1 outline-none"
              />
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-[#333c29] rounded text-white mt-3 px-5 py-2"
              >
                {editingId ? "Update" : "Create"}
              </button>
            </div>
          </form>
          <div>
            {form.thumbnail && (
              <img
                src={form.thumbnail}
                alt="Preview"
                className="w-100 h-50 object-cover border border-gray-300"
              />
            )}
          </div>
        </>
      )}

      {!showForm && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {videos.map((v) => (
            <div
              key={v._id}
              className="p-4 rounded-lg shadow-sm border border-gray-200"
            >
              <img
                src={v.thumbnail}
                alt=""
                className="w-full h-[180px] mb-2 object-cover rounded-lg"
              />
              <h4 className="font-bold mb-2">{v.title}</h4>
              <p className="text-sm">
                <span className="font-semibold ">URL :</span> {v.videoUrl}
              </p>
              <p className="text-sm">
                <span className="font-semibold ">Page :</span> {v.page}
              </p>
              <div className="flex justify-between items-center mt-3">
                <button
                  onClick={() => handleEdit(v)}
                  className="px-3 py-1 bg-yellow-500 rounded w-1/2 text-white mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(v._id)}
                  className="px-3 py-1 bg-red-600 rounded w-1/2 text-white"
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

export default Videos;
