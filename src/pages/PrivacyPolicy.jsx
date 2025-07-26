import React, { useEffect, useState } from "react";

const PrivacyPolicy = () => {
  const [form, setForm] = useState({
    title: "",
    banner: "",
    sections: [],
    contact: "",
  });
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/privacy-policy`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setForm({
            title: data.title || "",
            banner: data.banner || "",
            sections: data.sections || [],
            contact: data.contact || "",
          });
          setId(data._id);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form };
    if (id) {
      await fetch(`${API_URL}/privacy-policy/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      alert("Updated!");
    } else {
      await fetch(`${API_URL}/privacy-policy`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      alert("Created!");
    }
  };

  const handleDelete = async () => {
    if (id) {
      await fetch(`${API_URL}/privacy-policy/${id}`, {
        method: "DELETE",
      });
      setId("");
      setForm({
        title: "",
        banner: "",
        sections: [],
        contact: "",
      });
      alert("Deleted!");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSectionChange = (index, field, value) => {
    const newSections = [...form.sections];
    newSections[index][field] = value;
    setForm({ ...form, sections: newSections });
  };

  const handlePointChange = (sectionIndex, pointIndex, value) => {
    const newSections = [...form.sections];
    newSections[sectionIndex].points[pointIndex] = value;
    setForm({ ...form, sections: newSections });
  };

  const addSection = () => {
    setForm({
      ...form,
      sections: [...form.sections, { heading: "", paragraph: "", points: [] }],
    });
  };

  const removeSection = (index) => {
    const newSections = [...form.sections];
    newSections.splice(index, 1);
    setForm({ ...form, sections: newSections });
  };

  const addPoint = (sectionIndex) => {
    const newSections = [...form.sections];
    if (!newSections[sectionIndex].points)
      newSections[sectionIndex].points = [];
    newSections[sectionIndex].points.push("");
    setForm({ ...form, sections: newSections });
  };

  const removePoint = (sectionIndex, pointIndex) => {
    const newSections = [...form.sections];
    newSections[sectionIndex].points.splice(pointIndex, 1);
    setForm({ ...form, sections: newSections });
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-2xl font-semibold">Manage Privacy Policy</h2>
          <button
            type="submit"
            className="px-4 py-2 text-white rounded bg-[#333c29]"
          >
            {id ? "Update" : "Create"}
          </button>
        </div>
        <div className="border space-y-2 border-gray-300 bg-gray-100 p-3 mb-2">
          <div>
            <label className="block mb-1 text-lg font-semibold">
              Banner Section
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="border border-gray-300 rounded bg-white p-2 w-full"
              placeholder="Title"
            />
          </div>

          <div>
            <textarea
              name="banner"
              value={form.banner}
              onChange={handleChange}
              className="border border-gray-300 rounded bg-white p-2 w-full"
              placeholder="Banner content..."
            ></textarea>
          </div>
        </div>

        <div className="border space-y-2 border-gray-300 bg-gray-100 p-3 mb-2">
          <div>
            <div className="flex justify-between items-end mb-2">
              <label className="block text-lg font-semibold">Points</label>
              <button
                type="button"
                onClick={addSection}
                className="bg-[#333c29] text-white px-3 py-1 rounded"
              >
                +
              </button>
            </div>
            {form.sections.map((section, index) => (
              <div
                key={index}
                className="border border-gray-300 p-4 mb-4 bg-gray-50 rounded space-y-4"
              >
                <div>
                  <div className="flex justify-between items-end mb-2">
                    <label className="block text-lg font-semibold">
                      Point Heading
                    </label>
                    <button
                      type="button"
                      onClick={() => removeSection(index)}
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      ×
                    </button>
                  </div>
                  <input
                    type="text"
                    value={section.heading}
                    onChange={(e) =>
                      handleSectionChange(index, "heading", e.target.value)
                    }
                    className="border border-gray-300 rounded bg-white p-2 w-full"
                    placeholder="Section heading"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-2">Paragraph</label>
                  <textarea
                    value={section.paragraph}
                    onChange={(e) =>
                      handleSectionChange(index, "paragraph", e.target.value)
                    }
                    className="border border-gray-300 rounded bg-white p-2 w-full"
                    placeholder="Section paragraph"
                  ></textarea>
                </div>

                <div>
                  <div className="flex justify-between items-end mb-4">
                    <label className="block font-semibold">Sub Points</label>
                    <button
                      type="button"
                      onClick={() => addPoint(index)}
                      className="bg-[#333c29] text-white px-3 py-1 rounded"
                    >
                      +
                    </button>
                  </div>
                  {section.points &&
                    section.points.map((point, pointIndex) => (
                      <div key={pointIndex} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={point}
                          onChange={(e) =>
                            handlePointChange(index, pointIndex, e.target.value)
                          }
                          className="border border-gray-300 rounded bg-white p-2 w-full"
                          placeholder="Point"
                        />
                        <button
                          type="button"
                          onClick={() => removePoint(index, pointIndex)}
                          className="bg-red-600 rounded text-white px-3"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border space-y-2 border-gray-300 bg-gray-100 p-3 mb-2">
          <label className="block mb-1 text-lg font-semibold">Contact</label>
          <textarea
            name="contact"
            value={form.contact}
            onChange={handleChange}
            className="border border-gray-300 rounded bg-white p-2 w-full"
            placeholder="Contact details..."
          ></textarea>
        </div>
      </form>
    </div>
  );
};

export default PrivacyPolicy;
