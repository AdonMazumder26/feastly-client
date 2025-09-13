import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import Food from "../../components/Food/Food";
import Loading from "../../components/Loading/Loading";
import Footer from "../shared/Footer";

const AllFoods = () => {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const { darkMode } = useOutletContext();

    const [filters, setFilters] = useState({});

    useEffect(() => {
        const fetchFoods = async () => {
            setLoading(true);
            try {
                let url = `http://localhost:5000/foods?`;
                const params = new URLSearchParams(filters).toString();
                if (params) url += params;

                const res = await fetch(url);
                const data = await res.json();
                setFoods(data);
            } catch (error) {
                console.error("Error fetching foods:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFoods();
    }, [filters]); // ✅ only filters here

    const handleFilterSubmit = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);

        const filterData = {};
        form.forEach((value, key) => {
            if (value) filterData[key] = value;
        });

        setFilters(filterData);
    };

    if (loading) {
        return (
            <div
                className={`flex justify-center items-center min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900" : "bg-gradient-to-r from-blue-100 to-blue-200"
                    }`}
            >
                <Loading />
            </div>
        );
    }

    return (
        <div
            className={`min-h-screen transition-colors duration-300 ${darkMode
                    ? "bg-gray-900 text-gray-200"
                    : "bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-900"
                }`}
        >
            {/* Filters Section */}
            <form
                onSubmit={handleFilterSubmit}
                className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-5 gap-4 bg-white dark:bg-gray-800 shadow-md rounded-xl"
            >
                {/* Category Dropdown */}
                <select
                    name="category"
                    className="p-3 border rounded-md w-full focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    defaultValue=""
                >
                    <option value="">All Categories</option>
                    <option value="Italian">Italian</option>
                    <option value="Chinese">Chinese</option>
                    <option value="Mexican">Mexican</option>
                    <option value="American">American</option>
                    <option value="Indian">Indian</option>
                    <option value="French">French</option>
                </select>

                <input
                    type="number"
                    name="minPrice"
                    placeholder="Min Price"
                    className="p-3 border rounded-md w-full focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                />

                <input
                    type="number"
                    name="maxPrice"
                    placeholder="Max Price"
                    className="p-3 border rounded-md w-full focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                />

                <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 shadow-md"
                >
                    Apply Filters
                </button>
            </form>

            {/* Foods Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto gap-6 p-6">
                {foods.length > 0 ? (
                    foods.map((food) => <Food key={food._id} food={food} />)
                ) : (
                    <p className="col-span-full text-center text-lg font-semibold">
                        No foods match your filters 🍽️
                    </p>
                )}
            </div>

            <Footer darkMode={darkMode} />
        </div>
    );
};

export default AllFoods;
