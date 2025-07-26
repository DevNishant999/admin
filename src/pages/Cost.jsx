import React, { useState, useEffect } from "react";
import ImageUploader from "../components/ImageUploader";

const emptyCostPage = {
  slug: "",
  metaTitle: "",
  metaDescription: "",
  metaKeywords: "",
  costData: {
    mapBanner: {
      image: "",
      altText: "",
    },
    marqueeAccordion: {
      marqueeText: "",
      heading: "",
      description: "",
      accordionItems: [],
    },
    factors: [],
    cost: {
      fue: {
        description: "",
        pricingTable: [],
        headers: {
          level: "Level",
          grafts: "Grafts",
          cost: "Cost",
        },
      },
      savaFue: {
        description: "",
        pricingTable: [],
        headers: {
          level: "Level",
          grafts: "Grafts",
          cost: "Cost",
        },
      },
      qht: {
        description: "",
        pricingTable: [],
        headers: {
          level: "Level",
          grafts: "Grafts",
          cost: "Cost",
        },
      },
    },
    qhtVsDelhiMumbai: {
      heading: "",
      description: "",
      comparisonTable: [],
      headers: {
        metric: "Metric",
        qht: "QHT",
        delhi: "Delhi",
        mumbai: "Mumbai",
      },
    },
    costComparison: {
      heading: "",
      description: "",
      comparisonTable: [],
      headers: {
        level: "Level",
        grafts: "Grafts",
        qht: "QHT",
        fue: "FUE",
        dhi: "DHI",
      },
    },
    solutions: [],
    exploreLocations: {
      cities: {
        heading: "",
        description: "",
        list: [],
      },
      countries: {
        heading: "",
        description: "",
        list: [],
      },
    },
  },
};

const CostPagesAdmin = () => {
  const [costPages, setCostPages] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPage, setEditingPage] = useState(null);
  const [form, setForm] = useState(emptyCostPage);

  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API}/cost`)
      .then((res) => res.json())
      .then((data) => setCostPages(data))
      .catch((err) => console.error(err));
  }, []);

  const handleFormChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleNested = (path, value) => {
    const keys = path.split(".");
    setForm((prev) => {
      let updated = { ...prev };
      let ref = updated;
      keys.slice(0, -1).forEach((k) => {
        ref = ref[k];
      });
      ref[keys.at(-1)] = value;
      return updated;
    });
  };

  const addToArray = (path, item) => {
    const keys = path.split(".");
    setForm((prev) => {
      let updated = { ...prev };
      let ref = updated;
      keys.forEach((k) => {
        ref = ref[k];
      });
      ref.push(item);
      return updated;
    });
  };

  const removeFromArray = (path, idx) => {
    const keys = path.split(".");
    setForm((prev) => {
      let updated = { ...prev };
      let ref = updated;
      keys.forEach((k) => {
        ref = ref[k];
      });
      ref.splice(idx, 1);
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingPage ? "PUT" : "POST";
    const url = editingPage ? `${API}/cost/${editingPage._id}` : `${API}/cost`;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setShowForm(false);
    setEditingPage(null);
    setForm(emptyCostPage);

    const res = await fetch(`${API}/cost`);
    const data = await res.json();
    setCostPages(data);
  };

  const handleEdit = (page) => {
    setForm(page);
    setEditingPage(page);
    setShowForm(true);
  };
  
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this cost page?"
    );
    if (!confirmDelete) return;

    await fetch(`${API}/cost/${id}`, { method: "DELETE" });
    setCostPages(costPages.filter((p) => p._id !== id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Manage Cost Pages</h2>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingPage(null);
            setForm(emptyCostPage);
          }}
          className="px-4 py-2 text-white rounded bg-[#333c29]"
        >
          {showForm ? "Cancel ×" : "+ Add Cost Page"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit}>
          <div className="flex items-start justify-between gap-4">
            {/* ---------------- META ---------------- */}
            <div className="border space-y-2 border-gray-300 bg-gray-100 p-3 mb-4 w-1/2">
              <h2 className="block text-lg font-semibold">Meta Details</h2>
              <input
                placeholder="Slug"
                value={form.slug}
                onChange={(e) => handleFormChange("slug", e.target.value)}
                className="border border-gray-300 rounded bg-white p-2 w-full"
              />
              <input
                placeholder="Meta Title"
                value={form.metaTitle}
                onChange={(e) => handleFormChange("seoTitle", e.target.value)}
                className="border border-gray-300 rounded bg-white p-2 w-full"
              />
              <input
                placeholder="Meta Description"
                value={form.metaDescription}
                onChange={(e) =>
                  handleFormChange("seoDescription", e.target.value)
                }
                className="border border-gray-300 rounded bg-white p-2 w-full"
              />
              <input
                placeholder="Meta Keywords"
                value={form.metaKeywords}
                onChange={(e) =>
                  handleFormChange("seoKeywords", e.target.value)
                }
                className="border border-gray-300 rounded bg-white p-2 w-full"
              />
            </div>

            {/* ---------------- Banner ---------------- */}
            <div className="border space-y-2 border-gray-300 bg-gray-100 p-3 mb-4 w-1/2">
              <h2 className="block text-lg font-semibold">Map Banner</h2>
              <ImageUploader
                value={form.costData.mapBanner?.image}
                onChange={(url) => handleNested("mapBanner.image", url)}
              />

              <input
                placeholder="Alt Text"
                value={form.costData.mapBanner?.altText}
                onChange={(e) =>
                  handleNested("mapBanner.altText", e.target.value)
                }
                className="border border-gray-300 rounded bg-white p-2 w-full"
              />
            </div>
          </div>

          {/* ---------------- Accordian ---------------- */}
          <div className="border space-y-2 border-gray-300 bg-gray-100 p-3 mb-4">
            <div className="flex items-end justify-between gap-2">
              <h2 className="block text-lg font-semibold">Marquee Accordion</h2>
              <button
                type="button"
                onClick={() =>
                  addToArray("costData.marqueeAccordion.accordionItems", {
                    title: "",
                    content: "",
                  })
                }
                className="px-4 py-2 text-white rounded bg-[#333c29]"
              >
                + Add Item
              </button>
            </div>
            <input
              placeholder="Marquee Text"
              value={form.costData.marqueeAccordion.marqueeText}
              onChange={(e) =>
                handleNested("marqueeAccordion.marqueeText", e.target.value)
              }
              className="border border-gray-300 rounded bg-white p-2 w-full"
            />
            <input
              placeholder="Heading"
              value={form.costData.marqueeAccordion.heading}
              onChange={(e) =>
                handleNested("marqueeAccordion.heading", e.target.value)
              }
              className="border border-gray-300 rounded bg-white p-2 w-full"
            />
            <textarea
              placeholder="Description"
              value={form.costData.marqueeAccordion.description}
              onChange={(e) =>
                handleNested("marqueeAccordion.description", e.target.value)
              }
              className="border border-gray-300 rounded bg-white p-2 w-full"
            />
            <div className="grid grid-cols-2 gap-2">
              {form.costData.marqueeAccordion.accordionItems?.map(
                (item, idx) => (
                  <div
                    key={idx}
                    className="space-y-2 bg-white p-3 rounded border-gray-300 border"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <input
                        placeholder="Title"
                        value={item.title}
                        onChange={(e) =>
                          handleNested(
                            `marqueeAccordion.accordionItems.${idx}.title`,
                            e.target.value
                          )
                        }
                        className="border border-gray-300 rounded bg-white p-2 w-full"
                      />{" "}
                      <button
                        type="button"
                        onClick={() =>
                          removeFromArray(
                            "costData.marqueeAccordion.accordionItems",
                            idx
                          )
                        }
                        className="bg-red-500 text-white rounded w-8 py-2 flex items-center justify-center"
                      >
                        ×
                      </button>
                    </div>
                    <textarea
                      placeholder="Content"
                      value={
                        typeof item.content === "string" ? item.content : ""
                      }
                      onChange={(e) =>
                        handleNested(
                          `marqueeAccordion.accordionItems.${idx}.content`,
                          e.target.value
                        )
                      }
                      className="border border-gray-300 rounded bg-white p-2 w-full"
                    />
                  </div>
                )
              )}
            </div>
          </div>

          {/* ---------------- Factors ---------------- */}
          <div className="border space-y-2 border-gray-300 bg-gray-100 p-3 mb-4">
            <div className="flex items-end justify-between gap-2">
              <h2 className="block text-lg font-semibold">Factors</h2>
              <button
                type="button"
                onClick={() =>
                  addToArray("costData.factors", {
                    icon: "",
                    title: "",
                    description: "",
                  })
                }
                className="px-4 py-2 text-white rounded bg-[#333c29]"
              >
                + Add Factor
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {form.costData.factors.map((item, idx) => (
                <div
                  key={idx}
                  className="space-y-2 bg-white p-3 rounded border-gray-300 border"
                >
                  <ImageUploader
                    value={item.icon}
                    onChange={(url) => handleNested(`factors.${idx}.icon`, url)}
                  />

                  <div className="flex items-start justify-between gap-2">
                    <input
                      placeholder="Title"
                      value={item.title}
                      onChange={(e) =>
                        handleNested(`factors.${idx}.title`, e.target.value)
                      }
                      className="border border-gray-300 rounded bg-white p-2 w-full"
                    />
                    <button
                      type="button"
                      onClick={() => removeFromArray("costData.factors", idx)}
                      className="bg-red-500 text-white rounded w-8 py-2 flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                  <textarea
                    placeholder="Description"
                    value={item.description}
                    onChange={(e) =>
                      handleNested(`factors.${idx}.description`, e.target.value)
                    }
                    className="border border-gray-300 rounded bg-white p-2 w-full"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ---------------- COST SECTIONS FUE ---------------- */}
          <div className="border border-gray-300 bg-gray-100 p-3 mb-4">
            <h2 className="block text-lg font-semibold mb-2">Cost - FUE</h2>

            <textarea
              placeholder="FUE Description"
              value={form.costData.cost.fue.description}
              onChange={(e) =>
                handleNested("cost.fue.description", e.target.value)
              }
              className="border border-gray-300 rounded bg-white p-2 w-full mb-4"
            />

            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 bg-white p-2">
                    <input
                      type="text"
                      placeholder="Level"
                      value={form.costData.cost.fue.headers?.level || "Level"}
                      onChange={(e) =>
                        handleNested("cost.fue.headers.level", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded p-1"
                    />
                  </th>
                  <th className="border border-gray-300 bg-white p-2">
                    <input
                      type="text"
                      placeholder="Grafts"
                      value={form.costData.cost.fue.headers?.grafts || "Grafts"}
                      onChange={(e) =>
                        handleNested("cost.fue.headers.grafts", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded p-1"
                    />
                  </th>
                  <th className="border border-gray-300 bg-white p-2">
                    <input
                      type="text"
                      placeholder="Cost"
                      value={form.costData.cost.fue.headers?.cost || "Cost"}
                      onChange={(e) =>
                        handleNested("cost.fue.headers.cost", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded p-1"
                    />
                  </th>
                  <th className="border border-gray-300 bg-white p-2 text-center">
                    <button
                      type="button"
                      onClick={() =>
                        addToArray("costData.cost.fue.pricingTable", {
                          level: "",
                          grafts: "",
                          cost: "",
                        })
                      }
                      className="px-4 py-2 text-white rounded bg-[#333c29]"
                    >
                      +
                    </button>
                  </th>
                </tr>
              </thead>

              <tbody>
                {form.costData.cost.fue.pricingTable.map((row, idx) => (
                  <tr key={idx}>
                    <td className="border border-gray-300 bg-white p-2">
                      <input
                        placeholder="Level"
                        value={row.level}
                        onChange={(e) =>
                          handleNested(
                            `cost.fue.pricingTable.${idx}.level`,
                            e.target.value
                          )
                        }
                        className="w-full border border-gray-300 rounded p-1"
                      />
                    </td>
                    <td className="border border-gray-300 bg-white p-2">
                      <input
                        placeholder="Grafts"
                        value={row.grafts}
                        onChange={(e) =>
                          handleNested(
                            `cost.fue.pricingTable.${idx}.grafts`,
                            e.target.value
                          )
                        }
                        className="w-full border border-gray-300 rounded p-1"
                      />
                    </td>
                    <td className="border border-gray-300 bg-white p-2">
                      <input
                        placeholder="Cost"
                        value={row.cost}
                        onChange={(e) =>
                          handleNested(
                            `cost.fue.pricingTable.${idx}.cost`,
                            e.target.value
                          )
                        }
                        className="w-full border border-gray-300 rounded p-1"
                      />
                    </td>
                    <td className="border border-gray-300 bg-white p-2 text-center">
                      <button
                        type="button"
                        onClick={() =>
                          removeFromArray("costData.cost.fue.pricingTable", idx)
                        }
                        className="bg-red-500 text-white rounded px-2 py-1"
                      >
                        ×
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ---------------- COST SECTIONS SAVA ---------------- */}
          <div className="border border-gray-300 bg-gray-100 p-3 mb-4">
            <h2 className="block text-lg font-semibold mb-2">
              Cost - Sava FUE
            </h2>

            <textarea
              placeholder="Sava FUE Description"
              value={form.costData.cost.savaFue.description}
              onChange={(e) =>
                handleNested("cost.savaFue.description", e.target.value)
              }
              className="border border-gray-300 rounded bg-white p-2 w-full mb-4"
            />

            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 bg-white p-2">
                    <input
                      type="text"
                      placeholder="Level"
                      value={
                        form.costData.cost.savaFue.headers?.level || "Level"
                      }
                      onChange={(e) =>
                        handleNested(
                          "cost.savaFue.headers.level",
                          e.target.value
                        )
                      }
                      className="w-full border border-gray-300 rounded p-1"
                    />
                  </th>
                  <th className="border border-gray-300 bg-white p-2">
                    <input
                      type="text"
                      placeholder="Grafts"
                      value={
                        form.costData.cost.savaFue.headers?.grafts || "Grafts"
                      }
                      onChange={(e) =>
                        handleNested(
                          "cost.savaFue.headers.grafts",
                          e.target.value
                        )
                      }
                      className="w-full border border-gray-300 rounded p-1"
                    />
                  </th>
                  <th className="border border-gray-300 bg-white p-2">
                    <input
                      type="text"
                      placeholder="Cost"
                      value={form.costData.cost.savaFue.headers?.cost || "Cost"}
                      onChange={(e) =>
                        handleNested(
                          "cost.savaFue.headers.cost",
                          e.target.value
                        )
                      }
                      className="w-full border border-gray-300 rounded p-1"
                    />
                  </th>
                  <th className="border border-gray-300 bg-white p-2 flex justify-center items-center">
                    <button
                      type="button"
                      onClick={() =>
                        addToArray("costData.cost.savaFue.pricingTable", {
                          level: "",
                          grafts: "",
                          cost: "",
                        })
                      }
                      className="px-4 py-2 text-white rounded bg-[#333c29]"
                    >
                      +
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {form.costData.cost.savaFue.pricingTable.map((row, idx) => (
                  <tr key={idx}>
                    <td className="border border-gray-300 bg-white p-2">
                      <input
                        placeholder="Level"
                        value={row.level}
                        onChange={(e) =>
                          handleNested(
                            `cost.savaFue.pricingTable.${idx}.level`,
                            e.target.value
                          )
                        }
                        className="w-full border border-gray-300 rounded p-1"
                      />
                    </td>
                    <td className="border border-gray-300 bg-white p-2">
                      <input
                        placeholder="Grafts"
                        value={row.grafts}
                        onChange={(e) =>
                          handleNested(
                            `cost.savaFue.pricingTable.${idx}.grafts`,
                            e.target.value
                          )
                        }
                        className="w-full border border-gray-300 rounded p-1"
                      />
                    </td>
                    <td className="border border-gray-300 bg-white p-2">
                      <input
                        placeholder="Cost"
                        value={row.cost}
                        onChange={(e) =>
                          handleNested(
                            `cost.savaFue.pricingTable.${idx}.cost`,
                            e.target.value
                          )
                        }
                        className="w-full border border-gray-300 rounded p-1"
                      />
                    </td>
                    <td className="border border-gray-300 bg-white p-2 text-center">
                      <button
                        type="button"
                        onClick={() =>
                          removeFromArray(
                            "costData.cost.savaFue.pricingTable",
                            idx
                          )
                        }
                        className="bg-red-500 text-white rounded px-2 py-1"
                      >
                        ×
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ---------------- COST SECTIONS QHT ---------------- */}
          <div className="border border-gray-300 bg-gray-100 p-3 mb-4">
            <h2 className="block text-lg font-semibold mb-2">Cost - QHT</h2>

            <textarea
              placeholder="QHT Description"
              value={form.costData.cost.qht.description}
              onChange={(e) =>
                handleNested("cost.qht.description", e.target.value)
              }
              className="border border-gray-300 rounded bg-white p-2 w-full mb-4"
            />

            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 bg-white p-2">
                    <input
                      type="text"
                      placeholder="Level"
                      value={form.costData.cost.qht.headers?.level || "Level"}
                      onChange={(e) =>
                        handleNested("cost.qht.headers.level", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded p-1"
                    />
                  </th>
                  <th className="border border-gray-300 bg-white p-2">
                    <input
                      type="text"
                      placeholder="Grafts"
                      value={form.costData.cost.qht.headers?.grafts || "Grafts"}
                      onChange={(e) =>
                        handleNested("cost.qht.headers.grafts", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded p-1"
                    />
                  </th>
                  <th className="border border-gray-300 bg-white p-2">
                    <input
                      type="text"
                      placeholder="Cost"
                      value={form.costData.cost.qht.headers?.cost || "Cost"}
                      onChange={(e) =>
                        handleNested("cost.qht.headers.cost", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded p-1"
                    />
                  </th>
                  <th className="border border-gray-300 bg-white p-2 flex justify-center items-center">
                    <button
                      type="button"
                      onClick={() =>
                        addToArray("costData.cost.qht.pricingTable", {
                          level: "",
                          grafts: "",
                          cost: "",
                        })
                      }
                      className="px-4 py-2 text-white rounded bg-[#333c29]"
                    >
                      +
                    </button>
                  </th>
                </tr>
              </thead>

              <tbody>
                {form.costData.cost.qht.pricingTable.map((row, idx) => (
                  <tr key={idx}>
                    <td className="border border-gray-300 bg-white p-2">
                      <input
                        placeholder="Level"
                        value={row.level}
                        onChange={(e) =>
                          handleNested(
                            `cost.qht.pricingTable.${idx}.level`,
                            e.target.value
                          )
                        }
                        className="w-full border border-gray-300 rounded p-1"
                      />
                    </td>
                    <td className="border border-gray-300 bg-white p-2">
                      <input
                        placeholder="Grafts"
                        value={row.grafts}
                        onChange={(e) =>
                          handleNested(
                            `cost.qht.pricingTable.${idx}.grafts`,
                            e.target.value
                          )
                        }
                        className="w-full border border-gray-300 rounded p-1"
                      />
                    </td>
                    <td className="border border-gray-300 bg-white p-2">
                      <input
                        placeholder="Cost"
                        value={row.cost}
                        onChange={(e) =>
                          handleNested(
                            `cost.qht.pricingTable.${idx}.cost`,
                            e.target.value
                          )
                        }
                        className="w-full border border-gray-300 rounded p-1"
                      />
                    </td>
                    <td className="border border-gray-300 bg-white p-2 text-center">
                      <button
                        type="button"
                        onClick={() =>
                          removeFromArray("costData.cost.qht.pricingTable", idx)
                        }
                        className="bg-red-500 text-white rounded px-2 py-1"
                      >
                        ×
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ---------------- QHT vs Delhi/Mumbai ---------------- */}
          <div className="border border-gray-300 bg-gray-100 p-3 mb-4">
            <h2 className="block text-lg font-semibold mb-2">
              QHT vs Delhi/Mumbai
            </h2>

            <input
              placeholder="Heading"
              value={form.costData.qhtVsDelhiMumbai.heading}
              onChange={(e) =>
                handleNested("qhtVsDelhiMumbai.heading", e.target.value)
              }
              className="border border-gray-300 rounded bg-white p-2 w-full mb-2"
            />

            <textarea
              placeholder="Description"
              value={form.costData.qhtVsDelhiMumbai.description}
              onChange={(e) =>
                handleNested("qhtVsDelhiMumbai.description", e.target.value)
              }
              className="border border-gray-300 rounded bg-white p-2 w-full mb-4"
            />

            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 bg-white p-2">
                    <input
                      type="text"
                      placeholder="Metric"
                      value={
                        form.costData.qhtVsDelhiMumbai.headers?.metric ||
                        "Metric"
                      }
                      onChange={(e) =>
                        handleNested(
                          "qhtVsDelhiMumbai.headers.metric",
                          e.target.value
                        )
                      }
                      className="w-full border border-gray-300 rounded p-1"
                    />
                  </th>
                  <th className="border border-gray-300 bg-white p-2">
                    <input
                      type="text"
                      placeholder="QHT"
                      value={
                        form.costData.qhtVsDelhiMumbai.headers?.qht || "QHT"
                      }
                      onChange={(e) =>
                        handleNested(
                          "qhtVsDelhiMumbai.headers.qht",
                          e.target.value
                        )
                      }
                      className="w-full border border-gray-300 rounded p-1"
                    />
                  </th>
                  <th className="border border-gray-300 bg-white p-2">
                    <input
                      type="text"
                      placeholder="Delhi"
                      value={
                        form.costData.qhtVsDelhiMumbai.headers?.delhi || "Delhi"
                      }
                      onChange={(e) =>
                        handleNested(
                          "qhtVsDelhiMumbai.headers.delhi",
                          e.target.value
                        )
                      }
                      className="w-full border border-gray-300 rounded p-1"
                    />
                  </th>
                  <th className="border border-gray-300 bg-white p-2">
                    <input
                      type="text"
                      placeholder="Mumbai"
                      value={
                        form.costData.qhtVsDelhiMumbai.headers?.mumbai ||
                        "Mumbai"
                      }
                      onChange={(e) =>
                        handleNested(
                          "qhtVsDelhiMumbai.headers.mumbai",
                          e.target.value
                        )
                      }
                      className="w-full border border-gray-300 rounded p-1"
                    />
                  </th>
                  <th className="border border-gray-300 bg-white p-2 flex justify-center">
                    <button
                      type="button"
                      onClick={() =>
                        addToArray(
                          "costData.qhtVsDelhiMumbai.comparisonTable",
                          {
                            metric: "",
                            qht: "",
                            delhi: "",
                            mumbai: "",
                          }
                        )
                      }
                      className="px-4 py-1 text-white rounded bg-[#333c29]"
                    >
                      +
                    </button>
                  </th>
                </tr>
              </thead>

              <tbody>
                {form.costData.qhtVsDelhiMumbai.comparisonTable.map(
                  (row, idx) => (
                    <tr key={idx}>
                      <td className="border border-gray-300 bg-white p-2">
                        <input
                          placeholder="Metric"
                          value={row.metric}
                          onChange={(e) =>
                            handleNested(
                              `qhtVsDelhiMumbai.comparisonTable.${idx}.metric`,
                              e.target.value
                            )
                          }
                          className="w-full border border-gray-300 rounded p-1"
                        />
                      </td>
                      <td className="border border-gray-300 bg-white p-2">
                        <input
                          placeholder="QHT"
                          value={row.qht}
                          onChange={(e) =>
                            handleNested(
                              `qhtVsDelhiMumbai.comparisonTable.${idx}.qht`,
                              e.target.value
                            )
                          }
                          className="w-full border border-gray-300 rounded p-1"
                        />
                      </td>
                      <td className="border border-gray-300 bg-white p-2">
                        <input
                          placeholder="Delhi"
                          value={row.delhi}
                          onChange={(e) =>
                            handleNested(
                              `qhtVsDelhiMumbai.comparisonTable.${idx}.delhi`,
                              e.target.value
                            )
                          }
                          className="w-full border border-gray-300 rounded p-1"
                        />
                      </td>
                      <td className="border border-gray-300 bg-white p-2">
                        <input
                          placeholder="Mumbai"
                          value={row.mumbai}
                          onChange={(e) =>
                            handleNested(
                              `qhtVsDelhiMumbai.comparisonTable.${idx}.mumbai`,
                              e.target.value
                            )
                          }
                          className="w-full border border-gray-300 rounded p-1"
                        />
                      </td>
                      <td className="border border-gray-300 bg-white p-2 text-center">
                        <button
                          type="button"
                          onClick={() =>
                            removeFromArray(
                              "costData.qhtVsDelhiMumbai.comparisonTable",
                              idx
                            )
                          }
                          className="bg-red-500 text-white rounded px-2 py-1"
                        >
                          ×
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>

          {/* ---------------- Cost Comparison ---------------- */}
          <div className="border border-gray-300 bg-gray-100 p-3 mb-4">
            <h2 className="block text-lg font-semibold mb-2">
              Cost Comparison
            </h2>
            <input
              placeholder="Heading"
              value={form.costData.costComparison.heading}
              onChange={(e) =>
                handleNested("costComparison.heading", e.target.value)
              }
              className="border border-gray-300 rounded bg-white p-2 w-full mb-2"
            />
            <textarea
              placeholder="Description"
              value={form.costData.costComparison.description}
              onChange={(e) =>
                handleNested("costComparison.description", e.target.value)
              }
              className="border border-gray-300 rounded bg-white p-2 w-full mb-4"
            />

            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 bg-white p-2">
                    <input
                      type="text"
                      placeholder="Level"
                      value={
                        form.costData.costComparison.headers?.level || "Level"
                      }
                      onChange={(e) =>
                        handleNested(
                          "costComparison.headers.level",
                          e.target.value
                        )
                      }
                      className="w-full border border-gray-300 rounded p-1"
                    />
                  </th>
                  <th className="border border-gray-300 bg-white p-2">
                    <input
                      type="text"
                      placeholder="Grafts"
                      value={
                        form.costData.costComparison.headers?.grafts || "Grafts"
                      }
                      onChange={(e) =>
                        handleNested(
                          "costComparison.headers.grafts",
                          e.target.value
                        )
                      }
                      className="w-full border border-gray-300 rounded p-1"
                    />
                  </th>
                  <th className="border border-gray-300 bg-white p-2">
                    <input
                      type="text"
                      placeholder="QHT"
                      value={form.costData.costComparison.headers?.qht || "QHT"}
                      onChange={(e) =>
                        handleNested(
                          "costComparison.headers.qht",
                          e.target.value
                        )
                      }
                      className="w-full border border-gray-300 rounded p-1"
                    />
                  </th>
                  <th className="border border-gray-300 bg-white p-2">
                    <input
                      type="text"
                      placeholder="FUE"
                      value={form.costData.costComparison.headers?.fue || "FUE"}
                      onChange={(e) =>
                        handleNested(
                          "costComparison.headers.fue",
                          e.target.value
                        )
                      }
                      className="w-full border border-gray-300 rounded p-1"
                    />
                  </th>
                  <th className="border border-gray-300 bg-white p-2">
                    <input
                      type="text"
                      placeholder="DHI"
                      value={form.costData.costComparison.headers?.dhi || "DHI"}
                      onChange={(e) =>
                        handleNested(
                          "costComparison.headers.dhi",
                          e.target.value
                        )
                      }
                      className="w-full border border-gray-300 rounded p-1"
                    />
                  </th>
                  <th className="border border-gray-300 bg-white p-2 flex justify-center">
                    <button
                      type="button"
                      onClick={() =>
                        addToArray("costData.costComparison.comparisonTable", {
                          level: "",
                          grafts: "",
                          qht: "",
                          fue: "",
                          dhi: "",
                        })
                      }
                      className="px-4 py-1 text-white rounded bg-[#333c29]"
                    >
                      +
                    </button>
                  </th>
                </tr>
              </thead>

              <tbody>
                {form.costData.costComparison.comparisonTable.map(
                  (row, idx) => (
                    <tr key={idx}>
                      <td className="border border-gray-300 bg-white p-2">
                        <input
                          placeholder="Level"
                          value={row.level}
                          onChange={(e) =>
                            handleNested(
                              `costComparison.comparisonTable.${idx}.level`,
                              e.target.value
                            )
                          }
                          className="w-full border border-gray-300 rounded p-1"
                        />
                      </td>
                      <td className="border border-gray-300 bg-white p-2">
                        <input
                          placeholder="Grafts"
                          value={row.grafts}
                          onChange={(e) =>
                            handleNested(
                              `costComparison.comparisonTable.${idx}.grafts`,
                              e.target.value
                            )
                          }
                          className="w-full border border-gray-300 rounded p-1"
                        />
                      </td>
                      <td className="border border-gray-300 bg-white p-2">
                        <input
                          placeholder="QHT"
                          value={row.qht}
                          onChange={(e) =>
                            handleNested(
                              `costComparison.comparisonTable.${idx}.qht`,
                              e.target.value
                            )
                          }
                          className="w-full border border-gray-300 rounded p-1"
                        />
                      </td>
                      <td className="border border-gray-300 bg-white p-2">
                        <input
                          placeholder="FUE"
                          value={row.fue}
                          onChange={(e) =>
                            handleNested(
                              `costComparison.comparisonTable.${idx}.fue`,
                              e.target.value
                            )
                          }
                          className="w-full border border-gray-300 rounded p-1"
                        />
                      </td>
                      <td className="border border-gray-300 bg-white p-2">
                        <input
                          placeholder="DHI"
                          value={row.dhi}
                          onChange={(e) =>
                            handleNested(
                              `costComparison.comparisonTable.${idx}.dhi`,
                              e.target.value
                            )
                          }
                          className="w-full border border-gray-300 rounded p-1"
                        />
                      </td>
                      <td className="border border-gray-300 bg-white p-2 text-center">
                        <button
                          type="button"
                          onClick={() =>
                            removeFromArray(
                              "costData.costComparison.comparisonTable",
                              idx
                            )
                          }
                          className="bg-red-500 text-white rounded px-2 py-1"
                        >
                          ×
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>

          {/* ---------------- Solutions ---------------- */}
          <div className="border space-y-2 border-gray-300 bg-gray-100 p-3 mb-4">
            <div className="flex items-end justify-between gap-2">
              <h2 className="block text-lg font-semibold">Solutions</h2>
              <button
                type="button"
                onClick={() =>
                  addToArray("costData.solutions", { title: "", icon: "" })
                }
                className="px-4 py-2 text-white rounded bg-[#333c29]"
              >
                + Add Solution
              </button>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {form.costData.solutions.map((row, idx) => (
                <div
                  key={idx}
                  className="space-y-2 bg-white p-3 rounded border-gray-300 border"
                >
                  <div className="flex justify-between items-center gap-2">
                    <input
                      placeholder="Title"
                      value={row.title}
                      onChange={(e) =>
                        handleNested(`solutions.${idx}.title`, e.target.value)
                      }
                      className="border border-gray-300 rounded bg-white p-2 w-full"
                    />
                    <button
                      type="button"
                      onClick={() => removeFromArray("costData.solutions", idx)}
                      className="bg-red-500 text-white rounded w-8 py-2 flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                  <ImageUploader
                    value={row.icon}
                    onChange={(url) =>
                      handleNested(`solutions.${idx}.icon`, url)
                    }
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ---------------- Explore Locations City ---------------- */}
          <div className="border space-y-2 border-gray-300 bg-gray-100 p-3 mb-4">
            <div className="flex items-end justify-between gap-2">
              <h2 className="block text-lg font-semibold">
                Explore Locations - Cities
              </h2>
              <button
                type="button"
                onClick={() =>
                  addToArray("costData.exploreLocations.cities.list", {
                    name: "",
                    link: "",
                  })
                }
                className="px-4 py-2 text-white rounded bg-[#333c29]"
              >
                + Add City
              </button>
            </div>
            <input
              placeholder="Heading"
              value={form.costData.exploreLocations.cities.heading}
              onChange={(e) =>
                handleNested("exploreLocations.cities.heading", e.target.value)
              }
              className="border border-gray-300 rounded bg-white p-2 w-full"
            />
            <textarea
              placeholder="Description"
              value={form.costData.exploreLocations.cities.description}
              onChange={(e) =>
                handleNested(
                  "exploreLocations.cities.description",
                  e.target.value
                )
              }
              className="border border-gray-300 rounded bg-white p-2 w-full"
            />

            <div className="grid grid-cols-6 gap-2">
              {form.costData.exploreLocations.cities.list.map((row, idx) => (
                <div
                  key={idx}
                  className="space-y-2 bg-white p-3 rounded border-gray-300 border"
                >
                  <div className="flex items-start justify-between gap-2">
                    <input
                      placeholder="Name"
                      value={row.name}
                      onChange={(e) =>
                        handleNested(
                          `exploreLocations.cities.list.${idx}.name`,
                          e.target.value
                        )
                      }
                      className="border border-gray-300 rounded bg-white p-2 w-full"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        removeFromArray(
                          "costData.exploreLocations.cities.list",
                          idx
                        )
                      }
                      className="bg-red-500 text-white rounded w-8 py-2 flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                  <input
                    placeholder="Link"
                    value={row.link}
                    onChange={(e) =>
                      handleNested(
                        `exploreLocations.cities.list.${idx}.link`,
                        e.target.value
                      )
                    }
                    className="border border-gray-300 rounded bg-white p-2 w-full"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ---------------- Explore Locations Country ---------------- */}
          <div className="border space-y-2 border-gray-300 bg-gray-100 p-3 mb-4">
            <div className="flex items-end justify-between gap-2">
              <h2 className="block text-lg font-semibold">
                Explore Locations - Countries
              </h2>
              <button
                type="button"
                onClick={() =>
                  addToArray("costData.exploreLocations.countries.list", {
                    name: "",
                    link: "",
                  })
                }
                className="px-4 py-2 text-white rounded bg-[#333c29]"
              >
                + Add Country
              </button>
            </div>
            <input
              placeholder="Heading"
              value={form.costData.exploreLocations.countries.heading}
              onChange={(e) =>
                handleNested(
                  "exploreLocations.countries.heading",
                  e.target.value
                )
              }
              className="border border-gray-300 rounded bg-white p-2 w-full"
            />
            <textarea
              placeholder="Description"
              value={form.costData.exploreLocations.countries.description}
              onChange={(e) =>
                handleNested(
                  "exploreLocations.countries.description",
                  e.target.value
                )
              }
              className="border border-gray-300 rounded bg-white p-2 w-full"
            />
            <div className="grid grid-cols-6 gap-2">
              {form.costData.exploreLocations.countries.list.map((row, idx) => (
                <div
                  key={idx}
                  className="space-y-2 bg-white p-3 rounded border-gray-300 border"
                >
                  <div className="flex items-start justify-between gap-2">
                    <input
                      placeholder="Name"
                      value={row.name}
                      onChange={(e) =>
                        handleNested(
                          `exploreLocations.countries.list.${idx}.name`,
                          e.target.value
                        )
                      }
                      className="border border-gray-300 rounded bg-white p-2 w-full"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        removeFromArray(
                          "costData.exploreLocations.countries.list",
                          idx
                        )
                      }
                      className="bg-red-500 text-white rounded w-8 py-2 flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                  <input
                    placeholder="Link"
                    value={row.link}
                    onChange={(e) =>
                      handleNested(
                        `exploreLocations.countries.list.${idx}.link`,
                        e.target.value
                      )
                    }
                    className="border border-gray-300 rounded bg-white p-2 w-full"
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="px-4 py-2 text-white rounded bg-[#333c29]"
            >
              Save
            </button>
          </div>
        </form>
      )}

      {!showForm && (
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
          {costPages.map((page) => (
            <div
              key={page._id}
              className="border p-4 rounded shadow flex justify-between items-center border border-gray-300 rounded bg-white p-2 w-full"
            >
              <div>
                <h3 className="font-bold">{page.slug}</h3>
                <p className="text-xs text-gray-500">{page.metaTitle}</p>
              </div>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleEdit(page)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(page._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
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

export default CostPagesAdmin;
