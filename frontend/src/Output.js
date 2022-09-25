// import uuid from "react-uuid";

import Card from "./Card.js";

export default function Output({ output, article }) {
    return (
        <div className="output-container">
            <div className="col">
                <h1 className="heading no-select" id="link-preview-heading">
                    Preview
                </h1>
                <div className="output box">
                    {output}
                </div>
            </div>
            <div className="card-container">
                <Card article={article} />
            </div>
        </div>
    )
}
