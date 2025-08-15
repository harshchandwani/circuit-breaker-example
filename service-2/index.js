const express = require("express");
const app = express();
const PORT = 3001;

app.get("/data", (req, res) => {
    // Randomly fail
    if (Math.random() < 0.5) {
        return res.status(500).json({ error: "Service B failed" });
    }
    res.json({ message: "Hello from Service B!" });
});

app.listen(PORT, () => {
    console.log(`Service B running on http://localhost:${PORT}`);
});
