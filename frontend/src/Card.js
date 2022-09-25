import { TwitterTweetEmbed, TwitterTimelineEmbed } from 'react-twitter-embed';
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
    if (article.type === "article" || article.type === "pdf") {
        return (
            <article className="card no-select">
                <a className="card-a-wrapper" href={article.url} draggable="false">
                    <div className="group">
                        <div className="thumbnail-container">
                            <img alt="thumbnail" className="thumbnail" src={article.thumbnail} draggable="false" loading="lazy" />
                        </div>
                        <h3 className="title no-select" draggable="false">
                            {article.title}
                        </h3>
                        <p className="description">
                            {adjust_description(article.description)}
                        </p>                    </div>
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
        return (
            <div className="tweet-container no-select" draggable="false">
                <TwitterTweetEmbed 
                    placeholder={
                        <div 
                            className="card no-select" 
                            draggable="false"
                        >
                            <div className="lds-ellipsis">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                    }
                    tweetId={article.tweet_id} 
                    options = {{
                        omit_script: true,
                        theme: "dark",
                        limit: 1,
                        maxwidth: 350,
                        hide_media: true,
                        hide_thread: true,
                        dnt: true,
                    }}
                />
            </div>
        );
    } else if (article.type === "timeline") {
        return (
            <div className="tweet-container no-select" draggable="false">
                <TwitterTimelineEmbed 
                    placeholder={
                        <div 
                            className="card no-select" 
                            draggable="false"
                        >
                            <div className="lds-ellipsis">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                    }
                    sourceType="profile" 
                    screenName={article.tweet_profile}
                    options = {{
                        omit_script: true,
                        theme: "dark",
                        limit: 1,
                        maxwidth: 350,
                        maxheight: 500,
                        dnt: true,
                    }}
                />
            </div>
        );
    }
}

