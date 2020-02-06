const $ = (e) => document.getElementsByClassName(e);

const chat = $("chat")[0];

class Message {
    /**
     * @returns {String} - formatted time stamp.
     */
    static timeStamp() {
        const { hh, mm, ss } = {
            hh: ("0" + new Date().getHours()).slice(-2),
            mm: ("0" + new Date().getMinutes()).slice(-2),
            ss: ("0" + new Date().getSeconds()).slice(-2)
        };

        return `${hh}:${mm}:${ss}`;
    }

    /**
     * Send a message in chat.
     * @param {String} name - author of message name.
     * @param {String} message - message body.
     * @param {String} side - wether the message should appear on the left or right.
     */
    static send(name, message, side) {
        chat.innerHTML += [
            `<div class='message-wrapper' data-side='${side}'>`,
            `<p class='sender'>${name} - <span class='timestamp'>${this.timeStamp()}</span></p>`,
            "<div class='message'>",
            `<p>${message}</p>`,
            "</div>",
            "</div>"
        ].join("");

        const lastMessage = chat.children[chat.children.length - 1];
        lastMessage.scrollIntoView({behavior: "smooth"});
    }

    /**
     * Send a message in chat.
     * @param {String} path - source file of image.
     * @param {String} side - wether the message should appear on the left or right.
     */
    static sendImage(path, side) {
        chat.innerHTML += [
            `<div class='message-wrapper' data-side='${side}'>`,
            "<div class='message'>",
            `<img src="${path}"></img>`,
            "</div>",
            "</div>"
        ].join("");

        const lastMessage = chat.children[chat.children.length - 1];
        lastMessage.scrollIntoView({behavior: "smooth"});
    }
}

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

const defaultResponses = {
    "hello": [
        { response: "RAWRR!" },
        { response: "RR- What's up?" }
    ],
    "planet": [
        { response: "To stop more endangered species from going extinct, throw away your trash to stop polution." }
    ]
};

const trexResponses = {
    ...defaultResponses,
    "fact": [
        { response: "Did you know a T-Rex can live up to 30 years?" }
    ],
    "eat": [
        {
            response: "I eat meat",
            image: "/assets/juicy_meat.jpeg"
        },
        {
            response: "I prefer to eat meat",
            image: "/assets/juicy_meat.jpeg"
        },
        {
            response: "I really like to eat meat",
            image: "/assets/juicy_meat.jpeg"
        }
    ]
};

const brontoResponses = {
    ...defaultResponses,
    "fact": [
        { response: "I am a Brantosaurus, I can grow upto 90 feet tall" }
    ],
    "eat": [
        {
            response: "I eat puzzlegrass",
            image: "/assets/grass-16044_640.jpg"
        },
        {
            response: "I prefer to eat puzzlegrass",
            image: "/assets/grass-16044_640.jpg"
        },
        {
            response: "I really like to eat puzzlegrass",
            image: "/assets/grass-16044_640.jpg"
        },
    ]
};

const t_rex = new Responder("Terry T-REX", trexResponses, "/assets/trex.gif");
const bronto = new Responder("Barry Brontosaurus", brontoResponses, "/assets/bronto.gif");
const responders = [t_rex, bronto];

const currentResponder = responders[document.cookie.replace("randomInt=", "")];

for (const element of $("botName")) {
    element.innerText = currentResponder.name;
}

for (const element of $("botImage")) {
    element.src = currentResponder.src;
}


const userInput = $("userInput")[0];
const sendMessageButton = $("sendMessageButton")[0];

// called when 'enter' key or 'send' button is pressed
async function sendMessage() {
    const { response, image } = currentResponder.generateResponse(userInput.value);

    Message.send("YOU", userInput.value, "right");
    // Message.sendImage("./ass");
    userInput.value = "";

    // waits 1000ms before sending response.
    await new Promise(_ => setTimeout(_, 750));

    Message.send(currentResponder.name, response, "left");

    if (image) {
        Message.sendImage(image, "left");
    }
}

sendMessageButton.addEventListener("click", sendMessage);

userInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        sendMessage();
    }
});

const beginWith = document.getElementById("beginWith");

const closeBtn = document.getElementsByClassName("closeBtn")[0];

closeBtn.addEventListener("click", () => {
    window.location.href = "/end";
});

const countdown = document.getElementsByClassName("countdown")[0];
const currentSecond = document.getElementById("currentSec");

let currentSec = 20;

const counter = setInterval(() => {
    currentSec -= 1;

    if (currentSec <= 5) {
        countdown.style.opacity = 1;
    } else {
        countdown.style.opacity = 0;
    }

    if (currentSec === 0) {
        window.location.href = "/end";
    }

    currentSecond.innerText = currentSec;
}, 1000);

document.addEventListener("mousemove", () => currentSec = 10);
document.addEventListener("keypress", () => currentSec = 10);

const suggestions = document.getElementsByClassName("suggestions")[0];

for (const suggestion of suggestions.children) {
    suggestion.addEventListener("click", async () => {
        const { response, image } = currentResponder.generateResponse(suggestion.innerText);

        Message.send("YOU", suggestion.innerText, "right");

        // waits 1000ms before sending response.
        await new Promise(_ => setTimeout(_, 750));

        Message.send(currentResponder.name, response, "left");

        if (image) {
            Message.sendImage(image, "left");
        }

        userInput.focus();
    });
}

const keywords = document.getElementsByClassName("list")[0];

for (const keyword of keywords.children) {
    keyword.addEventListener("click", async () => {
        const { response, image } = currentResponder.generateResponse(keyword.innerText);

        Message.send("YOU", keyword.innerText, "right");

        // waits 1000ms before sending response.
        await new Promise(_ => setTimeout(_, 750));

        Message.send(currentResponder.name, response, "left");

        if (image) {
            Message.sendImage(image, "left");
        }

        userInput.focus();
    });
}