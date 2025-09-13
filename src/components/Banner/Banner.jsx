import React from 'react';
import foods from "../../assets/foods.jpg"

const Banner = () => {
    return (
        <div className='relative min-h-screen bg-center bg-cover' style={{ backgroundImage: `url(${foods})` }}>
            {/* Gradient overlay for better text visibility */}
            <div className='absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/70'></div>

            {/* Content with improved visibility */}
            <div className='relative z-10 flex flex-col gap-6 items-center justify-center min-h-screen max-w-4xl mx-auto text-center px-6'>
                <h2 className='text-white font-bold text-5xl md:text-6xl leading-tight drop-shadow-2xl'>
                    Feastly – Where Every Meal Meets Simplicity
                </h2>
                <p className='text-white/90 text-lg md:text-xl leading-relaxed max-w-3xl drop-shadow-lg'>
                    Feastly is your all-in-one restaurant management platform designed to simplify food ordering, menu management, and customer experience. From showcasing your dishes to managing orders with ease, Feastly helps you deliver delicious moments—beautifully and efficiently.
                </p>
                <button className='bg-transparent hover:border-white hover:text-white transition-all duration-300 border-2 text-white hover:bg-blue-700 px-8 py-4 rounded-lg font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 cursor-pointer'>
                    All Foods
                </button>
            </div>
        </div>
    );
};

export default Banner;