import React from "react";

const SummaryForm = ({ state, onSubmit, onRedirect }) => {
    const handleRestart = () => {
        console.log("Restarting the flow...");
        onRedirect("step1"); // Restart the flow by navigating back to step1
    };

    const handleConfirm = () => {
        console.log("Confirming and finishing the flow...");
        onSubmit(state); // Optional: You can handle final state submission here
        onRedirect("end"); // End the flow after confirming
    };

    return (
        <div className="space-y-4 bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-2xl font-bold">Summary</h2>
            <p className="text-lg"><strong>Name:</strong> {state.name}</p>
            <p className="text-lg"><strong>Country of Birth:</strong> {state.country}</p>
            {state.extraInfo && (
                <p className="text-lg"><strong>Extra Info:</strong> {state.extraInfo}</p>
            )}
            {state.preferences && (
                <p className="text-lg"><strong>Preferences:</strong> {state.preferences.join(", ")}</p>
            )}
            {state.favoriteColor && (
                <p className="text-lg"><strong>Favorite Color:</strong> {state.favoriteColor}</p>
            )}

            <h3 className="text-lg font-semibold">State Object:</h3>
            <pre className="bg-gray-100 p-4 rounded-lg shadow-inner">
                {JSON.stringify(state, null, 2)}
            </pre>

            <div className="space-x-4">
                <button
                    onClick={handleRestart}
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
                >
                    Restart
                </button>
                <button
                    onClick={handleConfirm}
                    className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
                >
                    Confirm and Finish
                </button>
            </div>
        </div>
    );
};

export default SummaryForm;
