import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';  
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ethers } from 'ethers';
import ChatButton from './help';

const AdminHomepage = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userAddress, setUserAddress] = useState("");
    const router = useNavigate();

    useEffect(() => {
        const checkMetamask = async () => {
            if (window.ethereum) {
                try {
                    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                    if (accounts.length > 0) {
                        setIsAuthenticated(true);
                        setUserAddress(accounts[0]); 
                    }
                } catch (error) {
                    console.error("Error checking Metamask:", error);
                }
            }
        };

        checkMetamask();
    }, []);

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setIsAuthenticated(true);
                setUserAddress(accounts[0]); 
            } catch (error) {
                console.error("User rejected Metamask connection:", error);
            }
        } else {
            alert("Metamask not detected. Please install Metamask.");
        }
    };

    return (
        <div className="bg-black w-full font-sans">
            {/* Navbar */}
            <Navbar />

            {/* Hero Section */}
            <div className="relative w-full h-screen flex flex-col items-center justify-center text-white text-center">
                {/* Background Animation */}
                <img
                    className="absolute top-0 left-0 w-full h-full object-cover opacity-40"
                    src="https://img.freepik.com/free-vector/gradient-connection-background_52683-116380.jpg"
                    alt="Blockchain Background"
                />

                <div className="relative z-10">
                    <h1 className="text-5xl font-bold">AUTENTICA Admin Panel</h1>
                    <h3 className="text-xl mt-4">
                        Secure. Efficient. Scalable.
                    </h3>

                    {/* Key Features */}
                    <div className="mt-6 space-y-3 text-lg">
                        <p>✔ Manage and verify documents using blockchain technology</p>
                        <p>✔ Oversee user activity and system analytics</p>
                        <p>✔ Ensure end-to-end security and authentication</p>
                    </div>

                    {/* Admin-Specific Features as Animated Cards */}
                    <div className="mt-10 flex gap-6">
                        {/* Access Control */}
                        <motion.div
                            className="bg-white/10 p-6 rounded-2xl shadow-lg backdrop-blur-md border border-white/20 w-64"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h3 className="text-xl font-bold">🔐 Access Control</h3>
                            <p className="text-sm mt-2">Grant or revoke user permissions securely.</p>
                        </motion.div>

                        {/* Document Management */}
                        <motion.div
                            className="bg-white/10 p-6 rounded-2xl shadow-lg backdrop-blur-md border border-white/20 w-64"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0, transitionDelay: 0.2 }}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h3 className="text-xl font-bold">📂 Document Management</h3>
                            <p className="text-sm mt-2">Track verified and pending documents.</p>
                        </motion.div>

                        {/* System Analytics */}
                        <motion.div
                            className="bg-white/10 p-6 rounded-2xl shadow-lg backdrop-blur-md border border-white/20 w-64"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0, transitionDelay: 0.4 }}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h3 className="text-xl font-bold">📊 System Analytics</h3>
                            <p className="text-sm mt-2">Monitor security and user activity insights.</p>
                        </motion.div>
                    </div>

                    {/* Metamask Authentication Logic */}
                    {isAuthenticated ? (
                        <button
                            className="mt-10 bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-800 transition duration-300"
                            onClick={() => router('/dashboard')}
                        >
                            Go to Admin Dashboard
                        </button>
                    ) : (
                        <button
                            className="mt-10 bg-red-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-red-700 transition duration-300"
                            onClick={connectWallet}
                        >
                            Sign Up
                        </button>
                    )}

                    {/* Show User Wallet Address If Connected */}
                    {isAuthenticated && (
                        <p className="mt-4 text-sm text-gray-300">
                            Connected as: {userAddress.slice(0, 6)}...{userAddress.slice(-4)}
                        </p>
                    )}
                </div>
                <ChatButton/>
            </div>

            {/* Footer */}
            <footer className="backdrop-blur-md border border-white/10 py-8 text-center text-white">
                <p>&copy; {new Date().getFullYear()} AUTENTICA Admin Panel. All rights reserved.</p>
                <div className="mt-4">
                    <p>📧 Email: admin@autentica.com</p>
                    <p>📞 Contact: +91 9801538293</p>
                    <p>💬 Support: Admin Helpdesk | 24/7 Monitoring</p>
                </div>
            </footer>
        </div>
    );
};

export default AdminHomepage;