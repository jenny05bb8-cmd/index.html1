// JavaScript Document
// ---------- Intro ESC Screen ----------

const introScreen = document.querySelector(".intro-screen");
const escKeyReal = document.querySelector(".esc-key-real");

if(escKeyReal && introScreen){
    escKeyReal.addEventListener("click", () => {
        introScreen.classList.add("hide");
    });
}
const cursor = document.querySelector(".cursor");
const loader = document.querySelector(".loader");
const loadingBar = document.querySelector(".loading-bar span");
const loadingPercent = document.querySelector(".loader-percent");
const loadingText = document.querySelector("#loading-text");
const typingText = document.querySelector(".typing-text");
const enterBtn = document.querySelector(".enter-btn");
const transition = document.querySelector(".page-transition");
const light = document.querySelector(".light");

const loadingMessages = [
    "Recovering Memory...",
    "Searching Archive...",
    "Loading Metadata...",
    "Archive Ready."
];

let progress = 0;
let messageIndex = 0;

const loadingInterval = setInterval(() => {
    progress += Math.floor(Math.random() * 12) + 4;

    if (progress >= 100) {
        progress = 100;
        clearInterval(loadingInterval);

        setTimeout(() => {
            loader.classList.add("hide");
            typeHeroText();
        }, 700);
    }

    loadingBar.style.width = progress + "%";
    loadingPercent.textContent = progress + "%";

    if (progress > 25 && messageIndex === 0) {
        messageIndex = 1;
        loadingText.textContent = loadingMessages[1];
    }

    if (progress > 55 && messageIndex === 1) {
        messageIndex = 2;
        loadingText.textContent = loadingMessages[2];
    }

    if (progress > 85 && messageIndex === 2) {
        messageIndex = 3;
        loadingText.textContent = loadingMessages[3];
    }
}, 280);

// Cursor movement
window.addEventListener("mousemove", (e) => {
    if(cursor){
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
    }

    if(light){
        light.style.left = e.clientX - 260 + "px";
        light.style.top = e.clientY - 260 + "px";
    }
});

// Cursor hover effect
const hoverItems = document.querySelectorAll("button, a, input");

hoverItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
        if(cursor){
            cursor.classList.add("enter");
        }
    });

    item.addEventListener("mouseleave", () => {
        if(cursor){
            cursor.classList.remove("enter");
        }
    });
});

// Typing text
function typeHeroText(){
    const text = "Every memory leaves traces.";
    let index = 0;

    const typing = setInterval(() => {
        typingText.textContent += text[index];
        index++;

        if(index >= text.length){
            clearInterval(typing);
        }
    }, 70);
}

// Enter Archive
function enterArchive(){
    transition.classList.add("active");

    setTimeout(() => {
        window.location.href = "archive.html";
    }, 900);
}

if(enterBtn){
    enterBtn.addEventListener("click", enterArchive);
}
window.addEventListener("keydown", (e) => {
    if(e.key === "Enter"){
        enterArchive();
    }
});

// Archive hover preview

const archiveItems = document.querySelectorAll(".archive-item");
const previewImage = document.querySelector(".archive-preview img");

archiveItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
        const newImage = item.getAttribute("data-image");

        if(previewImage){
            previewImage.classList.add("change");

            setTimeout(() => {
                previewImage.src = newImage;
                previewImage.classList.remove("change");
            }, 250);
        }
    });
});

// Archive filter

const filterButtons = document.querySelectorAll(".archive-filter button");

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const filter = button.getAttribute("data-filter");

        filterButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        archiveItems.forEach((item) => {
            const category = item.getAttribute("data-category");

            if(filter === "all" || filter === category){
                item.classList.remove("hide");
            }else{
                item.classList.add("hide");
            }
        });
    });
});

// ESC random memory transition

const escBtn = document.querySelector(".esc-btn");

const memories = [
    "project.html",
    "project.html",
    "project.html",
    "archive.html"
];

function escMemory(){
    if(transition){
        transition.classList.add("active");

        setTimeout(() => {
            const randomPage = memories[Math.floor(Math.random() * memories.length)];
            window.location.href = randomPage;
        }, 900);
    }
}

if(escBtn){
    escBtn.addEventListener("click", escMemory);
}

window.addEventListener("mousemove", (e) => {

    if(cursor){
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
    }

    if(light){
        light.style.left = e.clientX - 260 + "px";
        light.style.top = e.clientY - 260 + "px";
    }

});
// ---------- GSAP Coverflow Photobook ----------

const frames = document.querySelectorAll(".frame");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

if(frames.length > 0 && typeof gsap !== "undefined"){

    let current = 0;

    function updateCoverflow(){

        frames.forEach((frame, index) => {

            const offset = index - current;
            const absOffset = Math.abs(offset);

            gsap.to(frame, {
                x: offset * 190,
                z: -absOffset * 120,
                rotationY: offset * -28,
                scale: offset === 0 ? 1 : 0.78,
                opacity: absOffset > 3 ? 0 : 1,
                duration: 0.8,
                ease: "power3.inOut",
                zIndex: 100 - absOffset
            });

        });

    }

    function nextPhoto(){
        current++;

        if(current >= frames.length){
            current = 0;
        }

        updateCoverflow();
    }

    function prevPhoto(){
        current--;

        if(current < 0){
            current = frames.length - 1;
        }

        updateCoverflow();
    }

    nextBtn?.addEventListener("click", nextPhoto);
    prevBtn?.addEventListener("click", prevPhoto);

    window.addEventListener("keydown", (e) => {
        if(e.key === "ArrowRight"){
            nextPhoto();
        }

        if(e.key === "ArrowLeft"){
            prevPhoto();
        }
    });

    updateCoverflow();
}