// Import axios package
const axios = require("axios");

// Generates embedded HTML snippet for a given tweet
async function embedTweet(tweet_url) {

    const TWITTER_API = "https://publish.twitter.com/oembed";

    // Define parameters for embedded tweet
    const params = {
        url: tweet_url, 
        omit_script: 0,
        theme: "dark",
        dnt: true,
        limit: 1,
        maxwidth: 400,
        hide_media: true,
        hide_thread: true,
    };

    // Send GET request to Twitter API with parameters
    let embedded_tweet = "";
    try {
        embedded_tweet = (await axios.get(TWITTER_API, { params: params })).data.html; // string containing HTML code
    } catch (error) {
        embedded_tweet = "N/A";
        // throw error;
    }

    const tweet_id_index = tweet_url.search("/status/");
    const query_string_index = tweet_url.search("\\?");
    const tweet_id = (query_string_index != -1) ? 
        tweet_url.substring(tweet_id_index+8, query_string_index) 
        : tweet_url.substring(tweet_id_index+8);
    
    link_preview = {
        snippet: embedded_tweet, 
        tweet_id: tweet_id, 
    }

    return link_preview;
}

module.exports = {
    embedTweet,
};

