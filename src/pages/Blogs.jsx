import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import ImageUploader from "../components/ImageUploader";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [filterCategory, setFilterCategory] = useState("All");

  const [form, setForm] = useState({
    title: "",
    slug: "",
    category: "",
    date: "",
    thumbnail: "",
    content: "",
    seoTitle: "",
    seoDescription: "",
    seoKeywords: "",
  });

  const API = import.meta.env.VITE_API_URL;

  // Load blogs
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const res = await fetch(`${API}/blogs`);
    const data = await res.json();
    setBlogs(data);
  };

  // Handle field change
  const handleFormChange = (field, value) => {
    setForm({ ...form, [field]: value });
    if (field === "title" && !form.slug) {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setForm((prev) => ({ ...prev, slug }));
    }
  };

  // Save new or update
  const handleSave = async (e) => {
    e.preventDefault();
    const method = editingBlog ? "PUT" : "POST";
    const url = editingBlog
      ? `${API}/blogs/${editingBlog._id}`
      : `${API}/blogs`;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setShowForm(false);
    setForm({
      title: "",
      slug: "",
      category: "",
      date: "",
      thumbnail: "",
      content: "",
      seoTitle: "",
      seoDescription: "",
      seoKeywords: "",
    });
    setEditingBlog(null);

    fetchBlogs();
  };

  // Edit
  const handleEdit = (blog) => {
    setForm({
      title: blog.title,
      slug: blog.slug,
      category: blog.category,
      date: blog.date,
      thumbnail: blog.thumbnail,
      content: blog.content,
      seoTitle: blog.seoTitle,
      seoDescription: blog.seoDescription,
      seoKeywords: blog.seoKeywords,
    });
    setEditingBlog(blog);
    setShowForm(true);
  };
  
  // Delete
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirmDelete) return;

    await fetch(`${API}/blogs/${id}`, { method: "DELETE" });
    setBlogs(blogs.filter((b) => b._id !== id));
  };

  // Get unique categories for dropdown
  const categories = [
    "All",
    ...new Set(blogs.map((b) => b.category).filter(Boolean)),
  ];

  // Filter blogs
  const filteredBlogs =
    filterCategory === "All"
      ? blogs
      : blogs.filter((b) => b.category === filterCategory);

  return (
    <div>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-4">
        {!showForm && <h2 className="text-2xl font-semibold">Manage Blogs</h2>}
        {showForm && <h2 className="text-2xl font-semibold">Add Blogs</h2>}

        <div className="flex flex-col md:flex-row md:items-center gap-4">
          {!showForm && (
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="border border-gray-300 rounded bg-gray-100 p-2"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          )}

          <button
            onClick={() => {
              setShowForm(!showForm);
              setEditingBlog(null);
              setForm({
                title: "",
                slug: "",
                category: "",
                date: "",
                thumbnail: "",
                content: "",
                seoTitle: "",
                seoDescription: "",
                seoKeywords: "",
              });
            }}
            className="px-4 py-2 text-white rounded bg-[#333c29]"
          >
            {showForm ? "Cancel ×" : "+ Add Blog"}
          </button>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleSave} className="space-y-4 mb-6 bg-gray-100 p-5">
          <input
            placeholder="SEO Title"
            value={form.seoTitle}
            onChange={(e) => handleFormChange("seoTitle", e.target.value)}
            className="border border-gray-300 rounded bg-white p-2 w-full"
          />
          <input
            placeholder="SEO Description"
            value={form.seoDescription}
            onChange={(e) => handleFormChange("seoDescription", e.target.value)}
            className="border border-gray-300 rounded bg-white p-2 w-full"
          />
          <input
            placeholder="SEO Keywords"
            value={form.seoKeywords}
            onChange={(e) => handleFormChange("seoKeywords", e.target.value)}
            className="border border-gray-300 rounded bg-white p-2 w-full"
          />
          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) => handleFormChange("title", e.target.value)}
            className="border border-gray-300 rounded bg-white p-2 w-full"
          />
          <input
            placeholder="Slug"
            value={form.slug}
            onChange={(e) => handleFormChange("slug", e.target.value)}
            className="border border-gray-300 rounded bg-white p-2 w-full"
          />
          <input
            placeholder="Category"
            value={form.category}
            onChange={(e) => handleFormChange("category", e.target.value)}
            className="border border-gray-300 rounded bg-white p-2 w-full"
          />
          <input
            placeholder="Date"
            value={form.date}
            onChange={(e) => handleFormChange("date", e.target.value)}
            className="border border-gray-300 rounded bg-white p-2 w-full"
          />
          <ImageUploader
            label="Thumbnail"
            value={form.thumbnail}
            onChange={(url) => handleFormChange("thumbnail", url)}
          />

          <Editor
            apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
            value={form.content}
            onEditorChange={(newValue) => handleFormChange("content", newValue)}
            init={{
              height: 400,
              menubar: true,
              plugins: "link image code lists",
              toolbar:
                "undo redo | formatselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | code",
            }}
          />

          {/* <textarea
            value={form.content}
            onChange={(e) => handleFormChange("content", e.target.value)}
            rows={15}
            className="border border-gray-300 rounded bg-white p-2 w-full"
            placeholder="Enter content here..."
          ></textarea> */}

          <button
            type="submit"
            className="px-4 py-2 text-white rounded bg-[#333c29]"
          >
            {editingBlog ? "Update" : "Create"}
          </button>
        </form>
      )}

      {!showForm && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBlogs.map((blog) => (
            <div
              key={blog._id}
              className="p-4 rounded-lg shadow-sm border border-gray-200"
            >
              <img
                src={blog.thumbnail}
                alt=""
                className="w-full rounded-lg mb-2 h-[200px] object-cover"
              />
              <h2 className="font-bold mb-2 h-[50px] overflow-y-hidden">
                {blog.title}
              </h2>
              <p className="text-sm">
                <span className="font-semibold">Category :</span>{" "}
                {blog.category} <br />{" "}
                <span className="font-semibold ">Date :</span> {blog.date}
              </p>
              <p className="text-sm ">
                <span className="font-semibold ">Slug :</span> /{blog.slug}
              </p>
              <div className="flex mt-2">
                <button
                  onClick={() => handleEdit(blog)}
                  className="px-3 py-1 bg-yellow-500 rounded w-1/2 text-white mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(blog._id)}
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

export default Blogs;
