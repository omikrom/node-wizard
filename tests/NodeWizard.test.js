const NodeWizard = require("../src/NodeWizard");

describe("NodeWizard", () => {
    let formNodes;
    let nodeWizard;

    beforeEach(() => {
        // Mock node graph for testing
        formNodes = {
            step1: {
                label: "Step 1",
                transitions: [
                    { target: "step2", condition: (state) => state.option === "next" },
                    { target: "step3", condition: (state) => state.option === "skip" },
                ],
            },
            step2: {
                label: "Step 2",
                transitions: [
                    { target: "step4", condition: () => true },
                ],
            },
            step3: {
                label: "Step 3",
                transitions: [
                    { target: "step4", condition: () => true },
                ],
            },
            step4: {
                label: "Step 4",
                transitions: [],
            },
        };

        nodeWizard = new NodeWizard(formNodes, "step1");
    });

    test("initializes with the correct starting node", () => {
        expect(nodeWizard.getCurrentNode()).toBe("step1");
    });

    test("updates state correctly", () => {
        nodeWizard.updateState("option", "next");
        expect(nodeWizard.getState()).toEqual({ option: "next" });
    });

    test("transitions to the correct node based on condition", () => {
        nodeWizard.updateState("option", "next");
        nodeWizard.next();
        expect(nodeWizard.getCurrentNode()).toBe("step2");

        nodeWizard.next();
        expect(nodeWizard.getCurrentNode()).toBe("step4");
    });

    test("handles alternate transitions correctly", () => {
        nodeWizard.updateState("option", "skip");
        nodeWizard.next();
        expect(nodeWizard.getCurrentNode()).toBe("step3");

        nodeWizard.next();
        expect(nodeWizard.getCurrentNode()).toBe("step4");
    });

    test("throws an error if no valid transition is found", () => {
        expect(() => nodeWizard.next()).toThrowError(
            'No valid transition found for node "step1".'
        );
    });

    test("can manually go to a specific node", () => {
        nodeWizard.goTo("step3");
        expect(nodeWizard.getCurrentNode()).toBe("step3");

        nodeWizard.goTo("step4");
        expect(nodeWizard.getCurrentNode()).toBe("step4");
    });

    test("throws an error if attempting to go to a nonexistent node", () => {
        expect(() => nodeWizard.goTo("nonexistent")).toThrowError(
            'Node "nonexistent" does not exist.'
        );
    });
});