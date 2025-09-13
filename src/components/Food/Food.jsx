import { Link } from "react-router-dom";

export default function Food({ food }) {
    const {
        name,
        image,
        category,
        origin,
        price,
        quantity,
        description,
    } = food;

    return (
        <div className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200/50 shadow-lg bg-gray-900/95 backdrop-blur-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 dark:border-gray-700/50 dark:bg-white/95 dark:hover:shadow-gray-900/50">
            {/* Food Image Container */}
            <div className="relative overflow-hidden">
                <img
                    src={image}
                    alt={name}
                    className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Subtle gradient overlay for matte effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Category badge */}
                <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center rounded-full bg-gray-800/90 backdrop-blur-sm px-3 py-1 text-xs font-medium text-white shadow-sm dark:bg-white/90 dark:text-gray-800">
                        {category}
                    </span>
                </div>
            </div>

            {/* Food Details */}
            <div className="flex flex-1 flex-col p-6">
                {/* Title and Origin */}
                <div className="mb-3">
                    <h2 className="text-xl font-bold text-white dark:text-gray-900 mb-1 line-clamp-1">
                        {name}
                    </h2>
                    <p className="text-sm font-medium text-gray-300 dark:text-gray-500">
                        {origin}
                    </p>
                </div>

                {/* Quantity with icon */}
                <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1.5 text-sm text-gray-300 dark:text-gray-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                        <span className="font-medium">Available: {quantity}</span>
                    </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-300 dark:text-gray-600 line-clamp-2 leading-relaxed mb-4">
                    {description}
                </p>

                {/* Footer section */}
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-700 dark:border-gray-200">
                    {/* Price */}
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-white dark:text-gray-900">
                            ${price}
                        </span>
                    </div>

                    {/* Details button */}
                    <Link
                        to={`/allFoods/${food._id}`}
                        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2.5 text-sm font-semibold text-white hover:from-orange-600 hover:to-red-600 hover:shadow-lg hover:shadow-orange-200/50 focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:ring-offset-2 transition-all duration-200 dark:focus:ring-offset-gray-900"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Details
                    </Link>
                </div>
            </div>
        </div>
    );
}
