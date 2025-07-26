import React, { useEffect, useState } from "react";
import ImageUploader from "../components/ImageUploader";

const ContactUs = () => {
  const API = import.meta.env.VITE_API_URL;

  const [contactData, setContactData] = useState({
    banner: { title: "", subtitle: "", bgImage: "" },
    badges: [],
    contactInfo: {
      heading: "",
      description: "",
      email: "",
      phoneNumbers: [],
      socialMedia: [],
    },
    clinics: [],
    clinicSection: { heading: "", description: "" },
  });

  // LOAD
  useEffect(() => {
    fetch(`${API}/contact`)
      .then((res) => res.json())
      .then((data) => {
        setContactData(data.contactData);
        console.log(data);
      });
  }, []);

  // HANDLERS
  const updateBanner = (e) => {
    const { name, value } = e.target;
    setContactData((prev) => ({
      ...prev,
      banner: { ...prev.banner, [name]: value },
    }));
  };

  const updateContactInfo = (e) => {
    const { name, value } = e.target;
    setContactData((prev) => ({
      ...prev,
      contactInfo: { ...prev.contactInfo, [name]: value },
    }));
  };

  const updateClinicSection = (e) => {
    const { name, value } = e.target;
    setContactData((prev) => ({
      ...prev,
      clinicSection: { ...prev.clinicSection, [name]: value },
    }));
  };

  // BADGES
  const addBadge = () =>
    setContactData((prev) => ({
      ...prev,
      badges: [...prev.badges, { icon: "", title: "" }],
    }));

  const updateBadge = (i, field, value) => {
    const updated = [...contactData.badges];
    updated[i][field] = value;
    setContactData((prev) => ({ ...prev, badges: updated }));
  };

  const removeBadge = (i) =>
    setContactData((prev) => ({
      ...prev,
      badges: prev.badges.filter((_, idx) => idx !== i),
    }));

  // SOCIAL MEDIA
  const addSocial = () =>
    setContactData((prev) => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo,
        socialMedia: [
          ...(prev.contactInfo.socialMedia || []),
          { platform: "", url: "", icon: "" },
        ],
      },
    }));

  const updateSocial = (i, field, value) => {
    const updated = [...(contactData.contactInfo.socialMedia || [])];
    updated[i][field] = value;
    setContactData((prev) => ({
      ...prev,
      contactInfo: { ...prev.contactInfo, socialMedia: updated },
    }));
  };

  const removeSocial = (i) =>
    setContactData((prev) => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo,
        socialMedia: prev.contactInfo.socialMedia.filter((_, idx) => idx !== i),
      },
    }));

  // CLINICS
  const addClinic = () =>
    setContactData((prev) => ({
      ...prev,
      clinics: [
        ...prev.clinics,
        { city: "", address: "", contact: "", icon: "", mapLink: "" },
      ],
    }));

  const updateClinic = (i, field, value) => {
    const updated = [...contactData.clinics];
    updated[i][field] = value;
    setContactData((prev) => ({ ...prev, clinics: updated }));
  };

  const removeClinic = (i) =>
    setContactData((prev) => ({
      ...prev,
      clinics: prev.clinics.filter((_, idx) => idx !== i),
    }));

  // PHONES
  const updatePhone = (i, value) => {
    const updated = [...contactData.contactInfo.phoneNumbers];
    updated[i] = value;
    setContactData((prev) => ({
      ...prev,
      contactInfo: { ...prev.contactInfo, phoneNumbers: updated },
    }));
  };

  const addPhone = () =>
    setContactData((prev) => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo,
        phoneNumbers: [...prev.contactInfo.phoneNumbers, ""],
      },
    }));

  const removePhone = (i) =>
    setContactData((prev) => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo,
        phoneNumbers: prev.contactInfo.phoneNumbers.filter(
          (_, idx) => idx !== i
        ),
      },
    }));

  // SAVE
  const handleSave = async () => {
    const exists = await fetch(`${API}/contact`).then((r) => r.json());
    const method = exists?.contactData ? "PUT" : "POST";
    await fetch(`${API}/contact`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contactData }),
    });
    alert("Saved!");
  };

  return (
    <div>
      <div className="flex justify-between items-end mb-2">
        <h2 className="text-2xl font-semibold">Manage Contact Page</h2>
        <button
          onClick={handleSave}
          className="px-4 py-2 text-white rounded bg-[#333c29]"
        >
          Save Changes
        </button>
      </div>

      {/* Banner */}
      <div className="border space-y-2 border-gray-300 bg-gray-100 p-3 mb-4">
        <div className="flex justify-between gap-3 items-start">
          <div className="space-y-4 w-2/3">
            <h2 className="block mb-1 text-lg font-semibold">Banner</h2>
            <input
              type="text"
              name="title"
              value={contactData.banner.title}
              onChange={updateBanner}
              placeholder="Title"
              className="border border-gray-300 rounded bg-white p-2 w-full"
            />
            <input
              type="text"
              name="subtitle"
              value={contactData.banner.subtitle}
              onChange={updateBanner}
              placeholder="Subtitle"
              className="border border-gray-300 rounded bg-white p-2 w-full"
            />
          </div>
          <div className=" w-1/3">
            <ImageUploader
              label="Background Image"
              value={contactData.banner.bgImage}
              onChange={(url) =>
                setContactData((prev) => ({
                  ...prev,
                  banner: { ...prev.banner, bgImage: url },
                }))
              }
            />
          </div>
        </div>
      </div>

      {/* Badges */}
      <div className="border space-y-2 border-gray-300 bg-gray-100 p-3 mb-4">
        <div className="flex justify-between items-end">
          <h2 className="block mb-1 text-lg font-semibold">Badges</h2>
          <button
            onClick={addBadge}
            className="px-4 py-2 text-white rounded bg-[#333c29]"
          >
            + Add Badge
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {contactData.badges.map((b, i) => (
            <div key={i} className="gap-2 mb-2">
              <ImageUploader
                value={b.icon}
                onChange={(url) => updateBadge(i, "icon", url)}
              />
              <input
                type="text"
                value={b.title}
                onChange={(e) => updateBadge(i, "title", e.target.value)}
                placeholder="Title"
                className="border border-gray-300 mt-2 rounded bg-white p-2 w-full"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Contact Info */}
      <div className="border space-y-2 border-gray-300 bg-gray-100 p-3 mb-4">
        <h2 className="block mb-1 text-lg font-semibold">Contact Info</h2>
        <input
          type="text"
          name="heading"
          value={contactData.contactInfo.heading}
          onChange={updateContactInfo}
          placeholder="Heading"
          className="border border-gray-300 rounded bg-white p-2 w-full"
        />
        <textarea
          name="description"
          value={contactData.contactInfo.description}
          onChange={updateContactInfo}
          placeholder="Description"
          className="border border-gray-300 rounded bg-white p-2 w-full"
        />
        <input
          type="email"
          name="email"
          value={contactData.contactInfo.email}
          onChange={updateContactInfo}
          placeholder="Email"
          className="border border-gray-300 rounded bg-white p-2 w-full"
        />

        {/* Phones */}
        {contactData.contactInfo.phoneNumbers?.map((p, i) => (
          <div key={i} className="flex mb-2 gap-2">
            <input
              type="text"
              value={p}
              onChange={(e) => updatePhone(i, e.target.value)}
              placeholder="Phone"
              className="border border-gray-300 rounded bg-white p-2 w-full"
            />
            <button
              onClick={() => removePhone(i)}
              className="bg-red-500 text-white px-2"
            >
              ✕
            </button>
          </div>
        ))}
        <button
          onClick={addPhone}
          className="px-4 py-2 text-white rounded bg-[#333c29]"
        >
          + Add Phone
        </button>

        {/* Social */}
        <div className="flex items-end justify-between">
          <h2 className="block mb-1 text-lg font-semibold">Social Media</h2>
          <button
            onClick={addSocial}
            className="px-4 py-2 text-white rounded bg-[#333c29]"
          >
            + Add Social
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {contactData.contactInfo.socialMedia?.map((s, i) => (
            <div
              key={i}
              className="space-y-2 bg-white p-3 rounded border-gray-300 border"
            >
              <ImageUploader
                value={s.icon}
                onChange={(url) => updateSocial(i, "icon", url)}
              />
              <input
                type="text"
                value={s.platform}
                onChange={(e) => updateSocial(i, "platform", e.target.value)}
                placeholder="Platform"
                className="border border-gray-300 rounded bg-white p-2 w-full"
              />
              <div className="flex justify-between items-center gap-2">
                <input
                  type="text"
                  value={s.url}
                  onChange={(e) => updateSocial(i, "url", e.target.value)}
                  placeholder="URL"
                  className="border border-gray-300 rounded bg-white p-2 w-full"
                />
                <button
                  onClick={() => removeSocial(i)}
                  className="bg-red-600 text-white px-3 py-2 rounded"
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Clinics */}
      <div className="border space-y-2 border-gray-300 bg-gray-100 p-3 mb-4">
        <div className="flex justify-between items-end">
          <h2 className="block text-lg font-semibold">Locate Our Clinics</h2>
          <button
            onClick={addClinic}
            className="px-4 py-2 text-white rounded bg-[#333c29]"
          >
            + Add Clinic
          </button>
        </div>

        <input
          type="text"
          name="heading"
          value={contactData.clinicSection.heading}
          onChange={updateClinicSection}
          placeholder="Heading"
          className="border border-gray-300 rounded bg-white p-2 w-full"
        />
        <textarea
          name="description"
          value={contactData.clinicSection.description}
          onChange={updateClinicSection}
          placeholder="Description"
          className="border border-gray-300 rounded bg-white p-2 w-full"
        />
        <div className="grid grid-cols-3 gap-4">
          {contactData.clinics.map((c, i) => (
            <div
              key={i}
              className="space-y-2 bg-white p-3 rounded border-gray-300 border"
            >
              <ImageUploader
                value={c.icon}
                onChange={(url) => updateClinic(i, "icon", url)}
              />
              <input
                type="text"
                value={c.city}
                onChange={(e) => updateClinic(i, "city", e.target.value)}
                placeholder="City"
                className="border border-gray-300 rounded bg-white p-2 w-full"
              />
              <input
                type="text"
                value={c.address}
                onChange={(e) => updateClinic(i, "address", e.target.value)}
                placeholder="Address"
                className="border border-gray-300 rounded bg-white p-2 w-full"
              />
              <input
                type="text"
                value={c.mapLink}
                onChange={(e) => updateClinic(i, "mapLink", e.target.value)}
                placeholder="Map Link"
                className="border border-gray-300 rounded bg-white p-2 w-full"
              />
              <div className="flex justify-between gap-2 items-center">
                <input
                  type="text"
                  value={c.contact}
                  onChange={(e) => updateClinic(i, "contact", e.target.value)}
                  placeholder="Contact"
                  className="border border-gray-300 rounded bg-white p-2 w-full"
                />
                <button
                  onClick={() => removeClinic(i)}
                  className="bg-red-600 text-white px-3 py-2 rounded"
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

export default ContactUs;
