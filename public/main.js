const randomInt = Math.floor(Math.random() * 2);
document.cookie = `randomInt=${randomInt}`;

if (randomInt === 0) {
    document.getElementById("dino").src = "/assets/trex.gif";
    document.querySelector("body").style.background = "#cbcbcb";
} else {
    document.getElementById("dino").src = "/assets/bronto.gif";
    document.querySelector("body").style.background = "#ffffff";
}

document.addEventListener("click", async () => {
    window.location.replace("/chat");
});