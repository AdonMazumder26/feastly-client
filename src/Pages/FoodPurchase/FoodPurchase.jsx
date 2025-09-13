import React, { useState, useContext } from 'react';
import { useLocation, useOutletContext } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { savePurchase } from '../../utils/purchaseUtils';
import Footer from '../shared/Footer';

const FoodPurchase = () => {
    const location = useLocation();
    const { darkMode } = useOutletContext();
    const { user } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [purchaseQuantity, setPurchaseQuantity] = useState(1);

    // Get food data from navigation state
    const { foodName, price, quantity: availableQuantity, sellerEmail, foodId } = location.state || {};

    // Debug logging
    // console.log('FoodPurchase component data:', {
    //     locationState: location.state,
    //     foodName,
    //     price,
    //     availableQuantity,
    //     user: user ? { uid: user.uid, email: user.email, displayName: user.displayName } : null
    // });

    // Theme classes
    const pageBg = darkMode ? "bg-gray-950" : "bg-gray-50";
    const card = darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200";
    const heading = darkMode ? "text-white" : "text-gray-900";
    const sub = darkMode ? "text-gray-300" : "text-gray-700";
    const label = darkMode ? "text-gray-300" : "text-gray-700";
    const input = darkMode
        ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-rose-500"
        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-rose-500";
    const button = darkMode
        ? "bg-rose-600 text-white hover:bg-rose-500"
        : "bg-gray-900 text-white hover:bg-gray-800";

    // Quantity control functions
    const incrementQuantity = () => {
        if (purchaseQuantity < availableQuantity) {
            setPurchaseQuantity(prev => prev + 1);
        }
    };

    const decrementQuantity = () => {
        if (purchaseQuantity > 1) {
            setPurchaseQuantity(prev => prev - 1);
        }
    };

    // Calculate total price
    const totalPrice = price * purchaseQuantity;

    const handlePurchase = async (e) => {
        e.preventDefault();
        // console.log('Purchase button clicked!');
        setIsLoading(true);

        try {
            // Validate required data
            if (!foodName || !price || !purchaseQuantity) {
                throw new Error('Missing required food data');
            }

            if (!user) {
                throw new Error('User not authenticated');
            }

            // Disallow purchasing own item
            if (sellerEmail && user?.email && sellerEmail === user.email) {
                throw new Error('You cannot purchase your own food item.');
            }

            // Disallow purchasing when out of stock
            if (!availableQuantity || availableQuantity <= 0) {
                throw new Error('This item is out of stock.');
            }

            // Enforce quantity limits
            if (purchaseQuantity > availableQuantity) {
                throw new Error(`You cannot buy more than ${availableQuantity} units.`);
            }

            const purchaseData = {
                foodName,
                price: parseFloat(price), // Ensure price is a number
                quantity: parseInt(purchaseQuantity), // Ensure quantity is a number
                buyerName: user?.displayName || 'Unknown',
                buyerEmail: user?.email || 'Unknown',
                purchaseDate: Date.now(),
                foodId: foodId || location.pathname.split('/')[2], // Prefer state, fallback to URL
                buyerUid: user?.uid || null,
                totalPrice: parseFloat(price) * parseInt(purchaseQuantity)
            };

            // console.log('Saving purchase data:', purchaseData);

            // Send data to backend API
            const response = await fetch('http://localhost:5000/purchase', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(purchaseData)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(`Backend error: ${response.status} - ${errorData.message || response.statusText}`);
            }

            const result = await response.json();
            toast.success('Purchase saved to backend:', result);

            // Also save to localStorage as backup
            const localResult = savePurchase(purchaseData);
            if (!localResult.success) {
                console.warn('Failed to save to localStorage:', localResult.error);
            }

            toast.success('Purchase successful! Thank you for your order.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });

        } catch (error) {
            console.error('Purchase failed with error:', error);
            console.error('Error details:', {
                message: error.message,
                code: error.code,
                stack: error.stack
            });

            // Check if it's a network error
            if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
                toast.error('Cannot connect to server. Please check if your backend is running.', {
                    position: "top-right",
                    autoClose: 7000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            } else {
                toast.error(`Purchase failed: ${error.message}`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        } finally {
            setIsLoading(false);
        }



    };

    const isOutOfStock = !availableQuantity || availableQuantity <= 0;
    const isOwnItem = sellerEmail && user?.email && sellerEmail === user.email;

    if (!location.state) {
        return (
            <div className={`min-h-screen ${pageBg} flex items-center justify-center`}>
                <div className={`rounded-lg border p-8 ${card}`}>
                    <h2 className={`text-xl font-semibold ${heading}`}>No food selected</h2>
                    <p className={`mt-2 ${sub}`}>Please select a food item to purchase.</p>
                </div>
                <Footer darkMode={darkMode}></Footer>
            </div>
        );
    }

    return (<>
        <div className={`min-h-screen ${pageBg} px-4 sm:px-6 lg:px-8`}>
            <div className="mx-auto max-w-2xl">
                <div className={`rounded-2xl border p-6 md:p-8 ${card}`}>
                    <h1 className={`text-2xl font-bold ${heading} mb-2`}>Food Purchase</h1>
                    {(isOutOfStock || isOwnItem) && (
                        <div className={`mb-4 rounded-lg p-4 border ${isOutOfStock ? (darkMode ? 'bg-red-500/10 border-red-700 text-red-300' : 'bg-red-50 border-red-200 text-red-800') : (darkMode ? 'bg-yellow-500/10 border-yellow-700 text-yellow-300' : 'bg-yellow-50 border-yellow-200 text-yellow-800')}`}>
                            {isOutOfStock ? 'This item is not available right now.' : 'You cannot purchase your own added food item.'}
                        </div>
                    )}

                    <form onSubmit={handlePurchase} className="space-y-6">
                        {/* Food Name */}
                        <div>
                            <label className={`block text-sm font-medium ${label} mb-2`}>
                                Food Name
                            </label>
                            <input
                                type="text"
                                value={foodName}
                                readOnly
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 ${input}`}
                            />
                        </div>

                        {/* Price */}
                        <div>
                            <label className={`block text-sm font-medium ${label} mb-2`}>
                                Price
                            </label>
                            <input
                                type="text"
                                value={`$${price}`}
                                readOnly
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 ${input}`}
                            />
                        </div>

                        {/* Quantity */}
                        <div>
                            <label className={`block text-sm font-medium ${label} mb-2`}>
                                Quantity
                            </label>
                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={decrementQuantity}
                                    disabled={purchaseQuantity <= 1}
                                    className={`px-3 py-2 rounded-lg text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-rose-500 disabled:opacity-50 disabled:cursor-not-allowed ${darkMode
                                        ? "bg-gray-800 text-white hover:bg-gray-700 disabled:hover:bg-gray-800"
                                        : "bg-gray-200 text-gray-900 hover:bg-gray-300 disabled:hover:bg-gray-200"
                                        }`}
                                >
                                    −
                                </button>
                                <input
                                    type="number"
                                    value={purchaseQuantity}
                                    readOnly
                                    min="1"
                                    max={availableQuantity}
                                    className={`w-full px-3 py-2 border rounded-lg text-center font-semibold focus:outline-none focus:ring-2 focus:ring-rose-500 ${input}`}
                                />
                                <button
                                    type="button"
                                    onClick={incrementQuantity}
                                    disabled={purchaseQuantity >= availableQuantity}
                                    className={`px-3 py-2 rounded-lg text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-rose-500 disabled:opacity-50 disabled:cursor-not-allowed ${darkMode
                                        ? "bg-gray-800 text-white hover:bg-gray-700 disabled:hover:bg-gray-800"
                                        : "bg-gray-200 text-gray-900 hover:bg-gray-300 disabled:hover:bg-gray-200"
                                        }`}
                                >
                                    +
                                </button>
                            </div>
                            <p className={`text-xs mt-1 ${sub}`}>
                                Available: {availableQuantity} units
                            </p>
                        </div>

                        {/* Total Price */}
                        <div className={`rounded-lg border p-4 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                            <div className="flex justify-between items-center">
                                <span className={`text-sm font-medium ${label}`}>Total Price:</span>
                                <span className={`text-xl font-bold ${heading}`}>${totalPrice.toFixed(2)}</span>
                            </div>
                            <p className={`text-xs mt-1 ${sub}`}>
                                ${price} × {purchaseQuantity} units
                            </p>
                        </div>

                        {/* Buyer Name */}
                        <div>
                            <label className={`block text-sm font-medium ${label} mb-2`}>
                                Buyer Name
                            </label>
                            <input
                                type="text"
                                value={user?.displayName || 'Unknown'}
                                readOnly
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 ${input}`}
                            />
                        </div>

                        {/* Buyer Email */}
                        <div>
                            <label className={`block text-sm font-medium ${label} mb-2`}>
                                Buyer Email
                            </label>
                            <input
                                type="email"
                                value={user?.email || 'Unknown'}
                                readOnly
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 ${input}`}
                            />
                        </div>

                        {/* Buying Date */}
                        <div>
                            <label className={`block text-sm font-medium ${label} mb-2`}>
                                Buying Date
                            </label>
                            <input
                                type="text"
                                value={new Date().toLocaleString()}
                                readOnly
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 ${input}`}
                            />
                        </div>

                        {/* Purchase Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={isLoading || isOutOfStock || isOwnItem}
                                className={`w-full py-3 px-4 rounded-lg font-semibold text-sm transition focus:outline-none focus:ring-2 focus:ring-rose-500 disabled:opacity-50 disabled:cursor-not-allowed ${button}`}
                            >
                                {isLoading ? 'Processing...' : isOwnItem ? 'You cannot purchase this' : isOutOfStock ? 'Out of Stock' : 'Purchase'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </div><Footer darkMode={darkMode}></Footer></>
    );
};

export default FoodPurchase;