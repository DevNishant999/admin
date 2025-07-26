import React, { useEffect, useState } from "react";

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    age: "",
    location: "",
    rating: 5,
    text: "",
    image: "",
    grade: "",
  });
  const [editingId, setEditingId] = useState(null);

  const API = import.meta.env.VITE_API_URL;

  const fetchTestimonials = async () => {
    const res = await fetch(`${API}/testimonials`);
    const data = await res.json();
    setTestimonials(data);
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const save = async (e) => {
    e.preventDefault();
    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `${API}/testimonials/${editingId}`
      : `${API}/testimonials`;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    fetchTestimonials();
    setShowForm(false);
    setForm({
      name: "",
      age: "",
      location: "",
      rating: 5,
      text: "",
      image: "",
      grade: "",
    });
    setEditingId(null);
  };

  const edit = (item) => {
    setEditingId(item._id);
    setForm(item);
    setShowForm(true);
  };

  const del = async (id) => {
    if (!window.confirm("Are you sure you want to delete this testimonial?")) return;
    await fetch(`${API}/testimonials/${id}`, { method: "DELETE" });
    fetchTestimonials();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        {!showForm && (
          <h2 className="text-2xl font-semibold">Manage Testimonials</h2>
        )}
        {showForm && (
          <h2 className="text-2xl font-semibold">Add Testimonials</h2>
        )}
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setForm({
              name: "",
              age: "",
              location: "",
              rating: 5,
              text: "",
              image: "",
              grade: "",
            });
          }}
          className="px-4 py-2 text-white rounded bg-[#333c29]"
        >
          {showForm ? "Cancel ×" : "+ Add Testimonial"}
        </button>
      </div>

      {showForm && (
        <>
          <form
            onSubmit={save}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-100 p-5 rounded mb-8"
          >
            <input
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="p-2 border border-gray-300 bg-white rounded"
            />
            <input
              placeholder="Age"
              value={form.age}
              onChange={(e) => setForm({ ...form, age: e.target.value })}
              className="p-2 border border-gray-300 bg-white rounded"
            />
            <input
              placeholder="Location"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className="p-2 border border-gray-300 bg-white rounded"
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
                    setForm((prev) => ({ ...prev, image: data.url }));
                    console.log(data);
                  } else {
                    alert("Upload failed.");
                  }
                } catch (err) {
                  console.error("Upload error:", err);
                  alert("Image upload failed");
                }
              }}
              className="p-2 border border-gray-300 bg-white rounded"
            />

            <select
              value={form.rating}
              onChange={(e) =>
                setForm({ ...form, rating: Number(e.target.value) })
              }
              className="p-2 border border-gray-300 bg-white rounded"
            >
              {[1, 2, 3, 4, 5].map((r) => (
                <option key={r} value={r}>
                  {r} Stars
                </option>
              ))}
            </select>
            <select
              value={form.grade}
              onChange={(e) => setForm({ ...form, grade: e.target.value })}
              className="p-2 border border-gray-300 bg-white rounded"
            >
              <option value="">Select Grade</option>
              {[
                "Grade I",
                "Grade II",
                "Grade III",
                "Grade IV",
                "Grade V",
                "Grade VI",
                "Grade VII",
              ].map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
            <textarea
              placeholder="Testimonial Text"
              value={form.text}
              onChange={(e) => setForm({ ...form, text: e.target.value })}
              className="p-2 border rounded col-span-full border-gray-300 bg-white rounded"
            />
            <div className="flex justify-between items-center w-full">
              <button
                type="submit"
                className="px-4 py-2 bg-[#333c29] w-[100px] text-white rounded"
              >
                {editingId ? "Update" : "Create"}
              </button>
              {form.image && (
                <img
                  src={form.image}
                  alt="Preview"
                  className="w-20 h-20 object-cover rounded-full border"
                />
              )}
            </div>
          </form>
        </>
      )}

      {!showForm && (
        <div className="grid grid-cols-3 gap-4">
          {testimonials.map((t) => (
            <div
              key={t._id}
              className="p-4 rounded-lg shadow-sm border border-gray-200"
            >
              <div className="flex-1">
                <p className="h-[100px] overflow-y-scroll">{t.text}</p>
                <div className="flex my-4 gap-4 justify-start items-center">
                  <div>
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{t.name}</h3>
                    <p className="text-sm text-gray-500">{t.grade}</p>
                  </div>
                </div>
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() => edit(t)}
                    className="px-3 w-1/2 py-1 bg-yellow-500 text-white rounded text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => del(t._id)}
                    className="px-3 w-1/2 py-1 bg-red-600 text-white rounded text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
