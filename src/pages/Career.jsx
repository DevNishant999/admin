import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

const Career = () => {
  const [jobs, setJobs] = useState([]);
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false); // toggle state
  const API = import.meta.env.VITE_API_URL;

  // Fetch jobs
  useEffect(() => {
    fetch(`${API}/jobs`)
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = editId ? "PUT" : "POST";
    const url = editId ? `${API}/jobs/${editId}` : `${API}/jobs`;

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const updatedData = await res.json();

        // Submit ke baad
        if (editId) {
          setJobs(jobs.map((job) => (job._id === editId ? updatedData : job))); // <-- _id compare
          setEditId(null);
        } else {
          setJobs([...jobs, updatedData]);
        }

        setFormData({ title: "", description: "" });
        setShowForm(false); // after submit, back to list
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Edit start
  const handleEdit = (job) => {
    setFormData({ title: job.title, description: job.description });
    setEditId(job._id); // <-- _id use karo
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API}/jobs/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setJobs(jobs.filter((job) => job._id !== id)); // ✅ use _id
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {/* Top Heading + Button */}
      <div className="flex justify-between items-center mb-4">
        {!showForm && (
          <h2 className="text-2xl font-semibold">Current Openings</h2>
        )}
        {showForm && (
          <h2 className="text-2xl font-semibold">
            {editId ? "Edit Job" : "Add Job"}
          </h2>
        )}
        {!showForm && (
          <button
            onClick={() => {
              setShowForm(true);
              setFormData({ title: "", description: "" });
              setEditId(null);
            }}
            className="px-4 py-2 text-white rounded bg-[#333c29]"
          >
            + Add Job
          </button>
        )}

        {showForm && (
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="px-4 py-2 text-white rounded bg-[#333c29]"
          >
            Cancel ×
          </button>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-gray-100 flex-col flex gap-4 p-5 rounded mb-8"
        >
          <input
            type="text"
            placeholder="Job Title"
            className="p-2 border border-gray-300 bg-white rounded w-full"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />
          {/* <textarea
            placeholder="Job Description"
            className="p-2 border border-gray-300 bg-white rounded w-full"
            rows="4"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
          ></textarea> */}

          <Editor
            apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
            value={formData.description}
            onEditorChange={(content) =>
              setFormData({ ...formData, description: content })
            }
            init={{
              height: 400,
              menubar: true,
              plugins: "link image code lists",
              toolbar:
                "undo redo | formatselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | code",
            }}
          />

          <button
            type="submit"
            className="px-4 py-2 bg-[#333c29] w-[100px] text-white rounded"
          >
            {editId ? "Update" : "Create"}
          </button>
        </form>
      )}

      {/* Grid */}
      {!showForm && (
        <div className="grid grid-cols-3 gap-4">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="p-4 rounded-lg shadow-sm flex justify-between items-start flex-col border border-gray-200"
            >
              <h3 className="text-lg font-bold mb-2">{job.title}</h3>
              <p
                className="text-gray-600 mb-4"
                dangerouslySetInnerHTML={{ __html: job.description }}
              ></p>
              <div className="mt-2 flex gap-2 w-full">
                <button
                  onClick={() => handleEdit(job)}
                  className="px-3 w-1/2 py-1 bg-yellow-500 text-white rounded text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(job._id)}
                  className="px-3 w-1/2 py-1 bg-red-600 text-white rounded text-sm"
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

export default Career;
