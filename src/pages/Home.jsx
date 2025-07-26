import React, { useEffect, useState } from "react";
import ImageUploader from "../components/ImageUploader";

export default function HomeAdmin() {
  const [homeData, setHomeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${API}/home`);
      const data = await res.json();
      console.log(data);
      if (data) setHomeData(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleChange = (key, value) => {
    setHomeData({ ...homeData, [key]: value });
  };

  const handleSection = (section, key, value) => {
    setHomeData({
      ...homeData,
      sections: {
        ...homeData.sections,
        [section]: {
          ...homeData.sections[section],
          [key]: value,
        },
      },
    });
  };

  const handleArray = (section, field, index, key, value) => {
    const updated = [...homeData.sections[section][field]];
    updated[index][key] = value;
    setHomeData({
      ...homeData,
      sections: {
        ...homeData.sections,
        [section]: {
          ...homeData.sections[section],
          [field]: updated,
        },
      },
    });
  };

  const handleArrayValue = (section, field, index, value) => {
    const updated = [...homeData.sections[section][field]];
    updated[index] = value;
    setHomeData({
      ...homeData,
      sections: {
        ...homeData.sections,
        [section]: {
          ...homeData.sections[section],
          [field]: updated,
        },
      },
    });
  };

  const addArrayItem = (section, field, newItem) => {
    const updated = [...homeData.sections[section][field], newItem];
    setHomeData({
      ...homeData,
      sections: {
        ...homeData.sections,
        [section]: {
          ...homeData.sections[section],
          [field]: updated,
        },
      },
    });
  };

  const removeArrayItem = (section, field, index) => {
    const updated = [...homeData.sections[section][field]];
    updated.splice(index, 1);
    setHomeData({
      ...homeData,
      sections: {
        ...homeData.sections,
        [section]: {
          ...homeData.sections[section],
          [field]: updated,
        },
      },
    });
  };

  const save = async () => {
    setSaving(true);
    try {
      const response = await fetch(`${API}/home`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(homeData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      alert("Saved Successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to Save");
    }
    setSaving(false);
  };

  if (loading) return <div className="p-10">Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-semibold">Manage Home Page</h2>

        <button
          onClick={save}
          disabled={saving}
          className="px-4 py-2 text-white rounded bg-[#333c29]"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className="flex justify-between items-start gap-4">
        {/* Meta Fields */}
        <section className="border space-y-2 border-gray-300 bg-gray-100 p-3 mb-4 w-1/2">
          <label className="block text-lg font-semibold">Meta Title</label>
          <input
            type="text"
            placeholder="Meta Title"
            className="border border-gray-300 rounded bg-white p-2 w-full"
            value={homeData.metaTitle}
            onChange={(e) => handleChange("metaTitle", e.target.value)}
          />

          <label className="block text-lg font-semibold">
            Meta Description
          </label>
          <textarea
            placeholder="Meta Description"
            className="border border-gray-300 rounded bg-white p-2 w-full"
            value={homeData.metaDescription}
            onChange={(e) => handleChange("metaDescription", e.target.value)}
          />

          <label className="block text-lg font-semibold">Meta Keywords</label>
          <input
            className="border border-gray-300 rounded bg-white p-2 w-full"
            value={homeData.metaKeywords.join(", ")}
            onChange={(e) =>
              handleChange(
                "metaKeywords",
                e.target.value.split(",").map((k) => k.trim())
              )
            }
          />
        </section>

        {/* Banner */}
        <section className="border space-y-2 border-gray-300 bg-gray-100 p-3 mb- w-1/2">
          <h2 className="block text-lg font-semibold">Banner</h2>
          <input
            className="border border-gray-300 rounded bg-white p-2 w-full"
            placeholder="Heading"
            value={homeData.sections.banner.heading}
            onChange={(e) => handleSection("banner", "heading", e.target.value)}
          />
          <textarea
            className="border border-gray-300 rounded bg-white p-2 w-full"
            placeholder="Subheading"
            value={homeData.sections.banner.subheading}
            onChange={(e) =>
              handleSection("banner", "subheading", e.target.value)
            }
          />
          <input
            className="border border-gray-300 rounded bg-white p-2 w-full"
            placeholder="CTA Text"
            value={homeData.sections.banner.cta.text}
            onChange={(e) =>
              handleSection("banner", "cta", {
                ...homeData.sections.banner.cta,
                text: e.target.value,
                link: homeData.sections.banner.cta.link,
              })
            }
          />
          <input
            className="border border-gray-300 rounded bg-white p-2 w-full"
            placeholder="CTA Link"
            value={homeData.sections.banner.cta.link}
            onChange={(e) =>
              handleSection("banner", "cta", {
                ...homeData.sections.banner.cta,
                text: homeData.sections.banner.cta.text,
                link: e.target.value,
              })
            }
          />
        </section>
      </div>

      {/* Celebrity Slider */}
      <section className="border space-y-2 border-gray-300 bg-gray-100 p-3 mb-4">
        <h2 className="block text-lg font-semibold">Celebrity Slider</h2>
        <input
          className="border border-gray-300 rounded bg-white p-2 w-full"
          placeholder="Title"
          value={homeData.sections.celebritySlider.title}
          onChange={(e) =>
            handleSection("celebritySlider", "title", e.target.value)
          }
        />

        <div className="flex justify-between items-center">
          <h2 className="block text-lg font-semibold">Images</h2>
          <button
            onClick={() => addArrayItem("celebritySlider", "images", "")}
            className="px-4 py-2 text-white rounded bg-[#333c29]"
          >
            +
          </button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {homeData.sections.celebritySlider.images.map((img, i) => (
            <div
              key={i}
              className="flex justify-between items-center gap-2 mb-1 w-full"
            >
              <div className="w-19/20">
                <ImageUploader
                  value={img}
                  onChange={(url) =>
                    handleArrayValue("celebritySlider", "images", i, url)
                  }
                />
              </div>
              <button
                onClick={() => removeArrayItem("celebritySlider", "images", i)}
                className="bg-red-600 text-white py-1 rounded w-1/20"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Truth Section */}
      <section className="border space-y-2 border-gray-300 bg-gray-100 p-3 mb-4">
        <div className="flex justify-between items-center">
          <h2 className="block text-lg font-semibold">Truth Section</h2>
          <button
            onClick={() =>
              addArrayItem("truthSection", "points", {
                number: "",
                title: "",
                description: "",
              })
            }
            className="px-4 py-2 text-white rounded bg-[#333c29]"
          >
            +
          </button>
        </div>

        <input
          className="border border-gray-300 rounded bg-white p-2 w-full"
          placeholder="Title"
          value={homeData.sections.truthSection.title}
          onChange={(e) =>
            handleSection("truthSection", "title", e.target.value)
          }
        />
        <input
          className="border border-gray-300 rounded bg-white p-2 w-full"
          placeholder="Subtitle"
          value={homeData.sections.truthSection.subtitle}
          onChange={(e) =>
            handleSection("truthSection", "subtitle", e.target.value)
          }
        />
        <div className="grid grid-cols-3 gap-2">
          {homeData.sections.truthSection.points.map((point, i) => (
            <div
              key={i}
              className="space-y-2 bg-white p-3 rounded border-gray-300 border"
            >
              <div className="flex justify-between items-center gap-2">
                <input
                  placeholder="Number"
                  className="border border-gray-300 rounded bg-white p-2 w-full"
                  value={point.number}
                  onChange={(e) =>
                    handleArray(
                      "truthSection",
                      "points",
                      i,
                      "number",
                      e.target.value
                    )
                  }
                />
                <button
                  onClick={() => removeArrayItem("truthSection", "points", i)}
                  className="px-2 py-2 bg-red-500 text-white rounded"
                >
                  ×
                </button>
              </div>
              <input
                placeholder="Title"
                className="border border-gray-300 rounded bg-white p-2 w-full"
                value={point.title}
                onChange={(e) =>
                  handleArray(
                    "truthSection",
                    "points",
                    i,
                    "title",
                    e.target.value
                  )
                }
              />
              <textarea
                placeholder="Description"
                className="border border-gray-300 rounded bg-white p-2 w-full"
                value={point.description}
                onChange={(e) =>
                  handleArray(
                    "truthSection",
                    "points",
                    i,
                    "description",
                    e.target.value
                  )
                }
              />
            </div>
          ))}
        </div>
      </section>

      {/* Our Promise */}
      <section className="border space-y-2 border-gray-300 bg-gray-100 p-3 mb-4">
        <div className="flex justify-between items-center">
          <h2 className="block text-lg font-semibold">Our Promise</h2>
          <button
            onClick={() =>
              addArrayItem("ourPromise", "promises", {
                title: "",
                description: "",
              })
            }
            className="px-4 py-2 text-white rounded bg-[#333c29]"
          >
            +
          </button>
        </div>

        <input
          className="border border-gray-300 rounded bg-white p-2 w-full"
          placeholder="Title"
          value={homeData.sections.ourPromise.title}
          onChange={(e) => handleSection("ourPromise", "title", e.target.value)}
        />
        <input
          className="border border-gray-300 rounded bg-white p-2 w-full"
          placeholder="Subtitle"
          value={homeData.sections.ourPromise.subtitle}
          onChange={(e) =>
            handleSection("ourPromise", "subtitle", e.target.value)
          }
        />
        <div className="grid grid-cols-3 gap-2">
          {homeData.sections.ourPromise.promises.map((item, i) => (
            <div
              key={i}
              className="space-y-2 bg-white p-3 rounded border-gray-300 border"
            >
              <div className="flex justify-between items-center gap-2">
                <input
                  placeholder="Title"
                  className="border border-gray-300 rounded bg-white p-2 w-full"
                  value={item.title}
                  onChange={(e) =>
                    handleArray(
                      "ourPromise",
                      "promises",
                      i,
                      "title",
                      e.target.value
                    )
                  }
                />
                <button
                  onClick={() => removeArrayItem("ourPromise", "promises", i)}
                  className="px-2 py-2 bg-red-500 text-white rounded"
                >
                  ×
                </button>
              </div>
              <textarea
                placeholder="Description"
                className="border border-gray-300 rounded bg-white p-2 w-full"
                value={item.description}
                onChange={(e) =>
                  handleArray(
                    "ourPromise",
                    "promises",
                    i,
                    "description",
                    e.target.value
                  )
                }
              />
            </div>
          ))}
        </div>
      </section>

      {/* Surgery Gallery */}
      <section className="border space-y-2 border-gray-300 bg-gray-100 p-3 mb-4">
        <div className="flex justify-between items-center">
          <h2 className="block text-lg font-semibold">Surgery Gallery</h2>
          <button
            onClick={() => addArrayItem("surgeryGallery", "images", "")}
            className="px-4 py-2 text-white rounded bg-[#333c29]"
          >
            +
          </button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {homeData.sections.surgeryGallery.images.map((img, i) => (
            <div
              key={i}
              className="flex justify-between items-center gap-2 mb-2"
            >
              <div className="w-19/20">
                <ImageUploader
                  value={img}
                  onChange={(url) =>
                    handleArrayValue("surgeryGallery", "images", i, url)
                  }
                />
              </div>
              <button
                onClick={() => removeArrayItem("surgeryGallery", "images", i)}
                className="px-1 py-1 bg-red-500 text-white rounded w-1/20"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="border space-y-2 border-gray-300 bg-gray-100 p-3 mb-4">
        <div className="flex justify-between items-center">
          <h2 className="block text-lg font-semibold">Process Section</h2>
          <button
            onClick={() =>
              addArrayItem("processSection", "stages", {
                label: "",
                percent: 0,
                image: "",
              })
            }
            className="px-4 py-2 text-white rounded bg-[#333c29]"
          >
            +
          </button>
        </div>

        <input
          className="border border-gray-300 rounded bg-white p-2 w-full"
          placeholder="Title"
          value={homeData.sections.processSection.title}
          onChange={(e) =>
            handleSection("processSection", "title", e.target.value)
          }
        />

        <textarea
          className="border border-gray-300 rounded bg-white p-2 w-full"
          placeholder="Description"
          value={homeData.sections.processSection.description}
          onChange={(e) =>
            handleSection("processSection", "description", e.target.value)
          }
        />

        <div className="grid grid-cols-3 gap-2">
          {homeData.sections.processSection.stages.map((stage, i) => (
            <div
              key={i}
              className="space-y-2 bg-white p-3 rounded border-gray-300 border"
            >
              <div className="flex justify-between items-center gap-2">
                <input
                  placeholder="Label"
                  className="border border-gray-300 rounded bg-white p-2 w-full"
                  value={stage.label}
                  onChange={(e) =>
                    handleArray(
                      "processSection",
                      "stages",
                      i,
                      "label",
                      e.target.value
                    )
                  }
                />
                <button
                  onClick={() => removeArrayItem("processSection", "stages", i)}
                  className="px-2 py-2 bg-red-500 text-white rounded"
                >
                  ×
                </button>
              </div>

              <input
                placeholder="Percent"
                type="number"
                className="border border-gray-300 rounded bg-white p-2 w-full"
                value={stage.percent}
                onChange={(e) =>
                  handleArray(
                    "processSection",
                    "stages",
                    i,
                    "percent",
                    Number(e.target.value)
                  )
                }
              />

              <ImageUploader
                value={stage.image}
                onChange={(url) =>
                  handleArray("processSection", "stages", i, "image", url)
                }
              />
            </div>
          ))}
        </div>
      </section>

      {/* Full Width Image */}
      <section className="border space-y-2 border-gray-300 bg-gray-100 p-3 mb-4">
        <h2 className="block text-lg font-semibold mb-4">Full Width Image</h2>

        <label className="block text-lg font-semibold">Image</label>
        <ImageUploader
          value={homeData.sections.fullWidthImage.image}
          onChange={(url) => handleSection("fullWidthImage", "image", url)}
        />
        <input
          className="border border-gray-300 rounded bg-white p-2 w-full"
          placeholder="Alt Text"
          value={homeData.sections.fullWidthImage.altText}
          onChange={(e) =>
            handleSection("fullWidthImage", "altText", e.target.value)
          }
        />
      </section>

      {/* Results Gallery */}
      <section className="border space-y-2 border-gray-300 bg-gray-100 p-3 mb-4">
        <div className="flex justify-between items-center">
          <h2 className="block text-lg font-semibold">Results Gallery</h2>
          <button
            onClick={() =>
              addArrayItem("resultsGallery", "beforeAfterPairs", {
                before: "",
                after: "",
              })
            }
            className="px-4 py-2 text-white rounded bg-[#333c29]"
          >
            +
          </button>
        </div>

        <label className="block text-lg font-semibold">Title</label>
        <input
          className="border border-gray-300 rounded bg-white p-2 w-full"
          placeholder="Title"
          value={homeData.sections.resultsGallery.title}
          onChange={(e) =>
            handleSection("resultsGallery", "title", e.target.value)
          }
        />

        <label className="block text-lg font-semibold">Description</label>
        <textarea
          className="border border-gray-300 rounded bg-white p-2 w-full"
          placeholder="Description"
          value={homeData.sections.resultsGallery.description}
          onChange={(e) =>
            handleSection("resultsGallery", "description", e.target.value)
          }
        />

        <div className="grid grid-cols-3 gap-2">
          {homeData.sections.resultsGallery.beforeAfterPairs.map((pair, i) => (
            <div
              key={i}
              className="space-y-2 bg-white p-3 rounded border-gray-300 border"
            >
              <label className="block text-md font-semibold">
                Before Image
              </label>
              <ImageUploader
                value={pair.before}
                onChange={(url) =>
                  handleArray(
                    "resultsGallery",
                    "beforeAfterPairs",
                    i,
                    "before",
                    url
                  )
                }
              />

              <label className="block text-md font-semibold">After Image</label>
              <ImageUploader
                value={pair.after}
                onChange={(url) =>
                  handleArray(
                    "resultsGallery",
                    "beforeAfterPairs",
                    i,
                    "after",
                    url
                  )
                }
              />

              <button
                onClick={() =>
                  removeArrayItem("resultsGallery", "beforeAfterPairs", i)
                }
                className="px-3 py-2 bg-red-500 text-white rounded"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Book Section */}
      <section className="border space-y-2 border-gray-300 bg-gray-100 p-3 mb-4">
        <h2 className="block text-lg font-semibold mb-4">Book Section</h2>

        <div className="flex justify-between items-center gap-4">
          <div className="w-1/2">
            <label className="block text-lg font-semibold">Title</label>
            <input
              className="border border-gray-300 rounded bg-white p-2 w-full"
              placeholder="Title"
              value={homeData.sections.bookSection.title}
              onChange={(e) =>
                handleSection("bookSection", "title", e.target.value)
              }
            />

            <label className="block text-lg font-semibold">Description</label>
            <textarea
              className="border border-gray-300 rounded bg-white p-2 w-full"
              placeholder="Description"
              value={homeData.sections.bookSection.description}
              onChange={(e) =>
                handleSection("bookSection", "description", e.target.value)
              }
            />
          </div>
          <div className="w-1/2">
            {" "}
            <label className="block text-lg font-semibold">Image</label>
            <ImageUploader
              value={homeData.sections.bookSection.image}
              onChange={(url) => handleSection("bookSection", "image", url)}
            />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <label className="block text-lg font-semibold">Benefits</label>
          <button
            onClick={() => addArrayItem("bookSection", "benefits", "")}
            className="px-4 py-2 text-white rounded bg-[#333c29]"
          >
            +
          </button>
        </div>
        <div className="space-y-2">
          {homeData.sections.bookSection.benefits.map((benefit, i) => (
            <div key={i} className="flex gap-2">
              <input
                placeholder="Benefit"
                className="flex-1 border border-gray-300 rounded bg-white p-2"
                value={benefit}
                onChange={(e) =>
                  handleArrayValue("bookSection", "benefits", i, e.target.value)
                }
              />
              <button
                onClick={() => removeArrayItem("bookSection", "benefits", i)}
                className="px-2 py-2 bg-red-500 text-white rounded"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Action Section */}
      <section className="border space-y-2 border-gray-300 bg-gray-100 p-3 mb-4">
        <h2 className="block text-lg font-semibold mb-4">Action Section</h2>

        <input
          className="border border-gray-300 rounded bg-white p-2 w-full"
          placeholder="Title"
          value={homeData.sections.actionSection.title}
          onChange={(e) =>
            handleSection("actionSection", "title", e.target.value)
          }
        />

        <textarea
          className="border border-gray-300 rounded bg-white p-2 w-full"
          placeholder="Description"
          value={homeData.sections.actionSection.description}
          onChange={(e) =>
            handleSection("actionSection", "description", e.target.value)
          }
        />

        <input
          className="border border-gray-300 rounded bg-white p-2 w-full"
          placeholder="CTA Text"
          value={homeData.sections.actionSection.cta.text}
          onChange={(e) =>
            handleNested("actionSection", "cta", "text", e.target.value)
          }
        />

        <input
          className="border border-gray-300 rounded bg-white p-2 w-full"
          placeholder="CTA Link"
          value={homeData.sections.actionSection.cta.link}
          onChange={(e) =>
            handleNested("actionSection", "cta", "link", e.target.value)
          }
        />
      </section>
    </div>
  );
}
