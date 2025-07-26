import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { FiChevronDown, FiLogOut } from "react-icons/fi";

export default function Header({ isCollapsed }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState({
    name: "Admin",
    email: "admin@example.com",
    profilePicture:
      "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
    role: "admin",
  });

  const dropdownRef = useRef();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser({
          name: parsed.name,
          email: parsed.email,
          profilePicture: parsed.profilePicture,
          role: parsed.role, // ✅ add role
        });
        console.log(parsed);
      } catch (err) {
        console.error("Failed to parse user JSON", err);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Breadcrumbs
  const generateBreadcrumbs = () => {
    const pathnames = location.pathname.split("/").filter((x) => x);

    return (
      <nav className="text-gray-600">
        <ul className="flex space-x-2">
          <li>
            <Link to="/" className="hover:underline">
              Home
            </Link>
          </li>
          {pathnames.map((name, index) => {
            const routeTo = "/" + pathnames.slice(0, index + 1).join("/");
            const isLast = index === pathnames.length - 1;

            return (
              <li key={routeTo} className="flex items-center text-[#333c29]">
                <span className="mx-2">{"▸"}</span>
                {isLast ? (
                  <span className="font-semibold">
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                  </span>
                ) : (
                  <Link to={routeTo} className="hover:underline">
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    );
  };

  return (
    <header
      className={`top-0 right-0 h-16 shadow px-6 py-3 flex justify-between items-center bg-white z-20 transition-all duration-300 ${
        isCollapsed ? "ml-0" : "ml-0"
      }`}
    >
      <div>{generateBreadcrumbs()}</div>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img
            src={user.profilePicture}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover border border-gray-300"
          />
          <FiChevronDown className="text-gray-700" />
        </button>

        {showDropdown && (
          <div className="absolute right-0 mt-2 w-56 bg-white rounded shadow-md border border-gray-200 z-50">
            <div className="p-4 border-b border-gray-200">
              <p className="font-semibold text-gray-800">
                {user.name} &nbsp;
                <span className="text-xs text-gray-400 capitalize">
                  ({user.role})
                </span>
              </p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-2 px-4 py-3 text-left text-red-600 hover:bg-gray-100"
            >
              <FiLogOut />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
