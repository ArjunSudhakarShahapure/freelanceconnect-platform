"use client";

import { useState, useEffect } from "react";
import { Heart, MessageCircle, Share2, Send } from "lucide-react";
import Image from "next/image";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

interface Post {
  id: number;
  author: string;
  role: string;
  timestamp: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  isLiked: boolean;
}

export default function FeedPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: "Sarah Johnson",
      role: "Graphic Designer",
      timestamp: "2 hours ago",
      content: "Just finished this branding project for a local coffee shop. Excited to share the final results! What do you think about the color palette?",
      image: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800&h=600&fit=crop",
      likes: 24,
      comments: 7,
      isLiked: false,
    },
    {
      id: 2,
      author: "Michael Chen",
      role: "UI/UX Designer",
      timestamp: "5 hours ago",
      content: "Looking for a UI designer to collaborate on a fintech app. Must have experience with mobile-first design. DM if interested!",
      likes: 18,
      comments: 12,
      isLiked: false,
    },
    {
      id: 3,
      author: "Emma Rodriguez",
      role: "Graphic Designer",
      timestamp: "1 day ago",
      content: "New icon set available in the resources section! 150+ minimal line icons perfect for your next project. Free for community members.",
      image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop",
      likes: 42,
      comments: 15,
      isLiked: true,
    },
  ]);

  const [newPost, setNewPost] = useState("");

  // Redirect if not authenticated
  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  // Show loading state while checking authentication
  if (isPending) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-black border-t-transparent animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render content if not authenticated
  if (!session?.user) {
    return null;
  }

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked,
        };
      }
      return post;
    }));
  };

  const handleSubmitPost = () => {
    if (newPost.trim()) {
      const post: Post = {
        id: posts.length + 1,
        author: session?.user?.name || "John Doe",
        role: "UI/UX Designer",
        timestamp: "Just now",
        content: newPost,
        likes: 0,
        comments: 0,
        isLiked: false,
      };
      setPosts([post, ...posts]);
      setNewPost("");
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <header className="border-b border-black bg-white sticky top-0 z-10">
        <div className="px-6 py-4">
          <h2 className="text-2xl font-bold">Community Feed</h2>
        </div>
      </header>

      <div className="max-w-3xl mx-auto p-6">
        {/* Create Post */}
        <div className="border border-black p-6 mb-6 bg-white">
          <h3 className="text-lg font-bold mb-4">Create Post</h3>
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Share your thoughts, projects, or opportunities..."
            className="w-full border border-black p-4 mb-4 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-black"
          />
          <div className="flex justify-between items-center">
            <button className="px-4 py-2 border border-black text-black hover:bg-black hover:text-white transition-colors">
              Add Image
            </button>
            <button
              onClick={handleSubmitPost}
              className="px-6 py-2 border border-black bg-black text-white hover:bg-white hover:text-black transition-colors flex items-center gap-2"
            >
              <Send size={16} />
              Post
            </button>
          </div>
        </div>

        {/* Posts */}
        <div className="space-y-6">
          {posts.map((post) => (
            <article key={post.id} className="border border-black bg-white">
              {/* Post Header */}
              <div className="p-6 border-b border-black">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 border border-black bg-white flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-lg">
                      {post.author.split(" ").map(n => n[0]).join("")}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold">{post.author}</h4>
                    <p className="text-sm text-gray-600">{post.role}</p>
                    <p className="text-xs text-gray-500 mt-1">{post.timestamp}</p>
                  </div>
                </div>
              </div>

              {/* Post Content */}
              <div className="p-6">
                <p className="text-base leading-relaxed mb-4">{post.content}</p>
                {post.image && (
                  <div className="border border-black">
                    <Image
                      src={post.image}
                      alt="Post image"
                      width={800}
                      height={600}
                      className="w-full h-auto"
                    />
                  </div>
                )}
              </div>

              {/* Post Actions */}
              <div className="border-t border-black p-4 flex items-center gap-4">
                <button
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center gap-2 px-4 py-2 border border-black transition-colors ${
                    post.isLiked
                      ? "bg-black text-white"
                      : "bg-white text-black hover:bg-black hover:text-white"
                  }`}
                >
                  <Heart size={18} fill={post.isLiked ? "currentColor" : "none"} />
                  <span className="text-sm font-medium">{post.likes}</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-black bg-white text-black hover:bg-black hover:text-white transition-colors">
                  <MessageCircle size={18} />
                  <span className="text-sm font-medium">{post.comments}</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-black bg-white text-black hover:bg-black hover:text-white transition-colors ml-auto">
                  <Share2 size={18} />
                  <span className="text-sm font-medium">Share</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}