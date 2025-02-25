import React from "react";
import { Facebook, Twitter, Linkedin, Github } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-6 px-4 md:px-8 w-full mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-4 md:space-y-0">
        {/* Left Section - Branding */}
        <div>
          <h3 className="text-2xl font-semibold text-white">Expense Tracker</h3>
          <p className="text-sm mt-2 text-gray-300">Track and manage your finances with ease.</p>
          <p className="text-xs text-gray-400">© {new Date().getFullYear()} All Rights Reserved</p>
        </div>

        {/* Middle Section - Quick Links */}
        <div className="flex space-x-6">
          <a href="/" className="text-sm hover:text-gray-400 transition">Home</a>
          <a href="/expenses" className="text-sm hover:text-gray-400 transition">Expenses</a>
          <a href="/reports" className="text-sm hover:text-gray-400 transition">Reports</a>
          <a href="/contact" className="text-sm hover:text-gray-400 transition">Contact</a>
        </div>

        {/* Right Section - Social Media */}
        <div className="flex space-x-4">
          <a href="#" className="hover:text-gray-400 transition">
            <Facebook className="w-6 h-6" />
          </a>
          <a href="#" className="hover:text-gray-400 transition">
            <Twitter className="w-6 h-6" />
          </a>
          <a href="#" className="hover:text-gray-400 transition">
            <Linkedin className="w-6 h-6" />
          </a>
          <a href="#" className="hover:text-gray-400 transition">
            <Github className="w-6 h-6" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;