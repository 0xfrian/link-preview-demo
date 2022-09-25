export default function isURL(article_url) {
    try {
        new URL(article_url);
        return true;
    } catch(error) {
        if (error instanceof TypeError) {
            return false;
        } 
    }
}

