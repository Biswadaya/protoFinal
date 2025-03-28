import React, { useState } from "react";
import { ethers } from "ethers";
import ABI from "../abi.json";
import NavBar from "../Navbar";

const CertificateForm = () => {
  const [name, setName] = useState("");
  const [eventName, setEventName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const [sending, setSending] = useState(false);

  const isValidInput = (text) => /^[A-Za-z ]+$/.test(text);

  const handleUpload = async () => {
    if (!name || !eventName) {
      alert("Please provide both name and event name.");
      return;
    }

    if (!isValidInput(name) || !isValidInput(eventName)) {
      alert("Only alphabetical characters and spaces are allowed.");
      return;
    }

    setLoading(true);

    try {
      const certResponse = await fetch(
        "http://localhost:5002/generate_certificate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, event_name: eventName }),
        }
      );

      if (!certResponse.ok) {
        throw new Error("Failed to generate certificate.");
      }

      const certBlob = await certResponse.blob();

      const formData = new FormData();
      formData.append("document", certBlob, "certificate.pdf");

      const uploadResponse = await fetch("http://localhost:9090/upload", {
        method: "POST",
        body: formData,
      });

      const data = await uploadResponse.json();
      console.log("Response Data from IPFS Upload:", data);

      if (data.json_ipfs_hash && data.file_ipfs_hash) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const con = import.meta.env.VITE_CONTRACT_ADDRESS;
        const contract = new ethers.Contract(con, ABI, signer);

        await contract.storeCID(data.json_ipfs_hash);
        alert("File successfully uploaded & stored on blockchain!");
        setShowEmailPopup(true);
      } else {
        alert("Failed to retrieve IPFS hashes from response.");
      }
    } catch (error) {
      console.error("Error in certificate generation/upload:", error);
      alert("Failed to generate or upload certificate.");
    } finally {
      setLoading(false);
    }
  };

  const handleSendCertificate = async () => {
    if (!email) {
      alert("Please enter a valid email.");
      return;
    }

    setSending(true);

    try {
      const response = await fetch("http://localhost:5002/send_certificate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, event_name: eventName, email }),
      });

      if (!response.ok) {
        throw new Error("Failed to send certificate.");
      }

      alert("Certificate sent successfully!");
      setShowEmailPopup(false);
    } catch (error) {
      console.error("Error sending certificate:", error);
      alert("Failed to send certificate.");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <NavBar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900 p-8">
        <div className="w-full max-w-xl bg-black bg-opacity-50 backdrop-blur-lg p-10 rounded-xl shadow-2xl border border-gray-700 text-white">
          <h2 className="text-3xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-6">
            Generate Certificate
          </h2>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Participant's Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            />
            <input
              type="text"
              placeholder="Event Name"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              required
              className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            />
          </div>
          <button
            onClick={handleUpload}
            className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-800 rounded-lg font-semibold text-white transition duration-300 shadow-lg ml-40"
          >
            {loading ? "Generating..." : "Generate Certificate"}
          </button>
        </div>

        {showEmailPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-lg flex items-center justify-center">
            <div className="bg-gray-900 p-6 rounded-xl shadow-xl w-80 text-white">
              <h3 className="text-xl font-semibold mb-4">Send Certificate</h3>
              <input
                type="email"
                placeholder="Recipient's Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSendCertificate}
                className="mt-4 w-full px-4 py-2 bg-green-600 hover:bg-green-800 rounded-lg font-semibold text-white transition duration-300 shadow-lg"
              >
                {sending ? "Sending..." : "Send"}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CertificateForm;