import { TwitterTweetEmbed } from 'react-twitter-embed';
import {decode} from 'html-entities';

function adjust_description(description) {
    let new_description;
    new_description = decode(description, {level: 'html5'});
    const description_words = new_description.split(" ");
    if (description_words.length > 30) {
        new_description = description_words
            .slice(0, 30)
            .join(" ")
            + " . . . ";
    }
    return new_description;
}

export default function Card({ article }) {
    if (article.type === "pdf") {
        return (
            <article className="card no-select">
                <a href={article.url} draggable="false">
                    <div className="group">
                        <div className="caption-container">
                            <p className="caption">
                                {article.caption}
                            </p>
                        </div>
                        <div className="thumbnail-container">
                                <img alt="thumbnail" className="thumbnail pdf" src={article.thumbnail} draggable="false" loading="lazy" />
                        </div>
                        <h3 style={{marginBottom: "5px"}} className="title">
                            {article.title}
                        </h3>
                    </div>
                    <div className="group">
                        <div className="tail-container">
                            <p className="category">
                                {article.category}
                            </p>
                            <div className="source-date-container">
                                <p className="source">
                                    {article.author}
                                </p>
                                <p className="date">
                                    {article.date}
                                </p>
                            </div>
                        </div>
                    </div>
                </a>
            </article>
        );
    } else if (article.type === "article"){
        return (
            <article className="card no-select">
                <a href={article.url} draggable="false">
                    <div className="group">
                        <p className="caption">
                            {article.caption}
                        </p>
                        <div className="thumbnail-container">
                            <img alt="thumbnail" className="thumbnail" src={article.thumbnail} draggable="false" loading="lazy" />
                        </div>
                        <h3 className="title no-select" draggable="false">
                            {article.title}
                        </h3>
                        <p className="description">
                            {adjust_description(article.description)}
                        </p>
                    </div>
                    <div className="tail-container">
                        <p className="category">
                            {article.category}
                        </p>
                        <div className="source-date-container">
                            <p className="source">
                                {article.domain}
                            </p>
                            <p className="date">
                                {article.date}
                            </p>
                        </div>
                    </div>
                </a>
            </article>
        )
    } else if (article.type === "tweet") {
        const loading_snippet = 
            '<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div><div class="thumbnail-container"><img alt="thumbnail" class="thumbnail" src="https://wallpaperaccess.com/full/4719129.png"></div><h3 class="title">Rendering Tweet . . . </h3>';
        const html_snippet = loading_snippet + article.snippet;
        return (
            <div className="tweet-container no-select" draggable="false">
                <TwitterTweetEmbed 
                    placeholder={
                        <div 
                            className="tweet-placeholder no-select" 
                            draggable="false"
                            dangerouslySetInnerHTML = {{ __html: html_snippet }}
                        >
                        </div>
                    }
                    tweetId={article.tweet_id} 
                    options = {{
                        omit_script: true,
                        theme: "dark",
                        limit: 1,
                        maxwidth: 400,
                        hide_media: true,
                        hide_thread: true,
                        dnt: true,
                    }}
                />
            </div>
        );
    }
}

