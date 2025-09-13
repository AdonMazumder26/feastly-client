// import { useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Sun, Moon } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../provider/AuthProvider";
import { useContext } from "react";
import Footer from '../shared/Footer';


export default function Register() {
    // const [darkMode, setDarkMode] = useState(false);

    // const toggleTheme = () => {
    //     setDarkMode(!darkMode);
    // };

    const navigate = useNavigate();

    const { darkMode } = useOutletContext();
    const { createUser, updateUserProfile } = useContext(AuthContext);
    function handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const photoURL = form.photoURL.value;
        const password = form.password.value;



        // Password validation rules
        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long.");
            return;
        }
        if (!/[A-Z]/.test(password)) {
            toast.error("Password must contain at least one uppercase letter.");
            return;
        }
        if (!/[a-z]/.test(password)) {
            toast.error("Password must contain at least one lowercase letter.");
            return;
        }



        createUser(email, password)
            .then(result => {
                const user = result.user;
                // console.log(user);
                toast.success("hello ", user);
                updateUserProfile({ displayName: name, photoURL: photoURL })
                    .then(() => {
                        navigate("/");
                        toast.success("Registration successful! 🎉");
                    })
                    .catch(error => {
                        toast.error(error);
                    })

            })
            .catch(err => toast.error(err.message))




        // console.log({ name, email, photoURL, password });
    }

    // Helper function for conditional styling
    const inputClasses = darkMode
        ? "block w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-gray-100 placeholder-gray-400 shadow-sm outline-none transition focus:border-rose-500 focus:ring-2 focus:ring-rose-500"
        : "block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm outline-none transition focus:border-rose-500 focus:ring-2 focus:ring-rose-500";

    return (
        <>
            <main
                className={`min-h-screen flex items-center justify-center px-4 ${darkMode ? "bg-gray-950" : "bg-gray-50"
                    }`}
            >
                <ToastContainer position="top-right" autoClose={3000} />

                {/* Theme toggle button
            <button
                onClick={toggleTheme}
                className={`absolute top-4 right-4 inline-flex h-9 w-9 items-center justify-center rounded-md border shadow-sm ${darkMode
                    ? "border-gray-700 bg-gray-900 text-gray-200 hover:bg-gray-800"
                    : "border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                aria-label="Toggle theme"
            >
                {darkMode ? <Moon size={18} /> : <Sun size={18} />}
            </button> */}

                {/* Register card */}
                <div className="w-full max-w-md">
                    <div
                        className={`rounded-2xl border p-6 shadow-sm sm:p-8 ${darkMode
                            ? "border-gray-800 bg-gray-900"
                            : "border-gray-200 bg-white"
                            }`}
                    >
                        <h1
                            className={`text-2xl font-semibold ${darkMode ? "text-white" : "text-gray-900"
                                }`}
                        >
                            Create an account
                        </h1>
                        <p
                            className={`mt-1 text-sm ${darkMode ? "text-gray-300" : "text-gray-600"
                                }`}
                        >
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className={`font-medium ${darkMode
                                    ? "text-rose-400 hover:text-rose-300"
                                    : "text-rose-600 hover:text-rose-700"
                                    }`}
                            >
                                Sign in
                            </Link>
                        </p>

                        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                            {/* Name */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className={`mb-1 block text-sm font-medium ${darkMode ? "text-gray-200" : "text-gray-700"
                                        }`}
                                >
                                    Name
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    placeholder="Your full name"
                                    className={inputClasses}
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className={`mb-1 block text-sm font-medium ${darkMode ? "text-gray-200" : "text-gray-700"
                                        }`}
                                >
                                    Email
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="you@example.com"
                                    className={inputClasses}
                                />
                            </div>

                            {/* Photo URL */}
                            <div>
                                <label
                                    htmlFor="photoURL"
                                    className={`mb-1 block text-sm font-medium ${darkMode ? "text-gray-200" : "text-gray-700"
                                        }`}
                                >
                                    Photo URL
                                </label>
                                <input
                                    id="photoURL"
                                    name="photoURL"
                                    type="url"
                                    placeholder="https://example.com/avatar.jpg"
                                    className={inputClasses}
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label
                                    htmlFor="password"
                                    className={`mb-1 block text-sm font-medium ${darkMode ? "text-gray-200" : "text-gray-700"
                                        }`}
                                >
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    placeholder="••••••••"
                                    minLength={6}
                                    className={inputClasses}
                                />
                                <p
                                    className={`mt-1 text-xs ${darkMode ? "text-gray-400" : "text-gray-500"
                                        }`}
                                >
                                    Must have an uppercase & lowercase letter, at least 6 characters.
                                </p>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                className={`mt-2 inline-flex w-full items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold shadow-sm transition focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 ${darkMode
                                    ? "bg-rose-600 text-white hover:bg-rose-500 focus:ring-offset-gray-900"
                                    : "bg-gray-900 text-white hover:bg-gray-800 focus:ring-offset-gray-100"
                                    }`}
                            >
                                Create account
                            </button>
                        </form>
                    </div>
                </div>

            </main>  <Footer darkMode={darkMode}></Footer> </>
    );
}
