import React, { useEffect, useState } from "react";

const FooterAdmin = () => {
  const [footer, setFooter] = useState({
    branches: [{ title: "", addresses: [{ address: "", mapLink: "" }] }],
    contact: { phone: "", email: "" },
    socialLinks: { instagram: "", facebook: "", linkedin: "" },
    services: [{ title: "", url: "" }],
    companyLinks: [{ title: "", url: "" }],
    cities: [{ title: "", url: "" }],
    countries: [{ title: "", url: "" }],
    copyright: "",
  });

  const [id, setId] = useState("");
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API}/footer`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setFooter(data);
          setId(data._id);
        }
      });
  }, []);

  const handleNestedChange = (section, field, value) => {
    setFooter({
      ...footer,
      [section]: { ...footer[section], [field]: value },
    });
  };

  const handleArrayItemChange = (section, index, field, value) => {
    const arr = [...footer[section]];
    arr[index][field] = value;
    setFooter({ ...footer, [section]: arr });
  };

  const addArrayItem = (section) => {
    setFooter({
      ...footer,
      [section]: [...footer[section], { title: "", url: "" }],
    });
  };

  const removeArrayItem = (section, index) => {
    const arr = [...footer[section]];
    arr.splice(index, 1);
    setFooter({ ...footer, [section]: arr });
  };

  const handleBranchTitle = (index, value) => {
    const arr = [...footer.branches];
    arr[index].title = value;
    setFooter({ ...footer, branches: arr });
  };

  const handleBranchAddressChange = (branchIdx, addrIdx, field, value) => {
    const arr = [...footer.branches];
    arr[branchIdx].addresses[addrIdx][field] = value;
    setFooter({ ...footer, branches: arr });
  };

  const addBranch = () => {
    setFooter({
      ...footer,
      branches: [
        ...footer.branches,
        { title: "", addresses: [{ address: "", mapLink: "" }] },
      ],
    });
  };

  const removeBranch = (index) => {
    const arr = [...footer.branches];
    arr.splice(index, 1);
    setFooter({ ...footer, branches: arr });
  };

  const addBranchAddress = (branchIdx) => {
    const arr = [...footer.branches];
    arr[branchIdx].addresses.push({ address: "", mapLink: "" });
    setFooter({ ...footer, branches: arr });
  };

  const removeBranchAddress = (branchIdx, addrIdx) => {
    const arr = [...footer.branches];
    arr[branchIdx].addresses.splice(addrIdx, 1);
    setFooter({ ...footer, branches: arr });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = id ? "PUT" : "POST";
    const url = id ? `${API}/footer/${id}` : `${API}/footer`;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(footer),
    });

    alert("✅ Footer saved!");
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex justify-between items-end">
          <h2 className="text-2xl font-semibold">Manage Footer</h2>
          <button
            type="submit"
            className="bg-[#333c29] px-5 py-2 text-white rounded"
          >
            Save
          </button>
        </div>
        {/* Contact */}
        <div className="border space-y-2 border-gray-300 bg-gray-100 p-3 mb-2">
          <input
            placeholder="Phone"
            value={footer.contact.phone}
            onChange={(e) =>
              handleNestedChange("contact", "phone", e.target.value)
            }
            className="border border-gray-300 rounded bg-white p-2 w-full"
          />
          <input
            placeholder="Email"
            value={footer.contact.email}
            onChange={(e) =>
              handleNestedChange("contact", "email", e.target.value)
            }
            className="border border-gray-300 rounded bg-white p-2 w-full"
          />

          {/* Social */}
          <input
            placeholder="Instagram"
            value={footer.socialLinks.instagram}
            onChange={(e) =>
              handleNestedChange("socialLinks", "instagram", e.target.value)
            }
            className="border border-gray-300 rounded bg-white p-2 w-full"
          />

          <input
            placeholder="Facebook"
            value={footer.socialLinks.facebook}
            onChange={(e) =>
              handleNestedChange("socialLinks", "facebook", e.target.value)
            }
            className="border border-gray-300 rounded bg-white p-2 w-full"
          />

          <input
            placeholder="LinkedIn"
            value={footer.socialLinks.linkedin}
            onChange={(e) =>
              handleNestedChange("socialLinks", "linkedin", e.target.value)
            }
            className="border border-gray-300 rounded bg-white p-2 w-full"
          />
        </div>

        {/* Branches */}
        <div>
          <div className="flex justify-between items-end mt-4 mb-2">
            <h2 className="font-semibold text-xl">Branches</h2>
            <button
              type="button"
              onClick={addBranch}
              className="bg-[#333c29] text-white px-3 py-2 rounded cursor-pointer"
            >
              + Add Branch
            </button>
          </div>
          {footer.branches.map((b, i) => (
            <div
              key={i}
              className="border space-y-2 border-gray-300 bg-gray-100 p-3 mb-2"
            >
              <input
                placeholder="Branch Title"
                value={b.title}
                onChange={(e) => handleBranchTitle(i, e.target.value)}
                className="border border-gray-300 rounded bg-white p-2 w-full"
              />

              {b.addresses.map((addr, j) => (
                <div
                  key={j}
                  className="flex justify-between items-center space-y-2 mb-2"
                >
                  <div className="w-19/20 space-y-2">
                    <input
                      placeholder="Address"
                      value={addr.address}
                      onChange={(e) =>
                        handleBranchAddressChange(
                          i,
                          j,
                          "address",
                          e.target.value
                        )
                      }
                      className="border border-gray-300 rounded bg-white p-2 w-full"
                    />
                    <input
                      placeholder="Google Map Link"
                      value={addr.mapLink}
                      onChange={(e) =>
                        handleBranchAddressChange(
                          i,
                          j,
                          "mapLink",
                          e.target.value
                        )
                      }
                      className="border border-gray-300 rounded bg-white p-2 w-full"
                    />
                  </div>
                  <div className="w-1/20 flex justify-center items-center">
                    <button
                      type="button"
                      onClick={() => removeBranchAddress(i, j)}
                      className="bg-red-600 text-white px-3 py-1 text-xl rounded-full cursor-pointer"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addBranchAddress(i)}
                className="bg-[#333c29] text-white px-3 py-2 rounded cursor-pointer"
              >
                + Add Address
              </button>
              <button
                type="button"
                onClick={() => removeBranch(i)}
                className="bg-red-600 text-white px-3 py-2 rounded ml-4 cursor-pointer"
              >
                Remove Address
              </button>
            </div>
          ))}
        </div>

        {/* Repeatables */}
        {["services", "companyLinks", "cities", "countries"].map((section) => (
          <div key={section}>
            <div className="flex justify-between items-end mt-4 mb-2">
              <h2 className="font-semibold text-xl capitalize">{section}</h2>
              <button
                type="button"
                onClick={() => addArrayItem(section)}
                className="bg-[#333c29] text-white px-3 py-2 rounded cursor-pointer"
              >
                + Add {section}
              </button>
            </div>
            {/* <h2>{section}</h2> */}
            <div className="border space-y-2 border-gray-300 bg-gray-100 p-3 mb-2">
              {footer[section].map((item, i) => (
                <div key={i} className="flex gap-2 mb-1">
                  <input
                    placeholder="Title"
                    value={item.title}
                    onChange={(e) =>
                      handleArrayItemChange(section, i, "title", e.target.value)
                    }
                    className="border border-gray-300 rounded bg-white p-2 w-full"
                  />
                  <input
                    placeholder="URL"
                    value={item.url}
                    onChange={(e) =>
                      handleArrayItemChange(section, i, "url", e.target.value)
                    }
                    className="border border-gray-300 rounded bg-white p-2 w-full"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem(section, i)}
                    className="bg-red-500 rounded text-white px-3"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="border space-y-2 border-gray-300 bg-gray-100 p-3 mb-2">
          <input
            placeholder="Copyright"
            value={footer.copyright}
            onChange={(e) =>
              setFooter({ ...footer, copyright: e.target.value })
            }
            className="border border-gray-300 rounded bg-white p-2 w-full"
          />
        </div>
      </form>
    </div>
  );
};

export default FooterAdmin;
