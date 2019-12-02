const countdown = document.getElementsByClassName("countdown")[0];
const currentSecond = document.getElementById("currentSec");

let currentSec = 10;

const counter = setInterval(() => {
    currentSec -= 1;

    currentSec <= 5
        ? countdown.style.opacity = 1
        : countdown.style.opacity = 0;

    if (currentSec === 0) {
        window.location.href = "/";
    }

    currentSecond.innerText = currentSec;
}, 1000);

document.addEventListener("mousemove", () => currentSec = 10);
document.addEventListener("keypress", () => currentSec = 10);

const closeBtn = document.getElementsByClassName("closeBtn")[0];

closeBtn.addEventListener("click", () => {
    window.location.href = "/";
});