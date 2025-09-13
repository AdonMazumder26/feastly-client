// src/components/Gallery/Gallery.jsx
import React, { useState, useEffect, useRef } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// Import images from assets folder
import image1 from "../../assets/images/image1.jpg";
import image2 from "../../assets/images/image2.jpg";
import image3 from "../../assets/images/image3.jpg";
import image4 from "../../assets/images/image4.jpg";
import image5 from "../../assets/images/image5.jpg";
import image6 from "../../assets/images/image6.jpg";
import image7 from "../../assets/images/image7.jpg";
import image8 from "../../assets/images/image8.jpg";
import image9 from "../../assets/images/image9.jpg";
import image10 from "../../assets/images/image10.jpg";

// Food data array with names and images
const foodItems = [
    { id: 1, name: "Gourmet Pasta", image: image1, description: "Handcrafted Italian pasta with fresh herbs" },
    { id: 2, name: "Artisan Pizza", image: image2, description: "Wood-fired pizza with premium toppings" },
    { id: 3, name: "Fresh Sushi", image: image3, description: "Masterfully prepared sushi with fresh fish" },
    { id: 4, name: "Grilled Steak", image: image4, description: "Perfectly grilled premium beef steak" },
    { id: 5, name: "Seafood Platter", image: image5, description: "Ocean-fresh seafood selection" },
    { id: 6, name: "Vegetarian Bowl", image: image6, description: "Nutritious and colorful vegetarian delight" },
    { id: 7, name: "Dessert Delight", image: image7, description: "Decadent chocolate dessert masterpiece" },
    { id: 8, name: "Breakfast Special", image: image8, description: "Hearty breakfast to start your day" },
    { id: 9, name: "Mediterranean Salad", image: image9, description: "Fresh Mediterranean flavors" },
    { id: 10, name: "Asian Fusion", image: image10, description: "Modern Asian cuisine with a twist" },
];

// Food Item Component with Intersection Observer
const FoodItem = ({ food, index, isVisible, onImageClick }) => {
    const isLeft = index % 2 === 0;

    return (
        <div
            className={`mb-16 flex flex-col lg:flex-row items-center gap-8 ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
        >
            {/* Image Container */}
            <div
                className={`w-full lg:w-1/2 transform transition-all duration-1000 ease-out ${isVisible
                    ? 'opacity-100 translate-y-0'
                    : `opacity-0 ${isLeft ? '-translate-x-20' : 'translate-x-20'}`
                    }`}
            >
                <div
                    className="relative group overflow-hidden rounded-2xl shadow-2xl cursor-pointer"
                    onClick={() => onImageClick(index)}
                >
                    <img
                        src={food.image}
                        alt={food.name}
                        className="w-full h-80 lg:h-96 object-cover transform transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 right-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-xl font-bold mb-2">{food.name}</h3>
                        <p className="text-sm opacity-90">{food.description}</p>
                    </div>

                    {/* Tooltip */}
                    <div className="absolute top-4 right-4 bg-black/80 text-white px-3 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 pointer-events-none">
                        <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            Click to view full image
                        </div>
                        {/* Tooltip arrow */}
                        <div className="absolute -bottom-1 right-6 w-2 h-2 bg-black/80 rotate-45"></div>
                    </div>
                </div>
            </div>

            {/* Content Container */}
            <div
                className={`w-full lg:w-1/2 transform transition-all duration-1000 ease-out delay-200 ${isVisible
                    ? 'opacity-100 translate-y-0'
                    : `opacity-0 ${isLeft ? 'translate-x-20' : '-translate-x-20'}`
                    }`}
            >
                <div className={`p-8 ${isLeft ? 'lg:pr-8' : 'lg:pl-8'}`}>
                    <div className="space-y-6">
                        <div>
                            <span className="text-4xl font-bold text-gray-300 mb-2 block">
                                {String(index + 1).padStart(2, '0')}
                            </span>
                            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4 leading-tight">
                                {food.name}
                            </h2>
                            <div className="w-20 h-1 bg-gradient-to-r from-orange-400 to-red-500 rounded-full"></div>
                        </div>

                        <p className="text-lg text-gray-600 leading-relaxed">
                            {food.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function Gallery() {
    const [open, setOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visibleItems, setVisibleItems] = useState(new Set());
    const observerRef = useRef();

    // Intersection Observer for scroll animations
    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = parseInt(entry.target.dataset.index);
                        setVisibleItems(prev => new Set([...prev, index]));
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
        );

        const elements = document.querySelectorAll('[data-index]');
        elements.forEach(el => observerRef.current.observe(el));

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, []);

    const handleImageClick = (index) => {
        setCurrentIndex(index);
        setOpen(true);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-20">
                    <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
                        Our <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">Culinary</span> Gallery
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Discover our carefully crafted dishes, each telling a story of flavor, tradition, and culinary excellence.
                    </p>
                </div>

                {/* Food Items Gallery */}
                <div className="space-y-0">
                    {foodItems.map((food, index) => (
                        <div
                            key={food.id}
                            data-index={index}
                            className="relative"
                        >
                            <FoodItem
                                food={food}
                                index={index}
                                isVisible={visibleItems.has(index)}
                                onImageClick={handleImageClick}
                            />
                        </div>
                    ))}
                </div>

                {/* Enhanced Lightbox */}
                <Lightbox
                    open={open}
                    close={() => setOpen(false)}
                    index={currentIndex}
                    slides={foodItems.map((food) => ({
                        src: food.image,
                        title: food.name,
                        description: food.description
                    }))}
                    styles={{
                        container: { backgroundColor: "rgba(0, 0, 0, 0.95)" },
                        slide: { padding: "20px" },
                        slideImage: {
                            borderRadius: "12px",
                            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                        }
                    }}
                    render={{
                        slide: ({ slide }) => {
                            const food = foodItems[currentIndex];
                            return (
                                <div className="flex flex-col items-center justify-center h-full">
                                    <div className="relative max-w-4xl max-h-[80vh]">
                                        <img
                                            src={slide.src}
                                            alt={slide.title}
                                            className="w-full h-auto rounded-xl shadow-2xl"
                                            style={{
                                                maxHeight: "70vh",
                                                objectFit: "contain"
                                            }}
                                        />
                                        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl min-w-[300px] text-center">
                                            <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                                {food.name}
                                            </h3>
                                            <p className="text-gray-600 text-lg leading-relaxed">
                                                {food.description}
                                            </p>
                                            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                                Click outside or press ESC to close
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                    }}
                />
            </div>
        </div>
    );
}
