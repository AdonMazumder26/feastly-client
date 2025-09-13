import { useContext, useRef, useState } from "react";
import { Sun, Moon, Menu, LogIn, LogOut } from "lucide-react";
import { AuthContext } from "../../provider/AuthProvider";
import { Link } from "react-router-dom";
// import { useOutletContext } from "react-router-dom";

export default function Navbar({ darkMode, toggleTheme }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { logOut, user } = useContext(AuthContext);

    const [open, setOpen] = useState(false);
    const wrapRef = useRef(null);

    const handleBlur = (e) => {
        const next = e.relatedTarget;
        if (!wrapRef.current?.contains(next)) setOpen(false);
    };

    // const [darkMode, setDarkMode] = useState(false);

    // const toggleTheme = () => {
    //     setDarkMode(!darkMode);
    //     document.documentElement.classList.toggle("dark");
    // };

    // const { darkMode, toggleTheme } = useOutletContext();

    const navLink =
        "px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ease-in-out";
    const navLinkIdle =
        "text-gray-600 hover:text-gray-900 hover:bg-gray-100/80 hover:shadow-sm dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800/80 dark:hover:shadow-sm";

    return (
        <header className="sticky top-0 z-50 border-b border-gray-200/50 bg-white/90 backdrop-blur-md shadow-sm dark:border-gray-800/50 dark:bg-gray-950/90">
            <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
                {/* Left: website name */}
                <Link
                    to="/"
                    className="text-xl font-bold text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200"
                >
                    <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                        Feastly
                    </span>
                </Link>

                {/* Middle: links (hidden on mobile) */}
                <div className="hidden md:flex items-center gap-2">
                    <Link to="/" className={`${navLink} ${navLinkIdle}`}>
                        Home
                    </Link>
                    <Link to="/allFoods" className={`${navLink} ${navLinkIdle}`}>
                        All Food
                    </Link>
                    <Link to="/gallery" className={`${navLink} ${navLinkIdle}`}>
                        Gallery
                    </Link>
                </div>

                {/* Right: theme toggle + login + mobile menu */}
                <div className="flex items-center gap-2 sm:gap-3">
                    {/* image icon */}
                    <div>
                        {user &&
                            <div ref={wrapRef} className="relative" onBlur={handleBlur}>
                                {/* Avatar is the ONLY clickable element */}
                                <button
                                    type="button"
                                    onClick={() => setOpen((o) => !o)}
                                    className="rounded-full ring-2 ring-gray-200/50 hover:ring-gray-300/70 focus:outline-none focus:ring-2 focus:ring-orange-400/50 transition-all duration-200 shadow-sm hover:shadow-md dark:ring-gray-700/50 dark:hover:ring-gray-600/70 dark:focus:ring-orange-400/50"
                                    aria-haspopup="menu"
                                    aria-expanded={open}
                                >
                                    <img
                                        src={user.photoURL} // replace with actual user avatar
                                        alt="Profile"
                                        className="h-9 w-9 rounded-full object-cover ring-1 ring-white/20"
                                    />
                                </button>

                                {/* Dropdown */}
                                <div
                                    className={`absolute right-0 mt-3 w-48 origin-top-right overflow-hidden rounded-2xl border bg-white/95 backdrop-blur-md shadow-xl transition-all duration-200 ease-out
                                      dark:bg-gray-900/95
                                      ${open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"}
                                      border-gray-200/50 dark:border-gray-700/50`}
                                    role="menu"
                                >
                                    <Link
                                        to={`/myFoods/${user.email}`}
                                        className="block px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100/80 hover:text-gray-900 transition-colors duration-150 dark:text-gray-200 dark:hover:bg-gray-800/80 dark:hover:text-white"
                                        tabIndex={open ? 0 : -1}
                                    >
                                        My Foods
                                    </Link>
                                    <Link
                                        to={"/addFood"}
                                        className="block px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100/80 hover:text-gray-900 transition-colors duration-150 dark:text-gray-200 dark:hover:bg-gray-800/80 dark:hover:text-white"
                                        tabIndex={open ? 0 : -1}
                                    >
                                        Add Food
                                    </Link>
                                    <Link
                                        to={`/myOrders/${user.email}`}
                                        className="block px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100/80 hover:text-gray-900 transition-colors duration-150 dark:text-gray-200 dark:hover:bg-gray-800/80 dark:hover:text-white"
                                        tabIndex={open ? 0 : -1}
                                    >
                                        My Orders
                                    </Link>
                                </div>
                            </div>
                        }
                    </div>



                    {/* Theme toggle */}
                    <button
                        onClick={toggleTheme}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200/50 bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-gray-50/80 hover:shadow-md transition-all duration-200 dark:border-gray-700/50 dark:bg-gray-900/80 dark:text-gray-200 dark:hover:bg-gray-800/80"
                        aria-label="Toggle theme"
                    >
                        {darkMode ? <Moon size={18} /> : <Sun size={18} />}
                    </button>

                    {
                        user ?
                            < button
                                onClick={logOut}
                                href="/login"
                                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-gray-900 to-gray-800 px-4 py-2.5 text-sm font-semibold text-white hover:from-gray-800 hover:to-gray-700 hover:shadow-lg transition-all duration-200 dark:from-white dark:to-gray-100 dark:text-gray-900 dark:hover:from-gray-100 dark:hover:to-gray-200"
                            >
                                <LogOut size={16} /> LogOut
                            </button>
                            :
                            // {/* Login button */ }
                            < Link
                                to={"/auth/login"}

                                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2.5 text-sm font-semibold text-white hover:from-orange-600 hover:to-red-600 hover:shadow-lg transition-all duration-200"
                            >
                                <LogIn size={16} /> LogIn
                            </Link>
                    }

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setMobileOpen((o) => !o)}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200/50 bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-gray-50/80 hover:shadow-md transition-all duration-200 md:hidden dark:border-gray-700/50 dark:bg-gray-900/80 dark:text-gray-200 dark:hover:bg-gray-800/80"
                        aria-label="Toggle menu"
                    >
                        <Menu size={18} />
                    </button>
                </div>
            </nav>

            {/* Mobile links */}
            <div
                className={`md:hidden border-t border-gray-200/50 bg-white/95 backdrop-blur-md dark:border-gray-800/50 dark:bg-gray-950/95 ${mobileOpen ? "block" : "hidden"
                    }`}
            >
                <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 sm:px-6 lg:px-8">
                    <Link to="/" className={`${navLink} ${navLinkIdle}`}>
                        Home
                    </Link>
                    <Link to="/allFoods" className={`${navLink} ${navLinkIdle}`}>
                        All Food
                    </Link>
                    <Link to="/gallery" className={`${navLink} ${navLinkIdle}`}>
                        Gallery
                    </Link>
                </div>

            </div>
        </header >
    );
}
