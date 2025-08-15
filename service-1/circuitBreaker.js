class CircuitBreaker {
    constructor(failureThreshold, cooldownPeriod, successThreshold) {
        this.failureThreshold = failureThreshold; // allowed failures before trip
        this.cooldownPeriod = cooldownPeriod; // time before retry
        this.successThreshold = successThreshold; // needed successes to close
        this.state = "CLOSED"; // CLOSED, OPEN, HALF
        this.failureCount = 0;
        this.successCount = 0;
        this.nextAttempt = Date.now();
    }

    async call(action) {
        if (this.state === "OPEN") {
            if (Date.now() > this.nextAttempt) {
                this.state = "HALF"; // try again
            } else {
                throw new Error("Circuit breaker is OPEN");
            }
        }

        try {
            const result = await action();
            this._success();
            return result;
        } catch (err) {
            this._fail();
            throw err;
        }
    }

    _success() {
        if (this.state === "HALF") {
            this.successCount++;
            if (this.successCount >= this.successThreshold) {
                this.state = "CLOSED";
                this.failureCount = 0;
                this.successCount = 0;
            }
        } else {
            this.failureCount = 0;
        }
    }

    _fail() {
        this.failureCount++;
        if (this.failureCount >= this.failureThreshold) {
            this.state = "OPEN";
            this.nextAttempt = Date.now() + this.cooldownPeriod;
        }
    }
}

module.exports = CircuitBreaker;
