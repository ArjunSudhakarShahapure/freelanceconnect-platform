"use client";

import { useState, useEffect } from "react";
import { MapPin, Link as LinkIcon, Mail, Briefcase, Edit } from "lucide-react";
import Image from "next/image";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  image: string;
}

interface ProfileData {
  name: string;
  email: string;
  role: string;
  location: string;
  website: string;
  bio: string;
}

export default function ProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [portfolioItems] = useState<PortfolioItem[]>([
    {
      id: 1,
      title: "E-commerce Dashboard",
      category: "UI/UX Design",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=600&fit=crop",
    },
    {
      id: 2,
      title: "Mobile Banking App",
      category: "UI/UX Design",
      image: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=600&h=600&fit=crop",
    },
    {
      id: 3,
      title: "Brand Identity Design",
      category: "Branding",
      image: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=600&h=600&fit=crop",
    },
    {
      id: 4,
      title: "Restaurant Website",
      category: "Web Design",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=600&fit=crop",
    },
    {
      id: 5,
      title: "Fitness App Redesign",
      category: "UI/UX Design",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=600&fit=crop",
    },
    {
      id: 6,
      title: "Logo Collection",
      category: "Branding",
      image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=600&h=600&fit=crop",
    },
  ]);

  // Fetch profile data from API
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
            name: data.name || "User",
            email: data.email || "",
            role: data.role || "Designer",
            location: data.location || "Location not set",
            website: data.website || "website.com",
            bio: data.bio || "No bio yet. Edit your profile to add one!",
          });
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (session?.user) {
      fetchProfile();
    }
  }, [session]);

  const userInfo = {
    experience: "6+ years",
    projects: 42,
    followers: 1234,
    following: 567,
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

  if (!session?.user || !profileData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-black bg-white sticky top-0 z-10">
        <div className="px-6 py-4">
          <h2 className="text-2xl font-bold">Profile</h2>
        </div>
      </header>

      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          {/* Profile Info Section */}
          <div className="border border-black mb-8 bg-white">
            <div className="p-8">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 border-2 border-black bg-white flex items-center justify-center">
                    <span className="text-5xl font-bold">
                      {profileData.name.split(" ").map(n => n[0]).join("")}
                    </span>
                  </div>
                </div>

                {/* User Details */}
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-3xl font-bold mb-2">{profileData.name}</h3>
                      <p className="text-xl text-gray-600 mb-4">{profileData.role}</p>
                    </div>
                    <button 
                      onClick={() => router.push("/dashboard/settings")}
                      className="px-6 py-2 border border-black bg-white text-black hover:bg-black hover:text-white transition-colors flex items-center gap-2"
                    >
                      <Edit size={18} />
                      Edit Profile
                    </button>
                  </div>

                  <p className="text-base leading-relaxed mb-6">{profileData.bio}</p>

                  {/* Contact Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                    {profileData.location && (
                      <div className="flex items-center gap-2">
                        <MapPin size={18} />
                        <span className="text-sm">{profileData.location}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Mail size={18} />
                      <span className="text-sm">{profileData.email}</span>
                    </div>
                    {profileData.website && (
                      <div className="flex items-center gap-2">
                        <LinkIcon size={18} />
                        <span className="text-sm">{profileData.website}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Briefcase size={18} />
                      <span className="text-sm">{userInfo.experience} experience</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex gap-6">
                    <div className="border border-black px-6 py-3">
                      <div className="text-2xl font-bold">{userInfo.projects}</div>
                      <div className="text-sm text-gray-600">Projects</div>
                    </div>
                    <div className="border border-black px-6 py-3">
                      <div className="text-2xl font-bold">{userInfo.followers}</div>
                      <div className="text-sm text-gray-600">Followers</div>
                    </div>
                    <div className="border border-black px-6 py-3">
                      <div className="text-2xl font-bold">{userInfo.following}</div>
                      <div className="text-sm text-gray-600">Following</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="border border-black mb-8 bg-white">
            <div className="p-6 border-b border-black">
              <h4 className="text-xl font-bold">Skills & Expertise</h4>
            </div>
            <div className="p-6">
              <div className="flex flex-wrap gap-3">
                {[
                  "UI Design",
                  "UX Research",
                  "Figma",
                  "Adobe XD",
                  "Prototyping",
                  "Design Systems",
                  "User Testing",
                  "Wireframing",
                  "Mobile Design",
                  "Web Design",
                  "Interaction Design",
                  "Visual Design",
                ].map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 border border-black text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Portfolio Section */}
          <div className="border border-black bg-white">
            <div className="p-6 border-b border-black flex justify-between items-center">
              <h4 className="text-xl font-bold">Portfolio</h4>
              <button className="px-4 py-2 border border-black bg-black text-white hover:bg-white hover:text-black transition-colors">
                Add Project
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {portfolioItems.map((item) => (
                  <div
                    key={item.id}
                    className="border border-black bg-white hover:border-2 transition-all cursor-pointer"
                  >
                    <div className="border-b border-black">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={600}
                        height={600}
                        className="w-full h-64 object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h5 className="font-bold text-lg mb-1">{item.title}</h5>
                      <p className="text-sm text-gray-600">{item.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}