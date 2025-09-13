import React, { useContext } from "react";
import { useOutletContext } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import Swal from "sweetalert2";
import Footer from '../shared/Footer';

export default function AddFood() {
    const { user } = useContext(AuthContext);
    const { darkMode } = useOutletContext();
    // console.log(user);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const foodItem = {
            name: formData.get("name"),
            image: formData.get("image"),
            category: formData.get("category"),
            quantity: Number(formData.get("quantity")),
            price: Number(formData.get("price")),
            origin: formData.get("origin"),
            description: formData.get("description"),
            addedBy: {
                name: user?.name || "Anonymous",
                email: user?.email || "unknown@example.com",
            },
        };


        fetch("http://localhost:5000/foods", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(foodItem)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged === true) {
                    Swal.fire({
                        title: "Are you sure you want to add this food?",
                        text: "Please confirm to add the food item.",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, add it!"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            Swal.fire({
                                title: "Food Added!",
                                text: "Your food has been added. Check My Foods page.",
                                icon: "success"
                            });
                        }
                    });
                }
            })

        // console.log("Food item to be added:", foodItem);

        alert("✅ Food item added successfully!");
        e.target.reset();

    };

    return (
        <>
            <div
                className={`min-h-screen flex items-center justify-center px-4 ${darkMode ? "bg-gray-950 text-white" : "bg-gray-100 text-gray-900"
                    }`}
            >
                <div
                    className={`w-full max-w-2xl p-8 rounded-2xl shadow-xl transition-all duration-300 ${darkMode ? "bg-gray-900" : "bg-white"
                        }`}
                >
                    <h2 className="text-3xl font-extrabold mb-6 text-center">
                        🍽️ Add a New Food Item
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Food Name */}
                        <div>
                            <label className="block mb-1 font-medium">Food Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter food name"
                                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none transition bg-transparent"
                                required
                            />
                        </div>

                        {/* Food Image */}
                        <div>
                            <label className="block mb-1 font-medium">Food Image URL</label>
                            <input
                                type="url"
                                name="image"
                                placeholder="Paste food image link"
                                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none transition bg-transparent"
                                required
                            />
                        </div>

                        {/* Category & Origin */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-1 font-medium">Category</label>
                                <input
                                    type="text"
                                    name="category"
                                    placeholder="e.g., Italian, Chinese"
                                    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none transition bg-transparent"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Food Origin</label>
                                <input
                                    type="text"
                                    name="origin"
                                    placeholder="Country of origin"
                                    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none transition bg-transparent"
                                    required
                                />
                            </div>
                        </div>

                        {/* Quantity & Price */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-1 font-medium">Quantity</label>
                                <input
                                    type="number"
                                    name="quantity"
                                    placeholder="Enter quantity"
                                    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none transition bg-transparent"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Price ($)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    name="price"
                                    placeholder="Enter price"
                                    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none transition bg-transparent"
                                    required
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block mb-1 font-medium">Description</label>
                            <textarea
                                name="description"
                                placeholder="Short description: ingredients, procedure, etc."
                                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none transition bg-transparent h-28 resize-none"
                                required
                            ></textarea>
                        </div>

                        {/* Added By */}
                        <div>
                            <label className="block mb-1 font-medium">Added By</label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    value={user?.displayName || ""}
                                    disabled
                                    className="w-full border rounded-lg p-3 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                                />
                                <input
                                    type="text"
                                    value={user?.email || ""}
                                    disabled
                                    className="w-full border rounded-lg p-3 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition transform hover:scale-[1.02]"
                        >
                            ➕ Add Item
                        </button>
                    </form>
                </div>
            </div>
            <Footer darkMode={darkMode}></Footer>
        </>
    );
}
