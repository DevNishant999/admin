import React, { useState, useEffect } from "react";
import ImageUploader from "../components/ImageUploader";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    profilePicture: "",
    role: "",
  });

  const [editingUser, setEditingUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const API = import.meta.env.VITE_API_URL;

  // Fetch all users
  const fetchUsers = async () => {
    const res = await fetch(`${API}/users`);
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Create or Update user
  const handleSubmit = async (e) => {
    e.preventDefault();

    const password = form.password;

    // Validate password only if creating OR if editing AND new password is entered
    if (!editingUser || password) {
      const minLength = password.length >= 8;
      const hasUpper = /[A-Z]/.test(password);
      const hasLower = /[a-z]/.test(password);
      const hasNumber = /[0-9]/.test(password);

      if (!minLength || !hasUpper || !hasLower || !hasNumber) {
        alert(
          "Password must be at least 8 characters long and contain uppercase, lowercase, and a number."
        );
        return;
      }
    }

    if (editingUser) {
      // Update user
      await fetch(`${API}/users/${editingUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } else {
      // Create new user
      await fetch(`${API}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }

    // Reset
    setForm({
      name: "",
      email: "",
      password: "",
      profilePicture: "",
      role: "",
    });
    setEditingUser(null);
    setShowForm(false);
    fetchUsers();
  };

  // Delete user
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    await fetch(`${API}/users/${id}`, { method: "DELETE" });
    fetchUsers();
  };

  // Start editing
  const handleEdit = (user) => {
    setEditingUser(user);
    setForm({
      name: user.name,
      email: user.email,
      password: "", // blank means no change if left empty
      profilePicture: user.profilePicture,
      role: user.role,
    });
    setShowForm(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">
          {editingUser ? "Edit User" : showForm ? "Create User" : "Users"}
        </h2>
        <button
          onClick={() => {
            if (showForm && !editingUser) {
              setForm({
                name: "",
                email: "",
                password: "",
                profilePicture: "",
                role: "",
              });
            }
            setShowForm(!showForm);
            setEditingUser(null);
          }}
          className="flex items-center gap-2 bg-[#333c29] text-white px-4 py-2 rounded transition hover:bg-[#222]"
        >
          {showForm ? "Cancel ×" : "Add user +"}
        </button>
      </div>

      {showForm ? (
        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          <div className="space-y-4 flex-wrap">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded bg-white p-2 w-full"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded bg-white p-2 w-full"
            />
            <input
              type="password"
              name="password"
              placeholder={
                editingUser ? "Leave blank to keep same password" : "Password"
              }
              value={form.password}
              onChange={handleChange}
              className="border border-gray-300 rounded bg-white p-2 w-full"
            />
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="border border-gray-300 rounded bg-white p-2 w-full"
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
              <option value="recruiter">Recruiter</option>
              <option value="blogger">Blogger</option>
            </select>

            <ImageUploader
              value={form.profilePicture}
              onChange={(url) => setForm({ ...form, profilePicture: url })}
            />

            <button
              type="submit"
              className="bg-[#333c29] text-white px-4 py-2 rounded w-[100px]"
            >
              {editingUser ? "Update" : "Save"}
            </button>
          </div>
        </form>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-max w-full bg-white border border-gray-200 shadow-md rounded">
            <thead className="bg-gray-100">
              <tr className="text-left text-xs font-semibold uppercase tracking-wider">
                <th className="py-3 px-4 border-b border-gray-300 w-[200px]">
                  Profile Picture
                </th>
                <th className="py-3 px-4 border-b border-gray-300 w-[200px]">
                  Name
                </th>
                <th className="py-3 px-4 border-b border-gray-300 w-[200px]">
                  Email
                </th>
                <th className="py-3 px-4 border-b border-gray-300 w-[200px]">
                  Role
                </th>
                <th className="py-3 px-4 border-b border-gray-300 w-[200px] text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-t border-gray-200">
                  <td className="py-2 px-4 border-b border-gray-200 w-[200px]">
                    {user.profilePicture && (
                      <img
                        src={user.profilePicture}
                        alt="Profile"
                        className="w-12 h-12 object-cover rounded-full"
                      />
                    )}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 w-[200px]">
                    {user.name}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 w-[200px]">
                    {user.email}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 w-[200px]">
                    {user.role}
                  </td>
                  <td className="py-2 px-4 border-gray-200 w-[200px] flex justify-around items-center w-full">
                    <button
                      onClick={() => handleEdit(user)}
                      className="px-3 py-1 bg-yellow-500 rounded text-white"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="px-3 py-1 bg-red-600 rounded text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Users;
