import React, { useEffect, useState } from "react";
import ImageUploader from "../components/ImageUploader";

export default function AboutAdmin() {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${API}/about`);
      const data = await res.json();
      if (data) setAboutData(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleMetaChange = (e) => {
    const { name, value } = e.target;
    setAboutData({ ...aboutData, [name]: value });
  };

  const handleNestedChange = (section, key, value) => {
    setAboutData({
      ...aboutData,
      aboutPage: {
        ...aboutData.aboutPage,
        [section]: {
          ...aboutData.aboutPage[section],
          [key]: value,
        },
      },
    });
  };

  const handleCertChange = (index, key, value) => {
    const updated = [
      ...aboutData.aboutPage.establishmentSection.certifications,
    ];
    updated[index][key] = value;
    setAboutData({
      ...aboutData,
      aboutPage: {
        ...aboutData.aboutPage,
        establishmentSection: {
          ...aboutData.aboutPage.establishmentSection,
          certifications: updated,
        },
      },
    });
  };

  const addCert = () => {
    const updated = [
      ...aboutData.aboutPage.establishmentSection.certifications,
      { icon: "", text: "" },
    ];
    setAboutData({
      ...aboutData,
      aboutPage: {
        ...aboutData.aboutPage,
        establishmentSection: {
          ...aboutData.aboutPage.establishmentSection,
          certifications: updated,
        },
      },
    });
  };

  const removeCert = (index) => {
    const updated =
      aboutData.aboutPage.establishmentSection.certifications.filter(
        (_, i) => i !== index
      );
    setAboutData({
      ...aboutData,
      aboutPage: {
        ...aboutData.aboutPage,
        establishmentSection: {
          ...aboutData.aboutPage.establishmentSection,
          certifications: updated,
        },
      },
    });
  };

  const handleSave = () => {
    fetch(`${API}/about`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(aboutData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        alert("Updated!");
      })
      .catch(console.error);
  };

  const update = (keyPath, value) => {
    const keys = keyPath.split(".");
    const newData = { ...aboutData };
    let current = newData;

    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }

    current[keys[keys.length - 1]] = value;

    setAboutData(newData);
  };

  if (loading) return <div className="p-10 text-xl">Loading...</div>;
  if (!aboutData) return <div className="p-10 text-xl">No Data</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-semibold">Manage About Page</h2>

        <button
          onClick={handleSave}
          className="px-4 py-2 text-white rounded bg-[#333c29]"
        >
          Save Changes
        </button>
      </div>

      <div className="flex justify-between items-start gap-4">
        {/* Meta */}
        <section className="border border-gray-300 bg-gray-100 p-3 mb-4 space-y-2 w-1/2">
          <h2 className="block text-lg font-semibold">Meta Details</h2>
          <input
            type="text"
            name="metaTitle"
            value={aboutData.metaTitle}
            onChange={handleMetaChange}
            placeholder="Meta Title"
            className="border border-gray-300 rounded bg-white p-2 w-full"
          />
          <textarea
            name="metaDescription"
            value={aboutData.metaDescription}
            onChange={handleMetaChange}
            placeholder="Meta Description"
            className="border border-gray-300 rounded bg-white p-2 w-full"
          />
          <textarea
            name="metaKeywords"
            value={aboutData.metaKeywords.join(", ")}
            onChange={(e) =>
              setAboutData({
                ...aboutData,
                metaKeywords: e.target.value.split(",").map((k) => k.trim()),
              })
            }
            placeholder="Meta Keywords"
            className="border border-gray-300 rounded bg-white p-2 w-full"
          />
        </section>

        {/* Banner */}
        <section className="border border-gray-300 bg-gray-100 p-3 mb-4 space-y-2 w-1/2">
          <h2 className="block text-lg font-semibold">Banner</h2>
          <ImageUploader
            value={aboutData.aboutPage.banner}
            onChange={(url) => update("aboutPage.banner", url)}
          />
        </section>
      </div>

      {/* Establishment */}
      <section className="border border-gray-300 bg-gray-100 p-3 mb-4 space-y-4">
        <h2 className="block text-lg font-semibold">Establishment Section</h2>

        <input
          type="text"
          value={aboutData.aboutPage.establishmentSection.title}
          onChange={(e) =>
            handleNestedChange("establishmentSection", "title", e.target.value)
          }
          className="border border-gray-300 rounded bg-white p-2 w-full"
        />

        <textarea
          value={aboutData.aboutPage.establishmentSection.description}
          onChange={(e) =>
            handleNestedChange(
              "establishmentSection",
              "description",
              e.target.value
            )
          }
          className="border border-gray-300 rounded bg-white p-2 w-full"
        />

        {/* Certifications */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Certifications</h3>
            <button
              onClick={addCert}
              className="px-4 py-2 text-white rounded bg-[#333c29]"
            >
              +
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {aboutData.aboutPage.establishmentSection.certifications.map(
              (cert, idx) => (
                <div
                  key={idx}
                  className="space-y-2 bg-white p-3 rounded border border-gray-300 relative"
                >
                  <div className="flex justify-between items-center gap-2">
                    <ImageUploader
                      value={cert.icon}
                      onChange={(url) => handleCertChange(idx, "icon", url)}
                    />
                    <button
                      onClick={() => removeCert(idx)}
                      className="px-2 py-2 bg-red-500 text-white rounded"
                    >
                      ×
                    </button>
                  </div>

                  <input
                    type="text"
                    placeholder="Text"
                    value={cert.text}
                    onChange={(e) =>
                      handleCertChange(idx, "text", e.target.value)
                    }
                    className="border border-gray-300 rounded bg-white p-2 w-full"
                  />
                </div>
              )
            )}
          </div>
        </div>

        {/* Features */}
        <div className="space-y-2">
          <div className="flex justify-between items-end">
            <h3 className="text-lg font-medium">Features</h3>
            <button
              onClick={() => {
                const updated = [
                  ...aboutData.aboutPage.establishmentSection.features,
                  { num: "", title: "", desc: "" },
                ];
                setAboutData({
                  ...aboutData,
                  aboutPage: {
                    ...aboutData.aboutPage,
                    establishmentSection: {
                      ...aboutData.aboutPage.establishmentSection,
                      features: updated,
                    },
                  },
                });
              }}
              className="px-4 py-2 text-white rounded bg-[#333c29]"
            >
              +
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {aboutData.aboutPage.establishmentSection.features.map(
              (feature, idx) => (
                <div
                  key={idx}
                  className="space-y-2 bg-white p-3 rounded border border-gray-300 relative"
                >
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Num"
                      value={feature.num}
                      onChange={(e) => {
                        const updated = [
                          ...aboutData.aboutPage.establishmentSection.features,
                        ];
                        updated[idx].num = e.target.value;
                        setAboutData({
                          ...aboutData,
                          aboutPage: {
                            ...aboutData.aboutPage,
                            establishmentSection: {
                              ...aboutData.aboutPage.establishmentSection,
                              features: updated,
                            },
                          },
                        });
                      }}
                      className="border border-gray-300 rounded bg-white p-2 w-full"
                    />
                    <button
                      onClick={() => {
                        const updated =
                          aboutData.aboutPage.establishmentSection.features.filter(
                            (_, i) => i !== idx
                          );
                        setAboutData({
                          ...aboutData,
                          aboutPage: {
                            ...aboutData.aboutPage,
                            establishmentSection: {
                              ...aboutData.aboutPage.establishmentSection,
                              features: updated,
                            },
                          },
                        });
                      }}
                      className="px-2 py-1 bg-red-500 text-white rounded"
                    >
                      ×
                    </button>
                  </div>

                  <input
                    type="text"
                    placeholder="Title"
                    value={feature.title}
                    onChange={(e) => {
                      const updated = [
                        ...aboutData.aboutPage.establishmentSection.features,
                      ];
                      updated[idx].title = e.target.value;
                      setAboutData({
                        ...aboutData,
                        aboutPage: {
                          ...aboutData.aboutPage,
                          establishmentSection: {
                            ...aboutData.aboutPage.establishmentSection,
                            features: updated,
                          },
                        },
                      });
                    }}
                    className="border border-gray-300 rounded bg-white p-2 w-full"
                  />
                  <textarea
                    placeholder="Description"
                    value={feature.desc}
                    onChange={(e) => {
                      const updated = [
                        ...aboutData.aboutPage.establishmentSection.features,
                      ];
                      updated[idx].desc = e.target.value;
                      setAboutData({
                        ...aboutData,
                        aboutPage: {
                          ...aboutData.aboutPage,
                          establishmentSection: {
                            ...aboutData.aboutPage.establishmentSection,
                            features: updated,
                          },
                        },
                      });
                    }}
                    className="border border-gray-300 rounded bg-white p-2 w-full"
                  />
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Timeline Events */}
      <section className="border border-gray-300 bg-gray-100 p-3 mb-4 space-y-4">
        <div className="flex justify-between items-end">
          <h2 className="block text-lg font-semibold">Timeline Events</h2>
          <button
            onClick={() => {
              const updated = [
                ...aboutData.aboutPage.timeline.events,
                { year: "", title: "", desc: "" },
              ];
              setAboutData({
                ...aboutData,
                aboutPage: {
                  ...aboutData.aboutPage,
                  timeline: {
                    ...aboutData.aboutPage.timeline,
                    events: updated,
                  },
                },
              });
            }}
            className="px-4 py-2 text-white rounded bg-[#333c29]"
          >
            +
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {aboutData.aboutPage.timeline.events.map((event, idx) => (
            <div
              key={idx}
              className="space-y-2 bg-white p-3 rounded border border-gray-300 relative"
            >
              <div className="flex jusitfy-between items-center gap-2">
                <input
                  type="text"
                  placeholder="Year"
                  value={event.year}
                  onChange={(e) => {
                    const updated = [...aboutData.aboutPage.timeline.events];
                    updated[idx].year = e.target.value;
                    setAboutData({
                      ...aboutData,
                      aboutPage: {
                        ...aboutData.aboutPage,
                        timeline: {
                          ...aboutData.aboutPage.timeline,
                          events: updated,
                        },
                      },
                    });
                  }}
                  className="border border-gray-300 rounded bg-white p-2 w-full"
                />
                <button
                  onClick={() => {
                    const updated = aboutData.aboutPage.timeline.events.filter(
                      (_, i) => i !== idx
                    );
                    setAboutData({
                      ...aboutData,
                      aboutPage: {
                        ...aboutData.aboutPage,
                        timeline: {
                          ...aboutData.aboutPage.timeline,
                          events: updated,
                        },
                      },
                    });
                  }}
                  className="px-2 py-2 bg-red-500 text-white rounded"
                >
                  ×
                </button>
              </div>

              <input
                type="text"
                placeholder="Title"
                value={event.title}
                onChange={(e) => {
                  const updated = [...aboutData.aboutPage.timeline.events];
                  updated[idx].title = e.target.value;
                  setAboutData({
                    ...aboutData,
                    aboutPage: {
                      ...aboutData.aboutPage,
                      timeline: {
                        ...aboutData.aboutPage.timeline,
                        events: updated,
                      },
                    },
                  });
                }}
                className="border border-gray-300 rounded bg-white p-2 w-full"
              />

              <textarea
                placeholder="Description"
                value={event.desc}
                onChange={(e) => {
                  const updated = [...aboutData.aboutPage.timeline.events];
                  updated[idx].desc = e.target.value;
                  setAboutData({
                    ...aboutData,
                    aboutPage: {
                      ...aboutData.aboutPage,
                      timeline: {
                        ...aboutData.aboutPage.timeline,
                        events: updated,
                      },
                    },
                  });
                }}
                className="border border-gray-300 rounded bg-white p-2 w-full"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Cities */}
      <section className="border border-gray-300 bg-gray-100 p-3 mb-4 space-y-4">
        <div className="flex justify-between items-end">
          <h2 className="block text-lg font-semibold">Cities</h2>
          <button
            onClick={() => {
              const updated = [
                ...aboutData.aboutPage.clinicLocations.cities,
                { image: "", branch: "" },
              ];
              setAboutData({
                ...aboutData,
                aboutPage: {
                  ...aboutData.aboutPage,
                  clinicLocations: {
                    ...aboutData.aboutPage.clinicLocations,
                    cities: updated,
                  },
                },
              });
            }}
            className="px-4 py-2 text-white rounded bg-[#333c29]"
          >
            +
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {aboutData.aboutPage.clinicLocations.cities.map((city, idx) => (
            <div
              key={idx}
              className="space-y-2 bg-white p-3 rounded border border-gray-300 relative"
            >
              <div className="flex jusify-between items-center gap-2">
                <ImageUploader
                  value={city.image}
                  onChange={(url) => {
                    const updated = [
                      ...aboutData.aboutPage.clinicLocations.cities,
                    ];
                    updated[idx].image = url;
                    setAboutData({
                      ...aboutData,
                      aboutPage: {
                        ...aboutData.aboutPage,
                        clinicLocations: {
                          ...aboutData.aboutPage.clinicLocations,
                          cities: updated,
                        },
                      },
                    });
                  }}
                />
                <button
                  onClick={() => {
                    const updated =
                      aboutData.aboutPage.clinicLocations.cities.filter(
                        (_, i) => i !== idx
                      );
                    setAboutData({
                      ...aboutData,
                      aboutPage: {
                        ...aboutData.aboutPage,
                        clinicLocations: {
                          ...aboutData.aboutPage.clinicLocations,
                          cities: updated,
                        },
                      },
                    });
                  }}
                  className="px-2 py-2 bg-red-500 text-white rounded"
                >
                  ×
                </button>
              </div>

              <input
                type="text"
                placeholder="Branch"
                value={city.branch}
                onChange={(e) => {
                  const updated = [
                    ...aboutData.aboutPage.clinicLocations.cities,
                  ];
                  updated[idx].branch = e.target.value;
                  setAboutData({
                    ...aboutData,
                    aboutPage: {
                      ...aboutData.aboutPage,
                      clinicLocations: {
                        ...aboutData.aboutPage.clinicLocations,
                        cities: updated,
                      },
                    },
                  });
                }}
                className="border border-gray-300 rounded bg-white p-2 w-full"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Doctors */}
      <section className="border border-gray-300 bg-gray-100 p-3 mb-4 space-y-4">
        <div className="flex justify-between items-end">
          <h2 className="block text-lg font-semibold">Doctors</h2>
          <button
            onClick={() => {
              const updated = [
                ...aboutData.aboutPage.doctors,
                { name: "", degree: "", specialization: "", image: "" },
              ];
              setAboutData({
                ...aboutData,
                aboutPage: { ...aboutData.aboutPage, doctors: updated },
              });
            }}
            className="px-4 py-2 text-white rounded bg-[#333c29]"
          >
            +
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {aboutData.aboutPage.doctors.map((doc, idx) => (
            <div
              key={idx}
              className="space-y-2 bg-white p-3 rounded border border-gray-300 relative"
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Name"
                  value={doc.name}
                  onChange={(e) => {
                    const updated = [...aboutData.aboutPage.doctors];
                    updated[idx].name = e.target.value;
                    setAboutData({
                      ...aboutData,
                      aboutPage: { ...aboutData.aboutPage, doctors: updated },
                    });
                  }}
                  className="border border-gray-300 rounded bg-white p-2 w-full"
                />

                <button
                  onClick={() => {
                    const updated = aboutData.aboutPage.doctors.filter(
                      (_, i) => i !== idx
                    );
                    setAboutData({
                      ...aboutData,
                      aboutPage: { ...aboutData.aboutPage, doctors: updated },
                    });
                  }}
                  className="px-2 py-1 bg-red-500 text-white rounded"
                >
                  ×
                </button>
              </div>
              <input
                type="text"
                placeholder="Degree"
                value={doc.degree}
                onChange={(e) => {
                  const updated = [...aboutData.aboutPage.doctors];
                  updated[idx].degree = e.target.value;
                  setAboutData({
                    ...aboutData,
                    aboutPage: { ...aboutData.aboutPage, doctors: updated },
                  });
                }}
                className="border border-gray-300 rounded bg-white p-2 w-full"
              />

              <input
                type="text"
                placeholder="Specialization"
                value={doc.specialization}
                onChange={(e) => {
                  const updated = [...aboutData.aboutPage.doctors];
                  updated[idx].specialization = e.target.value;
                  setAboutData({
                    ...aboutData,
                    aboutPage: { ...aboutData.aboutPage, doctors: updated },
                  });
                }}
                className="border border-gray-300 rounded bg-white p-2 w-full"
              />

              <ImageUploader
                value={doc.image}
                onChange={(url) => {
                  const updated = [...aboutData.aboutPage.doctors];
                  updated[idx].image = url;
                  setAboutData({
                    ...aboutData,
                    aboutPage: { ...aboutData.aboutPage, doctors: updated },
                  });
                }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* EXPERTISE */}
      <section className="border border-gray-300 bg-gray-100 p-3 mb-4 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="block text-lg font-semibold">Expertise</h2>
          <button
            onClick={() => {
              const arr = [...aboutData.aboutPage.expertise.features];
              arr.push({ title: "", description: "", icon: "" });
              update("aboutPage.expertise.features", arr);
            }}
            className="px-4 py-2 text-white rounded bg-[#333c29]"
          >
            +
          </button>
        </div>

        <input
          className="border border-gray-300 rounded bg-white p-2 w-full"
          value={aboutData.aboutPage.expertise.title}
          onChange={(e) => update("aboutPage.expertise.title", e.target.value)}
          placeholder="Title"
        />

        <textarea
          className="border border-gray-300 rounded bg-white p-2 w-full"
          value={aboutData.aboutPage.expertise.subtitle}
          onChange={(e) =>
            update("aboutPage.expertise.subtitle", e.target.value)
          }
          placeholder="Subtitle"
        />

        <div className="grid grid-cols-3 gap-2">
          {aboutData.aboutPage.expertise.features.map((f, i) => (
            <div
              key={i}
              className="space-y-2 bg-white p-3 rounded border border-gray-300 relative"
            >
              <div className="flex justify-between items-center gap-2">
                <input
                  className="border border-gray-300 rounded bg-white p-2 w-full"
                  placeholder="Title"
                  value={f.title}
                  onChange={(e) => {
                    const arr = [...aboutData.aboutPage.expertise.features];
                    arr[i].title = e.target.value;
                    update("aboutPage.expertise.features", arr);
                  }}
                />

                <button
                  className="px-2 py-2 bg-red-500 text-white rounded"
                  onClick={() => {
                    const arr = [...aboutData.aboutPage.expertise.features];
                    arr.splice(i, 1);
                    update("aboutPage.expertise.features", arr); // ✅ Fixed
                  }}
                >
                  ×
                </button>
              </div>

              <textarea
                className="border border-gray-300 rounded bg-white p-2 w-full"
                placeholder="Description"
                value={f.description}
                onChange={(e) => {
                  const arr = [...aboutData.aboutPage.expertise.features];
                  arr[i].description = e.target.value;
                  update("aboutPage.expertise.features", arr);
                }}
              />

              <ImageUploader
                value={f.icon}
                onChange={(url) => {
                  const arr = [...aboutData.aboutPage.expertise.features];
                  arr[i].icon = url;
                  update("aboutPage.expertise.features", arr);
                }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* CELEB TESTIMONIALS */}
      <section className="border space-y-2 border-gray-300 bg-gray-100 p-3 mb-4">
        <div className="flex justify-between items-center">
          <h2 className="block text-lg font-semibold">
            Celebrities Testimonials
          </h2>

          <button
            onClick={() => {
              const arr = [...aboutData.aboutPage.celebTestimonials];
              arr.push({
                name: "",
                title: "",
                review: "",
                details: "",
                image: "",
              });
              update("aboutPage.celebTestimonials", arr);
            }}
            className="px-4 py-2 text-white rounded bg-[#333c29]"
          >
            +
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {aboutData.aboutPage.celebTestimonials.map((c, i) => (
            <div
              key={i}
              className="space-y-2 bg-white p-3 rounded border border-gray-300 relative"
            >
              <div className="flex gap-2">
                <input
                  className="w-full border border-gray-300 rounded p-2"
                  placeholder="Name"
                  value={c.name}
                  onChange={(e) => {
                    const arr = [...aboutData.aboutPage.celebTestimonials];
                    arr[i].name = e.target.value;
                    update("aboutPage.celebTestimonials", arr);
                  }}
                />
                <button
                  className="px-2 py-1 bg-red-500 text-white rounded"
                  onClick={() => {
                    const arr = [...aboutData.aboutPage.celebTestimonials];
                    arr.splice(i, 1);
                    update("aboutPage.celebTestimonials", arr);
                  }}
                >
                  ×
                </button>
              </div>

              <input
                className="w-full border border-gray-300 rounded p-2"
                placeholder="Title"
                value={c.title}
                onChange={(e) => {
                  const arr = [...aboutData.aboutPage.celebTestimonials];
                  arr[i].title = e.target.value;
                  update("aboutPage.celebTestimonials", arr);
                }}
              />

              <textarea
                className="w-full border border-gray-300 rounded p-2"
                placeholder="Review"
                value={c.review}
                onChange={(e) => {
                  const arr = [...aboutData.aboutPage.celebTestimonials];
                  arr[i].review = e.target.value;
                  update("aboutPage.celebTestimonials", arr);
                }}
              />

              <textarea
                className="w-full border border-gray-300 rounded p-2"
                placeholder="Details"
                value={c.details}
                onChange={(e) => {
                  const arr = [...aboutData.aboutPage.celebTestimonials];
                  arr[i].details = e.target.value;
                  update("aboutPage.celebTestimonials", arr);
                }}
              />

              {/* ✅ ImageUploader instead of plain input */}
              <ImageUploader
                value={c.image}
                onChange={(url) => {
                  const arr = [...aboutData.aboutPage.celebTestimonials];
                  arr[i].image = url;
                  update("aboutPage.celebTestimonials", arr);
                }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="border space-y-4 border-gray-300 bg-gray-100 p-3 mb-4">
        <h2 className="block text-lg font-semibold">Comparison Table</h2>

        <input
          className="w-full p-2 border border-gray-300 rounded bg-white"
          value={aboutData.aboutPage.comparisonTable.title}
          onChange={(e) =>
            update("aboutPage.comparisonTable.title", e.target.value)
          }
          placeholder="Table Title"
        />

        <textarea
          className="w-full p-2 border border-gray-300 rounded bg-white"
          value={aboutData.aboutPage.comparisonTable.description}
          onChange={(e) =>
            update("aboutPage.comparisonTable.description", e.target.value)
          }
          placeholder="Table Description"
        />

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 bg-white">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2 text-left">
                  Feature
                </th>
                <th className="border border-gray-300 p-2 text-left">QHT</th>
                <th className="border border-gray-300 p-2 text-left">Others</th>
                <th className="border border-gray-300 p-2">
                  <button
                    onClick={() => {
                      const arr = [...aboutData.aboutPage.comparisonTable.rows];
                      arr.push({ feature: "", qht: "", others: "" });
                      update("aboutPage.comparisonTable.rows", arr);
                    }}
                    className="px-4 py-2 text-white rounded bg-[#333c29]"
                  >
                    +
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {aboutData.aboutPage.comparisonTable.rows.map((row, i) => (
                <tr key={i} className="border-t border-gray-300">
                  <td className="border border-gray-300 p-2">
                    <input
                      className="w-full border border-gray-300 rounded p-2"
                      placeholder="Feature"
                      value={row.feature}
                      onChange={(e) => {
                        const arr = [
                          ...aboutData.aboutPage.comparisonTable.rows,
                        ];
                        arr[i].feature = e.target.value;
                        update("aboutPage.comparisonTable.rows", arr);
                      }}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      className="w-full border border-gray-300 rounded p-2"
                      placeholder="QHT"
                      value={row.qht}
                      onChange={(e) => {
                        const arr = [
                          ...aboutData.aboutPage.comparisonTable.rows,
                        ];
                        arr[i].qht = e.target.value;
                        update("aboutPage.comparisonTable.rows", arr);
                      }}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      className="w-full border border-gray-300 rounded p-2"
                      placeholder="Others"
                      value={row.others}
                      onChange={(e) => {
                        const arr = [
                          ...aboutData.aboutPage.comparisonTable.rows,
                        ];
                        arr[i].others = e.target.value;
                        update("aboutPage.comparisonTable.rows", arr);
                      }}
                    />
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    <button
                      className="px-3 py-1 bg-red-600 text-white rounded"
                      onClick={() => {
                        const arr = [
                          ...aboutData.aboutPage.comparisonTable.rows,
                        ];
                        arr.splice(i, 1);
                        update("aboutPage.comparisonTable.rows", arr);
                      }}
                    >
                      ×
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Medical Tourism */}
      <section className="border space-y-2 border-gray-300 bg-gray-100 p-3 mb-4">
        <h2 className="block text-lg font-semibold mb-4">Medical Tourism</h2>

        <input
          className="border border-gray-300 rounded bg-white p-2 w-full"
          value={aboutData.aboutPage.medicalTourism.title}
          onChange={(e) =>
            update("aboutPage.medicalTourism.title", e.target.value)
          }
        />

        <textarea
          className="border border-gray-300 rounded bg-white p-2 w-full"
          value={aboutData.aboutPage.medicalTourism.description}
          onChange={(e) =>
            update("aboutPage.medicalTourism.description", e.target.value)
          }
        />
      </section>
    </div>
  );
}
