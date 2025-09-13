import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react"; // icons for update and delete
import { toast } from "react-toastify";
import Footer from '../shared/Footer';
import { AuthContext } from "../../provider/AuthProvider";
import axios from "axios";

export default function MyFoods() {
    const { user } = useContext(AuthContext);
    // const initialFoods = useLoaderData();
    // console.log(initialFoods);
    const { darkMode } = useOutletContext();
    const navigate = useNavigate();
    const [foods, setFoods] = useState([]);
    const [confirmId, setConfirmId] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    // console.log(user);
    useEffect(() => {
        if (!user.email) return;
        axios.get(`http://localhost:5000/myFoods?email=${user.email}`, { withCredentials: true })
            .then(res => {
                const initialFoods = res.data;
                // console.log(initialFoods);
                setFoods(initialFoods);
            })
    }, [user.email])

    const handleDelete = (id) => {
        setConfirmId(id);
    };

    const confirmDeletion = async () => {
        if (!confirmId) return;
        try {
            setIsDeleting(true);
            const res = await fetch(`http://localhost:5000/foods/${confirmId}`, {
                method: "DELETE",
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok || data?.success === false) {
                throw new Error(data?.message || `Failed with status ${res.status}`);
            }

            // Show success message
            toast.success("Food deleted successfully!");

            // Update UI by removing the deleted food from state
            setFoods(prevFoods => prevFoods.filter(food => food._id !== confirmId));
            setConfirmId(null);
            setIsDeleting(false);
        } catch (err) {
            console.error(err);
            toast.error("Failed to delete food");
            setIsDeleting(false);
            setConfirmId(null);
        }
    };

    const cancelDeletion = () => {
        setConfirmId(null);
    };

    return (
        <>
            <div
                className={`min-h-screen px-4 py-8 ${darkMode ? "bg-gray-950 text-white" : "bg-gray-100 text-gray-900"
                    }`}
            >
                <h2 className="text-3xl font-bold text-center mb-8">🍴 My Foods</h2>

                {foods.length === 0 ? (
                    <p className="text-center text-gray-500">No foods added yet.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {foods.map((food) => (
                            <div
                                key={food._id}
                                className={`rounded-xl shadow-lg overflow-hidden transition hover:scale-[1.02] ${darkMode ? "bg-gray-900" : "bg-white"
                                    }`}
                            >
                                {/* Food Image */}
                                <img
                                    src={food.image}
                                    alt={food.name}
                                    className="w-full h-48 object-cover"
                                />

                                {/* Card Content */}
                                <div className="p-4 space-y-2">
                                    <h3 className="text-xl font-semibold">{food.name}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {food.category} • {food.origin}
                                    </p>
                                    <p className="font-medium">Price: ${food.price}</p>
                                    <p className="text-sm">Quantity: {food.quantity}</p>

                                    {/* Action Icons */}
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => navigate(`/updateFood/${food._id}`)}
                                            className="p-2 rounded-full hover:bg-green-600 hover:text-white transition"
                                            title="Edit food"
                                        >
                                            <Pencil size={20} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(food._id)}
                                            className="p-2 rounded-full hover:bg-red-600 hover:text-white transition"
                                            title="Delete food"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Confirmation Modal */}
            {confirmId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className={`w-full max-w-sm rounded-xl p-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
                        <h3 className="text-lg font-semibold">Confirm Deletion</h3>
                        <p className="mt-2 text-sm">Are you sure you want to delete this food? This action cannot be undone.</p>

                        <div className="mt-6 flex items-center justify-end gap-3">
                            <button
                                onClick={cancelDeletion}
                                disabled={isDeleting}
                                className={`px-4 py-2 rounded-md ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDeletion}
                                disabled={isDeleting}
                                className={`px-4 py-2 rounded-md ${isDeleting ? 'opacity-60 cursor-not-allowed' : ''} ${darkMode ? 'bg-red-600 hover:bg-red-500' : 'bg-red-600 hover:bg-red-700'} text-white`}
                            >
                                {isDeleting ? 'Deleting…' : 'Confirm'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <Footer darkMode={darkMode}></Footer>
        </>
    );
}
