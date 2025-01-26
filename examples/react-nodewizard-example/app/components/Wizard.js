'use client';

import React, { useState } from 'react';
import NodeWizard from 'node-wizard';
import NameForm from './NameForm';
import CountryForm from './CountryForm';
import ExtraInfoForm from './ExtraInfoForm';
import SpecialInfoForm from './SpecialInfoForm';
import SummaryForm from './SummaryForm';
import PreferencesForm from './PreferencesForm';

const Wizard = () => {
    const flowDefinition = {
        step1: {
            label: "Name Form",
            transitions: [
                { target: "step2", condition: (state) => !!state.name }, // Go to Country Form if name is provided
                { target: "step4", condition: (state) => state.name === "Admin" }, // Jump to Preferences Form if name is "Admin"
            ],
        },
        step2: {
            label: "Country Form",
            transitions: [
                { target: "step3", condition: (state) => state.country === "UK" }, // If country is UK, go to Extra Info
                { target: "step4", condition: (state) => state.country === "USA" }, // Go to Preferences if USA
                { target: "step6", condition: (state) => state.country === "Other" }, // Conditional jump to a special step
            ],
        },
        step3: {
            label: "Extra Info for UK Residents",
            transitions: [
                { target: "step5", condition: (state) => !!state.extraInfo }, // Go to Summary if extra info is provided
            ],
        },
        step4: {
            label: "Preferences Form",
            transitions: [
                { target: "step5", condition: (state) => state.preferences?.length > 0 && !!state.favoriteColor }, // Must fill all preferences to proceed
                { target: "step6", condition: (state) => state.preferences?.includes("Other") }, // If "Other" preference selected, go to special step
            ],
        },
        step5: {
            label: "Summary Form",
            transitions: [
                { target: "step1", condition: (state) => !state.confirmation }, // Loop back if not confirmed
                { target: "end", condition: (state) => state.confirmation }, // End wizard on confirmation
            ],
        },
        step6: {
            label: "Special Info Form",
            transitions: [
                { target: "step5", condition: (state) => !!state.specialInfo }, // Return to Summary if special info is filled
            ],
        },
        end: {
            label: "Finished",
            transitions: [],
        },
    };

    const [flow] = useState(new NodeWizard(flowDefinition, "step1"));
    const [state, setState] = useState({});

    // Debugging flow and state updates
    const updateFlowState = (data) => {
        console.log("Before update state:", state); // Log current state before updating
        const newState = { ...state, ...data };
        setState(newState);
        Object.entries(data).forEach(([key, value]) => flow.updateState(key, value));

        try {
            flow.next(); // This will move to the next valid step based on conditions
            console.log("Current Node after flow.next():", flow.getCurrentNode()); // Log current node after transition
        } catch (error) {
            alert(error.message);
        }
    };

    const goToStep = (step) => {
        try {
            flow.goTo(step); // Use goTo to directly navigate to the given step
            setState({}); // Optionally, reset the state when restarting the flow
        } catch (error) {
            console.error(`Error navigating to ${step}: ${error.message}`);
        }
    };

    const renderStepContent = () => {
        const currentNode = flow.getCurrentNode();
        switch (currentNode) {
            case "step1":
                return <NameForm state={state} onNext={updateFlowState} />;
            case "step2":
                return <CountryForm state={state} onNext={updateFlowState} />;
            case "step3":
                return <ExtraInfoForm state={state} onNext={updateFlowState} />;
            case "step4":
                return <PreferencesForm state={state} onNext={updateFlowState} />;
            case "step5":
                return (
                    <SummaryForm
                        state={state}
                        onSubmit={(finalState) => {
                            console.log("Final State:", finalState);
                            goToStep('step1'); // Go back to step1 after submitting
                        }}
                        onRedirect={goToStep} // Pass goToStep function as onRedirect
                    />
                );
            case "step6":
                return <SpecialInfoForm state={state} onNext={updateFlowState} />;
            case "end":
                return <p>Thank you for completing the wizard!</p>;
            default:
                console.error(`Unknown step: ${currentNode}`);
                return <p>Unknown step</p>;
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10 space-y-6">
            <h1 className="text-3xl font-bold text-center">
                {flowDefinition[flow.getCurrentNode()]?.label || "Unknown Step"}
            </h1>
            {renderStepContent()}
            <div className="p-4 bg-gray-100 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold">Flow Info</h3>
                <ul className="mt-2 space-y-2 text-sm">
                    {flowDefinition[flow.getCurrentNode()]?.transitions.map(({ target, condition }, index) => (
                        <li key={index} className="bg-white p-2 rounded-lg shadow-sm">
                            <strong>To:</strong> {target} <br />
                            <strong>Condition:</strong> {condition.toString()}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Wizard;
