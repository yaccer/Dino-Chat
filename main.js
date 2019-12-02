const randomInt = Math.floor(Math.random() * 2);
document.cookie = `randomInt=${randomInt}`;

const body = document.querySelector("body");
const dino = document.getElementById("dino");

if (randomInt === 0) {
    body.style.background = "#cbcbcb";
    dino.src = "/assets/trex.gif";
} else {
    body.style.background = "#ffffff";
    dino.src = "/assets/bronto.gif";
    dino.style.border = "solid 2px #000000";
}

document.addEventListener("click", async () => {
    window.location.href = "/chat";
});