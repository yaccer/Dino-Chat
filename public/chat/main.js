class Responder {
    /**
     * Create a responder.
     * @param {String} name - name of the responder.
     * @param {Object} responses - object of responses { keyword: array of strings }
     */
    constructor(name, responses) {
        this.name = name;
        this.responses = responses;
    }

    /**
     * Returns response against response list.
     * @param {Strings} query - the string to check against.
     */
    generateResponse(query) {
        for (const key in this.responses) {
            if (query.toLowerCase().includes(key)) {
                const responses = this.responses[key];
                const response = responses[Math.floor(Math.random() * responses.length)];

                return response;
            }
        }

        return "Roar! I don't know how to respond to that, try again.";
    }
}

const currentName = document.getElementById("profileName");
const chatbox = document.getElementsByClassName("chat")[0];
const input = document.getElementsByClassName("userInput")[0];
const sendButton = document.getElementsByClassName("sendMessage")[0];

const responses = {
    "hello": [
        "RAWRR!",
        "RR- What's up?"
    ],
    "eat": [
        "I eat X",
        "I prefer to eat X",
        "I really like to eat X"
    ],
    "dislike": [
        "I dislike X",
        "I don't prefer to eat X",
        "I really dislike to eat X"
    ]
};

const responder1 = new Responder("Responder 1", responses);
const responder2 = new Responder("Responder 2", responses);

const responders = [responder1, responder2];

const currentResponder = responders[document.cookie.replace("randomInt=", "")];
currentName.innerText = currentResponder.name;

sendButton.addEventListener("click", sendMessage);

input.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        sendMessage();
    }
});

async function sendMessage() {
    const response = currentResponder.generateResponse(input.value);

    // message of user.
    chatbox.innerHTML += [
        "<div class='message-wrapper' data-side='right'>",
        "<p>YOU</p>",
        "<div class='message'>",
        "<div class='blur'></div>",
        `<p>${input.value}</p>`,
        "</div>",
        "</div>"
    ].join("");

    const yourMessage = chatbox.children[chatbox.children.length - 1];
    yourMessage.scrollIntoView({behavior: "smooth"});

    // set input to empty for new message.
    input.value = "";

    // waits 1000ms before sending response.
    await new Promise(resolve => setTimeout(resolve, 1000));

    // message of dino bot.
    chatbox.innerHTML += [
        "<div class='message-wrapper' data-side='left'>",
        `<p>${currentResponder.name}</p>`,
        "<div class='message'>",
        "<div class='blur'></div>",
        `<p>${response}</p>`,
        "</div>",
        "</div>"
    ].join("");

    const lastMessage = chatbox.children[chatbox.children.length - 1];
    lastMessage.scrollIntoView({behavior: "smooth"});
}