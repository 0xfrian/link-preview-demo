import axios from "axios";
import uuid from "react-uuid";
import { useRef, useState, useEffect } from "react";

import Input from "./Input.js";
import Output from "./Output.js";

import delay from "./utils/delay";

function App() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState([]);

    let article_metadata = useRef({});

    // Each time input field changes, update the output
    useEffect(() => {
        async function processInput() {
            const article_url = input;

            setOutput([]);
            article_metadata.current = {};

            setOutput(output => [...output, 
                <span key={uuid()} className="text">
                    Fetching link metadata 
                    &nbsp;
                    .  .  .  .  .  .  .  .  .
                    &nbsp;
                </span>, 
                <span key={uuid()}></span>,
            ]);
            const API_URL_BASE = "/api";
            // const API_URL_BASE = "http://localhost:3000/api";
            const start_time = performance.now();
            let end_time = 0;
            let index = 0;
            axios.post(`${API_URL_BASE}/fetch-metadata`, { article_url : article_url })
                .then(response => {
                    end_time = performance.now();
                    article_metadata.current = response.data;
                })
                .catch(error => console.log("Error: ", error));
            while (Object.keys(article_metadata.current).length === 0) {
                const LOADING_SYMBOLS = ["/", "|", "\\", "-"];
                index = index % 4;
                setOutput(output => [...output.slice(0, -1), 
                    <span key={uuid()} className="text">
                        {LOADING_SYMBOLS[index]}
                    </span>
                ]);
                index++;
                await delay(150);
            }
            if (Object.keys(article_metadata.current).length > 0) {
                const time_elapsed = Math.ceil(end_time-start_time);

                setOutput(output => [...output.slice(0, -1), 
                    <span key={uuid()} className="text">
                        Done [
                            <span key={uuid()} className="green">
                                {time_elapsed}ms
                            </span>]
                    </span>,
                    <p key={uuid()}>&nbsp;</p>,
                ]);

                setOutput(output => [...output,
                    <p key={uuid()} className="text">
                        Link Preview: 
                    </p>
                ]);

                let metadata_output = [];
                for (const property in article_metadata.current) {
                    const entry = 
                        <p key={uuid()} className="text">
                            &emsp;
                            <span key={uuid()} className="yellow">
                                {property}
                            </span>
                            &nbsp;
                            :
                            &nbsp; 
                            <span key={uuid()} className="blue">
                                {article_metadata.current[property]}
                            </span>
                        </p>
                    metadata_output.push(entry);
                }

                setOutput(output => [...output, 
                    ...metadata_output
                ]);
            }
        }

        const input_box = document.querySelector(".input");
        if (input_box.value.length > 0) {
            processInput();
        }
    }, [input]);

    return (
        <>
            <Input 
                input={input} 
                setInput={setInput} 
                setOutput={setOutput} 
            />
            <Output 
                output={output} 
                article={article_metadata.current}
            />
        </>
    );
}

export default App;

