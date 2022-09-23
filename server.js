const path = require("path");
const cors = require("cors");
const express = require("express");

const app = express();
app.use(express.json());
app.use(express.static("./public"))
app.use(cors());

app.get("/api", (_, res) => {
    res.send("Hello! Welcome to the /api page of our Vercel app");
});

app.post("/api/kek", (req, res) => {
    res.send(req.body.message + " kek");
});

app.all("*", (_, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

const port = 3000;
app.listen(port, () => {
    console.log(`Express Server listening on port ${port}`);
})

module.exports = app;

