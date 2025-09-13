import React, { useState, useEffect, useContext } from "react";
import { useOutletContext } from "react-router-dom";
import { Trash2 } from "lucide-react";
import moment from "moment";
import { toast } from "react-toastify";
import Loading from "../../components/Loading/Loading";
import Footer from '../shared/Footer';
import axios from "axios";
import { AuthContext } from "../../provider/AuthProvider";

export default function MyOrders() {
    // const orders = useLoaderData();
    const { user } = useContext(AuthContext);
    const [orderList, setOrderList] = useState([]);

    useEffect(() => {
        if (!user.email) return;
        axios.get(`http://localhost:5000/purchase?email=${user.email}`, { withCredentials: true })
            .then(res => {
                const orders = res.data;
                setOrderList(orders);
            })
    }, [user.email])

    const { darkMode } = useOutletContext();
    const [confirmId, setConfirmId] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading time for better UX
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);



    const handleDelete = (id) => {
        // Open confirmation modal
        setConfirmId(id);
    };

    const confirmDeletion = async () => {
        if (!confirmId) return;
        try {
            setIsDeleting(true);
            const res = await fetch(`http://localhost:5000/purchase/${confirmId}`, {
                method: "DELETE",
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok || data?.success === false) {
                throw new Error(data?.message || `Failed with status ${res.status}`);
            }
            // Show success message
            toast.success("Order deleted successfully!");

            // Update UI by removing the deleted order from state
            setOrderList(prevOrders => prevOrders.filter(order => order._id !== confirmId));
            setConfirmId(null);
            setIsDeleting(false);
        } catch (err) {
            console.error(err);
            toast.error("failed to delete");
            setIsDeleting(false);
            setConfirmId(null);
        }
    };

    const cancelDeletion = () => {
        setConfirmId(null);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loading />
            </div>
        );
    }

    return (<>
        <div
            className={`min-h-screen px-4 py-8 ${darkMode ? "bg-gray-950 text-white" : "bg-gray-100 text-gray-900"
                }`}
        >
            <h2 className="text-3xl font-bold text-center mb-8">📦 My Orders</h2>

            {orderList.length === 0 ? (
                <p className="text-center text-gray-500">No orders yet.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {orderList.map((order) => (
                        <div
                            key={order._id}
                            className={`rounded-xl shadow-lg overflow-hidden transition hover:scale-[1.02] ${darkMode ? "bg-gray-900" : "bg-white"
                                }`}
                        >
                            {/* Food Image */}
                            <img
                                src={order.foodImage || "https://via.placeholder.com/300"} // fallback image
                                alt={order.foodName}
                                className="w-full h-48 object-cover"
                            />

                            {/* Card Content */}
                            <div className="p-4 space-y-2">
                                <h3 className="text-lg font-semibold">{order.foodName}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Quantity: {order.quantity}
                                </p>
                                <p className="font-medium">Total Price: ${order.totalPrice}</p>
                                <p className="text-sm">
                                    Bought on:{" "}
                                    {moment(order.purchaseDate).format("MMMM Do YYYY, h:mm:ss a")}
                                </p>

                                {/* Delete Button */}
                                <div className="flex justify-end">
                                    <button
                                        onClick={() => handleDelete(order._id)}
                                        className="p-2 rounded-full hover:bg-red-600 hover:text-white transition"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Confirmation Modal */}
            {confirmId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className={`w-full max-w-sm rounded-xl p-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
                        <h3 className="text-lg font-semibold">Confirm Deletion</h3>
                        <p className="mt-2 text-sm">Are you sure you want to delete this order? This action cannot be undone.</p>

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
        </div>
        <Footer darkMode={darkMode}></Footer>
    </>
    );
}
