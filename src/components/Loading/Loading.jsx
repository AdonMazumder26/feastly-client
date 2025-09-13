import React from "react";

export default function Loading() {
    return (
        <div className="inline-flex items-center gap-2" role="status" aria-label="Loading…">
            <svg
                className="animate-spin h-8 w-8 text-indigo-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
            >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                />
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
            </svg>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Loading…
            </span>
        </div>
    );
}
