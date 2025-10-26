"use client";

import { useState, useEffect } from "react";
import { Save } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function SettingsPage() {
  const { data: session, isPending, refetch } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    role: "UI/UX Designer",
    location: "",
    website: "",
    bio: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

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

  // Fetch profile data on mount
  useEffect(() => {
    const fetchProfile = async () => {
      if (!session?.user) return;
      
      try {
        const token = localStorage.getItem("bearer_token");
        const response = await fetch("/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProfileData({
            name: data.name || "",
            email: data.email || "",
            role: data.role || "UI/UX Designer",
            location: data.location || "",
            website: data.website || "",
            bio: data.bio || "",
          });
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        toast.error("Failed to load profile data");
      } finally {
        setIsLoading(false);
      }
    };

    if (session?.user) {
      fetchProfile();
    }
  }, [session]);

  const handleProfileChange = (field: string, value: string) => {
    setProfileData({ ...profileData, [field]: value });
  };

  const handleNotificationChange = (field: string) => {
    setNotifications({ ...notifications, [field]: !notifications[field] });
  };

  const handlePrivacyChange = (field: string, value: string | boolean) => {
    setPrivacy({ ...privacy, [field]: value });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const token = localStorage.getItem("bearer_token");
      const response = await fetch("/api/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: profileData.name,
          role: profileData.role,
          location: profileData.location,
          website: profileData.website,
          bio: profileData.bio,
        }),
      });

      if (response.ok) {
        await refetch(); // Refresh session data
        toast.success("Settings saved successfully!");
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to save settings");
      }
    } catch (error) {
      console.error("Failed to save profile:", error);
      toast.error("Failed to save settings");
    } finally {
      setIsSaving(false);
    }
  };

  if (isPending || isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="border border-black p-8">
          <p className="text-lg font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

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
                  disabled
                  className="w-full px-4 py-3 border border-black bg-gray-100 cursor-not-allowed"
                />
                <p className="text-xs text-gray-600 mt-1">Email cannot be changed</p>
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
                  placeholder="e.g., San Francisco, CA"
                  className="w-full px-4 py-3 border border-black focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Website</label>
                <input
                  type="text"
                  value={profileData.website}
                  onChange={(e) => handleProfileChange("website", e.target.value)}
                  placeholder="https://yourwebsite.com"
                  className="w-full px-4 py-3 border border-black focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Bio</label>
                <textarea
                  value={profileData.bio}
                  onChange={(e) => handleProfileChange("bio", e.target.value)}
                  rows={4}
                  placeholder="Tell us about yourself..."
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
              {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between py-3 border-b border-gray-200">
                  <div>
                    <h4 className="font-bold">{key.replace(/([A-Z])/g, ' $1').trim()}</h4>
                  </div>
                  <button
                    onClick={() => handleNotificationChange(key)}
                    className={`w-14 h-8 border-2 border-black transition-colors ${
                      value ? "bg-black" : "bg-white"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 border border-black transition-transform ${
                        value
                          ? "translate-x-6 bg-white"
                          : "translate-x-0 bg-black"
                      }`}
                    />
                  </button>
                </div>
              ))}
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
              disabled={isSaving}
              className="px-8 py-4 border border-black bg-black text-white hover:bg-white hover:text-black transition-colors font-bold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={20} />
              {isSaving ? "Saving..." : "Save All Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}