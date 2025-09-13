import { useOutletContext, Link, useNavigate, useLocation } from "react-router-dom";
import { Globe, LogIn } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import Footer from '../shared/Footer';
import axios from "axios";
import { toast } from "react-toastify";

export default function Login() {
    // consuming darkMode from parent context
    const { darkMode } = useOutletContext();
    const navigate = useNavigate();
    const { logInUser, setUser, googleSingIn } = useContext(AuthContext);
    const location = useLocation();

    function handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        // TODO: hook up your login logic
        // console.log({ email, password });

        const from = location.state?.from?.pathname || "/";

        logInUser(email, password)
            .then(result => {
                const user = result.user;
                // navigate('/');
                // console.log(user.email);
                setUser(user);

                axios.post('http://localhost:5000/jwt', { email: email }, { withCredentials: true })

                navigate(from, { replace: true });

            })
            .catch(err => {
                toast.error(err.message);
            })


    }

    const handleGoogleSignIn = (e) => {
        e.preventDefault();
        googleSingIn()
            // .then(res => {
            //     console.log(res.user);
            // })
            .catch(err => {
                toast.error(err);
            })
    }

    // Conditional class helpers
    const cardClasses = darkMode
        ? "rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-sm sm:p-8"
        : "rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8";

    const headingClasses = darkMode ? "text-white" : "text-gray-900";
    const subtextClasses = darkMode ? "text-gray-300" : "text-gray-600";
    const labelClasses = darkMode ? "text-gray-200" : "text-gray-700";
    const mutedClasses = darkMode ? "text-gray-400" : "text-gray-500";

    const inputClasses = darkMode
        ? "block w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-gray-100 placeholder-gray-400 shadow-sm outline-none transition focus:border-rose-500 focus:ring-2 focus:ring-rose-500"
        : "block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm outline-none transition focus:border-rose-500 focus:ring-2 focus:ring-rose-500";

    const primaryBtnClasses = darkMode
        ? "inline-flex w-full items-center justify-center gap-2 rounded-lg bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-0"
        : "inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2";

    const googleBtnClasses = darkMode
        ? "inline-flex w-full items-center justify-center gap-2 rounded-lg border border-gray-700 bg-gray-900 px-4 py-2.5 text-sm font-medium text-gray-100 hover:bg-gray-800 transition"
        : "inline-flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-800 hover:bg-gray-50 transition";

    const linkAccentClasses = darkMode
        ? "font-medium text-rose-400 hover:text-rose-300"
        : "font-medium text-rose-600 hover:text-rose-700";

    return (<>

        <main
            className={`min-h-screen flex items-center justify-center px-4 ${darkMode ? "bg-gray-950" : "bg-gray-50"
                }`}
        >
            <div className="w-full max-w-md">
                <div className={cardClasses}>
                    <h1 className={`text-2xl font-semibold ${headingClasses}`}>
                        Welcome back
                    </h1>
                    <p className={`mt-1 text-sm ${subtextClasses}`}>
                        Don’t have an account?{" "}
                        <Link to="/register" className={linkAccentClasses}>
                            Register
                        </Link>
                    </p>

                    {/* Continue with Google */}
                    <div className="mt-6">
                        <button
                            type="button"
                            onClick={handleGoogleSignIn}
                            className={googleBtnClasses}
                        >
                            <Globe size={18} />
                            Continue with Google
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="my-6 flex items-center gap-4">
                        <div
                            className={darkMode ? "h-px flex-1 bg-gray-800" : "h-px flex-1 bg-gray-200"}
                        />
                        <span className={`${mutedClasses} text-xs`}>or</span>
                        <div
                            className={darkMode ? "h-px flex-1 bg-gray-800" : "h-px flex-1 bg-gray-200"}
                        />
                    </div>

                    {/* Login form */}
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {/* Email */}
                        <div>
                            <label htmlFor="email" className={`mb-1 block text-sm font-medium ${labelClasses}`}>
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

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className={`mb-1 block text-sm font-medium ${labelClasses}`}>
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                placeholder="••••••••"
                                className={inputClasses}
                            />
                        </div>

                        {/* Submit */}
                        <button type="submit" className={primaryBtnClasses}>
                            <LogIn size={16} />
                            Sign in
                        </button>
                    </form>
                </div>
            </div>

        </main>
        <Footer darkMode={darkMode}></Footer>
    </>
    );
}
