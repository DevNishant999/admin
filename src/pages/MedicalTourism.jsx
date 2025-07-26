import React, { useEffect, useState } from "react";
import ImageUploader from "../components/ImageUploader";

const MedicalTourismAdmin = () => {
  const [data, setData] = useState(null);
  const [saving, setSaving] = useState(false);
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${API}/medical-tourism`);
      const json = await res.json();
      setData(json.data);

      console.log(json.data);
    };
    fetchData();
  }, []);

  const handleChange = (path, value) => {
    const keys = path.split(".");
    setData((prev) => {
      const updated = { ...prev };
      let ref = updated;
      keys.forEach((k, i) => {
        if (i === keys.length - 1) ref[k] = value;
        else ref = ref[k];
      });
      return updated;
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${API}/medical-tourism`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.success) alert("✅ Saved!");
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const addRow = (path, template) => {
    const keys = path.split(".");
    setData((prev) => {
      const updated = { ...prev };
      let ref = updated;
      keys.forEach((k) => (ref = ref[k]));
      ref.push(template);
      return { ...updated };
    });
  };

  const removeRow = (path, idx) => {
    const keys = path.split(".");
    setData((prev) => {
      const updated = { ...prev };
      let ref = updated;
      keys.forEach((k) => (ref = ref[k]));
      ref.splice(idx, 1);
      return { ...updated };
    });
  };

  if (!data) return <div className="p-8">Loading...</div>;

  const { metaTitle, metaDescription, metaKeywords, sections } = data;

  return (
    <div>
      <div className="flex justify-between items-end mb-2">
        <h2 className="text-2xl font-semibold">Manage Medical Tourism Page</h2>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-4 py-2 text-white rounded bg-[#333c29]"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className="flex justify-between items-start gap-4">
        {/* Meta */}
        <div className="border space-y-2 border-gray-300 bg-gray-100 p-3 mb-4 w-1/2 h-full">
          <label className="block text-lg font-semibold">Meta Title</label>
          <input
            className="border border-gray-300 rounded bg-white p-2 w-full"
            value={metaTitle}
            onChange={(e) => handleChange("metaTitle", e.target.value)}
          />
          <label className="block text-lg font-semibold">
            Meta Description
          </label>
          <textarea
            className="border border-gray-300 rounded bg-white p-2 w-full"
            value={metaDescription}
            onChange={(e) => handleChange("metaDescription", e.target.value)}
          />
          <label className="block text-lg font-semibold">Meta Keywords</label>
          <input
            className="border border-gray-300 rounded bg-white p-2 w-full"
            value={metaKeywords.join(", ")}
            onChange={(e) =>
              handleChange(
                "metaKeywords",
                e.target.value.split(",").map((k) => k.trim())
              )
            }
          />
        </div>

        {/* Banner */}
        <div className="border space-y-2 border-gray-300 bg-gray-100 p-3 mb-4 w-1/2 h-full">
          <h2 className="block mb-1 text-lg font-semibold">Banner</h2>
          <label className="block text-lg font-semibold">Title</label>
          <input
            className="border border-gray-300 rounded bg-white p-2 w-full"
            value={sections.banner.title}
            onChange={(e) =>
              handleChange("sections.banner.title", e.target.value)
            }
          />

          <label className="block text-lg font-semibold">Subtitle</label>
          <textarea
            className="border border-gray-300 rounded bg-white p-2 w-full"
            value={sections.banner.subtitle}
            onChange={(e) =>
              handleChange("sections.banner.subtitle", e.target.value)
            }
          />

          <label className="block text-lg font-semibold">
            Background Image
          </label>
          <ImageUploader
            value={sections.banner.backgroundImage}
            onChange={(url) =>
              handleChange("sections.banner.backgroundImage", url)
            }
          />
        </div>
      </div>

      {/* Top Choice Section */}
      <div className="border space-y-2 border-gray-300 bg-gray-100 p-3 mb-4">
        <label className="block text-lg font-semibold">Top Choice</label>

        <input
          className="border border-gray-300 rounded bg-white p-2 w-full"
          placeholder="Heading"
          value={sections.topChoice.heading}
          onChange={(e) =>
            handleChange("sections.topChoice.heading", e.target.value)
          }
        />

        <textarea
          className="border border-gray-300 rounded bg-white p-2 w-full"
          placeholder="Description"
          value={sections.topChoice.description}
          onChange={(e) =>
            handleChange("sections.topChoice.description", e.target.value)
          }
        />

        <ImageUploader
          value={sections.topChoice.image}
          onChange={(url) => handleChange("sections.topChoice.image", url)}
        />

        <div className="flex justify-between items-end">
          <label className="block text-lg font-semibold mt-4">Features</label>
          <button
            onClick={() =>
              addRow("sections.topChoice.features", {
                icon: "",
                title: "",
                description: "",
              })
            }
            className="px-4 py-2 text-white rounded bg-[#333c29]"
          >
            +
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {sections.topChoice.features.map((item, idx) => (
            <div
              key={idx}
              className="space-y-2 bg-white p-3 rounded border-gray-300 border"
            >
              <ImageUploader
                value={item.icon}
                onChange={(url) =>
                  handleChange(`sections.topChoice.features.${idx}.icon`, url)
                }
              />
              <div className="flex justify-between items-end gap-2">
                <input
                  className="border border-gray-300 rounded bg-white p-2 w-full"
                  placeholder="Title"
                  value={item.title}
                  onChange={(e) =>
                    handleChange(
                      `sections.topChoice.features.${idx}.title`,
                      e.target.value
                    )
                  }
                />
                <button
                  onClick={() => removeRow("sections.topChoice.features", idx)}
                  className="bg-red-600 text-white px-3 py-2 rounded"
                >
                  ×
                </button>
              </div>
              <textarea
                className="border border-gray-300 rounded bg-white p-2 w-full"
                placeholder="Description"
                value={item.description}
                onChange={(e) =>
                  handleChange(
                    `sections.topChoice.features.${idx}.description`,
                    e.target.value
                  )
                }
              />
            </div>
          ))}
        </div>
      </div>

      {/* Why Section */}
      <div className="border space-y-2 border-gray-300 bg-gray-100 p-3 mb-4">
        <h2 className="block text-lg font-semibold">Why Section Image</h2>
        <ImageUploader
          value={sections.whySection.image}
          onChange={(url) => handleChange("sections.whySection.image", url)}
        />
      </div>

      {/* Comparison Table */}
      <div className="border space-y-2 border-gray-300 bg-gray-100 p-3 mb-4">
        <div className="flex items-end justify-between">
          <h2 className="block text-lg font-semibold">Comparison Table</h2>
          <button
            onClick={() =>
              addRow("sections.comparison.table", {
                feature: "",
                qht: "",
                fue: "",
              })
            }
            className="px-4 py-2 text-white rounded bg-[#333c29]"
          >
            + Add Row
          </button>
        </div>

        <table className="w-full border table-auto border-gray-300 text-left">
          <thead className="space-y-2 bg-white p-3 rounded border-gray-300 border">
            <tr>
              <th className="border border-gray-300 p-2">Feature</th>
              <th className="border border-gray-300 p-2">QHT</th>
              <th className="border border-gray-300 p-2">FUE</th>
              <th className="border border-gray-300 p-2 w-24">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sections.comparison.table.map((row, idx) => (
              <tr
                key={idx}
                className="space-y-2 bg-white p-3 rounded border-gray-300 border"
              >
                <td className="border border-gray-300 p-2">
                  <input
                    className="border border-gray-300 rounded bg-white p-2 w-full"
                    value={row.feature}
                    onChange={(e) =>
                      handleChange(
                        `sections.comparison.table.${idx}.feature`,
                        e.target.value
                      )
                    }
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    className="border border-gray-300 rounded bg-white p-2 w-full"
                    value={row.qht}
                    onChange={(e) =>
                      handleChange(
                        `sections.comparison.table.${idx}.qht`,
                        e.target.value
                      )
                    }
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    className="border border-gray-300 rounded bg-white p-2 w-full"
                    value={row.fue}
                    onChange={(e) =>
                      handleChange(
                        `sections.comparison.table.${idx}.fue`,
                        e.target.value
                      )
                    }
                  />
                </td>
                <td className="border border-gray-300 text-center p-2">
                  <button
                    onClick={() => removeRow("sections.comparison.table", idx)}
                    className="px-3 py-2 bg-red-600 text-white rounded text-sm"
                  >
                    ×
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Process Tabs */}
      <div className="border space-y-2 border-gray-300 bg-gray-100 p-3 mb-4">
        <div className="flex justify-between items-end">
          <label className="block text-lg font-semibold">Process Tabs</label>
          <button
            onClick={() =>
              addRow("sections.processTabs.tabs", {
                title: "",
                icon: "",
                content: "",
              })
            }
            className="px-4 py-2 text-white rounded bg-[#333c29]"
          >
            +
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {sections.processTabs.tabs.map((tab, idx) => (
            <div
              key={idx}
              className="space-y-2 bg-white p-3 rounded border-gray-300 border"
            >
              <div className="flex justify-between items-center gap-2">
                <input
                  className="border border-gray-300 rounded bg-white p-2 w-full"
                  placeholder="Title"
                  value={tab.title}
                  onChange={(e) =>
                    handleChange(
                      `sections.processTabs.tabs.${idx}.title`,
                      e.target.value
                    )
                  }
                />
                <button
                  onClick={() => removeRow("sections.processTabs.tabs", idx)}
                  className="bg-red-600 text-white px-3 py-2 rounded self-start"
                >
                  ×
                </button>
              </div>

              <ImageUploader
                value={tab.icon}
                onChange={(url) =>
                  handleChange(`sections.processTabs.tabs.${idx}.icon`, url)
                }
              />
              <textarea
                className="border border-gray-300 rounded bg-white p-2 w-full"
                placeholder="Content"
                value={tab.content}
                onChange={(e) =>
                  handleChange(
                    `sections.processTabs.tabs.${idx}.content`,
                    e.target.value
                  )
                }
              />
            </div>
          ))}
        </div>
      </div>

      {/* Cost Comparison */}
      <div className="border space-y-2 border-gray-300 bg-gray-100 p-3 mb-4">
        <div className="flex justify-between items-end">
          <label className="block text-lg font-semibold">Cost Comparison</label>
          <button
            onClick={() =>
              addRow("sections.costComparison.countries", {
                country: "",
                flag: "",
                price: "",
                desc: "",
              })
            }
            className="px-4 py-2 text-white rounded bg-[#333c29]"
          >
            +
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {sections.costComparison.countries.map((c, idx) => (
            <div
              key={idx}
              className="space-y-2 bg-white p-3 rounded border-gray-300 border"
            >
              <div className="flex justify-between items-center gap-2">
                <input
                  className="border border-gray-300 rounded bg-white p-2 w-full"
                  placeholder="Country"
                  value={c.country}
                  onChange={(e) =>
                    handleChange(
                      `sections.costComparison.countries.${idx}.country`,
                      e.target.value
                    )
                  }
                />
                <button
                  onClick={() =>
                    removeRow("sections.costComparison.countries", idx)
                  }
                  className="bg-red-600 text-white px-3 py-2 rounded self-start"
                >
                  ×
                </button>
              </div>

              <ImageUploader
                value={c.flag}
                onChange={(url) =>
                  handleChange(
                    `sections.costComparison.countries.${idx}.flag`,
                    url
                  )
                }
              />
              <input
                className="border border-gray-300 rounded bg-white p-2 w-full"
                placeholder="Price"
                value={c.price}
                onChange={(e) =>
                  handleChange(
                    `sections.costComparison.countries.${idx}.price`,
                    e.target.value
                  )
                }
              />
              <textarea
                className="border border-gray-300 rounded bg-white p-2 w-full"
                placeholder="Description"
                value={c.desc}
                onChange={(e) =>
                  handleChange(
                    `sections.costComparison.countries.${idx}.desc`,
                    e.target.value
                  )
                }
              />
            </div>
          ))}
        </div>
      </div>

      {/* Glimpse */}
      <div className="border space-y-2 border-gray-300 bg-gray-100 p-3 mb-4">
        <div className="flex items-end justify-between">
          <label className="block text-lg font-semibold">Glimpse Images</label>
          <button
            onClick={() => addRow("sections.glimpse.images", "")}
            className="px-4 py-2 text-white rounded bg-[#333c29]"
          >
            + Add Image
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {sections.glimpse.images.map((img, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center gap-2 mb-2"
            >
              <div className="w-18/20">
                <ImageUploader
                  value={img}
                  onChange={(url) =>
                    handleChange(`sections.glimpse.images.${idx}`, url)
                  }
                />
              </div>
              <div className="w-2/20">
                <button
                  onClick={() => removeRow("sections.glimpse.images", idx)}
                  className="bg-red-600 text-white px-3 py-2 h-10 rounded"
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MedicalTourismAdmin;
