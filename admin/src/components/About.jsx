import React from "react";
import { Users, Target, Lightbulb, ShieldCheck } from "lucide-react";
import Navbar from "./Navbar";

const About = () => {
  return (
    <>
    <Navbar/>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900 p-8">
      <div className="w-full max-w-4xl bg-black bg-opacity-50 backdrop-blur-lg p-10 rounded-xl shadow-2xl border border-gray-700 text-white">
        <h2 className="text-4xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-6">
          About Us
        </h2>
        <p className="text-center text-gray-300 mb-8">
          We are dedicated to building innovative and secure solutions using blockchain technology. Our goal is to 
          provide seamless and decentralized experiences, ensuring data integrity and user trust.
        </p>

        {/* Key Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center gap-4 p-4 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700">
            <Users className="w-8 h-8 text-blue-400" />
            <div>
              <h3 className="text-lg font-bold text-white">Community Driven</h3>
              <p className="text-gray-300 text-sm">We believe in open collaboration and community growth.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700">
            <Target className="w-8 h-8 text-blue-400" />
            <div>
              <h3 className="text-lg font-bold text-white">Our Mission</h3>
              <p className="text-gray-300 text-sm">To make blockchain accessible and valuable for all.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700">
            <Lightbulb className="w-8 h-8 text-blue-400" />
            <div>
              <h3 className="text-lg font-bold text-white">Innovation</h3>
              <p className="text-gray-300 text-sm">We push boundaries to create cutting-edge solutions.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700">
            <ShieldCheck className="w-8 h-8 text-blue-400" />
            <div>
              <h3 className="text-lg font-bold text-white">Security</h3>
              <p className="text-gray-300 text-sm">Your data is protected with the highest security standards.</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="flex justify-center mt-8">
          <a
            href="/contact"
            className="px-6 py-3 rounded-lg font-semibold text-lg bg-blue-600 hover:bg-blue-800 transition duration-300 shadow-lg"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
    </>
  );
};

export default About;
