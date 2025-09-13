import { useLoaderData, useOutletContext, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, ShoppingCart, Star, MapPin, Package, User, Calendar } from "lucide-react";
import Footer from '../../Pages/shared/Footer';

export default function FoodDetails() {
    const food = useLoaderData();
    const { darkMode } = useOutletContext();
    const navigate = useNavigate();

    const {
        name,
        image,
        category,
        origin,
        quantity,
        price,
        addedBy = {},
        description,
        purchaseCount: initialPurchaseCount = 1,
    } = food || {};

    const [purchaseCount, setPurchaseCount] = useState(initialPurchaseCount);

    // ---- Modern Theme classes with matte dark mode
    const pageBg = darkMode ? "bg-slate-950" : "bg-gradient-to-br from-slate-50 to-gray-100";
    const card = darkMode ? "bg-slate-900/80 border-slate-800/50 backdrop-blur-xl" : "bg-white/90 border-gray-200/50 backdrop-blur-xl";
    const heading = darkMode ? "text-slate-100" : "text-slate-200";
    const sub = darkMode ? "text-slate-300" : "text-slate-700";
    const meta = darkMode ? "text-slate-400" : "text-slate-600";
    const priceCls = darkMode ? "text-slate-100" : "text-slate-900";
    const badge = darkMode ? "bg-slate-800/60 text-slate-200 border-slate-700/50" : "bg-slate-100/80 text-slate-800 border-slate-200/50";

    const panelCard = darkMode
        ? "border-slate-800/60 bg-slate-900/60 backdrop-blur-xl"
        : "border-slate-200/60 bg-slate-50/80 backdrop-blur-xl";

    return (<>
        <main className={`min-h-screen ${pageBg} px-4 py-8 sm:px-6 lg:px-8`}>
            <div className="mx-auto w-full max-w-6xl">
                {/* Back Button */}
                <div className="mb-6">
                    <Link
                        to="/allFoods"
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 hover:scale-105 ${darkMode
                            ? "bg-slate-800/60 text-slate-200 hover:bg-slate-700/60 border border-slate-700/50"
                            : "bg-white/80 text-slate-700 hover:bg-slate-50/80 border border-slate-200/50"
                            } backdrop-blur-sm shadow-lg hover:shadow-xl`}
                    >
                        <ArrowLeft size={18} />
                        Back to All Foods
                    </Link>
                </div>

                <div className={`overflow-hidden rounded-3xl border shadow-2xl ${card}`}>
                    {/* Hero Image Section */}
                    <div className="relative aspect-[21/9] w-full overflow-hidden">
                        <img
                            src={image}
                            alt={name}
                            className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute bottom-6 left-6 right-6">
                            <h1 className={`text-4xl md:text-5xl font-bold  ${heading} drop-shadow-2xl mb-4`}>
                                {name}
                            </h1>
                            <div className="flex flex-wrap gap-3">
                                <span className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold border ${badge} backdrop-blur-sm`}>
                                    <Star size={16} />
                                    {category}
                                </span>
                                <span className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold border ${badge} backdrop-blur-sm`}>
                                    <MapPin size={16} />
                                    {origin}
                                </span>
                                <span className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold border ${badge} backdrop-blur-sm`}>
                                    <Package size={16} />
                                    {quantity} available
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Content Grid */}
                    <div className="grid gap-8 p-8 md:grid-cols-3 md:gap-12">
                        {/* Main Content */}
                        <section className="md:col-span-2 space-y-8">
                            {/* Stats Row */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className={`rounded-2xl p-6 border ${panelCard}`}>
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className={`p-2 rounded-xl ${darkMode ? "bg-orange-500/20" : "bg-orange-100"}`}>
                                            <ShoppingCart className={`w-5 h-5 ${darkMode ? "text-orange-400" : "text-orange-600"}`} />
                                        </div>
                                        <div>
                                            <p className={`text-sm font-medium ${meta}`}>Total Purchases</p>
                                            <p className={`text-2xl font-bold ${heading}`}>{purchaseCount}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={`rounded-2xl p-6 border ${panelCard}`}>
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className={`p-2 rounded-xl ${darkMode ? "bg-green-500/20" : "bg-green-100"}`}>
                                            <Package className={`w-5 h-5 ${darkMode ? "text-green-400" : "text-green-600"}`} />
                                        </div>
                                        <div>
                                            <p className={`text-sm font-medium ${meta}`}>In Stock</p>
                                            <p className={`text-2xl font-bold ${heading}`}>{quantity}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Description Section */}
                            <div className={`rounded-2xl p-8 border ${panelCard}`}>
                                <h2 className={`text-2xl font-bold mb-4 ${heading} flex items-center gap-3`}>
                                    <div className={`w-1 h-8 rounded-full ${darkMode ? "bg-orange-500" : "bg-gradient-to-b from-orange-500 to-red-500"}`} />
                                    About This Food
                                </h2>
                                <p className={`text-lg leading-relaxed ${sub}`}>{description}</p>
                            </div>
                        </section>

                        {/* Right Sidebar */}
                        <aside className="md:col-span-1 space-y-6">
                            {/* Price Card */}
                            <div className={`rounded-2xl p-8 border shadow-xl ${panelCard}`}>
                                <div className="text-center mb-6">
                                    <p className={`text-sm font-medium ${meta} mb-2`}>Price</p>
                                    <p className={`text-5xl font-black ${priceCls} mb-2`}>${price}</p>
                                    <p className={`text-sm ${meta}`}>per item</p>
                                </div>

                                {/* Purchase Counter */}
                                <div className="mb-8">
                                    <p className={`text-sm font-semibold ${meta} mb-4 text-center`}>Quantity</p>
                                    <div className="flex items-center justify-center gap-4">
                                        <button
                                            type="button"
                                            onClick={() => setPurchaseCount((n) => Math.max(1, n - 1))}
                                            className={`w-12 h-12 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105 active:scale-95 ${darkMode
                                                ? "bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700"
                                                : "bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200"
                                                }`}
                                        >
                                            −
                                        </button>
                                        <div className={`min-w-[60px] text-center px-4 py-3 rounded-xl font-bold text-2xl ${darkMode ? "bg-slate-800/60" : "bg-slate-100/60"} ${heading}`}>
                                            {purchaseCount}
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setPurchaseCount((n) => n + 1)}
                                            className={`w-12 h-12 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105 active:scale-95 ${darkMode
                                                ? "bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700"
                                                : "bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200"
                                                }`}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                {/* Total Price */}
                                <div className={`rounded-xl p-4 mb-6 ${darkMode ? "bg-slate-800/40" : "bg-slate-100/60"}`}>
                                    <div className="flex justify-between items-center">
                                        <span className={`text-lg font-semibold ${sub}`}>Total</span>
                                        <span className={`text-2xl font-bold ${priceCls}`}>${(price * purchaseCount).toFixed(2)}</span>
                                    </div>
                                </div>

                                {/* Purchase Button */}
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        navigate(`/purchase/${food._id}`, {
                                            state: {
                                                foodName: name,
                                                price: price,
                                                quantity: quantity,
                                                sellerEmail: addedBy?.email || null,
                                                foodId: food?._id || null
                                            }
                                        });
                                    }}
                                    disabled={quantity <= 0}
                                    className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl disabled:opacity-60 disabled:cursor-not-allowed ${darkMode
                                        ? "bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600"
                                        : "bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600"
                                        }`}
                                >
                                    <div className="flex items-center justify-center gap-3">
                                        <ShoppingCart size={20} />
                                        {quantity > 0 ? "Purchase Now" : "Out of Stock"}
                                    </div>
                                </button>
                            </div>

                            {/* Added By Card */}
                            <div className={`rounded-2xl p-6 border ${panelCard}`}>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className={`p-2 rounded-xl ${darkMode ? "bg-blue-500/20" : "bg-blue-100"}`}>
                                        <User className={`w-5 h-5 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
                                    </div>
                                    <h3 className={`text-lg font-bold ${heading}`}>Added By</h3>
                                </div>
                                <div className="space-y-2">
                                    <p className={`font-semibold ${sub}`}>{addedBy.name || "Anonymous"}</p>
                                    <p className={`text-sm ${meta}`}>{addedBy.email || "No email provided"}</p>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>

        </main>
        <Footer darkMode={darkMode}></Footer>
    </>
    );
}
