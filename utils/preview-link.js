// Import link-preview-js package
const { getLinkPreview } = require("link-preview-js");

// Generate link preview for a given URL
async function previewLink(article_url, parsed=true) {
    article_url = article_url.trim();

    async function get_link_preview(article_url) {
        // These options helps resolve fetchErrors (redirect) and Are-you-a-robot? issues
        let options = {
            followRedirects: `manual`,
            headers: {
                'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                'accept-encoding': 'gzip, deflate, br',
                'accept-language': 'en-US,en;q=0.9,fr;q=0.8,ro;q=0.7,ru;q=0.6,la;q=0.5,pt;q=0.4,de;q=0.3',
                'cache-control': 'max-age=0',
                'upgrade-insecure-requests': '1',
                'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36'
            },
            handleRedirects: (baseURL, forwardedURL) => {
                const urlObj = new URL(baseURL);
                const forwardedURLObj = new URL(forwardedURL);
                if (
                    forwardedURLObj.hostname === urlObj.hostname ||
                    forwardedURLObj.hostname === "www." + urlObj.hostname ||
                    "www." + forwardedURLObj.hostname === urlObj.hostname
                ) {
                    return true;
                } else {
                    return false;
                }
            },
            timeout: 10000, // timeout in 10 seconds
        }

        // Get link preview
        let link_preview = await getLinkPreview(article_url, options);
        return link_preview;
    }

    // Initialize link preview object
    let link_preview = {};

    // Attempt 3x to generate the link preview
    let tries = 0;
    while (tries < 3) {
        try {
            link_preview = await get_link_preview(article_url);

            // Parse response into our own custom object properties
            if (parsed) {
                let link_preview_parsed = {
                    title       : link_preview.title ? link_preview.title : "N/A",
                    description : link_preview.description ? link_preview.description : "N/A",
                    url         : link_preview.url ? link_preview.url : "N/A",
                    domain      : link_preview.siteName ? link_preview.siteName : "N/A",
                };

                if (link_preview.hasOwnProperty("images") 
                    && link_preview.images.length > 0) {
                    // Select the first image as our thumbnail 
                    link_preview_parsed.thumbnail = link_preview.images[0];
                } else if (link_preview.hasOwnProperty("favicons") 
                    // If no images exist, then use the favicon
                    && link_preview.favicons.length > 0) {
                    link_preview_parsed.thumbnail = link_preview.favicons[0];
                }

                link_preview = link_preview_parsed;
            }
        } catch(error) {
            // Assign "N/A" to unknown properties
            link_preview = {
                title       : "N/A",
                description : "N/A",
                url         : article_url,
                domain      : "N/A",
                thumbnail   : "N/A",
                error       : error,
            };
        }

        tries++;

        // If link preview fails, then scrape domain using built-in URL API
        if (link_preview.domain == "N/A") {
            const url = new URL(article_url);
            const domain = url.hostname.replace("www.", "").replace(".com", "");
            link_preview.domain = domain;
        }
    
        // If link preview succeeds, then break out of while-loop
        if (Object.values(link_preview).findIndex(value => value == "N/A") < 0) {
            break;
        }
    }

    return link_preview;
}

module.exports = {
    previewLink,
};

