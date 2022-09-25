const path = require("path");
const cors = require("cors");
const express = require("express");

const { previewLink } = require("../utils/preview-link.js");
const { previewPDF }= require("../utils/preview-pdf.js");
const { embedTweet }= require("../utils/embed-tweet.js");
const { getTodaysDate } = require("../utils/helper/get-date.js");

const app = express();
app.use(express.json());
app.use(express.static("./public"))
app.use(cors());

app.get("/api", (_, res) => {
    res.send("Hello! Welcome to the /api page of our Vercel app");
});

app.post("/api/fetch-metadata", async (req, res) => {
    const article_url = req.body.article_url.trim().toLowerCase();

    console.log(`Previewing: ${article_url}`);
    try {
        let article_metadata = {};
        if (article_url.includes("https://twitter.com")) {
            article_metadata = await embedTweet(article_url);
            article_metadata.type = "tweet";
        } else if (article_url.slice(-3).includes("pdf")) {
            article_metadata = await previewPDF(article_url);
            article_metadata.type = "pdf";
        } else {
            article_metadata = await previewLink(article_url, parsed=true);
            article_metadata.type = "article";
        }
        article_metadata.date = getTodaysDate();

        res.send(article_metadata);
    } catch(error) {
        console.log("Error: ", error);
        res.json(error);
    }
});

app.all("*", (_, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

module.exports = app;

