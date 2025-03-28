import React, { useState } from "react";
import { CloudUpload, FileCheck, Download, Eye, QrCode } from "lucide-react";
import QRCode from "react-qr-code"; // Import QR Code generator
import FloatingButton from "./help";
import im from "./favicon-16x16.png";

const VerificationPage = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [verificationResult, setVerificationResult] = useState(null);
    const [verifiedFiles, setVerifiedFiles] = useState([]);
    const [qrModal, setQrModal] = useState({ isOpen: false, url: "" });

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setVerificationResult(null);
        }
    };

    const handleVerify = async () => {
        if (!file) {
            setVerificationResult({ status: "error", message: "⚠️ Please select a file to verify." });
            return;
        }

        setLoading(true);
        setVerificationResult(null);

        const formData = new FormData();
        formData.append("document", file);

        try {
            const response = await fetch("http://localhost:9090/verify", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Verification Response:", data);

            if (data.verification === "SUCCESS") {
                setVerificationResult({ status: "success", message: "✅ Document successfully verified!" });

                // Store verified file
                setVerifiedFiles((prevFiles) => [
                    ...prevFiles,
                    { name: file.name, url: URL.createObjectURL(file), size: file.size },
                ]);
            } else {
                setVerificationResult({ status: "error", message: "❌ Verification failed! Document is not authentic." });
            }
        } catch (error) {
            console.error("Error verifying file:", error);
            setVerificationResult({ status: "error", message: "❌ Error verifying the document. Please try again." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-blue-900 p-8 relative">
            {/* Glass Effect Navbar */}
            <nav className="fixed top-0 left-0 w-full z-50 bg-white/20 backdrop-blur-md shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <img src={im} alt="Logo" className="h-10 w-10 mr-2" />
                            <span className="text-lg font-semibold text-white drop-shadow-lg">Authentica</span>
                        </div>
                        <div className="hidden md:flex space-x-6">
                            <a href="/" className="text-white hover:text-gray-200 transition duration-300">Home</a>
                            <a href="/about" className="text-white hover:text-gray-200 transition duration-300">About</a>
                            <a href="/contact" className="text-white hover:text-gray-200 transition duration-300">Contact</a>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Verification Box */}
            <div className="mt-20 bg-white/20 backdrop-blur-lg shadow-md rounded-lg p-8 max-w-md w-full text-center">
                <h2 className="text-2xl font-bold text-white mb-6">Verify Your Document</h2>

                <div className="flex flex-col items-center">
                    <label
                        htmlFor="file-upload"
                        className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-blue-500 bg-gray-900 bg-opacity-40 rounded-lg cursor-pointer transition hover:border-blue-300 hover:scale-105 duration-200 mb-4"
                    >
                        <CloudUpload className="w-12 h-12 text-blue-400 mb-2" />
                        <p className="text-white text-center font-medium px-4">
                            {file ? file.name : "Click or Drag to Upload"}
                        </p>
                    </label>
                    <input id="file-upload" type="file" onChange={handleFileChange} className="hidden" accept=".pdf,.doc,.docx,.png,.jpg,.jpeg" />

                    <button
                        onClick={handleVerify}
                        disabled={loading || !file}
                        className={`w-full px-6 py-3 rounded-lg font-semibold text-lg transition duration-300 shadow-lg ${
                            loading || !file ? "bg-gray-600 cursor-not-allowed text-gray-300" : "bg-blue-600 hover:bg-blue-800 text-white transform hover:scale-105"
                        }`}
                    >
                        {loading ? "Verifying..." : "Verify Document"}
                    </button>

                    {verificationResult && (
                        <div className={`mt-4 p-3 rounded-lg w-full ${
                            verificationResult.status === "success" ? "bg-green-900/30 text-green-400" : "bg-red-900/30 text-red-400"
                        }`}>
                            <p className="text-lg font-semibold">{verificationResult.message}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Verified Documents Dashboard */}
            {verifiedFiles.length > 0 && (
                <div className="mt-10 bg-white/20 backdrop-blur-lg shadow-md rounded-lg p-6 max-w-4xl w-full">
                    <h2 className="text-xl font-bold text-white mb-4">Verified Documents:-</h2>
                    <div className="ml-20 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {verifiedFiles.map((doc, index) => (
                            <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-md flex flex-col items-center w-2xl">
                                <FileCheck className="text-green-400 w-12 h-12 mb-2" />
                                <p className="text-white font-semibold">{doc.name}</p>
                                <p className="text-gray-400 text-sm mb-2">{(doc.size / 1024).toFixed(2)} KB</p>
                                <div className="flex space-x-3">
                                    <a href={doc.url} target="_blank" rel="noopener noreferrer">
                                        <Eye className="text-blue-400 w-6 h-6 cursor-pointer hover:text-blue-500" />
                                    </a>
                                    <a href={doc.url} download={doc.name}>
                                        <Download className="text-white w-6 h-6 cursor-pointer hover:text-gray-300" />
                                    </a>
                                    <button onClick={() => setQrModal({ isOpen: true, url: doc.url })}>
                                        <QrCode className="text-green-400 w-6 h-6 cursor-pointer hover:text-green-500" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* QR Code Modal */}
            {qrModal.isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-lg font-semibold mb-2">Scan to Download</h2>
                        <QRCode value={qrModal.url} size={200} />
                        <button onClick={() => setQrModal({ isOpen: false, url: "" })} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg">Close</button>
                    </div>
                </div>
            )}

            {/* Floating Button */}
            <FloatingButton />
        </div>
    );
};

export default VerificationPage;
