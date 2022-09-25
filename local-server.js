const cors = require("cors");
const express = require("express");

const { previewLink }= require("./utils/preview-link.js");
const { embedTweet }= require("./utils/embed-tweet.js");
const { getTodaysDate } = require("./utils/helper/get-date.js");

const app = express();
app.use(express.json());
app.use(express.static("./public"))
app.use(cors());

app.post("/api/fetch-metadata", async (req, res) => {
    const article_url = req.body.article_url.trim().toLowerCase();

    console.log(`Previewing: ${article_url}`);
    try {
        let article_metadata = {};
        if (article_url.includes("https://twitter.com")) {
            article_metadata = await embedTweet(article_url);
            article_metadata.type = "tweet";
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

const port = 3000; 
app.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
});

