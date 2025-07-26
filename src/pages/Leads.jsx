import React, { useEffect, useState } from "react";
import { FiRefreshCw } from "react-icons/fi"; // React Icons spinner

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    setLoading(true); // ✅ Make sure to set loading true on click
    try {
      const res = await fetch(`${API_URL}/leads/all`);
      const data = await res.json();
      setLeads(data);
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Manage Leads</h2>
        <button
          onClick={fetchLeads}
          disabled={loading}
          className={`flex items-center gap-2 bg-[#333c29] text-white px-4 py-2 rounded transition ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#222]"
          }`}
        >
          Refresh
          <FiRefreshCw
            className={`${loading ? "animate-spin" : ""}`}
            size={18}
          />
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div id="Leads" className="overflow-x-auto w-full max-w-[90vw]">
          <table className="min-w-max w-full bg-white border border-gray-200 shadow-md rounded">
            <thead className="bg-gray-100">
              <tr className="text-left text-xs font-semibold uppercase tracking-wider">
                {[
                  "Name",
                  "Phone",
                  "Email",
                  "City",
                  "UTM Source",
                  "UTM Medium",
                  "UTM Campaign",
                  "UTM Content",
                  "Campaign ID",
                  "GCLID",
                  "Created At",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="py-3 px-4 border-b border-gray-300 w-[200px]"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {leads.length === 0 ? (
                <tr>
                  <td
                    colSpan="11"
                    className="py-4 px-4 text-center border-b border-gray-300"
                  >
                    No leads found.
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead._id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b border-gray-200 w-[200px]">
                      {lead.firstName} {lead.lastName}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200 w-[200px]">
                      {lead.phone}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200 w-[200px]">
                      {lead.email || "-"}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200 w-[200px]">
                      {lead.city}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200 w-[200px]">
                      {lead.utmParams?.utm_source || "-"}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200 w-[200px]">
                      {lead.utmParams?.utm_medium || "-"}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200 w-[200px]">
                      {lead.utmParams?.utm_campaign || "-"}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200 w-[200px]">
                      {lead.utmParams?.utm_content || "-"}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200 w-[200px]">
                      {lead.utmParams?.campaign_id || "-"}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200 w-[200px]">
                      {lead.utmParams?.GCLid || "-"}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200 w-[200px]">
                      {new Date(lead.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Leads;
