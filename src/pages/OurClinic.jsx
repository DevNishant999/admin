import React, { useState, useEffect } from "react";
import ImageUploader from "../components/ImageUploader";

const OurClinic = () => {
  const [formData, setFormData] = useState({
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    content: {
      banner: {
        title: "",
        subtitle: "",
        bgImage: "",
      },
      introduction: {
        heading: "",
        description: "",
      },
      clinics: [
        {
          name: "",
          description: "",
          address: "",
          phone: "",
          email: "",
          images: [""],
        },
      ],
      features: {
        heading: "",
        description: "",
        items: [
          {
            icon: "",
            title: "",
            description: "",
          },
        ],
      },
      testimonials: {
        heading: "",
        description: "",
        image: "",
      },
    },
  });

  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${API}/our-clinic`);
      const data = await res.json();
      if (data) setFormData(data);
    };
    fetchData();
  }, []);

  const handleInputChange = (path, value) => {
    setFormData((prev) => {
      const keys = path.split(".");
      let updated = { ...prev };
      let current = updated;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return updated;
    });
  };

  const handleArrayChange = (path, index, field, value) => {
    setFormData((prev) => {
      const keys = path.split(".");
      let updated = { ...prev };
      let current = updated;
      for (let i = 0; i < keys.length; i++) {
        current = current[keys[i]];
      }
      current[index][field] = value;
      return updated;
    });
  };

  const addClinic = () => {
    setFormData((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        clinics: [
          ...prev.content.clinics,
          {
            name: "",
            description: "",
            address: "",
            phone: "",
            email: "",
            images: [""],
          },
        ],
      },
    }));
  };

  const addFeature = () => {
    setFormData((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        features: {
          ...prev.content.features,
          items: [
            ...prev.content.features.items,
            { icon: "", title: "", description: "" },
          ],
        },
      },
    }));
  };

  const saveHandler = async () => {
    const res = await fetch(`${API}/our-clinic`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    alert(data.message || "Saved!");
  };

  return (
    <div>
      <div className="flex justify-between items-end mb-2">
        <h2 className="text-2xl font-semibold">Manage Our Clinic Page</h2>
        <button
          onClick={saveHandler}
          className="px-4 py-2 text-white rounded bg-[#333c29]"
        >
          Save Changes
        </button>
      </div>

      <div className="space-y-4">
        <div className="border space-y-2 border-gray-300 bg-gray-100 p-3 mb-4">
          <h2 className="block mb-1 text-lg font-semibold">Meta Data</h2>
          <input
            className="border border-gray-300 rounded bg-white p-2 w-full"
            placeholder="Meta Title"
            value={formData.metaTitle}
            onChange={(e) => handleInputChange("metaTitle", e.target.value)}
          />
          <textarea
            className="border border-gray-300 rounded bg-white p-2 w-full"
            placeholder="Meta Description"
            value={formData.metaDescription}
            onChange={(e) =>
              handleInputChange("metaDescription", e.target.value)
            }
          />
          <input
            className="border border-gray-300 rounded bg-white p-2 w-full"
            placeholder="Meta Keywords (comma separated)"
            value={formData.metaKeywords}
            onChange={(e) => handleInputChange("metaKeywords", e.target.value)}
          />
        </div>

        <div className="border space-y-2 border-gray-300 bg-gray-100 p-3 mb-4">
          <h2 className="block mb-1 text-lg font-semibold">Banner</h2>
          <input
            className="border border-gray-300 rounded bg-white p-2 w-full"
            placeholder="Banner Title"
            value={formData.content.banner.title}
            onChange={(e) =>
              handleInputChange("content.banner.title", e.target.value)
            }
          />
          <input
            className="border border-gray-300 rounded bg-white p-2 w-full"
            placeholder="Banner Subtitle"
            value={formData.content.banner.subtitle}
            onChange={(e) =>
              handleInputChange("content.banner.subtitle", e.target.value)
            }
          />
          <ImageUploader
            label="Banner Background Image"
            value={formData.content.banner.bgImage}
            onChange={(url) => handleInputChange("content.banner.bgImage", url)}
          />
        </div>

        <div className="border space-y-2 border-gray-300 bg-gray-100 p-3 mb-4">
          <h2 className="block mb-1 text-lg font-semibold">Introduction</h2>
          <input
            className="border border-gray-300 rounded bg-white p-2 w-full"
            placeholder="Intro Heading"
            value={formData.content.introduction.heading}
            onChange={(e) =>
              handleInputChange("content.introduction.heading", e.target.value)
            }
          />
          <textarea
            className="border border-gray-300 rounded bg-white p-2 w-full"
            placeholder="Intro Description"
            value={formData.content.introduction.description}
            onChange={(e) =>
              handleInputChange(
                "content.introduction.description",
                e.target.value
              )
            }
          />
        </div>

        <div className="border space-y-2 border-gray-300 bg-gray-100 p-3 mb-4">
          <div className="flex justify-between items-end">
            <h2 className="block mb-1 text-lg font-semibold">Clinics</h2>
            <button
              onClick={addClinic}
              className="px-4 py-2 text-white rounded bg-[#333c29]"
            >
              + Add Clinic
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {formData.content.clinics.map((clinic, idx) => (
              <div
                key={idx}
                className="space-y-2 bg-white p-3 rounded border-gray-300 border"
              >
                <input
                  className="border border-gray-300 rounded bg-white p-2 w-full"
                  placeholder="Clinic Name"
                  value={clinic.name}
                  onChange={(e) =>
                    handleArrayChange(
                      "content.clinics",
                      idx,
                      "name",
                      e.target.value
                    )
                  }
                />
                <textarea
                  className="border border-gray-300 rounded bg-white p-2 w-full"
                  placeholder="Clinic Description"
                  value={clinic.description}
                  onChange={(e) =>
                    handleArrayChange(
                      "content.clinics",
                      idx,
                      "description",
                      e.target.value
                    )
                  }
                />
                <input
                  className="border border-gray-300 rounded bg-white p-2 w-full"
                  placeholder="Address"
                  value={clinic.address}
                  onChange={(e) =>
                    handleArrayChange(
                      "content.clinics",
                      idx,
                      "address",
                      e.target.value
                    )
                  }
                />
                <input
                  className="border border-gray-300 rounded bg-white p-2 w-full"
                  placeholder="Phone"
                  value={clinic.phone}
                  onChange={(e) =>
                    handleArrayChange(
                      "content.clinics",
                      idx,
                      "phone",
                      e.target.value
                    )
                  }
                />
                <input
                  className="border border-gray-300 rounded bg-white p-2 w-full"
                  placeholder="Email"
                  value={clinic.email}
                  onChange={(e) =>
                    handleArrayChange(
                      "content.clinics",
                      idx,
                      "email",
                      e.target.value
                    )
                  }
                />

                {clinic.images.map((img, imgIdx) => (
                  <div
                    key={imgIdx}
                    className="mb-2 flex items-end justify-between"
                  >
                    <div className="w-9/10">
                      <ImageUploader
                        label={`Image ${imgIdx + 1}`}
                        value={img}
                        onChange={(url) => {
                          setFormData((prev) => {
                            const updated = { ...prev };
                            updated.content.clinics[idx].images[imgIdx] = url;
                            return updated;
                          });
                        }}
                      />
                    </div>
                    <div className="w-1/10 flex items-center justify-end">
                      <button
                        onClick={() => {
                          setFormData((prev) => {
                            const updated = { ...prev };
                            updated.content.clinics[idx].images.splice(
                              imgIdx,
                              1
                            );
                            return updated;
                          });
                        }}
                        className="px-2 py-1 bg-red-600 text-white rounded text-sm"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}

                <div className="flex items-center justify-between">
                  <button
                    onClick={() => {
                      setFormData((prev) => {
                        const updated = { ...prev };
                        updated.content.clinics[idx].images.push("");
                        return updated;
                      });
                    }}
                    className="px-4 py-2 text-white rounded bg-[#333c29] w-[49%]"
                  >
                    + Add Image
                  </button>

                  <button
                    onClick={() => {
                      setFormData((prev) => {
                        const updated = { ...prev };
                        updated.content.clinics.splice(idx, 1);
                        return updated;
                      });
                    }}
                    className="bg-red-600 text-white px-3 py-2 rounded w-[49%]"
                  >
                    × Delete Clinic
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border space-y-2 border-gray-300 bg-gray-100 p-3 mb-4">
          <div className="flex items-end justify-between">
            <h2 className="block mb-1 text-lg font-semibold">Features</h2>
            <button
              onClick={addFeature}
              className="px-4 py-2 text-white rounded bg-[#333c29]"
            >
              + Add Feature
            </button>
          </div>
          <input
            className="border border-gray-300 rounded bg-white p-2 w-full"
            placeholder="Features Heading"
            value={formData.content.features.heading}
            onChange={(e) =>
              handleInputChange("content.features.heading", e.target.value)
            }
          />
          <textarea
            className="border border-gray-300 rounded bg-white p-2 w-full"
            placeholder="Features Description"
            value={formData.content.features.description}
            onChange={(e) =>
              handleInputChange("content.features.description", e.target.value)
            }
          />
          <div className="grid grid-cols-3 gap-4">
            {formData.content.features.items.map((item, idx) => (
              <div
                key={idx}
                className="space-y-2 bg-white p-3 rounded border-gray-300 border"
              >
                <ImageUploader
                  label={`Feature Icon ${idx + 1}`}
                  value={item.icon}
                  onChange={(url) =>
                    setFormData((prev) => {
                      const updated = { ...prev };
                      updated.content.features.items[idx].icon = url;
                      return updated;
                    })
                  }
                />
                <div className="flex justify-between gap-1 items-center">
                  <input
                    className="border border-gray-300 rounded bg-white p-2 w-full"
                    placeholder="Title"
                    value={item.title}
                    onChange={(e) =>
                      handleArrayChange(
                        "content.features.items",
                        idx,
                        "title",
                        e.target.value
                      )
                    }
                  />

                  <button
                    onClick={() => {
                      setFormData((prev) => {
                        const updated = { ...prev };
                        updated.content.features.items.splice(idx, 1);
                        return updated;
                      });
                    }}
                    className="px-3 py-2 bg-red-600 text-white rounded text-sm"
                  >
                    ×
                  </button>
                </div>

                <textarea
                  className="border border-gray-300 rounded bg-white p-2 w-full"
                  placeholder="Description"
                  value={item.description}
                  onChange={(e) =>
                    handleArrayChange(
                      "content.features.items",
                      idx,
                      "description",
                      e.target.value
                    )
                  }
                />
              </div>
            ))}
          </div>
        </div>

        <div className="border space-y-2 border-gray-300 bg-gray-100 p-3 mb-4">
          <div className="flex justify-between items-start gap-2">
            <div className="w-1/2 space-y-2">
              <h2 className="block mb-1 text-lg font-semibold">Testimonials</h2>

              <input
                className="border border-gray-300 rounded bg-white p-2 w-full"
                placeholder="Testimonials Heading"
                value={formData.content.testimonials.heading}
                onChange={(e) =>
                  handleInputChange(
                    "content.testimonials.heading",
                    e.target.value
                  )
                }
              />
              <textarea
                className="border border-gray-300 rounded bg-white p-2 w-full"
                placeholder="Testimonials Description"
                value={formData.content.testimonials.description}
                onChange={(e) =>
                  handleInputChange(
                    "content.testimonials.description",
                    e.target.value
                  )
                }
              />
            </div>
            <div className="w-1/2">
              <ImageUploader
                label="Testimonials Image"
                value={formData.content.testimonials.image}
                onChange={(url) =>
                  handleInputChange("content.testimonials.image", url)
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurClinic;
