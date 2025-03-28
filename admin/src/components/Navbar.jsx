import im from './favicon-16x16.png'
export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 w-full bg-white/10 backdrop-blur-md border border-white/10 rounded-lg shadow-lg z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="flex justify-between items-center h-16">
                    {/* Logo & Name */}
                    <div className="flex items-center">
                        <img 
                            src={im}
                            alt="Logo" 
                            className="h-10 w-10 mr-2" 
                        />
                        <span className="text-lg font-semibold text-white">Authentica</span>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:flex space-x-6 items-center">
                        <a href="/" className="text-white hover:text-blue-400 transition duration-300 cursor-pointer">Home</a>
                        <a href="/about" className="text-white hover:text-blue-400 transition duration-300 cursor-pointer">About</a>
                        <a href="/contact" className="text-white hover:text-blue-400 transition duration-300 cursor-pointer">Contact</a>
                        <a href="/upload" className="text-white hover:text-blue-400 transition duration-300 cursor-pointer">Upload</a>
                    </div>
                </div>
            </div>
        </nav>
    );
}
