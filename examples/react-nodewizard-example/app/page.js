import React from "react";
import Wizard from "./components/Wizard";

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-extrabold text-center mb-6">
        Welcome to Node Wizard Demo
      </h1>
      <p className="text-lg text-gray-700 text-center mb-8">
        This wizard demonstrates the use of a flexible flow handler. Fill out the forms step by step, and see how the flow adapts based on your inputs.
      </p>
      <Wizard />
    </div>
  );
}