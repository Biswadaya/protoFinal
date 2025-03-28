import React from "react";
import { Mail, Phone, MapPin, Linkedin, Twitter, Github } from "lucide-react";
import Navbar from "./Navbar";
const Contact = () => {
  return (
    <>
    <Navbar/>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900 p-8">
      <div className="w-full max-w-3xl bg-black bg-opacity-50 backdrop-blur-lg p-10 rounded-xl shadow-2xl border border-gray-700 text-white">
        <h2 className="text-4xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-6">
          Get in Touch
        </h2>
        <p className="text-center text-gray-300 mb-8">
          Feel free to reach out! Whether it's a project inquiry, collaboration, or just a chat.
        </p>

        {/* Contact Form */}
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 rounded-lg bg-gray-900 bg-opacity-40 border border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 rounded-lg bg-gray-900 bg-opacity-40 border border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
          />
          <textarea
            rows="4"
            placeholder="Your Message"
            className="w-full p-3 rounded-lg bg-gray-900 bg-opacity-40 border border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
          />
          <button
            type="submit"
            className="w-full py-3 rounded-lg font-semibold text-lg bg-blue-600 hover:bg-blue-800 transition duration-300 shadow-lg"
          >
            Send Message
          </button>
        </form>

        {/* Contact Info */}
        <div className="flex flex-col items-center mt-8 space-y-3 text-gray-300">
          <p className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-blue-400" /> anandabhishek0198@gmail.com
          </p>
          <p className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-blue-400" /> +91 9801538293
          </p>
          <p className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-400" /> Bhubaneswar, Odisha
          </p>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-6 mt-6">
          <a href="#" className="text-gray-400 hover:text-white transition">
            <Linkedin className="w-6 h-6" />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition">
            <Twitter className="w-6 h-6" />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition">
            <Github className="w-6 h-6" />
          </a>
        </div>
      </div>
    </div>
    </>
  );
};

export default Contact;
