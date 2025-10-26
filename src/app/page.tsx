"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-black">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">FreelanceConnect</h1>
          <Link 
            href="/dashboard/feed"
            className="px-6 py-2 border border-black bg-white text-black hover:bg-black hover:text-white transition-colors"
          >
            Login
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="border-b border-black">
        <div className="max-w-7xl mx-auto px-6 py-32 text-center">
          <motion.h2 
            className="text-6xl md:text-8xl font-bold mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Connect. Create. Collaborate.
          </motion.h2>
          <motion.p 
            className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            A private community platform for freelance designers to share opportunities, 
            resources, and connect with peers.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link 
              href="/dashboard/feed"
              className="px-8 py-4 border-2 border-black bg-black text-white hover:bg-white hover:text-black transition-colors text-lg font-medium w-full sm:w-auto text-center"
            >
              Join Now
            </Link>
            <Link 
              href="/dashboard/feed"
              className="px-8 py-4 border-2 border-black bg-white text-black hover:bg-black hover:text-white transition-colors text-lg font-medium w-full sm:w-auto text-center"
            >
              Login with Google
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-b border-black">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <h3 className="text-4xl font-bold mb-16 text-center">Platform Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
            {[
              {
                title: "Community Feed",
                description: "Share updates, projects, and job opportunities with fellow designers."
              },
              {
                title: "Real-Time Chat",
                description: "Connect instantly with other freelancers through 1-on-1 and group chats."
              },
              {
                title: "Resource Library",
                description: "Access and share design assets, UI kits, icons, and creative resources."
              },
              {
                title: "Job Board",
                description: "Discover freelance opportunities and collaboration projects."
              },
              {
                title: "Portfolio Showcase",
                description: "Display your best work and attract potential clients and collaborators."
              },
              {
                title: "Designer Network",
                description: "Build meaningful connections with graphic and UI/UX designers worldwide."
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="border border-black p-8 hover:bg-black hover:text-white transition-colors"
              >
                <h4 className="text-2xl font-bold mb-4">{feature.title}</h4>
                <p className="text-lg">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Is This For Section */}
      <section className="border-b border-black">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <h3 className="text-4xl font-bold mb-16 text-center">Who Is This For?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            <div className="border border-black p-12">
              <h4 className="text-3xl font-bold mb-6">Graphic Designers</h4>
              <p className="text-lg">
                Connect with fellow graphic designers, share creative assets, 
                collaborate on projects, and find freelance opportunities.
              </p>
            </div>
            <div className="border border-black p-12">
              <h4 className="text-3xl font-bold mb-6">UI/UX Designers</h4>
              <p className="text-lg">
                Network with UI/UX professionals, exchange design resources, 
                discuss best practices, and discover exciting projects.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-b border-black">
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <h3 className="text-5xl font-bold mb-8">Ready to Join?</h3>
          <p className="text-xl mb-12 max-w-2xl mx-auto">
            Start connecting with talented designers, sharing your work, 
            and accessing exclusive resources today.
          </p>
          <Link 
            href="/dashboard/feed"
            className="inline-block px-10 py-5 border-2 border-black bg-black text-white hover:bg-white hover:text-black transition-colors text-xl font-medium"
          >
            Get Started Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12 border-t border-black">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h5 className="text-xl font-bold mb-4">FreelanceConnect</h5>
              <p className="text-sm">
                Empowering freelance designers through community and collaboration.
              </p>
            </div>
            <div>
              <h6 className="text-lg font-bold mb-4">Platform</h6>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:underline">Feed</Link></li>
                <li><Link href="#" className="hover:underline">Chat</Link></li>
                <li><Link href="#" className="hover:underline">Resources</Link></li>
                <li><Link href="#" className="hover:underline">Vacancies</Link></li>
              </ul>
            </div>
            <div>
              <h6 className="text-lg font-bold mb-4">Legal</h6>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:underline">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:underline">Terms of Service</Link></li>
                <li><Link href="#" className="hover:underline">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-black text-center text-sm">
            <p>&copy; 2024 FreelanceConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}