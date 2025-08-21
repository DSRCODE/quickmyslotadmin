import React, { useState } from "react";
import PageBreadcrumb from "../components/common/PageBreadCrumb";

export default function UserProfiles() {
  // Sample user data - replace with real data or props
  const user = {
    fullName: "John Doe",
    username: "johndoe123",
    email: "john.doe@example.com",
    phone: "+91 9876543210",
    address: "1234 Elm Street, Springfield, IL, 62704",
    joinedDate: "January 15, 2023",
    role: "Customer",
    status: "Active",
    profilePicture: "https://i.pravatar.cc/150?img=12",
    recentActivities: [
      "Logged in from new device",
      "Updated profile picture",
      "Changed password",
      "Placed an order",
    ],
  };

  // State for modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state inside modal
  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  // Error state for validation
  const [errors, setErrors] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  // Validate and submit new password
  const handleSubmit = (e) => {
    e.preventDefault();

    let valid = true;
    let tempErrors = { newPassword: "", confirmPassword: "" };

    if (passwordData.newPassword.length < 8) {
      tempErrors.newPassword = "Password must be at least 8 characters.";
      valid = false;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      tempErrors.confirmPassword = "Passwords do not match.";
      valid = false;
    }

    setErrors(tempErrors);

    if (!valid) return;

    // Submit password changes here (e.g., call API)
    console.log("New password submitted:", passwordData.newPassword);

    // Close modal and reset password data
    setIsModalOpen(false);
    setPasswordData({ newPassword: "", confirmPassword: "" });
    setErrors({ newPassword: "", confirmPassword: "" });
  };

  return (
    <>
      <PageBreadcrumb pageTitle="User Profile" />

      <div className="max-w-6xl mx-auto rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <h3 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          Profile Details
        </h3>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left: Profile Picture and Basic Info */}
          <div className="flex flex-col items-center border border-gray-200 rounded-2xl p-5 dark:border-gray-700 lg:w-1/3">
            <img
              src={user.profilePicture}
              alt="Profile"
              className="mb-4 h-32 w-32 rounded-full object-cover shadow-md"
            />
            <h2 className="text-xl font-bold">{user.fullName}</h2>
            <p className="text-gray-500 dark:text-gray-400">@{user.username}</p>
            <p
              className={`mt-2 rounded-full px-3 py-1 text-sm font-semibold ${
                user.status === "Active"
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-300 text-gray-700"
              }`}
            >
              {user.status}
            </p>
          </div>

          {/* Right: Detailed Info */}
          <div className="flex-1 space-y-8">
            {/* Personal Info */}
            <section>
              <h4 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
                Personal Information
              </h4>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                    Full Name
                  </label>
                  <p className="mt-1 text-gray-900 dark:text-white">
                    {user.fullName}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                    Email
                  </label>
                  <p className="mt-1 text-gray-900 dark:text-white">
                    {user.email}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                    Role
                  </label>
                  <p className="mt-1 text-gray-900 dark:text-white">
                    {user.role}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                    Member since
                  </label>
                  <p className="mt-1 text-gray-900 dark:text-white">
                    {user.joinedDate}
                  </p>
                </div>
              </div>
            </section>
            {/* Forgot Password Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-6 px-4 py-2 bg-blue-500 text-white rounded font-semibold hover:bg-[#FE4C8A] transition-colors text-sm"
            >
              Forgot Password
            </button>
            {/* Contact Details */}
            {/* <section>
              <h4 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
                Contact Details
              </h4>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                    Email
                  </label>
                  <p className="mt-1 text-gray-900 dark:text-white">
                    {user.email}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                    Phone Number
                  </label>
                  <p className="mt-1 text-gray-900 dark:text-white">
                    {user.phone}
                  </p>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                    Address
                  </label>
                  <p className="mt-1 text-gray-900 dark:text-white">
                    {user.address}
                  </p>
                </div>
              </div>
            </section> */}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 bg-opacity-50"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-lg p-6 max-w-md w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="mb-4 text-xl font-semibold text-gray-900">
              Set New Password
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#7C0902] ${
                    errors.newPassword ? "border-red-600" : "border-gray-300"
                  }`}
                />
                {errors.newPassword && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.newPassword}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#7C0902] ${
                    errors.confirmPassword
                      ? "border-red-600"
                      : "border-gray-300"
                  }`}
                />
                {errors.confirmPassword && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  className="py-2 px-4 rounded border border-gray-300 hover:bg-gray-100 transition"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 rounded bg-blue-500 text-white font-semibold hover:bg-[#FE4C8A] transition"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
