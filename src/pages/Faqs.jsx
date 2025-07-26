// Faqs.jsx
import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

const Faqs = () => {
  const [faqs, setFaqs] = useState([]);
  const [form, setForm] = useState({
    question: "",
    answer: "",
    page: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const API = import.meta.env.VITE_API_URL;

  const fetchFaqs = async () => {
    const res = await fetch(`${API}/faqs`);
    const data = await res.json();
    setFaqs(data);
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `${API}/faqs/${editingId}` : `${API}/faqs`;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm({ question: "", answer: "", page: "" });
    setEditingId(null);
    setShowForm(false);
    fetchFaqs();
  };

  const handleEdit = (faq) => {
    setForm(faq);
    setEditingId(faq._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this FAQ?"
    );
    if (!confirmDelete) return;

    await fetch(`${API}/faqs/${id}`, { method: "DELETE" });
    fetchFaqs();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        {!showForm && <h2 className="text-2xl font-semibold">Manage FAQs</h2>}
        {showForm && <h2 className="text-2xl font-semibold">Add FAQs</h2>}
        <button
          className="bg-[#333c29] text-white px-4 py-2 rounded"
          onClick={() => {
            setShowForm(!showForm);
            setForm({ question: "", answer: "", page: "" });
            setEditingId(null);
          }}
        >
          {showForm ? "Cancel ×" : "+ Add FAQ"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="space-y-4 mb-6 bg-gray-100 p-5"
        >
          <input
            placeholder="Question"
            value={form.question}
            onChange={(e) => setForm({ ...form, question: e.target.value })}
            className="border border-gray-300 rounded bg-white p-2 w-full"
          />
          <Editor
            apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
            value={form.answer}
            onChange={(e) => setForm({ ...form, answer: e.target.value })}
            init={{
              height: 400,
              menubar: true,
              plugins: "link image code lists",
              placeholder: "Answer",
              toolbar:
                "undo redo | formatselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | code",
            }}
          />
          <input
            placeholder="Page"
            value={form.page}
            onChange={(e) => setForm({ ...form, page: e.target.value })}
            className="border border-gray-300 rounded bg-white p-2 w-full"
          />
          <button
            type="submit"
            className="bg-[#333c29] rounded text-white mt-3 px-5 py-2"
          >
            {editingId ? "Update" : "Create"}
          </button>
        </form>
      )}

      {!showForm && (
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          {faqs.map((faq) => (
            <div
              key={faq._id}
              className="border border-gray-300 p-4 rounded shadow-md flex justify-between items-center"
            >
              <div>
                <h4 className="font-bold">{faq.question}</h4>
                <p>{faq.answer}</p>
                <small className="text-gray-500">Page: {faq.page}</small>
              </div>

              <div className="mt-2 flex flex-col gap-2">
                <button
                  onClick={() => handleEdit(faq)}
                  className="px-3 py-1 bg-yellow-500 rounded text-white"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(faq._id)}
                  className="px-3 py-1 bg-red-600 rounded text-white"
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

export default Faqs;
