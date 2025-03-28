import React, { useState } from "react";
import { ethers } from "ethers";
import { CloudUpload } from "lucide-react";
import ABI from "./abi.json";
import Navbar from "./Navbar";

const Dashboard = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const provider = new ethers.BrowserProvider(window.ethereum);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("document", file);

    try {
      const response = await fetch("http://localhost:9090/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("Response Data:", data);

      if (data.json_ipfs_hash && data.file_ipfs_hash) {
        const signer = await provider.getSigner();
        const con = import.meta.env.VITE_CONTRACT_ADDRESS;
        const contract = new ethers.Contract(con, ABI, signer);

        await contract.storeCID(data.json_ipfs_hash);

        alert("File successfully uploaded & stored on blockchain!");
      } else {
        alert("Failed to retrieve IPFS hashes from response.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900 p-8">
        {/* Left Section - Description */}
        <div className="md:w-1/2 text-center md:text-left text-white space-y-6 p-8">
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Secure File Storage
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed">
            Upload your files to <b>IPFS</b> and store their hashes securely on
            the <b>blockchain</b>. This ensures <b>tamper-proof</b> &
            <b>decentralized storage</b> with full transparency.
          </p>
          <div className="flex flex-wrap gap-3 mt-4">
            <span className="px-4 py-2 bg-gray-800 bg-opacity-50 text-white rounded-lg shadow-lg">
              🔹 Upload to IPFS
            </span>
            <span className="px-4 py-2 bg-gray-800 bg-opacity-50 text-white rounded-lg shadow-lg">
              🔹 Store on Blockchain
            </span>
            <span className="px-4 py-2 bg-gray-800 bg-opacity-50 text-white rounded-lg shadow-lg">
              🔹 Secure & Retrieve Anytime
            </span>
          </div>

          <button
            onClick={() => (window.location.href = "/gen-ce")}
            className="mt-6 px-6 py-3 rounded-lg bg-green-600 hover:bg-green-800 text-white font-semibold text-lg shadow-lg transform hover:scale-105 transition duration-300"
          >
            Generate Certificate
          </button>
        </div>

        {/* Right Section - Upload */}
        <div className="md:w-1/2 flex flex-col items-center bg-black bg-opacity-50 backdrop-blur-lg p-10 rounded-xl shadow-2xl border border-gray-700">
          <h2 className="text-3xl font-extrabold text-white mb-6">
            Upload Your File
          </h2>

          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center w-72 h-48 border-2 border-dashed border-blue-500 bg-gray-900 bg-opacity-40 rounded-lg cursor-pointer transition hover:border-blue-300 hover:scale-105 transform duration-200"
          >
            <CloudUpload className="w-12 h-12 text-blue-400" />
            <p className="text-white mt-3 text-center font-medium">
              {file ? file.name : "Click or Drag to Upload"}
            </p>
          </label>
          <input
            id="file-upload"
            type="file"
            onChange={handleFileChange}
            className="hidden"
          />

          <button
            onClick={handleUpload}
            disabled={loading}
            className={`w-full mt-6 px-6 py-3 rounded-lg font-semibold text-lg transition duration-300 shadow-lg ${
              loading
                ? "bg-gray-500 cursor-not-allowed text-gray-300"
                : "bg-blue-600 hover:bg-blue-800 text-white transform hover:scale-105"
            }`}
          >
            {loading ? "Uploading & Storing..." : "Upload to IPFS & Store"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Dashboard;