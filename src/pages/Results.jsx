import React, { useState, useEffect } from "react";
import ImageUploader from "../components/ImageUploader";

export default function AdminResults() {
  const [results, setResults] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    grafts: "",
    age: "",
    area: "",
    grade: "",
    resultTime: "",
    beforeImage: "",
    afterImage: "",
    doctorNotes: "",
    surgeryCount: "",
  });
  const [editingId, setEditingId] = useState(null);

  const API = import.meta.env.VITE_API_URL;

  const fetchResults = async () => {
    const res = await fetch(`${API}/results`);
    const data = await res.json();
    setResults(data);
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const save = async (e) => {
    e.preventDefault();
    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `${API}/results/${editingId}` : `${API}/results`;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        doctorNotes: form.doctorNotes.split("\n"),
      }),
    });

    fetchResults();
    setShowForm(false);
    setForm({
      name: "",
      grafts: "",
      age: "",
      area: "",
      grade: "",
      resultTime: "",
      beforeImage: "",
      afterImage: "",
      doctorNotes: "",
      surgeryCount: "",
    });
    setEditingId(null);
  };

  const edit = (item) => {
    setEditingId(item._id);
    setForm({
      ...item,
      doctorNotes: item.doctorNotes.join("\n"),
    });
    setShowForm(true);
  };

  const del = async (id) => {
    if (!window.confirm("Are you sure you want to delete this?")) return;
    await fetch(`${API}/results/${id}`, { method: "DELETE" });
    fetchResults();
  };

  return (
    <div>
      <div className="flex justify-between items-end mb-4">
        <h2 className="text-2xl font-semibold">Manage Results</h2>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setForm({
              name: "",
              grafts: "",
              age: "",
              area: "",
              grade: "",
              resultTime: "",
              beforeImage: "",
              afterImage: "",
              doctorNotes: "",
              surgeryCount: "",
            });
          }}
          className="px-4 py-2 text-white rounded bg-[#333c29]"
        >
          {showForm ? "Cancel ×" : "+ Add Result"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={save}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-gray-100 p-6 rounded mb-8"
        >
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border border-gray-300 rounded bg-white p-2 w-full"
          />
          <input
            placeholder="Grafts"
            value={form.grafts}
            onChange={(e) => setForm({ ...form, grafts: e.target.value })}
            className="border border-gray-300 rounded bg-white p-2 w-full"
          />
          <input
            placeholder="Age"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
            className="border border-gray-300 rounded bg-white p-2 w-full"
          />
          <input
            placeholder="Area"
            value={form.area}
            onChange={(e) => setForm({ ...form, area: e.target.value })}
            className="border border-gray-300 rounded bg-white p-2 w-full"
          />
          <input
            placeholder="Grade"
            value={form.grade}
            onChange={(e) => setForm({ ...form, grade: e.target.value })}
            className="border border-gray-300 rounded bg-white p-2 w-full"
          />
          <input
            placeholder="Result Time"
            value={form.resultTime}
            onChange={(e) => setForm({ ...form, resultTime: e.target.value })}
            className="border border-gray-300 rounded bg-white p-2 w-full"
          />
          <select
            value={form.surgeryCount}
            onChange={(e) => setForm({ ...form, surgeryCount: e.target.value })}
            className="border border-gray-300 rounded bg-white p-2 w-full col-span-2"
          >
            <option value="">Select Surgery Count</option>
            <option value="first">First</option>
            <option value="second">Second</option>
          </select>
          <textarea
            placeholder="Doctor Notes (one per line)"
            value={form.doctorNotes}
            onChange={(e) => setForm({ ...form, doctorNotes: e.target.value })}
            className="border border-gray-300 rounded bg-white p-2 w-full col-span-full"
          ></textarea>

          <div className="col-span-2">
            <ImageUploader
              label="Before Image"
              value={form.beforeImage}
              onChange={(url) => setForm({ ...form, beforeImage: url })}
            />
          </div>
          <div className="col-span-2">
            <ImageUploader
              label="After Image"
              value={form.afterImage}
              onChange={(url) => setForm({ ...form, afterImage: url })}
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 text-white rounded bg-[#333c29] w-[80px]"
          >
            {editingId ? "Update" : "Create"}
          </button>
        </form>
      )}

      {!showForm ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {results.map((r) => (
              <div
                key={r._id}
                className="p-4 rounded-lg shadow-sm border border-gray-200"
              >
                <img
                  src={r.afterImage}
                  alt={r.name}
                  className="w-full rounded-lg mb-2 h-[300px] object-cover"
                />
                <div className="flex justify-between align-center">
                  <h3 className="text-lg font-bold">{r.name}</h3>
                  <p className="text-sm text-gray-600">{r.grafts} grafts</p>
                </div>
                <div className="mt-2 flex justify-between gap-2">
                  <button
                    onClick={() => edit(r)}
                    className="px-3 py-1 bg-yellow-500 rounded w-1/2 text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => del(r._id)}
                    className="px-3 py-1 bg-red-600 rounded w-1/2 text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
