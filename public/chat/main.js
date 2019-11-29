class Responder {
    /**
     * Create a responder.
     * @param {String} name - name of the responder.
     * @param {Object} responses - object of responses { keyword: array of strings }
     */
    constructor(name, responses, src) {
        this.name = name;
        this.responses = responses;
        this.src = src;
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
const currentImage = document.getElementById("profileImage");
const chatbox = document.getElementsByClassName("chat")[0];
const input = document.getElementsByClassName("userInput")[0];
const sendButton = document.getElementsByClassName("sendMessage")[0];

const trexResponses = {
    "hello": [
        "RAWRR!",
        "RR- What's up?"
    ],
    "planet": [
        "To stop more dinos going extinct, throw away your trash to stop polution."
    ],
    "fact": [
        "Did you know a T-Rex can live up to 30 years?"
    ],
    "eat": [
        "I eat meat",
        "I prefer to eat meat",
        "I really like to eat meat"
    ]
};

const brontoResponses = {
    "hello": [
        "RAWRR!",
        "RR- What's up?"
    ],
    "planet": [
        "To stop more dinos going extinct, throw away your trash to stop polution."
    ],
    "fact": [
        "I am a Brantosaurus, I can grow upto 90 feet tall"
    ],
    "eat": [
        "I eat puzzlegrass",
        "I prefer to eat puzzlegrass",
        "I really like to eat puzzlegrass"
    ]
};

const t_rex = new Responder("T-REX", trexResponses, "/assets/trex.gif");
const bronto = new Responder("Brontosaurus", brontoResponses, "/assets/bronto.gif");

const responders = [t_rex, bronto];

const currentResponder = responders[document.cookie.replace("randomInt=", "")];
currentName.innerText = currentResponder.name;
currentImage.src = currentResponder.src;

sendButton.addEventListener("click", sendMessage);

input.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        sendMessage();
    }
});

async function sendMessage() {
    const response = currentResponder.generateResponse(input.value);
    let hh, mm, ss;

    hh = ("0" + new Date().getHours()).slice(-2);
    mm = ("0" + new Date().getMinutes()).slice(-2);
    ss = ("0" + new Date().getSeconds()).slice(-2);

    // message from you.
    chatbox.innerHTML += [
        "<div class='message-wrapper' data-side='right'>",
        `<p class='sender'><span class='timestamp'>${hh}:${mm}:${ss}</span> - YOU</p>`,
        "<div class='message'>",
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

    hh = ("0" + new Date().getHours()).slice(-2);
    mm = ("0" + new Date().getMinutes()).slice(-2);
    ss = ("0" + new Date().getSeconds()).slice(-2);

    // message of from dino bot.
    chatbox.innerHTML += [
        "<div class='message-wrapper' data-side='left'>",
        `<p class='sender'>${currentResponder.name} - <span class='timestamp'>${hh}:${mm}:${ss}</span></p>`,
        "<div class='message'>",
        `<p>${response}</p>`,
        "</div>",
        "</div>"
    ].join("");

    const lastMessage = chatbox.children[chatbox.children.length - 1];
    lastMessage.scrollIntoView({behavior: "smooth"});
}

const closeBtn = document.getElementsByClassName("closeBtn")[0];

closeBtn.addEventListener("click", () => {
    window.location.href = "/";
});

const countdown = document.getElementsByClassName("countdown")[0];
const currentSecond = document.getElementById("currentSec");

let currentSec = 10;

const counter = setInterval(() => {
    currentSec -= 1;

    if (currentSec <= 5) {
        countdown.style.opacity = 1;
    } else {
        countdown.style.opacity = 0;
    }

    if (currentSec === 0) {
        window.location.href = "/";
    }

    currentSecond.innerText = currentSec;
}, 1000);

document.addEventListener("mousemove", () => currentSec = 10);