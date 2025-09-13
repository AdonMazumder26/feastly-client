import React, { useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { ArrowLeft, Utensils, Image, Tag, MapPin, Package, DollarSign, FileText } from "lucide-react";
import { toast } from "react-toastify";
import Footer from '../shared/Footer';

export default function UpdateFood() {
    // const { id } = useParams(); // assume food id from route param
    const { darkMode } = useOutletContext();
    const [isLoading, setIsLoading] = useState(false);
    // const [food, setFood] = useState(null);

    const food = useLoaderData();

    // console.log(food);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData(e.target);

        const updatedFood = {
            name: formData.get("name"),
            image: formData.get("image"),
            category: formData.get("category"),
            quantity: Number(formData.get("quantity")),
            price: Number(formData.get("price")),
            origin: formData.get("origin"),
            description: formData.get("description"),
        };

        // console.log("Updated Food:", updatedFood);

        try {
            const response = await fetch(`http://localhost:5000/foods/${food._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedFood)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(`Backend error: ${response.status} - ${errorData.message || response.statusText}`);
            }

            const result = await response.json();
            toast.success("Food updated successfully:", result);
            // toast.success("✅ Food item updated successfully!");

            // Optionally redirect or refresh the page
            // navigate('/my-foods');

        } catch (error) {
            console.error("Failed to update food:", error);
            toast.error(`Failed to update food: ${error.message}`);
        } finally {
            setIsLoading(false);
        }

    };

    if (!food) {
        return (
            <>
                <div
                    className={`min-h-screen flex items-center justify-center px-4 ${darkMode ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"}`}
                >
                    <p className="text-lg font-medium">Loading food details...</p>
                </div>
                <Footer darkMode={darkMode}></Footer>
            </>
        );
    }

    return (
        <>
            <div
                className={`min-h-screen px-4 py-10 ${darkMode ? "bg-slate-950 text-slate-100" : "bg-gradient-to-br from-slate-50 to-gray-100 text-slate-900"}`}
            >
                <div className="mx-auto w-full max-w-3xl">
                    {/* Header with back */}
                    <div className="mb-6 flex items-center justify-between">
                        <Link
                            to="/allFoods"
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 hover:scale-105 ${darkMode ? "bg-slate-900/70 text-slate-200 hover:bg-slate-800/70 border border-slate-800/70" : "bg-white/80 text-slate-700 hover:bg-slate-50/80 border border-slate-200/70"} backdrop-blur-sm shadow-lg hover:shadow-xl`}
                        >
                            <ArrowLeft size={18} /> Back to All Foods
                        </Link>
                    </div>

                    <div className={`overflow-hidden rounded-3xl border shadow-2xl ${darkMode ? "bg-slate-900/80 border-slate-800/60 backdrop-blur-xl" : "bg-white/90 border-slate-200/60 backdrop-blur-xl"}`}>
                        <div className="px-6 py-6 md:px-10 md:py-10">
                            <div className="mb-8 flex items-center gap-3">
                                <div className={`${darkMode ? "bg-orange-500/20" : "bg-orange-100"} p-2 rounded-xl`}>
                                    <Utensils className={`${darkMode ? "text-orange-400" : "text-orange-600"}`} size={18} />
                                </div>
                                <h2 className="text-2xl md:text-3xl font-extrabold">Update Food Item</h2>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Food Name */}
                                <div>
                                    <label className={`mb-2 block text-sm font-semibold ${darkMode ? "text-slate-300" : "text-slate-700"}`}>Food Name</label>
                                    <div className="relative">
                                        <span className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
                                            <Tag size={16} />
                                        </span>
                                        <input
                                            type="text"
                                            name="name"
                                            defaultValue={food.name}
                                            className={`w-full rounded-xl border px-9 py-3 outline-none transition focus:ring-2 ${darkMode ? "bg-slate-900/60 border-slate-800 text-slate-100 focus:ring-orange-500" : "bg-white border-slate-200 text-slate-900 focus:ring-orange-500"}`}
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Food Image */}
                                <div>
                                    <label className={`mb-2 block text-sm font-semibold ${darkMode ? "text-slate-300" : "text-slate-700"}`}>Food Image URL</label>
                                    <div className="relative">
                                        <span className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
                                            <Image size={16} />
                                        </span>
                                        <input
                                            type="text"
                                            name="image"
                                            defaultValue={food.image}
                                            className={`w-full rounded-xl border px-9 py-3 outline-none transition focus:ring-2 ${darkMode ? "bg-slate-900/60 border-slate-800 text-slate-100 focus:ring-orange-500" : "bg-white border-slate-200 text-slate-900 focus:ring-orange-500"}`}
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Category & Origin */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className={`mb-2 block text-sm font-semibold ${darkMode ? "text-slate-300" : "text-slate-700"}`}>Category</label>
                                        <div className="relative">
                                            <span className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
                                                <Tag size={16} />
                                            </span>
                                            <input
                                                type="text"
                                                name="category"
                                                defaultValue={food.category}
                                                className={`w-full rounded-xl border px-9 py-3 outline-none transition focus:ring-2 ${darkMode ? "bg-slate-900/60 border-slate-800 text-slate-100 focus:ring-orange-500" : "bg-white border-slate-200 text-slate-900 focus:ring-orange-500"}`}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className={`mb-2 block text-sm font-semibold ${darkMode ? "text-slate-300" : "text-slate-700"}`}>Food Origin</label>
                                        <div className="relative">
                                            <span className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
                                                <MapPin size={16} />
                                            </span>
                                            <input
                                                type="text"
                                                name="origin"
                                                defaultValue={food.origin}
                                                className={`w-full rounded-xl border px-9 py-3 outline-none transition focus:ring-2 ${darkMode ? "bg-slate-900/60 border-slate-800 text-slate-100 focus:ring-orange-500" : "bg-white border-slate-200 text-slate-900 focus:ring-orange-500"}`}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Quantity & Price */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className={`mb-2 block text-sm font-semibold ${darkMode ? "text-slate-300" : "text-slate-700"}`}>Quantity</label>
                                        <div className="relative">
                                            <span className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
                                                <Package size={16} />
                                            </span>
                                            <input
                                                type="number"
                                                name="quantity"
                                                defaultValue={food.quantity}
                                                className={`w-full rounded-xl border px-9 py-3 outline-none transition focus:ring-2 ${darkMode ? "bg-slate-900/60 border-slate-800 text-slate-100 focus:ring-orange-500" : "bg-white border-slate-200 text-slate-900 focus:ring-orange-500"}`}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className={`mb-2 block text-sm font-semibold ${darkMode ? "text-slate-300" : "text-slate-700"}`}>Price ($)</label>
                                        <div className="relative">
                                            <span className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
                                                <DollarSign size={16} />
                                            </span>
                                            <input
                                                type="number"
                                                step="0.01"
                                                name="price"
                                                defaultValue={food.price}
                                                className={`w-full rounded-xl border px-9 py-3 outline-none transition focus:ring-2 ${darkMode ? "bg-slate-900/60 border-slate-800 text-slate-100 focus:ring-orange-500" : "bg-white border-slate-200 text-slate-900 focus:ring-orange-500"}`}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <div>
                                    <label className={`mb-2 block text-sm font-semibold ${darkMode ? "text-slate-300" : "text-slate-700"}`}>Description</label>
                                    <div className="relative">
                                        <span className={`pointer-events-none absolute left-3 top-4 ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
                                            <FileText size={16} />
                                        </span>
                                        <textarea
                                            name="description"
                                            defaultValue={food.description}
                                            className={`w-full rounded-xl border px-9 py-3 outline-none transition focus:ring-2 h-32 resize-none ${darkMode ? "bg-slate-900/60 border-slate-800 text-slate-100 focus:ring-orange-500" : "bg-white border-slate-200 text-slate-900 focus:ring-orange-500"}`}
                                            required
                                        ></textarea>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-xl hover:shadow-2xl ${isLoading ? "bg-slate-700 text-slate-300 cursor-not-allowed" : "bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600"}`}
                                    >
                                        {isLoading ? 'Updating…' : 'Update Item'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer darkMode={darkMode}></Footer>
        </>
    );
}
