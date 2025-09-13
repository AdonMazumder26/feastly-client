import { FacebookIcon, InstagramIcon, TwitterIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer({ darkMode }) {
    // const { darkMode } = useOutletContext();

    const footerClasses = darkMode
        ? "bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 border-t border-gray-800/50 backdrop-blur-sm"
        : "bg-gradient-to-br from-gray-50 via-white to-gray-100 border-t border-gray-200/50 backdrop-blur-sm";

    const headingClasses = darkMode ? "text-white" : "text-gray-900";
    const subtextClasses = darkMode ? "text-gray-300" : "text-gray-600";
    const linkClasses = darkMode
        ? "text-gray-300 hover:text-white hover:bg-gray-800/50 px-2 py-1 rounded-lg transition-all duration-200"
        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/80 px-2 py-1 rounded-lg transition-all duration-200";

    const sectionHeading = darkMode
        ? "text-sm font-bold uppercase tracking-wider text-gray-200 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent"
        : "text-sm font-bold uppercase tracking-wider text-gray-700 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent";

    const contactText = darkMode ? "text-gray-300" : "text-gray-600";

    const socialIconClasses = darkMode
        ? "text-gray-400 hover:text-orange-400 hover:bg-gray-800/50 p-2 rounded-xl transition-all duration-200 hover:scale-110"
        : "text-gray-500 hover:text-orange-500 hover:bg-gray-100/80 p-2 rounded-xl transition-all duration-200 hover:scale-110";

    const bottomText = darkMode ? "text-gray-400" : "text-gray-500";

    return (
        <footer className={footerClasses}>
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid gap-10 md:grid-cols-3">
                    {/* Brand */}
                    <div className="space-y-4">
                        <h2 className={`text-2xl font-bold ${headingClasses}`}>
                            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                                Feastly
                            </span>
                        </h2>
                        <p className={`text-sm leading-relaxed ${subtextClasses}`}>
                            Delicious moments, made simple.
                            Order your favorite meals with ease and enjoy the finest culinary experiences.
                        </p>
                        <div className="flex space-x-1">
                            <div className="h-1 w-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
                            <div className="h-1 w-4 bg-gradient-to-r from-orange-400 to-red-400 rounded-full"></div>
                            <div className="h-1 w-2 bg-gradient-to-r from-orange-300 to-red-300 rounded-full"></div>
                        </div>
                    </div>

                    {/* Links */}
                    <div className="space-y-4">
                        <h3 className={sectionHeading}>Quick Links</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/" className={linkClasses}>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/allFoods" className={linkClasses}>
                                    All Foods
                                </Link>
                            </li>
                            <li>
                                <Link to="/gallery" className={linkClasses}>
                                    Gallery
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="space-y-4">
                        <h3 className={sectionHeading}>Contact Us</h3>
                        <ul className={`space-y-3 text-sm ${contactText}`}>
                            <li className="flex items-center space-x-2">
                                <div className="h-1 w-1 bg-orange-500 rounded-full"></div>
                                <span>Email: support@feastly.com</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <div className="h-1 w-1 bg-orange-500 rounded-full"></div>
                                <span>Phone: +1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <div className="h-1 w-1 bg-orange-500 rounded-full"></div>
                                <span>Location: New York, USA</span>
                            </li>
                        </ul>
                        <div className="flex space-x-2">
                            <a href="#" className={socialIconClasses} aria-label="Facebook">
                                <FacebookIcon size={20} />
                            </a>
                            <a href="#" className={socialIconClasses} aria-label="Instagram">
                                <InstagramIcon size={20} />
                            </a>
                            <a href="#" className={socialIconClasses} aria-label="Twitter">
                                <TwitterIcon size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div
                    className={`mt-12 border-t pt-8 ${darkMode ? "border-gray-800/50" : "border-gray-200/50"
                        }`}
                >
                    <div className="flex flex-col items-center space-y-4">
                        <p className={`text-center text-sm ${bottomText}`}>
                            © {new Date().getFullYear()} Feastly. All rights reserved.
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                            <span>Privacy Policy</span>
                            <div className="h-1 w-1 bg-gray-400 rounded-full"></div>
                            <span>Terms of Service</span>
                            <div className="h-1 w-1 bg-gray-400 rounded-full"></div>
                            <span>Cookie Policy</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
