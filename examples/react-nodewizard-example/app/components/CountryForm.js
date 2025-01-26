import React from "react";

const CountryForm = ({ state, onNext }) => {
    const [country, setCountry] = React.useState(state.country || "");

    const handleSubmit = (e) => {
        e.preventDefault();
        onNext({ country });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 shadow-md rounded-lg">
            <label className="block text-lg font-semibold">
                Country of Birth:
                <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                    className="block mt-2 w-full border-gray-300 rounded-lg p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
            </label>
            <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
            >
                Next
            </button>
        </form>
    );
};

export default CountryForm;
