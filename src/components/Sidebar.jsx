// src/components/Sidebar.jsx

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HiHome,
  HiInformationCircle,
  HiCog,
  HiCurrencyDollar,
  HiGlobe,
  HiNewspaper,
  HiOfficeBuilding,
  HiMap,
  HiChat,
  HiLockClosed,
  HiClipboardCheck,
  HiChevronUp,
  HiChevronDown,
} from "react-icons/hi";

import {
  FiLayout,
  FiBox,
  FiHelpCircle,
  FiStar,
  FiVideo,
  FiUsers,
  FiLogOut,
  FiImage,
} from "react-icons/fi";

export default function Sidebar({ isCollapsed, setIsCollapsed }) {
  const location = useLocation();
  const [isPagesOpen, setPagesOpen] = useState(true);
  const [isComponentsOpen, setComponentsOpen] = useState(true);
  const [userRole, setUserRole] = useState("admin");

  // ✅ LocalStorage se role load karo
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUserRole(parsed.role || "admin");
      } catch (err) {
        console.error("Sidebar role parse failed:", err);
      }
    }
  }, []);

  const pages = [
    { to: "/", label: "Home", icon: <HiHome /> },
    { to: "/about-us", label: "About Us", icon: <HiInformationCircle /> },
    { to: "/services", label: "Services", icon: <HiCog /> },
    { to: "/cost", label: "Cost", icon: <HiCurrencyDollar /> },
    { to: "/country", label: "Country", icon: <HiGlobe /> },
    { to: "/city", label: "City", icon: <HiOfficeBuilding /> },
    { to: "/blogs", label: "Blogs", icon: <HiNewspaper /> },
    { to: "/our-clinic", label: "Our Clinic", icon: <HiOfficeBuilding /> },
    { to: "/medical-tourism", label: "Medical Tourism", icon: <HiMap /> },
    { to: "/contact-us", label: "Contact Us", icon: <HiChat /> },
    { to: "/privacy-policy", label: "Privacy Policy", icon: <HiLockClosed /> },
    { to: "/payment-tc", label: "Payment T&C", icon: <HiCurrencyDollar /> },
    { to: "/career", label: "Career", icon: <HiClipboardCheck /> },
  ];

  const components = [
    { to: "/users", label: "Users", icon: <FiLayout /> },
    { to: "#", label: "Header", icon: <FiLayout /> },
    { to: "/footer", label: "Footer", icon: <FiBox /> },
    { to: "/results", label: "Results", icon: <HiClipboardCheck /> },
    { to: "/faqs", label: "FAQ", icon: <FiHelpCircle /> },
    { to: "/testimonials", label: "Testimonials", icon: <FiStar /> },
    { to: "/videos", label: "Videos", icon: <FiVideo /> },
    { to: "/media", label: "Media", icon: <FiImage /> },
    { to: "/leads", label: "Leads", icon: <FiUsers /> },
  ];

  // ✅ Role-based filter
  let visiblePages = pages;
  let visibleComponents = components;

  if (userRole === "blogger") {
    visiblePages = pages.filter((p) => p.to === "/blogs");
    visibleComponents = [];
  }

  if (userRole === "editor") {
    visibleComponents = components.filter(
      (c) => c.to !== "/users" && c.to !== "/leads"
    );
  }

  if (userRole === "recruiter") {
    visiblePages = pages.filter((p) => p.to === "/career");
    visibleComponents = [];
  }

  // ✅ Render
  return (
    <aside
      className={`${
        isCollapsed ? "w-20" : "w-64"
      } bg-[#333c29] text-white flex flex-col fixed top-0 left-0 h-screen transition-all duration-300`}
    >
      {/* Logo */}
      <div className="h-16 flex justify-center items-center border-b border-gray-400 sticky top-0 bg-[#333c29] z-10 overflow-hidden">
        <img
          src="https://qhtclinic.com/wp-content/uploads/2024/04/qht-logo-final.png"
          className={`h-12 object-cover object-left transition-all duration-300 ${
            isCollapsed ? "ml-10" : "ml-0"
          }`}
          alt="QHT Logo"
        />
      </div>

      {/* Scrollable Content */}
      <nav className="flex-1 overflow-y-auto">
        {/* Pages */}
        <div className="p-4">
          <div
            className="flex justify-between items-center cursor-pointer mb-2"
            onClick={() => setPagesOpen(!isPagesOpen)}
          >
            <h2 className="text-lg font-semibold">
              {isCollapsed ? "" : "Pages"}
            </h2>
            {isCollapsed ? null : isPagesOpen ? (
              <HiChevronUp />
            ) : (
              <HiChevronDown />
            )}
          </div>

          {isPagesOpen && (
            <ul className="space-y-2">
              {visiblePages.map((item) => {
                const isActive = location.pathname === item.to;
                return (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className={`flex items-center gap-2 px-2 py-2 rounded transition ${
                        isActive ? "bg-[#586548]" : "hover:bg-[#586548]"
                      }`}
                    >
                      <span className="text-xl">{item.icon}</span>
                      {!isCollapsed && item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Components */}
        {visibleComponents.length > 0 && (
          <div className="p-4 border-t border-gray-700">
            <div
              className="flex justify-between items-center cursor-pointer mb-2"
              onClick={() => setComponentsOpen(!isComponentsOpen)}
            >
              <h2 className="text-lg font-semibold">
                {isCollapsed ? "" : "Components"}
              </h2>
              {isCollapsed ? null : isComponentsOpen ? (
                <HiChevronUp />
              ) : (
                <HiChevronDown />
              )}
            </div>

            {isComponentsOpen && (
              <ul className="space-y-2">
                {visibleComponents.map((item) => {
                  const isActive = location.pathname === item.to;
                  return (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        className={`flex items-center gap-2 px-2 py-2 rounded transition ${
                          isActive ? "bg-[#586548]" : "hover:bg-[#586548]"
                        }`}
                      >
                        <span className="text-xl">{item.icon}</span>
                        {!isCollapsed && item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        )}
      </nav>

      {/* Collapse Toggle */}
      <div
        className="p-2 flex justify-center items-center cursor-pointer border-t border-gray-700 hover:bg-[#586548]"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? (
          <FiLogOut className="transition-transform duration-200" />
        ) : (
          <FiLogOut className="transform rotate-180 transition-transform duration-200" />
        )}
      </div>
    </aside>
  );
}
