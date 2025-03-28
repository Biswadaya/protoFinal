import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import ABI from "./abi.json";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();

  useEffect(() => {
    const getWalletAddress = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          setWalletAddress(accounts[0]);
        } catch (error) {
          console.error("Error fetching wallet address:", error);
        }
      } else {
        alert("MetaMask is not installed. Please install it to continue.");
      }
    };
    getWalletAddress();
  }, []);

  const handleSignup = async () => {
    if (!walletAddress) {
      alert("Please connect your wallet first.");
      return;
    }

    try {
      setLoading(true);
      if (!window.ethereum) throw new Error("Ethereum wallet not detected.");

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
      const contract = new ethers.Contract(contractAddress, ABI, signer);

      const tx = await contract.signup();
      await tx.wait();

      alert("Signup successful!");
      navigate('/dashboard');
    } catch (error) {
      console.error("Signup error:", error);
      alert("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900">
      <div className="bg-black bg-opacity-30 backdrop-blur-lg p-10 rounded-xl shadow-2xl text-center border border-gray-600">
        <h1 className="text-4xl font-extrabold text-white mb-4">Sign Up</h1>
        <p className="text-gray-300 text-lg mb-6">
          Connect your wallet to get started.
        </p>

        {/* Wallet Connection Button */}
        <button
          onClick={handleSignup}
          disabled={loading}
          className={`w-full px-6 py-3 rounded-lg font-semibold text-lg transition duration-300 ${
            loading
              ? "bg-gray-500 cursor-not-allowed text-gray-300"
              : "bg-blue-600 hover:bg-blue-800 text-white"
          }`}
        >
          {loading ? "Signing up..." : "Connect with MetaMask"}
        </button>

        {/* Wallet Address Display */}
        {walletAddress && (
          <p className="text-gray-400 mt-4 text-sm">
            Connected:{" "}
            <span className="text-blue-400 font-medium">
              {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default SignupPage;
