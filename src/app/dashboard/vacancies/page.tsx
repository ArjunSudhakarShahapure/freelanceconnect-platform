"use client";

import { useState } from "react";
import { Search, MapPin, Clock, DollarSign, Briefcase } from "lucide-react";

interface Vacancy {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  budget: string;
  duration: string;
  postedBy: string;
  postedDate: string;
  description: string;
  skills: string[];
}

export default function VacanciesPage() {
  const [vacancies] = useState<Vacancy[]>([
    {
      id: 1,
      title: "Senior UI/UX Designer",
      company: "TechStartup Inc",
      location: "Remote",
      type: "Full-time",
      budget: "$80k - $100k/year",
      duration: "Permanent",
      postedBy: "Sarah Johnson",
      postedDate: "2 days ago",
      description: "Looking for an experienced UI/UX designer to lead design initiatives for our mobile and web applications. Must have 5+ years of experience.",
      skills: ["Figma", "UI Design", "UX Research", "Prototyping"],
    },
    {
      id: 2,
      title: "Graphic Designer for Branding Project",
      company: "Creative Agency",
      location: "New York, NY",
      type: "Contract",
      budget: "$5,000 - $8,000",
      duration: "3 months",
      postedBy: "Michael Chen",
      postedDate: "5 days ago",
      description: "We need a talented graphic designer to create a complete brand identity for a new coffee shop chain. Includes logo, packaging, and marketing materials.",
      skills: ["Illustrator", "Photoshop", "Branding", "Print Design"],
    },
    {
      id: 3,
      title: "Mobile App Designer",
      company: "FinTech Solutions",
      location: "San Francisco, CA",
      type: "Freelance",
      budget: "$60/hour",
      duration: "6 months",
      postedBy: "Emma Rodriguez",
      postedDate: "1 week ago",
      description: "Seeking a mobile app designer to design a banking app from scratch. Must have experience with financial applications and understand security best practices.",
      skills: ["Mobile Design", "Figma", "iOS", "Android"],
    },
    {
      id: 4,
      title: "Web Designer for E-commerce",
      company: "Fashion Retail",
      location: "Remote",
      type: "Part-time",
      budget: "$40/hour",
      duration: "Ongoing",
      postedBy: "David Park",
      postedDate: "3 days ago",
      description: "Looking for a web designer to help redesign our e-commerce platform. Focus on improving user experience and conversion rates.",
      skills: ["Web Design", "E-commerce", "Shopify", "UX"],
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");

  const jobTypes = ["All", "Full-time", "Part-time", "Contract", "Freelance"];

  const filteredVacancies = vacancies.filter(vacancy => {
    const matchesSearch = vacancy.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vacancy.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vacancy.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "All" || vacancy.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-black bg-white sticky top-0 z-10">
        <div className="px-6 py-4">
          <h2 className="text-2xl font-bold">Job Vacancies & Collaboration Board</h2>
          <p className="text-sm text-gray-600 mt-1">
            Discover freelance opportunities and collaboration projects
          </p>
        </div>
      </header>

      <div className="p-6">
        {/* Search and Filter */}
        <div className="max-w-5xl mx-auto mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2" size={20} />
              <input
                type="text"
                placeholder="Search jobs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-black focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* Type Filter */}
            <div className="flex gap-2 overflow-x-auto">
              {jobTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-3 border border-black whitespace-nowrap transition-colors ${
                    selectedType === type
                      ? "bg-black text-white"
                      : "bg-white text-black hover:bg-black hover:text-white"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Post Job Button */}
          <div className="mb-6">
            <button className="px-6 py-3 border border-black bg-black text-white hover:bg-white hover:text-black transition-colors font-medium">
              Post a Job Opportunity
            </button>
          </div>
        </div>

        {/* Vacancies List */}
        <div className="max-w-5xl mx-auto space-y-6">
          {filteredVacancies.map((vacancy) => (
            <article key={vacancy.id} className="border border-black bg-white">
              {/* Vacancy Header */}
              <div className="p-6 border-b border-black">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{vacancy.title}</h3>
                    <p className="text-lg font-medium">{vacancy.company}</p>
                  </div>
                  <span className="px-3 py-1 border border-black text-sm font-medium">
                    {vacancy.type}
                  </span>
                </div>

                {/* Meta Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    <span>{vacancy.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign size={16} />
                    <span>{vacancy.budget}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>{vacancy.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase size={16} />
                    <span>{vacancy.postedDate}</span>
                  </div>
                </div>
              </div>

              {/* Vacancy Content */}
              <div className="p-6 border-b border-black">
                <p className="text-base leading-relaxed mb-4">{vacancy.description}</p>
                
                {/* Skills */}
                <div className="mb-4">
                  <h4 className="font-bold mb-2">Required Skills:</h4>
                  <div className="flex flex-wrap gap-2">
                    {vacancy.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 border border-black text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-sm text-gray-600">
                  Posted by <span className="font-medium">{vacancy.postedBy}</span>
                </p>
              </div>

              {/* Actions */}
              <div className="p-6 flex gap-4">
                <button className="px-6 py-3 border border-black bg-black text-white hover:bg-white hover:text-black transition-colors font-medium">
                  Apply Now
                </button>
                <button className="px-6 py-3 border border-black bg-white text-black hover:bg-black hover:text-white transition-colors font-medium">
                  Contact Poster
                </button>
                <button className="px-6 py-3 border border-black bg-white text-black hover:bg-black hover:text-white transition-colors font-medium ml-auto">
                  Save
                </button>
              </div>
            </article>
          ))}

          {filteredVacancies.length === 0 && (
            <div className="text-center py-16 border border-black">
              <p className="text-xl font-medium mb-2">No vacancies found</p>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
