import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Sun, Moon, Menu } from "lucide-react";
import LogoUrl from "../../assets/logo2.svg"; // replace with your logo

export default function Navbar({ darkMode, toggleTheme }) {
    const [mobileOpen, setMobileOpen] = useState(false);

    const navLinkBase =
        "px-3 py-2 text-sm font-medium rounded-md transition-colors";
    const navLinkInactive =
        "text-gray-300 hover:text-white hover:bg-gray-800";
    const navLinkActive =
        "text-white bg-gray-800";

    return (
        <header className="sticky top-0 z-50 border-b border-gray-800 bg-gray-950/90 backdrop-blur">
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
                {/* Left: Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <img src={LogoUrl} alt="Feastly" className="h-8 w-8" />
                    <span className="hidden text-lg font-semibold text-white sm:inline">
                        Feastly
                    </span>
                </Link>

                {/* Middle: nav links */}
                <div className="hidden md:flex items-center gap-1">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `${navLinkBase} ${isActive ? navLinkActive : navLinkInactive}`
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/foods"
                        className={({ isActive }) =>
                            `${navLinkBase} ${isActive ? navLinkActive : navLinkInactive}`
                        }
                    >
                        All Foods
                    </NavLink>
                    <NavLink
                        to="/gallery"
                        className={({ isActive }) =>
                            `${navLinkBase} ${isActive ? navLinkActive : navLinkInactive}`
                        }
                    >
                        Gallery
                    </NavLink>
                </div>

                {/* Right: actions */}
                <div className="flex items-center gap-2 sm:gap-3">
                    {/* Theme toggle */}
                    <button
                        onClick={() => toggleTheme(!darkMode)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-gray-700 bg-gray-900 text-gray-200 hover:bg-gray-800"
                        aria-label="Toggle theme"
                    >
                        {darkMode ? <Moon size={18} /> : <Sun size={18} />}
                    </button>

                    {/* Profile dropdown */}
                    <div className="relative group">
                        <button className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full ring-1 ring-gray-700 hover:ring-gray-500 focus:outline-none">
                            <img
                                src="https://i.pravatar.cc/100" // placeholder avatar
                                alt="Profile"
                                className="h-full w-full object-cover"
                            />
                        </button>

                        <div
                            className="absolute right-0 mt-2 w-44 origin-top-right overflow-hidden rounded-xl border border-gray-700 bg-gray-900 shadow-lg opacity-0 scale-95 pointer-events-none transition
                         group-focus-within:opacity-100 group-focus-within:scale-100 group-focus-within:pointer-events-auto"
                            role="menu"
                        >
                            <Link
                                to="/dashboard/my-food"
                                className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-800"
                            >
                                My Food
                            </Link>
                            <Link
                                to="/dashboard/add-foods"
                                className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-800"
                            >
                                Add Foods
                            </Link>
                            <Link
                                to="/dashboard/orders"
                                className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-800"
                            >
                                Orders
                            </Link>
                        </div>
                    </div>

                    {/* Mobile menu toggle */}
                    <button
                        onClick={() => setMobileOpen((o) => !o)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-gray-700 bg-gray-900 text-gray-200 hover:bg-gray-800 md:hidden"
                    >
                        <Menu size={18} />
                    </button>
                </div>
            </nav>

            {/* Mobile nav */}
            <div
                className={`md:hidden border-t border-gray-800 ${mobileOpen ? "block" : "hidden"
                    }`}
            >
                <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 sm:px-6 lg:px-8">
                    <NavLink
                        to="/"
                        onClick={() => setMobileOpen(false)}
                        className={({ isActive }) =>
                            `${navLinkBase} ${isActive ? navLinkActive : navLinkInactive}`
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/foods"
                        onClick={() => setMobileOpen(false)}
                        className={({ isActive }) =>
                            `${navLinkBase} ${isActive ? navLinkActive : navLinkInactive}`
                        }
                    >
                        All Foods
                    </NavLink>
                    <NavLink
                        to="/gallery"
                        onClick={() => setMobileOpen(false)}
                        className={({ isActive }) =>
                            `${navLinkBase} ${isActive ? navLinkActive : navLinkInactive}`
                        }
                    >
                        Gallery
                    </NavLink>
                </div>
            </div>
        </header>
    );
}
