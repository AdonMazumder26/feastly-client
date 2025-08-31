import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function Register() {
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

        // ✅ Passed all checks
        toast.success("Registration successful! 🎉");
        console.log({ name, email, photoURL, password });
    }

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4">
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="w-full max-w-md">
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-8">
                    <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                        Create an account
                    </h1>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="font-medium text-rose-600 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300"
                        >
                            Sign in
                        </Link>
                    </p>

                    <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                        {/* Name */}
                        <div>
                            <label
                                htmlFor="name"
                                className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200"
                            >
                                Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                placeholder="Your full name"
                                className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm outline-none transition placeholder-gray-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200"
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                placeholder="you@example.com"
                                className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm outline-none transition placeholder-gray-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
                            />
                        </div>

                        {/* Photo URL */}
                        <div>
                            <label
                                htmlFor="photoURL"
                                className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200"
                            >
                                Photo URL
                            </label>
                            <input
                                id="photoURL"
                                name="photoURL"
                                type="url"
                                placeholder="https://example.com/avatar.jpg"
                                className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm outline-none transition placeholder-gray-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label
                                htmlFor="password"
                                className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                placeholder="••••••••"
                                className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm outline-none transition placeholder-gray-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
                            />
                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                Must have an uppercase & lowercase letter, at least 6 characters.
                            </p>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 dark:bg-rose-600 dark:hover:bg-rose-500 dark:focus:ring-rose-400 dark:ring-offset-gray-900"
                        >
                            Create account
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}
