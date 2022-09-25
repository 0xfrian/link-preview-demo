import { useEffect } from "react";

import delay from "./utils/delay";
import isURL from "./utils/is-url";

async function shakeBtn() {
    const btn = document.querySelector(".btn");
    btn.disabled = true; 
    btn.classList.toggle("invalid");
    await delay(150);
    btn.disabled = false; 
    btn.classList.toggle("invalid");
}

export default function Input({ input, setInput }) {
    // Create event listener on "Enter" keypress
    useEffect(() => {
        const submit_btn = document.querySelector(".btn");
        const input_box = document.querySelector(".input");
        input_box.addEventListener("keypress", async function(event) {
            if (event.key === "Enter") {
                event.preventDefault();
                submit_btn.click();
                submit_btn.classList.toggle("pressed");
                await delay(150);
                submit_btn.classList.toggle("pressed");
            }
        }); 
    }, []);

    return (
        <div className="input-container">
            <div className="col">
                <h1 className="heading no-select">
                    Link
                </h1>
                <input className="input box" type="text" autoFocus />
            </div>
            <button className="btn"
                onClick={async () => {
                    const article_url = document.querySelector(".input").value.trim();
                    console.log("Article URL: ", article_url);
                    if (isURL(article_url))  {                           
                        if (article_url === input) {
                            console.log("Repeat");
                            await delay(100);
                            setInput(input => input + " ");
                        } else setInput(article_url);
                    }
                    else shakeBtn();
                }}
            >
               GO
            </button>
        </div>
    )
}

