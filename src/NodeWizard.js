class NodeWizard {
    constructor(nodes, startNode) {
        this.nodes = nodes;
        this.currentNode = startNode;
        this.state = {};
    }

    updateState(key, value) {
        this.state[key] = value;
    }

    getState() {
        return this.state;
    }

    getCurrentNode() {
        return this.currentNode;
    }

    next() {
        const currentNode = this.nodes[this.currentNode];

        if (!currentNode || !currentNode.transitions) {
            throw new Error(`Node "${this.currentNode}" is invalid or has no transitions.`);
        }

        for (let transition of currentNode.transitions) {
            if (transition.condition(this.state)) {
                this.currentNode = transition.target;
                return;
            }
        }

        throw new Error(`No valid transition found for node "${this.currentNode}".`);
    }

    goTo(node) {
        if (!this.nodes[node]) {
            throw new Error(`Node "${node}" does not exist.`);
        }
        this.currentNode = node;
    }
}

module.exports = NodeWizard;