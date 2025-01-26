import React, { useState } from "react";

const SpecialInfoForm = ({ state, onNext }) => {
    const [specialInfo, setSpecialInfo] = useState(state.specialInfo || "");

    const handleSubmit = (e) => {
        e.preventDefault();
        onNext({ specialInfo });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-lg font-semibold">Special Info</h2>
            <label className="block font-semibold">
                Provide additional details:
                <textarea
                    value={specialInfo}
                    onChange={(e) => setSpecialInfo(e.target.value)}
                    className="w-full border-gray-300 rounded-lg p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 mt-2"
                />
            </label>
            <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
            >
                Submit
            </button>
        </form>
    );
};

export default SpecialInfoForm;