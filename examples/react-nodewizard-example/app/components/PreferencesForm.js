import React, { useState } from "react";

const PreferencesForm = ({ state, onNext }) => {
    const [preferences, setPreferences] = useState(state.preferences || []);
    const [favoriteColor, setFavoriteColor] = useState(state.favoriteColor || "");

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        setPreferences((prev) =>
            checked ? [...prev, value] : prev.filter((pref) => pref !== value)
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onNext({ preferences, favoriteColor });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-lg font-semibold">Preferences</h2>
            <div>
                <label className="block font-semibold">Hobbies:</label>
                <div className="mt-2 space-y-2">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            value="Reading"
                            checked={preferences.includes("Reading")}
                            onChange={handleCheckboxChange}
                            className="mr-2"
                        />
                        Reading
                    </label>
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            value="Traveling"
                            checked={preferences.includes("Traveling")}
                            onChange={handleCheckboxChange}
                            className="mr-2"
                        />
                        Traveling
                    </label>
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            value="Sports"
                            checked={preferences.includes("Sports")}
                            onChange={handleCheckboxChange}
                            className="mr-2"
                        />
                        Sports
                    </label>
                </div>
            </div>
            <div>
                <label className="block font-semibold">Favorite Color:</label>
                <select
                    value={favoriteColor}
                    onChange={(e) => setFavoriteColor(e.target.value)}
                    className="w-full border-gray-300 rounded-lg p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                    <option value="">Select a color</option>
                    <option value="Red">Red</option>
                    <option value="Blue">Blue</option>
                    <option value="Green">Green</option>
                </select>
            </div>
            <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
            >
                Next
            </button>
        </form>
    );
};

export default PreferencesForm;
