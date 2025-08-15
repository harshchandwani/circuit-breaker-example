const express = require("express");
const axios = require("axios");
const CircuitBreaker = require("./circuitBreaker");

const app = express();
const PORT = 3000;

const breaker = new CircuitBreaker(3, 5000, 2); // 3 fails → OPEN, wait 5s, 2 success → CLOSE

app.get("/fetch-data", async (req, res) => {
    try {
        const response = await breaker.call(() =>
            axios.get("http://localhost:3001/data")
        );
        res.json({ state: breaker.state, data: response.data });
    } catch (error) {
        res.status(500).json({ state: breaker.state, error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Service A running on http://localhost:${PORT}`);
});
