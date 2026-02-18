/**
 * Q-Learning Agent Implementation
 */

export class QAgent {
    constructor(stateCount, actionCount) {
        this.stateCount = stateCount;
        this.actionCount = actionCount;
        this.alpha = 0.1;
        this.gamma = 0.9;
        this.epsilon = 0.1;
        this.qTable = Array.from({ length: stateCount }, () => new Array(actionCount).fill(0));
    }

    chooseAction(state) {
        if (Math.random() < this.epsilon) {
            return Math.floor(Math.random() * this.actionCount);
        } else {
            return this.getBestAction(state);
        }
    }

    getBestAction(state) {
        const actions = this.qTable[state];
        let maxVal = -Infinity;
        let bestAction = 0;
        for (let i = 0; i < this.actionCount; i++) {
            if (actions[i] > maxVal) {
                maxVal = actions[i];
                bestAction = i;
            }
        }
        return bestAction;
    }

    learn(state, action, reward, nextState) {
        const currentQ = this.qTable[state][action];
        const nextMaxQ = Math.max(...this.qTable[nextState]);
        const newQ = currentQ + this.alpha * (reward + this.gamma * nextMaxQ - currentQ);
        this.qTable[state][action] = newQ;
    }

    resetQTable() {
        this.qTable = Array.from({ length: this.stateCount }, () => new Array(this.actionCount).fill(0));
    }
}
