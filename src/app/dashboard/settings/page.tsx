"use client";

import { useState } from "react";
import { Save } from "lucide-react";

export default function SettingsPage() {
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@email.com",
    role: "UI/UX Designer",
    location: "San Francisco, CA",
    website: "johndoe.design",
    bio: "Passionate UI/UX designer with 6+ years of experience creating intuitive and beautiful digital experiences.",
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    postLikes: true,
    postComments: true,
    newFollowers: true,
    chatMessages: true,
    jobAlerts: false,
    weeklyDigest: true,
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: "public",
    showEmail: false,
    showLocation: true,
  });

  const handleProfileChange = (field: string, value: string) => {
    setProfileData({ ...profileData, [field]: value });
  };

  const handleNotificationChange = (field: string) => {
    setNotifications({ ...notifications, [field]: !notifications[field] });
  };

  const handlePrivacyChange = (field: string, value: string | boolean) => {
    setPrivacy({ ...privacy, [field]: value });
  };

  const handleSave = () => {
    alert("Settings saved successfully!");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-black bg-white sticky top-0 z-10">
        <div className="px-6 py-4">
          <h2 className="text-2xl font-bold">Settings</h2>
        </div>
      </header>

      <div className="p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Profile Settings */}
          <section className="border border-black bg-white">
            <div className="p-6 border-b border-black">
              <h3 className="text-xl font-bold">Profile Information</h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold mb-2">Full Name</label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => handleProfileChange("name", e.target.value)}
                  className="w-full px-4 py-3 border border-black focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Email</label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleProfileChange("email", e.target.value)}
                  className="w-full px-4 py-3 border border-black focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Role</label>
                <select
                  value={profileData.role}
                  onChange={(e) => handleProfileChange("role", e.target.value)}
                  className="w-full px-4 py-3 border border-black focus:outline-none focus:ring-2 focus:ring-black"
                >
                  <option value="UI/UX Designer">UI/UX Designer</option>
                  <option value="Graphic Designer">Graphic Designer</option>
                  <option value="Product Designer">Product Designer</option>
                  <option value="Visual Designer">Visual Designer</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Location</label>
                <input
                  type="text"
                  value={profileData.location}
                  onChange={(e) => handleProfileChange("location", e.target.value)}
                  className="w-full px-4 py-3 border border-black focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Website</label>
                <input
                  type="text"
                  value={profileData.website}
                  onChange={(e) => handleProfileChange("website", e.target.value)}
                  className="w-full px-4 py-3 border border-black focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Bio</label>
                <textarea
                  value={profileData.bio}
                  onChange={(e) => handleProfileChange("bio", e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-black focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>
          </section>

          {/* Notification Settings */}
          <section className="border border-black bg-white">
            <div className="p-6 border-b border-black">
              <h3 className="text-xl font-bold">Notification Preferences</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <div>
                  <h4 className="font-bold">Email Notifications</h4>
                  <p className="text-sm text-gray-600">Receive notifications via email</p>
                </div>
                <button
                  onClick={() => handleNotificationChange("emailNotifications")}
                  className={`w-14 h-8 border-2 border-black transition-colors ${
                    notifications.emailNotifications ? "bg-black" : "bg-white"
                  }`}
                >
                  <div
                    className={`w-6 h-6 border border-black transition-transform ${
                      notifications.emailNotifications
                        ? "translate-x-6 bg-white"
                        : "translate-x-0 bg-black"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <div>
                  <h4 className="font-bold">Post Likes</h4>
                  <p className="text-sm text-gray-600">When someone likes your post</p>
                </div>
                <button
                  onClick={() => handleNotificationChange("postLikes")}
                  className={`w-14 h-8 border-2 border-black transition-colors ${
                    notifications.postLikes ? "bg-black" : "bg-white"
                  }`}
                >
                  <div
                    className={`w-6 h-6 border border-black transition-transform ${
                      notifications.postLikes
                        ? "translate-x-6 bg-white"
                        : "translate-x-0 bg-black"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <div>
                  <h4 className="font-bold">Post Comments</h4>
                  <p className="text-sm text-gray-600">When someone comments on your post</p>
                </div>
                <button
                  onClick={() => handleNotificationChange("postComments")}
                  className={`w-14 h-8 border-2 border-black transition-colors ${
                    notifications.postComments ? "bg-black" : "bg-white"
                  }`}
                >
                  <div
                    className={`w-6 h-6 border border-black transition-transform ${
                      notifications.postComments
                        ? "translate-x-6 bg-white"
                        : "translate-x-0 bg-black"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <div>
                  <h4 className="font-bold">New Followers</h4>
                  <p className="text-sm text-gray-600">When someone follows you</p>
                </div>
                <button
                  onClick={() => handleNotificationChange("newFollowers")}
                  className={`w-14 h-8 border-2 border-black transition-colors ${
                    notifications.newFollowers ? "bg-black" : "bg-white"
                  }`}
                >
                  <div
                    className={`w-6 h-6 border border-black transition-transform ${
                      notifications.newFollowers
                        ? "translate-x-6 bg-white"
                        : "translate-x-0 bg-black"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <div>
                  <h4 className="font-bold">Chat Messages</h4>
                  <p className="text-sm text-gray-600">When you receive new messages</p>
                </div>
                <button
                  onClick={() => handleNotificationChange("chatMessages")}
                  className={`w-14 h-8 border-2 border-black transition-colors ${
                    notifications.chatMessages ? "bg-black" : "bg-white"
                  }`}
                >
                  <div
                    className={`w-6 h-6 border border-black transition-transform ${
                      notifications.chatMessages
                        ? "translate-x-6 bg-white"
                        : "translate-x-0 bg-black"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <div>
                  <h4 className="font-bold">Job Alerts</h4>
                  <p className="text-sm text-gray-600">New job opportunities matching your profile</p>
                </div>
                <button
                  onClick={() => handleNotificationChange("jobAlerts")}
                  className={`w-14 h-8 border-2 border-black transition-colors ${
                    notifications.jobAlerts ? "bg-black" : "bg-white"
                  }`}
                >
                  <div
                    className={`w-6 h-6 border border-black transition-transform ${
                      notifications.jobAlerts
                        ? "translate-x-6 bg-white"
                        : "translate-x-0 bg-black"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between py-3">
                <div>
                  <h4 className="font-bold">Weekly Digest</h4>
                  <p className="text-sm text-gray-600">Weekly summary of community activity</p>
                </div>
                <button
                  onClick={() => handleNotificationChange("weeklyDigest")}
                  className={`w-14 h-8 border-2 border-black transition-colors ${
                    notifications.weeklyDigest ? "bg-black" : "bg-white"
                  }`}
                >
                  <div
                    className={`w-6 h-6 border border-black transition-transform ${
                      notifications.weeklyDigest
                        ? "translate-x-6 bg-white"
                        : "translate-x-0 bg-black"
                    }`}
                  />
                </button>
              </div>
            </div>
          </section>

          {/* Privacy Settings */}
          <section className="border border-black bg-white">
            <div className="p-6 border-b border-black">
              <h3 className="text-xl font-bold">Privacy Settings</h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold mb-2">Profile Visibility</label>
                <select
                  value={privacy.profileVisibility}
                  onChange={(e) => handlePrivacyChange("profileVisibility", e.target.value)}
                  className="w-full px-4 py-3 border border-black focus:outline-none focus:ring-2 focus:ring-black"
                >
                  <option value="public">Public - Anyone can view</option>
                  <option value="members">Members Only - Only community members</option>
                  <option value="private">Private - Only you can view</option>
                </select>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <div>
                  <h4 className="font-bold">Show Email</h4>
                  <p className="text-sm text-gray-600">Display email on your profile</p>
                </div>
                <button
                  onClick={() => handlePrivacyChange("showEmail", !privacy.showEmail)}
                  className={`w-14 h-8 border-2 border-black transition-colors ${
                    privacy.showEmail ? "bg-black" : "bg-white"
                  }`}
                >
                  <div
                    className={`w-6 h-6 border border-black transition-transform ${
                      privacy.showEmail
                        ? "translate-x-6 bg-white"
                        : "translate-x-0 bg-black"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between py-3">
                <div>
                  <h4 className="font-bold">Show Location</h4>
                  <p className="text-sm text-gray-600">Display location on your profile</p>
                </div>
                <button
                  onClick={() => handlePrivacyChange("showLocation", !privacy.showLocation)}
                  className={`w-14 h-8 border-2 border-black transition-colors ${
                    privacy.showLocation ? "bg-black" : "bg-white"
                  }`}
                >
                  <div
                    className={`w-6 h-6 border border-black transition-transform ${
                      privacy.showLocation
                        ? "translate-x-6 bg-white"
                        : "translate-x-0 bg-black"
                    }`}
                  />
                </button>
              </div>
            </div>
          </section>

          {/* Account Actions */}
          <section className="border border-black bg-white">
            <div className="p-6 border-b border-black">
              <h3 className="text-xl font-bold">Account Actions</h3>
            </div>
            <div className="p-6 space-y-4">
              <button className="w-full px-6 py-3 border border-black bg-white text-black hover:bg-black hover:text-white transition-colors text-left">
                Change Password
              </button>
              <button className="w-full px-6 py-3 border border-black bg-white text-black hover:bg-black hover:text-white transition-colors text-left">
                Download My Data
              </button>
              <button className="w-full px-6 py-3 border border-black bg-white text-black hover:bg-black hover:text-white transition-colors text-left">
                Deactivate Account
              </button>
              <button className="w-full px-6 py-3 border-2 border-black bg-white text-black hover:bg-black hover:text-white transition-colors text-left font-bold">
                Delete Account
              </button>
            </div>
          </section>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="px-8 py-4 border border-black bg-black text-white hover:bg-white hover:text-black transition-colors font-bold flex items-center gap-2"
            >
              <Save size={20} />
              Save All Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
