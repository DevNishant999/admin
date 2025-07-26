import React, { useEffect, useState } from "react";
import ImageUploader from "../components/ImageUploader";

const Services = () => {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({
    slug: "",
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    banner: { images: [{ src: "", alt: "" }] },
    description: { title: "", subtitle: "", paragraphs: [""], image: "" },
    hairTransplantInIndia: {
      title: "",
      paragraphs: [""],
      image: "",
    },
    idealCandidate: {
      title: "",
      subtitle: "",
      criteria: [{ title: "", description: "" }],
    },
    typesOfHairTransplant: {
      types: [{ title: "", description: "", image: "", features: [""] }],
    },
    benefits: { items: [{ title: "", description: "", icon: "" }] },
    procedure: {
      steps: [{ title: "", description: "", number: "" }],
      stats: [{ label: "", value: "", icon: "" }],
    },
    preProcedureTips: {
      tips: [{ title: "", description: "", icon: "" }],
    },
    cost: {
      title: "",
      description: "",
      costTable: { headers: ["", ""], rows: [] },
      factors: {
        title: "",
        description: "",
        items: [{ title: "", description: "", icon: "" }],
      },
    },
    causesOfHairLoss: {
      title: "",
      subtitle: "",
      causes: [{ title: "", description: "", icon: "" }],
    },
    whyChooseUs: {
      items: [{ title: "", description: "", bg: "" }],
    },
    postSurgerySupport: {
      title: "",
      description: "",
      image: "",
      items: [{ title: "", description: "" }],
    },
    dosAndDonts: {
      dos: [{ title: "" }],
      donts: [{ title: "" }],
    },
    recovery: {
      weeks: [
        { name: "", expectations: [""], careInstructions: [""], image: "" },
      ],
    },
    comparison: {
      title: "",
      subtitle: "",
      columns: [{ title: "", items: [""] }],
    },
    insights: {
      title: "",
      items: [{ title: "", image: "" }],
    },
    locations: { cities: [{ name: "", image: "" }] },
  });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const API = import.meta.env.VITE_API_URL;

  const fetchServices = async () => {
    const res = await fetch(`${API}/services`);
    const data = await res.json();
    setServices(data);
    console.log("service data", data);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `${API}/services/${editingId}` : `${API}/services`;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    resetForm();
    fetchServices();
  };

  const resetForm = () => {
    setForm({
      slug: "",
      metaTitle: "",
      metaDescription: "",
      metaKeywords: "",
      banner: { images: [{ src: "", alt: "" }] },
      description: { title: "", subtitle: "", paragraphs: [""], image: "" },
      hairTransplantInIndia: {
        title: "",
        paragraphs: [""],
        image: "",
      },
      idealCandidate: {
        title: "",
        subtitle: "",
        criteria: [{ title: "", description: "" }],
      },
      typesOfHairTransplant: {
        types: [{ title: "", description: "", image: "", features: [""] }],
      },
      benefits: { items: [{ title: "", description: "", icon: "" }] },
      procedure: {
        steps: [{ title: "", description: "", number: "" }],
        stats: [{ label: "", value: "", icon: "" }],
      },
      preProcedureTips: {
        tips: [{ title: "", description: "", icon: "" }],
      },
      cost: {
        title: "",
        description: "",
        costTable: { headers: ["", ""], rows: [] },
        factors: {
          title: "",
          description: "",
          items: [{ title: "", description: "", icon: "" }],
        },
      },
      causesOfHairLoss: {
        title: "",
        subtitle: "",
        causes: [{ title: "", description: "", icon: "" }],
      },
      whyChooseUs: {
        items: [{ title: "", description: "", bg: "" }],
      },
      postSurgerySupport: {
        title: "",
        description: "",
        image: "",
        items: [{ title: "", description: "" }],
      },
      dosAndDonts: {
        dos: [{ title: "" }],
        donts: [{ title: "" }],
      },
      recovery: {
        weeks: [
          { name: "", expectations: [""], careInstructions: [""], image: "" },
        ],
      },
      comparison: {
        title: "",
        subtitle: "",
        columns: [{ title: "", items: [""] }],
      },
      insights: {
        title: "",
        items: [{ title: "", image: "" }],
      },
      locations: { cities: [{ name: "", image: "" }] },
    });
    setEditingId(null);
  };

  const handleEdit = (s) => {
    setShowForm(true);
    setForm(s);
    setEditingId(s._id);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this service?"
    );
    if (!confirmDelete) return;

    await fetch(`${API}/services/${id}`, { method: "DELETE" });
    fetchServices();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Manage Services</h2>
        {!showForm && (
          <button
            className="px-4 py-2 text-white rounded bg-[#333c29]"
            onClick={() => {
              setShowForm(true);
              resetForm();
            }}
          >
            + Add Service
          </button>
        )}
        {showForm && (
          <button
            className="px-4 py-2 text-white rounded bg-[#333c29]"
            onClick={() => setShowForm(false)}
          >
            Cancel ×
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit}>
          {/* Basic Info */}
          <div className="border space-y-2 border-gray-300 bg-gray-100 p-3 mb-4">
            <h2 className="block text-lg font-semibold">Meta Details</h2>
            <input
              placeholder="Slug"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              className="border border-gray-300 rounded bg-white p-2 w-full"
            />
            <input
              placeholder="Meta Title"
              value={form.metaTitle}
              onChange={(e) => setForm({ ...form, metaTitle: e.target.value })}
              className="border border-gray-300 rounded bg-white p-2 w-full"
            />
            <textarea
              placeholder="Meta Description"
              value={form.metaDescription}
              onChange={(e) =>
                setForm({ ...form, metaDescription: e.target.value })
              }
              className="border border-gray-300 rounded bg-white p-2 w-full"
            ></textarea>
            <input
              placeholder="Meta Keywords"
              value={form.metaKeywords}
              onChange={(e) =>
                setForm({ ...form, metaKeywords: e.target.value })
              }
              className="border border-gray-300 rounded bg-white p-2 w-full"
            />
          </div>

          {/* Banner Images */}
          <div className="border space-y-2 border-gray-300 bg-gray-100 p-3 mb-4">
            <div className="flex justify-between items-end">
              <h2 className="block text-lg font-semibold">Banner Images</h2>
              <button
                type="button"
                className="px-4 py-2 text-white rounded bg-[#333c29]"
                onClick={() => {
                  const newBanner = { ...form.banner };
                  newBanner.images.push({ src: "", alt: "" });
                  setForm({ ...form, banner: newBanner });
                }}
              >
                +
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {form.banner.images.map((img, i) => (
                <div key={i} className="mb-4 space-y-4">
                  <ImageUploader
                    value={img.src}
                    onChange={(url) => {
                      const newBanner = { ...form.banner };
                      newBanner.images[i].src = url;
                      setForm({ ...form, banner: newBanner });
                    }}
                  />
                  <div className="flex gap-2">
                    <input
                      placeholder={`Alt Text ${i + 1}`}
                      value={img.alt}
                      onChange={(e) => {
                        const newBanner = { ...form.banner };
                        newBanner.images[i].alt = e.target.value;
                        setForm({ ...form, banner: newBanner });
                      }}
                      className="border border-gray-300 rounded bg-white p-2 w-full"
                    />
                    <button
                      type="button"
                      className="bg-red-500 text-white rounded w-8 flex items-center justify-center"
                      onClick={() => {
                        const newBanner = { ...form.banner };
                        newBanner.images.splice(i, 1);
                        setForm({ ...form, banner: newBanner });
                      }}
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="border space-y-2 border-gray-300 bg-gray-100 p-3 mb-4">
            <div className="flex justify-between items-end">
              <h2 className="block text-lg font-semibold">Description</h2>
              <button
                type="button"
                className="px-4 py-2 text-white rounded bg-[#333c29]"
                onClick={() => {
                  const newDesc = { ...form.description };
                  newDesc.paragraphs.push("");
                  setForm({ ...form, description: newDesc });
                }}
              >
                + Add Paragraph
              </button>
            </div>
            <input
              placeholder="Title"
              value={form.description.title}
              onChange={(e) => {
                const newDesc = { ...form.description };
                newDesc.title = e.target.value;
                setForm({ ...form, description: newDesc });
              }}
              className="border border-gray-300 rounded bg-white p-2 w-full"
            />
            <input
              placeholder="Subtitle"
              value={form.description.subtitle}
              onChange={(e) => {
                const newDesc = { ...form.description };
                newDesc.subtitle = e.target.value;
                setForm({ ...form, description: newDesc });
              }}
              className="border border-gray-300 rounded bg-white p-2 w-full"
            />
            {form.description.paragraphs.map((para, i) => (
              <div className="flex items-center -jsutify-between gap-2">
                <textarea
                  key={i}
                  placeholder={`Paragraph ${i + 1}`}
                  value={para}
                  onChange={(e) => {
                    const newDesc = { ...form.description };
                    newDesc.paragraphs[i] = e.target.value;
                    setForm({ ...form, description: newDesc });
                  }}
                  className="border border-gray-300 rounded bg-white p-2 w-full"
                />
                <button
                  type="button"
                  className="bg-red-500 text-white rounded w-6 py-2 flex items-center justify-center"
                  onClick={() => {
                    const newDesc = { ...form.description };
                    newDesc.paragraphs.splice(i, 1);
                    setForm({ ...form, description: newDesc });
                  }}
                >
                  ×
                </button>
              </div>
            ))}
            <ImageUploader
              value={form.description.image}
              onChange={(url) => {
                const newDesc = { ...form.description };
                newDesc.image = url;
                setForm({ ...form, description: newDesc });
              }}
            />
          </div>

          {/* Description 2 */}
          <div className="border space-y-2 border-gray-300 bg-gray-100 p-3 mb-4">
            <div className="flex justify-between items-end">
              <h2 className="block text-lg font-semibold">Description 2</h2>
              <button
                type="button"
                className="px-4 py-2 text-white rounded bg-[#333c29]"
                onClick={() => {
                  const newDesc = { ...form.hairTransplantInIndia };
                  newDesc.paragraphs.push("");
                  setForm({ ...form, hairTransplantInIndia: newDesc });
                }}
              >
                + Add Paragraph
              </button>
            </div>
            <input
              placeholder="Title"
              value={form.hairTransplantInIndia.title}
              onChange={(e) => {
                const newDesc = { ...form.hairTransplantInIndia };
                newDesc.title = e.target.value;
                setForm({ ...form, hairTransplantInIndia: newDesc });
              }}
              className="border border-gray-300 rounded bg-white p-2 w-full"
            />
            {form.hairTransplantInIndia.paragraphs.map((para, i) => (
              <div className="flex items-center -jsutify-between gap-2">
                <textarea
                  key={i}
                  placeholder={`Paragraph ${i + 1}`}
                  value={para}
                  onChange={(e) => {
                    const newDesc = { ...form.hairTransplantInIndia };
                    newDesc.paragraphs[i] = e.target.value;
                    setForm({ ...form, hairTransplantInIndia: newDesc });
                  }}
                  className="border border-gray-300 rounded bg-white p-2 w-full"
                />
                <button
                  type="button"
                  className="bg-red-500 text-white rounded w-6 py-2 flex items-center justify-center"
                  onClick={() => {
                    const newDesc = { ...form.hairTransplantInIndia };
                    newDesc.paragraphs.splice(i, 1);
                    setForm({ ...form, hairTransplantInIndia: newDesc });
                  }}
                >
                  ×
                </button>
              </div>
            ))}
            <ImageUploader
              value={form.hairTransplantInIndia.image}
              onChange={(val) => {
                const newDesc = { ...form.hairTransplantInIndia };
                newDesc.image = val;
                setForm({ ...form, hairTransplantInIndia: newDesc });
              }}
            />
          </div>

          {/* Ideal Candidate */}
          <div className="border space-y-2 border-gray-300 bg-gray-100 p-3 mb-4">
            <div className="flex justify-between items-end">
              <h2 className="block text-lg font-semibold">Ideal Candidate</h2>
              <button
                type="button"
                className="px-4 py-2 text-white rounded bg-[#333c29]"
                onClick={() => {
                  const newIdeal = { ...form.idealCandidate };
                  newIdeal.criteria.push({ title: "", description: "" });
                  setForm({ ...form, idealCandidate: newIdeal });
                }}
              >
                + Add Critera
              </button>
            </div>
            <input
              placeholder="Title"
              value={form.idealCandidate.title}
              onChange={(e) => {
                const newIdeal = { ...form.idealCandidate };
                newIdeal.title = e.target.value;
                setForm({ ...form, idealCandidate: newIdeal });
              }}
              className="border border-gray-300 rounded bg-white p-2 w-full"
            />
            <input
              placeholder="Subtitle"
              value={form.idealCandidate.subtitle}
              onChange={(e) => {
                const newIdeal = { ...form.idealCandidate };
                newIdeal.subtitle = e.target.value;
                setForm({ ...form, idealCandidate: newIdeal });
              }}
              className="border border-gray-300 rounded bg-white p-2 w-full"
            />
            {form.idealCandidate.criteria.map((crit, i) => (
              <div key={i} className="space-y-2 mb-1 w-full">
                <div className="flex items-center -jsutify-between gap-2">
                  <input
                    placeholder={`Criteria Title ${i + 1}`}
                    value={crit.title}
                    onChange={(e) => {
                      const newIdeal = { ...form.idealCandidate };
                      newIdeal.criteria[i].title = e.target.value;
                      setForm({ ...form, idealCandidate: newIdeal });
                    }}
                    className="border border-gray-300 rounded bg-white font-semibold p-2 w-full"
                  />
                  <button
                    type="button"
                    className="bg-red-500 text-white rounded w-6 py-2 flex items-center justify-center"
                    onClick={() => {
                      const newIdeal = { ...form.idealCandidate };
                      newIdeal.criteria.splice(i, 1);
                      setForm({ ...form, idealCandidate: newIdeal });
                    }}
                  >
                    ×
                  </button>
                </div>
                <textarea
                  placeholder={`Criteria Description ${i + 1}`}
                  value={crit.description}
                  onChange={(e) => {
                    const newIdeal = { ...form.idealCandidate };
                    newIdeal.criteria[i].description = e.target.value;
                    setForm({ ...form, idealCandidate: newIdeal });
                  }}
                  className="border border-gray-300 rounded bg-white p-2 w-full"
                />
              </div>
            ))}
          </div>

          {/* Types of Hair Transplant */}
          <div className="border space-y-2 border-gray-300 bg-gray-100 p-3 mb-4">
            <div className="flex justify-between items-end">
              <h2 className="block text-lg font-semibold">
                Types of Hair Transplant
              </h2>
              <button
                type="button"
                className="px-4 py-2 text-white rounded bg-[#333c29]"
                onClick={() => {
                  const newTypes = { ...form.typesOfHairTransplant };
                  newTypes.types.push({
                    title: "",
                    description: "",
                    image: "",
                    features: [""],
                  });
                  setForm({ ...form, typesOfHairTransplant: newTypes });
                }}
              >
                + Add Type
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {form.typesOfHairTransplant.types.map((type, i) => (
                <div
                  key={i}
                  className="space-y-2 bg-white p-3 rounded border-gray-300 border"
                >
                  {" "}
                  <div className="flex items-center -jsutify-between gap-2">
                    <input
                      placeholder={`Type Title ${i + 1}`}
                      value={type.title}
                      onChange={(e) => {
                        const newTypes = { ...form.typesOfHairTransplant };
                        newTypes.types[i].title = e.target.value;
                        setForm({ ...form, typesOfHairTransplant: newTypes });
                      }}
                      className="border border-gray-300 rounded bg-white p-2 w-full"
                    />
                    <button
                      type="button"
                      className="bg-red-500 text-white rounded w-6 py-2 flex items-center justify-center"
                      onClick={() => {
                        const newTypes = { ...form.typesOfHairTransplant };
                        newTypes.types.splice(i, 1);
                        setForm({ ...form, typesOfHairTransplant: newTypes });
                      }}
                    >
                      ×
                    </button>
                  </div>
                  <textarea
                    placeholder={`Type Description ${i + 1}`}
                    value={type.description}
                    onChange={(e) => {
                      const newTypes = { ...form.typesOfHairTransplant };
                      newTypes.types[i].description = e.target.value;
                      setForm({ ...form, typesOfHairTransplant: newTypes });
                    }}
                    className="border border-gray-300 rounded bg-white p-2 w-full"
                  />
                  <ImageUploader
                    value={type.image}
                    onChange={(url) => {
                      const newTypes = { ...form.typesOfHairTransplant };
                      newTypes.types[i].image = url;
                      setForm({ ...form, typesOfHairTransplant: newTypes });
                    }}
                  />
                  {type.features.map((feature, fi) => (
                    <div key={fi} className="flex items-center gap-2">
                      <input
                        placeholder={`Feature ${fi + 1}`}
                        value={feature}
                        onChange={(e) => {
                          const newTypes = { ...form.typesOfHairTransplant };
                          newTypes.types[i].features[fi] = e.target.value;
                          setForm({ ...form, typesOfHairTransplant: newTypes });
                        }}
                        className="border border-gray-300 rounded bg-white p-2 w-full"
                      />
                      <button
                        type="button"
                        className="bg-red-500 text-white rounded w-6 py-2 flex items-center justify-center"
                        onClick={() => {
                          const newTypes = { ...form.typesOfHairTransplant };
                          newTypes.types[i].features.splice(fi, 1);
                          setForm({ ...form, typesOfHairTransplant: newTypes });
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="px-4 py-2 text-white rounded bg-[#333c29]"
                    onClick={() => {
                      const newTypes = { ...form.typesOfHairTransplant };
                      newTypes.types[i].features.push("");
                      setForm({ ...form, typesOfHairTransplant: newTypes });
                    }}
                  >
                    +
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="border space-y-2 border-gray-300 bg-gray-100 p-3 mb-4">
            <div className="flex justify-between items-end">
              <h2 className="block text-lg font-semibold">Benefits</h2>
              <button
                type="button"
                className="px-4 py-2 text-white rounded bg-[#333c29]"
                onClick={() => {
                  const newBenefits = { ...form.benefits };
                  newBenefits.items.push({
                    title: "",
                    description: "",
                    icon: "",
                  });
                  setForm({ ...form, benefits: newBenefits });
                }}
              >
                + Add Benefit
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {form.benefits.items.map((item, i) => (
                <div
                  key={i}
                  className="space-y-2 bg-white p-3 rounded border-gray-300 border"
                >
                  <ImageUploader
                    value={item.icon}
                    onChange={(url) => {
                      const newBenefits = { ...form.benefits };
                      newBenefits.items[i].icon = url;
                      setForm({ ...form, benefits: newBenefits });
                    }}
                  />
                  <div className="flex items-center -jsutify-between gap-2">
                    <input
                      placeholder={`Benefit Title ${i + 1}`}
                      value={item.title}
                      onChange={(e) => {
                        const newBenefits = { ...form.benefits };
                        newBenefits.items[i].title = e.target.value;
                        setForm({ ...form, benefits: newBenefits });
                      }}
                      className="border border-gray-300 rounded bg-white p-2 w-full"
                    />
                    <button
                      type="button"
                      className="bg-red-500 text-white rounded w-6 py-2 flex items-center justify-center"
                      onClick={() => {
                        const newBenefits = { ...form.benefits };
                        newBenefits.items.splice(i, 1);
                        setForm({ ...form, benefits: newBenefits });
                      }}
                    >
                      ×
                    </button>
                  </div>
                  <textarea
                    placeholder={`Benefit Description ${i + 1}`}
                    value={item.description}
                    onChange={(e) => {
                      const newBenefits = { ...form.benefits };
                      newBenefits.items[i].description = e.target.value;
                      setForm({ ...form, benefits: newBenefits });
                    }}
                    className="border border-gray-300 rounded bg-white p-2 w-full"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Procedure */}
          <div className="border space-y-2 border-gray-300 bg-gray-100 p-3 mb-4">
            <h2 className="block text-lg font-semibold">Procedure</h2>
            <div className="flex justify-between items-end">
              <h4 className="block text-md font-semibold">Steps</h4>
              <button
                type="button"
                className="px-4 py-2 text-white rounded bg-[#333c29]"
                onClick={() => {
                  const newProcedure = { ...form.procedure };
                  newProcedure.steps.push({
                    title: "",
                    description: "",
                    number: "",
                  });
                  setForm({ ...form, procedure: newProcedure });
                }}
              >
                + Add Step
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {form.procedure.steps.map((step, i) => (
                <div
                  key={i}
                  className="space-y-2 bg-white p-3 rounded border-gray-300 border"
                >
                  {" "}
                  <div className="flex items-center -jsutify-between gap-2">
                    <input
                      placeholder={`Step Number ${i + 1}`}
                      value={step.number}
                      onChange={(e) => {
                        const newProcedure = { ...form.procedure };
                        newProcedure.steps[i].number = e.target.value;
                        setForm({ ...form, procedure: newProcedure });
                      }}
                      className="border border-gray-300 rounded bg-white p-2 w-full"
                    />
                    <button
                      type="button"
                      className="bg-red-500 text-white rounded w-6 py-2 flex items-center justify-center"
                      onClick={() => {
                        const newProcedure = { ...form.procedure };
                        newProcedure.steps.splice(i, 1);
                        setForm({ ...form, procedure: newProcedure });
                      }}
                    >
                      ×
                    </button>
                  </div>
                  <input
                    placeholder={`Step Title ${i + 1}`}
                    value={step.title}
                    onChange={(e) => {
                      const newProcedure = { ...form.procedure };
                      newProcedure.steps[i].title = e.target.value;
                      setForm({ ...form, procedure: newProcedure });
                    }}
                    className="border border-gray-300 rounded bg-white p-2 w-full"
                  />
                  <textarea
                    placeholder={`Step Description ${i + 1}`}
                    value={step.description}
                    onChange={(e) => {
                      const newProcedure = { ...form.procedure };
                      newProcedure.steps[i].description = e.target.value;
                      setForm({ ...form, procedure: newProcedure });
                    }}
                    className="border border-gray-300 rounded bg-white p-2 w-full"
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-between items-end">
              <h4 className="block text-md font-semibold">Stats</h4>
              <button
                type="button"
                className="px-4 py-2 text-white rounded bg-[#333c29]"
                onClick={() => {
                  const newProcedure = { ...form.procedure };
                  newProcedure.stats.push({ label: "", value: "", icon: "" });
                  setForm({ ...form, procedure: newProcedure });
                }}
              >
                + Add Stat
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {form.procedure.stats.map((stat, i) => (
                <div
                  key={i}
                  className="space-y-2 bg-white p-3 rounded border-gray-300 border"
                >
                  <input
                    placeholder={`Stat Label ${i + 1}`}
                    value={stat.label}
                    onChange={(e) => {
                      const newProcedure = { ...form.procedure };
                      newProcedure.stats[i].label = e.target.value;
                      setForm({ ...form, procedure: newProcedure });
                    }}
                    className="border border-gray-300 rounded bg-white p-2 w-full"
                  />
                  <input
                    placeholder={`Stat Value ${i + 1}`}
                    value={stat.value}
                    onChange={(e) => {
                      const newProcedure = { ...form.procedure };
                      newProcedure.stats[i].value = e.target.value;
                      setForm({ ...form, procedure: newProcedure });
                    }}
                    className="border border-gray-300 rounded bg-white p-2 w-full"
                  />
                  <ImageUploader
                    value={stat.icon}
                    onChange={(url) => {
                      const newProcedure = { ...form.procedure };
                      newProcedure.stats[i].icon = url;
                      setForm({ ...form, procedure: newProcedure });
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Pre Procedure Tips */}
          <div className="border space-y-2 border-gray-300 bg-gray-100 p-3 mb-4">
            <div className="flex justify-between items-end">
              <h2 className="block text-lg font-semibold">
                Pre Procedure Tips
              </h2>
              <button
                type="button"
                className="px-4 py-2 text-white rounded bg-[#333c29]"
                onClick={() => {
                  const newTips = { ...form.preProcedureTips };
                  newTips.tips.push({ title: "", description: "", icon: "" });
                  setForm({ ...form, preProcedureTips: newTips });
                }}
              >
                + Add Tip
              </button>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {form.preProcedureTips.tips.map((tip, i) => (
                <div
                  key={i}
                  className="space-y-2 bg-white p-3 rounded border-gray-300 border"
                >
                  {" "}
                  <div className="flex items-center -jsutify-between gap-2">
                    <input
                      placeholder={`Tip Title ${i + 1}`}
                      value={tip.title}
                      onChange={(e) => {
                        const newTips = { ...form.preProcedureTips };
                        newTips.tips[i].title = e.target.value;
                        setForm({ ...form, preProcedureTips: newTips });
                      }}
                      className="border border-gray-300 rounded bg-white p-2 w-full"
                    />
                    <button
                      type="button"
                      className="bg-red-500 text-white rounded w-6 py-2 flex items-center justify-center"
                      onClick={() => {
                        const newTips = { ...form.preProcedureTips };
                        newTips.tips.splice(i, 1);
                        setForm({ ...form, preProcedureTips: newTips });
                      }}
                    >
                      ×
                    </button>
                  </div>
                  <textarea
                    placeholder={`Tip Description ${i + 1}`}
                    value={tip.description}
                    onChange={(e) => {
                      const newTips = { ...form.preProcedureTips };
                      newTips.tips[i].description = e.target.value;
                      setForm({ ...form, preProcedureTips: newTips });
                    }}
                    className="border border-gray-300 rounded bg-white p-2 w-full"
                  />
                  <ImageUploader
                    value={tip.icon}
                    onChange={(url) => {
                      const newTips = { ...form.preProcedureTips };
                      newTips.tips[i].icon = url;
                      setForm({ ...form, preProcedureTips: newTips });
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Cost */}
          <div className="border space-y-2 border-gray-300 bg-gray-100 p-3 mb-4">
            <h2 className="block text-lg font-semibold">Cost</h2>
            <input
              className="border border-gray-300 rounded bg-white p-2 w-full"
              placeholder="Factors Section Title"
              value={form.cost.title}
              onChange={(e) => {
                const newCost = { ...form.cost };
                newCost.factors.title = e.target.value;
                setForm({ ...form, cost: newCost });
              }}
            />
            <textarea
              className="border border-gray-300 rounded bg-white p-2 w-full"
              placeholder="Factors Section Description"
              value={form.cost.description}
              onChange={(e) => {
                const newCost = { ...form.cost };
                newCost.factors.description = e.target.value;
                setForm({ ...form, cost: newCost });
              }}
            />
            {/* Cost Table Headers */}
            <div className="flex justify-between items-end">
              <h5 className="font-semibold mb-2">Cost Table</h5>
              <button
                type="button"
                className="px-4 py-2 text-white rounded bg-[#333c29]"
                onClick={() => {
                  const newCost = { ...form.cost };
                  const columnCount = form.cost.costTable.headers.length || 2;
                  newCost.costTable.rows.push(Array(columnCount).fill(""));
                  setForm({ ...form, cost: newCost });
                }}
              >
                + Row
              </button>
            </div>
            <table className="w-full bg-white border border-gray-300 mb-4">
              <thead className="bg-white">
                <tr>
                  {form.cost.costTable.headers.map((header, i) => (
                    <th
                      key={i}
                      className="border space-y-2 border-gray-300 p-3 mb-4"
                    >
                      <div className="flex justify-between items-center gap-2">
                        <input
                          placeholder={`Header ${i + 1}`}
                          value={header}
                          onChange={(e) => {
                            const newCost = { ...form.cost };
                            newCost.costTable.headers[i] = e.target.value;
                            setForm({ ...form, cost: newCost });
                          }}
                          className="border border-gray-300 rounded p-2 w-full"
                        />
                        <button
                          type="button"
                          className="bg-red-500 text-white rounded w-6 py-2 flex items-center justify-center"
                          onClick={() => {
                            const newCost = { ...form.cost };
                            newCost.costTable.headers.splice(i, 1);
                            newCost.costTable.rows = newCost.costTable.rows.map(
                              (row) => row.filter((_, idx) => idx !== i)
                            );
                            setForm({ ...form, cost: newCost });
                          }}
                        >
                          ×
                        </button>
                      </div>
                    </th>
                  ))}
                  <th>
                    <button
                      type="button"
                      className="px-4 py-2 text-white rounded bg-[#333c29]"
                      onClick={() => {
                        const newCost = { ...form.cost };
                        newCost.costTable.headers.push("");
                        // Also add an empty cell to each row
                        newCost.costTable.rows = newCost.costTable.rows.map(
                          (row) => [...row, ""]
                        );
                        setForm({ ...form, cost: newCost });
                      }}
                    >
                      + Col
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {form.cost.costTable.rows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className="border border-gray-300 p-2"
                      >
                        <input
                          placeholder={`Row ${rowIndex + 1} - Col ${
                            cellIndex + 1
                          }`}
                          value={cell}
                          onChange={(e) => {
                            const newCost = { ...form.cost };
                            newCost.costTable.rows[rowIndex][cellIndex] =
                              e.target.value;
                            setForm({ ...form, cost: newCost });
                          }}
                          className="border border-gray-300 p-2 w-full"
                        />
                      </td>
                    ))}
                    <td className="flex items-center justify-center">
                      <button
                        type="button"
                        className="bg-red-500 text-white rounded w-6 py-2 mt-2 flex items-center justify-center"
                        onClick={() => {
                          const newCost = { ...form.cost };
                          newCost.costTable.rows.splice(rowIndex, 1);
                          setForm({ ...form, cost: newCost });
                        }}
                      >
                        ×
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-between items-end">
              <h5 className="font-semibold">Cost Factors</h5>
              <button
                type="button"
                className="px-4 py-2 text-white rounded bg-[#333c29]"
                onClick={() => {
                  const newCost = { ...form.cost };
                  newCost.factors.items.push({
                    title: "",
                    description: "",
                    icon: "",
                  });
                  setForm({ ...form, cost: newCost });
                }}
              >
                +
              </button>
            </div>
            <input
              className="border border-gray-300 rounded bg-white p-2 w-full"
              placeholder="Factors Section Title"
              value={form.cost.factors.title}
              onChange={(e) => {
                const newCost = { ...form.cost };
                newCost.factors.title = e.target.value;
                setForm({ ...form, cost: newCost });
              }}
            />
            <textarea
              className="border border-gray-300 rounded bg-white p-2 w-full"
              placeholder="Factors Section Description"
              value={form.cost.factors.description}
              onChange={(e) => {
                const newCost = { ...form.cost };
                newCost.factors.description = e.target.value;
                setForm({ ...form, cost: newCost });
              }}
            />
            <div className="grid grid-cols-4 gap-2">
              {form.cost.factors.items.map((item, i) => (
                <div
                  key={i}
                  className="space-y-2 bg-white p-3 rounded border-gray-300 border"
                >
                  {" "}
                  <div className="flex items-center -jsutify-between gap-2">
                    <input
                      placeholder={`Factor Title ${i + 1}`}
                      value={item.title}
                      onChange={(e) => {
                        const newCost = { ...form.cost };
                        newCost.factors.items[i].title = e.target.value;
                        setForm({ ...form, cost: newCost });
                      }}
                      className="border border-gray-300 rounded bg-white p-2 w-full"
                    />
                    <button
                      type="button"
                      className="bg-red-500 text-white rounded w-6 py-2 flex items-center justify-center"
                      onClick={() => {
                        const newCost = { ...form.cost };
                        newCost.factors.items.splice(i, 1);
                        setForm({ ...form, cost: newCost });
                      }}
                    >
                      ×
                    </button>
                  </div>
                  <textarea
                    placeholder={`Factor Description ${i + 1}`}
                    value={item.description}
                    onChange={(e) => {
                      const newCost = { ...form.cost };
                      newCost.factors.items[i].description = e.target.value;
                      setForm({ ...form, cost: newCost });
                    }}
                    className="border border-gray-300 rounded bg-white p-2 w-full"
                  />
                  <ImageUploader
                    value={item.icon}
                    onChange={(url) => {
                      const newCost = { ...form.cost };
                      newCost.factors.items[i].icon = url;
                      setForm({ ...form, cost: newCost });
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Causes of Hair Loss */}
          <div className="border space-y-2 border-gray-300 bg-gray-100 p-3 mb-4">
            <h2 className="block text-lg font-semibold">Causes of Hair Loss</h2>

            {/* Title */}
            <input
              className="border border-gray-300 rounded bg-white p-2 w-full"
              placeholder="Title"
              value={form.causesOfHairLoss.title}
              onChange={(e) => {
                const updated = { ...form };
                updated.causesOfHairLoss.title = e.target.value;
                setForm(updated);
              }}
            />

            {/* Subtitle */}
            <textarea
              className="border border-gray-300 rounded bg-white p-2 w-full"
              placeholder="Subtitle"
              value={form.causesOfHairLoss.subtitle}
              onChange={(e) => {
                const updated = { ...form };
                updated.causesOfHairLoss.subtitle = e.target.value;
                setForm(updated);
              }}
            />

            {/* Causes List */}
            <div className="flex justify-between items-end">
              <h5 className="font-semibold mb-2">List of Causes</h5>
              {/* Add Cause Button */}
              <button
                type="button"
                className="px-4 py-2 text-white rounded bg-[#333c29]"
                onClick={() => {
                  const updated = { ...form };
                  updated.causesOfHairLoss.causes.push({
                    title: "",
                    description: "",
                    icon: "",
                  });
                  setForm(updated);
                }}
              >
                +
              </button>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {form.causesOfHairLoss.causes.map((cause, index) => (
                <div
                  key={index}
                  className="space-y-2 bg-white p-3 rounded border-gray-300 border"
                >
                  {" "}
                  <div className="flex items-center -jsutify-between gap-2">
                    <input
                      className="border border-gray-300 rounded bg-white p-2 w-full"
                      placeholder={`Cause Title ${index + 1}`}
                      value={cause.title}
                      onChange={(e) => {
                        const updated = { ...form };
                        updated.causesOfHairLoss.causes[index].title =
                          e.target.value;
                        setForm(updated);
                      }}
                    />
                    <button
                      type="button"
                      className="bg-red-500 text-white rounded w-6 py-2 flex items-center justify-center"
                      onClick={() => {
                        const updated = { ...form };
                        updated.causesOfHairLoss.causes.splice(index, 1);
                        setForm(updated);
                      }}
                    >
                      ×
                    </button>
                  </div>
                  <textarea
                    className="border border-gray-300 rounded bg-white p-2 w-full"
                    placeholder={`Cause Description ${index + 1}`}
                    value={cause.description}
                    onChange={(e) => {
                      const updated = { ...form };
                      updated.causesOfHairLoss.causes[index].description =
                        e.target.value;
                      setForm(updated);
                    }}
                  />
                  <ImageUploader
                    value={cause.icon}
                    onChange={(val) => {
                      const updated = { ...form };
                      updated.causesOfHairLoss.causes[index].icon = val;
                      setForm(updated);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="border space-y-2 border-gray-300 bg-gray-100 p-3 mb-4">
            <div className="flex justify-between items-end">
              <h2 className="block text-lg font-semibold">Why Choose Us</h2>
              <button
                type="button"
                className="px-4 py-2 text-white rounded bg-[#333c29]"
                onClick={() => {
                  const newWhy = { ...form.whyChooseUs };
                  newWhy.items.push({ title: "", description: "", bg: "" });
                  setForm({ ...form, whyChooseUs: newWhy });
                }}
              >
                +
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {form.whyChooseUs.items.map((item, i) => (
                <div
                  key={i}
                  className="space-y-2 bg-white p-3 rounded border-gray-300 border"
                >
                  <ImageUploader
                    value={item.bg}
                    onChange={(url) => {
                      const newWhy = { ...form.whyChooseUs };
                      newWhy.items[i].bg = url;
                      setForm({ ...form, whyChooseUs: newWhy });
                    }}
                  />
                  <div className="flex items-center -jsutify-between gap-2">
                    <input
                      placeholder={`Item Title ${i + 1}`}
                      value={item.title}
                      onChange={(e) => {
                        const newWhy = { ...form.whyChooseUs };
                        newWhy.items[i].title = e.target.value;
                        setForm({ ...form, whyChooseUs: newWhy });
                      }}
                      className="border border-gray-300 rounded bg-white p-2 w-full"
                    />
                    <button
                      type="button"
                      className="bg-red-500 text-white rounded w-6 py-2 flex items-center justify-center"
                      onClick={() => {
                        const newWhy = { ...form.whyChooseUs };
                        newWhy.items.splice(i, 1);
                        setForm({ ...form, whyChooseUs: newWhy });
                      }}
                    >
                      ×
                    </button>
                  </div>
                  <textarea
                    placeholder={`Item Description ${i + 1}`}
                    value={item.description}
                    onChange={(e) => {
                      const newWhy = { ...form.whyChooseUs };
                      newWhy.items[i].description = e.target.value;
                      setForm({ ...form, whyChooseUs: newWhy });
                    }}
                    className="border border-gray-300 rounded bg-white p-2 w-full"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Post Surgery Support */}
          <div className="border space-y-2 border-gray-300 bg-gray-100 p-3 mb-4">
            <div className="flex items-start -jsutify-between gap-2">
              <div className="w-1/2">
                <h2 className="block text-lg font-semibold">
                  Post-Surgery Support
                </h2>

                {/* Title */}
                <input
                  className="border border-gray-300 rounded bg-white p-2 w-full"
                  placeholder="Title"
                  value={form.postSurgerySupport.title}
                  onChange={(e) => {
                    const updated = { ...form };
                    updated.postSurgerySupport.title = e.target.value;
                    setForm(updated);
                  }}
                />

                {/* Description */}
                <textarea
                  className="border border-gray-300 rounded bg-white p-2 w-full"
                  placeholder="Description"
                  value={form.postSurgerySupport.description}
                  onChange={(e) => {
                    const updated = { ...form };
                    updated.postSurgerySupport.description = e.target.value;
                    setForm(updated);
                  }}
                />
              </div>

              {/* Image Upload */}
              <div className="w-1/2">
                <label className="font-medium block mb-1">Image</label>
                <ImageUploader
                  value={form.postSurgerySupport.image}
                  onChange={(val) => {
                    const updated = { ...form };
                    updated.postSurgerySupport.image = val;
                    setForm(updated);
                  }}
                />
              </div>
            </div>

            {/* Items List */}
            <div className="flex justify-between items-end">
              <h5 className="font-semibold mb-2">Support Steps</h5>
              <button
                type="button"
                className="px-4 py-2 text-white rounded bg-[#333c29]"
                onClick={() => {
                  const updated = { ...form };
                  updated.postSurgerySupport.items.push({
                    title: "",
                    description: "",
                  });
                  setForm(updated);
                }}
              >
                + Add Step
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {form.postSurgerySupport.items.map((item, index) => (
                <div
                  key={index}
                  className="space-y-2 bg-white p-3 rounded border-gray-300 border"
                >
                  <div className="flex items-center -jsutify-between gap-2">
                    <input
                      className="border border-gray-300 rounded bg-white p-2 w-full"
                      placeholder={`Step Title ${index + 1}`}
                      value={item.title}
                      onChange={(e) => {
                        const updated = { ...form };
                        updated.postSurgerySupport.items[index].title =
                          e.target.value;
                        setForm(updated);
                      }}
                    />
                    <button
                      type="button"
                      className="bg-red-500 text-white rounded w-6 py-2 flex items-center justify-center"
                      onClick={() => {
                        const updated = { ...form };
                        updated.postSurgerySupport.items.splice(index, 1);
                        setForm(updated);
                      }}
                    >
                      ×
                    </button>
                  </div>
                  <textarea
                    className="border border-gray-300 rounded bg-white p-2 w-full"
                    placeholder={`Step Description ${index + 1}`}
                    value={item.description}
                    onChange={(e) => {
                      const updated = { ...form };
                      updated.postSurgerySupport.items[index].description =
                        e.target.value;
                      setForm(updated);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Dos and Don'ts */}
          <div className="border space-y-2 border-gray-300 bg-gray-100 p-3 mb-4">
            <h2 className="block text-lg font-semibold">Dos and Don'ts</h2>
            <div className="flex justify-between items-center gap-4">
              <div className="space-y-2 bg-white p-3 rounded border-gray-300 border w-1/2">
                <div className="flex justify-between items-end">
                  <h5 className="font-semibold">Dos</h5>
                  <button
                    type="button"
                    className="px-4 py-2 text-white rounded bg-[#333c29]"
                    onClick={() => {
                      const newDosDonts = { ...form.dosAndDonts };
                      newDosDonts.dos.push({ title: "" }); // ✅ Add new with `title`
                      setForm({ ...form, dosAndDonts: newDosDonts });
                    }}
                  >
                    +
                  </button>
                </div>
                {form.dosAndDonts.dos.map((doItem, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      placeholder={`Do ${i + 1}`}
                      value={doItem.title}
                      onChange={(e) => {
                        const newDosDonts = { ...form.dosAndDonts };
                        newDosDonts.dos[i].title = e.target.value;
                        setForm({ ...form, dosAndDonts: newDosDonts });
                      }}
                      className="border border-gray-300 rounded bg-white p-2 w-full"
                    />
                    <button
                      type="button"
                      className="bg-red-500 text-white rounded w-6 py-2 flex items-center justify-center"
                      onClick={() => {
                        const newDosDonts = { ...form.dosAndDonts };
                        newDosDonts.dos.splice(i, 1);
                        setForm({ ...form, dosAndDonts: newDosDonts });
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <div className="space-y-2 bg-white p-3 rounded border-gray-300 border w-1/2">
                <div className="flex justify-between items-end">
                  <h5 className="font-semibold">Don'ts</h5>
                  <button
                    type="button"
                    className="px-4 py-2 text-white rounded bg-[#333c29]"
                    onClick={() => {
                      const newDosDonts = { ...form.dosAndDonts };
                      newDosDonts.donts.push({ title: "" }); // ✅ Add new with `title`
                      setForm({ ...form, dosAndDonts: newDosDonts });
                    }}
                  >
                    +
                  </button>
                </div>
                {form.dosAndDonts.donts.map((dontItem, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      placeholder={`Don't ${i + 1}`}
                      value={dontItem.title}
                      onChange={(e) => {
                        const newDosDonts = { ...form.dosAndDonts };
                        newDosDonts.donts[i].title = e.target.value;
                        setForm({ ...form, dosAndDonts: newDosDonts });
                      }}
                      className="border border-gray-300 rounded bg-white p-2 w-full"
                    />
                    <button
                      type="button"
                      className="bg-red-500 text-white rounded w-6 py-2 flex items-center justify-center"
                      onClick={() => {
                        const newDosDonts = { ...form.dosAndDonts };
                        newDosDonts.donts.splice(i, 1);
                        setForm({ ...form, dosAndDonts: newDosDonts });
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recovery */}
          <div className="border space-y-2 border-gray-300 bg-gray-100 p-3 mb-4">
            <div className="flex justify-between items-end">
              <h2 className="block text-lg font-semibold">Recovery</h2>
              <button
                type="button"
                className="px-4 py-2 text-white rounded bg-[#333c29]"
                onClick={() => {
                  const newRecovery = { ...form.recovery };
                  newRecovery.weeks.push({
                    name: "",
                    expectations: [""],
                    careInstructions: [""],
                    image: "",
                  });
                  setForm({ ...form, recovery: newRecovery });
                }}
              >
                + Add Recovery Week
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {form.recovery.weeks.map((week, i) => (
                <div
                  key={i}
                  className="space-y-2 bg-white p-3 rounded border-gray-300 border"
                >
                  {" "}
                  <div className="flex items-center -jsutify-between gap-2">
                    <input
                      placeholder={`Week Name ${i + 1}`}
                      value={week.name}
                      onChange={(e) => {
                        const newRecovery = { ...form.recovery };
                        newRecovery.weeks[i].name = e.target.value;
                        setForm({ ...form, recovery: newRecovery });
                      }}
                      className="border border-gray-300 rounded bg-white p-2 w-full"
                    />
                    <button
                      type="button"
                      className="bg-red-500 text-white rounded w-6 py-2 flex items-center justify-center"
                      onClick={() => {
                        const newRecovery = { ...form.recovery };
                        newRecovery.weeks.splice(i, 1);
                        setForm({ ...form, recovery: newRecovery });
                      }}
                    >
                      ×
                    </button>
                  </div>
                  <ImageUploader
                    value={week.image}
                    onChange={(url) => {
                      const newRecovery = { ...form.recovery };
                      newRecovery.weeks[i].image = url;
                      setForm({ ...form, recovery: newRecovery });
                    }}
                  />
                  <div className="flex justify-between items-end">
                    <h6 className="font-medium">Expectations</h6>
                    <button
                      type="button"
                      className="px-4 py-2 text-white rounded bg-[#333c29]"
                      onClick={() => {
                        const newRecovery = { ...form.recovery };
                        newRecovery.weeks[i].expectations.push("");
                        setForm({ ...form, recovery: newRecovery });
                      }}
                    >
                      +
                    </button>
                  </div>
                  {week.expectations.map((exp, ei) => (
                    <div key={ei} className="flex items-center gap-2">
                      <input
                        placeholder={`Expectation ${ei + 1}`}
                        value={exp}
                        onChange={(e) => {
                          const newRecovery = { ...form.recovery };
                          newRecovery.weeks[i].expectations[ei] =
                            e.target.value;
                          setForm({ ...form, recovery: newRecovery });
                        }}
                        className="border border-gray-300 rounded bg-white p-2 w-full"
                      />
                      <button
                        type="button"
                        className="bg-red-500 text-white rounded w-6 py-2 flex items-center justify-center"
                        onClick={() => {
                          const newRecovery = { ...form.recovery };
                          newRecovery.weeks[i].expectations.splice(ei, 1);
                          setForm({ ...form, recovery: newRecovery });
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <div className="flex justify-between items-end">
                    <h6 className="font-medium">Care Instructions</h6>
                    <button
                      type="button"
                      className="px-4 py-2 text-white rounded bg-[#333c29]"
                      onClick={() => {
                        const newRecovery = { ...form.recovery };
                        newRecovery.weeks[i].careInstructions.push("");
                        setForm({ ...form, recovery: newRecovery });
                      }}
                    >
                      +
                    </button>
                  </div>
                  {week.careInstructions.map((care, ci) => (
                    <div key={ci} className="flex items-center gap-2">
                      <input
                        placeholder={`Care Instruction ${ci + 1}`}
                        value={care}
                        onChange={(e) => {
                          const newRecovery = { ...form.recovery };
                          newRecovery.weeks[i].careInstructions[ci] =
                            e.target.value;
                          setForm({ ...form, recovery: newRecovery });
                        }}
                        className="border border-gray-300 rounded bg-white p-2 w-full"
                      />
                      <button
                        type="button"
                        className="bg-red-500 text-white rounded w-6 py-2 flex items-center justify-center"
                        onClick={() => {
                          const newRecovery = { ...form.recovery };
                          newRecovery.weeks[i].careInstructions.splice(ci, 1);
                          setForm({ ...form, recovery: newRecovery });
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Comparison Section */}
          <div className="border space-y-2 border-gray-300 bg-gray-100 p-3 mb-4">
            <h2 className="block text-lg font-semibold">Comparison Section</h2>

            {/* Title */}
            <input
              className="border border-gray-300 rounded bg-white p-2 w-full"
              placeholder="Comparison Title"
              value={form.comparison.title}
              onChange={(e) => {
                setForm({
                  ...form,
                  comparison: { ...form.comparison, title: e.target.value },
                });
              }}
            />

            {/* Subtitle */}
            <textarea
              className="border border-gray-300 rounded bg-white p-2 w-full"
              placeholder="Comparison Subtitle"
              value={form.comparison.subtitle}
              onChange={(e) => {
                setForm({
                  ...form,
                  comparison: { ...form.comparison, subtitle: e.target.value },
                });
              }}
            />

            {/* Table Editor */}
            <div className="overflow-auto rounded">
              <table className="w-full table-auto">
                <thead className="bg-white">
                  <tr>
                    {form.comparison.columns.map((col, colIndex) => (
                      <th
                        key={colIndex}
                        className="border bg-white border-gray-300 p-2 bg-gray-100"
                      >
                        <input
                          className="w-full p-1"
                          value={col.title}
                          onChange={(e) => {
                            const updatedColumns = [...form.comparison.columns];
                            updatedColumns[colIndex].title = e.target.value;
                            setForm({
                              ...form,
                              comparison: {
                                ...form.comparison,
                                columns: updatedColumns,
                              },
                            });
                          }}
                        />
                      </th>
                    ))}
                    <th className="border bg-white border-gray-300 p-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {form.comparison.columns[0]?.items.map((_, rowIndex) => (
                    <tr key={rowIndex}>
                      {form.comparison.columns.map((col, colIndex) => (
                        <td
                          key={colIndex}
                          className="border bg-white border-gray-300 p-2"
                        >
                          <input
                            className="w-full p-1"
                            value={col.items[rowIndex] || ""}
                            onChange={(e) => {
                              const updatedColumns = [
                                ...form.comparison.columns,
                              ];
                              updatedColumns[colIndex].items[rowIndex] =
                                e.target.value;
                              setForm({
                                ...form,
                                comparison: {
                                  ...form.comparison,
                                  columns: updatedColumns,
                                },
                              });
                            }}
                          />
                        </td>
                      ))}
                      <td className="border bg-white border-gray-300 p-2">
                        <button
                          type="button"
                          className="bg-red-500 text-white rounded w-6 py-2 flex items-center justify-center"
                          onClick={() => {
                            const updatedColumns = [...form.comparison.columns];
                            updatedColumns.splice(colIndex, 1);
                            setForm({
                              ...form,
                              comparison: {
                                ...form.comparison,
                                columns: updatedColumns,
                              },
                            });
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

            {/* Add Row */}
            <button
              className="px-4 py-2 text-white rounded bg-[#333c29]"
              type="button"
              onClick={() => {
                const updatedColumns = form.comparison.columns.map((col) => ({
                  ...col,
                  items: [...col.items, ""],
                }));
                setForm({
                  ...form,
                  comparison: { ...form.comparison, columns: updatedColumns },
                });
              }}
            >
              + Add Row
            </button>
          </div>

          {/* Insights Section */}
          <div className="border space-y-2 border-gray-300 bg-gray-100 p-3 mb-4">
            <div className="flex justify-between items-end">
              <h2 className="block text-lg font-semibold">
                Hair Care & Transplant Insights
              </h2>
              {/* Add New Insight Item */}
              <button
                type="button"
                className="px-4 py-2 text-white rounded bg-[#333c29]"
                onClick={() => {
                  const updatedItems = [
                    ...form.insights.items,
                    { title: "", image: "" },
                  ];
                  setForm({
                    ...form,
                    insights: { ...form.insights, items: updatedItems },
                  });
                }}
              >
                + Add Insight Item
              </button>
            </div>

            {/* Title */}
            <input
              className="border border-gray-300 rounded bg-white p-2 w-full"
              placeholder="Insights Title"
              value={form.insights.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  insights: { ...form.insights, title: e.target.value },
                })
              }
            />

            {/* List Items */}
            <div className="grid grid-cols-4 gap-2">
              {form.insights.items.map((item, i) => (
                <div
                  key={i}
                  className="space-y-2 bg-white p-3 rounded border-gray-300 border"
                >
                  <ImageUploader
                    value={item.image}
                    onChange={(val) => {
                      const updatedItems = [...form.insights.items];
                      updatedItems[i].image = val;
                      setForm({
                        ...form,
                        insights: { ...form.insights, items: updatedItems },
                      });
                    }}
                  />

                  <div className="flex gap-2">
                    <input
                      className="border border-gray-300 rounded bg-white p-2 w-full"
                      placeholder={`Title ${i + 1}`}
                      value={item.title}
                      onChange={(e) => {
                        const updatedItems = [...form.insights.items];
                        updatedItems[i].title = e.target.value;
                        setForm({
                          ...form,
                          insights: { ...form.insights, items: updatedItems },
                        });
                      }}
                    />

                    {/* Optional: Delete Item */}
                    <button
                      type="button"
                      className="px-2 py-2 bg-red-500 text-white rounded"
                      onClick={() => {
                        const updatedItems = form.insights.items.filter(
                          (_, index) => index !== i
                        );
                        setForm({
                          ...form,
                          insights: { ...form.insights, items: updatedItems },
                        });
                      }}
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Locations */}
          <div className="border space-y-2 border-gray-300 bg-gray-100 p-3 mb-4">
            <div className="flex justify-between items-end">
              <h2 className="block text-lg font-semibold">Locations</h2>
              <button
                type="button"
                className="px-4 py-2 text-white rounded bg-[#333c29]"
                onClick={() => {
                  const newLocations = { ...form.locations };
                  newLocations.cities.push({ name: "", image: "" });
                  setForm({ ...form, locations: newLocations });
                }}
              >
                + Add City
              </button>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {form.locations.cities.map((city, i) => (
                <div
                  key={i}
                  className="space-y-2 bg-white p-3 rounded border-gray-300 border"
                >
                  {" "}
                  <div className="flex items-center -jsutify-between gap-2">
                    <input
                      placeholder={`City Name ${i + 1}`}
                      value={city.name}
                      onChange={(e) => {
                        const newLocations = { ...form.locations };
                        newLocations.cities[i].name = e.target.value;
                        setForm({ ...form, locations: newLocations });
                      }}
                      className="border border-gray-300 rounded bg-white p-2 w-full"
                    />
                    <button
                      type="button"
                      className="bg-red-500 text-white rounded w-6 py-2 flex items-center justify-center"
                      onClick={() => {
                        const newLocations = { ...form.locations };
                        newLocations.cities.splice(i, 1);
                        setForm({ ...form, locations: newLocations });
                      }}
                    >
                      ×
                    </button>
                  </div>
                  <ImageUploader
                    value={city.image}
                    onChange={(url) => {
                      const newLocations = { ...form.locations };
                      newLocations.cities[i].image = url;
                      setForm({ ...form, locations: newLocations });
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="px-4 py-2 text-white rounded bg-[#333c29]"
          >
            {editingId ? "Update" : "Create"}
          </button>
        </form>
      )}

      {!showForm && (
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          {services.map((s) => (
            <div
              key={s._id}
              className="border p-4 rounded shadow flex justify-between items-center border border-gray-300 rounded bg-white p-2 w-full"
            >
              <div>
                <h3 className="font-bold">{s.slug}</h3>
                <p className="text-xs text-gray-500">{s.metaTitle}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(s)}
                  className="px-3 py-1 bg-yellow-500 rounded w-1/2 text-white"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(s._id)}
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

export default Services;
