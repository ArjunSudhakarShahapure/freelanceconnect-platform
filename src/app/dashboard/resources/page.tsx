"use client";

import { useState } from "react";
import { Search, Download, Filter } from "lucide-react";
import Image from "next/image";

interface Resource {
  id: number;
  title: string;
  category: string;
  author: string;
  downloads: number;
  image: string;
  description: string;
}

export default function ResourcesPage() {
  const [resources] = useState<Resource[]>([
    {
      id: 1,
      title: "Minimal Line Icons Pack",
      category: "Icons",
      author: "Emma Rodriguez",
      downloads: 234,
      image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=300&fit=crop",
      description: "150+ minimal line icons perfect for modern designs",
    },
    {
      id: 2,
      title: "UI Kit for Mobile Apps",
      category: "UI Kits",
      author: "Michael Chen",
      downloads: 189,
      image: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=400&h=300&fit=crop",
      description: "Complete mobile UI components and screens",
    },
    {
      id: 3,
      title: "Mockup Templates Bundle",
      category: "Mockups",
      author: "Sarah Johnson",
      downloads: 456,
      image: "https://images.unsplash.com/photo-1545235617-7a424c1a60cc?w=400&h=300&fit=crop",
      description: "20+ device mockups for presentations",
    },
    {
      id: 4,
      title: "Typography System",
      category: "Fonts",
      author: "David Park",
      downloads: 312,
      image: "https://images.unsplash.com/photo-1618172193622-ae2d025f4032?w=400&h=300&fit=crop",
      description: "Professional font pairings and guidelines",
    },
    {
      id: 5,
      title: "Dashboard Components",
      category: "UI Kits",
      author: "Lisa Anderson",
      downloads: 278,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      description: "Charts, tables, and dashboard elements",
    },
    {
      id: 6,
      title: "Social Media Templates",
      category: "Templates",
      author: "Emma Rodriguez",
      downloads: 523,
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop",
      description: "Instagram, Facebook, and Twitter templates",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Icons", "UI Kits", "Mockups", "Fonts", "Templates"];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-black bg-white sticky top-0 z-10">
        <div className="px-6 py-4">
          <h2 className="text-2xl font-bold">Resource Library</h2>
          <p className="text-sm text-gray-600 mt-1">
            Design assets, UI kits, and creative resources shared by the community
          </p>
        </div>
      </header>

      <div className="p-6">
        {/* Search and Filter */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2" size={20} />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-black focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-3 border border-black whitespace-nowrap transition-colors ${
                    selectedCategory === category
                      ? "bg-black text-white"
                      : "bg-white text-black hover:bg-black hover:text-white"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <div key={resource.id} className="border border-black bg-white">
                {/* Resource Image */}
                <div className="border-b border-black">
                  <Image
                    src={resource.image}
                    alt={resource.title}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                </div>

                {/* Resource Info */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-lg">{resource.title}</h3>
                    <span className="px-2 py-1 border border-black text-xs font-medium">
                      {resource.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    {resource.description}
                  </p>
                  <div className="flex justify-between items-center text-sm mb-4">
                    <span className="text-gray-600">by {resource.author}</span>
                    <span className="text-gray-600">{resource.downloads} downloads</span>
                  </div>
                  <button className="w-full px-4 py-3 border border-black bg-black text-white hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-2">
                    <Download size={18} />
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-16 border border-black">
              <p className="text-xl font-medium mb-2">No resources found</p>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
