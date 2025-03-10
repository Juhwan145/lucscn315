"use strict";

document.addEventListener("DOMContentLoaded", function () {
    const imgFiles = [
        "images/photo01.jpg", "images/photo02.jpg", "images/photo03.jpg", "images/photo04.jpg",
        "images/photo05.jpg", "images/photo06.jpg", "images/photo07.jpg", "images/photo08.jpg",
        "images/photo09.jpg", "images/photo10.jpg", "images/photo11.jpg", "images/photo12.jpg"
    ];

    const imgCaptions = [
        "Sky Pond (Rocky Mountain National Park)", "Buffalo on the Plains (South Dakota)", 
        "Garden of the Gods (Colorado Springs)", "Elephant Head Wild Flower (Rocky Mountain National Park)",
        "Double Rainbow (Colorado National Monument)", "Moose in the Wild (Grand Lake, Colorado)",
        "Camas Wild Flower (Rocky Mountain National Park)", "Chasm Lake (Rocky Mountain National Park)",
        "Teton Crest Trail (Grand Teton National Park)", "The Notch Trail (Badlands National Park)",
        "Sprague Lake (Rocky Mountain National Park)", "Longs Peak Trail (Rocky Mountain National Park)"
    ];

    let imgCount = imgFiles.length;
    let currentImg = 1;
    let timeID;

    const lbImages = document.getElementById("lbImages");
    const lbPrev = document.getElementById("lbPrev");
    const lbNext = document.getElementById("lbNext");
    const lbPlay = document.getElementById("lbPlay");

    // Add images
    imgFiles.forEach((src, index) => {
        let img = document.createElement("img");
        img.src = src;
        img.alt = imgCaptions[index];
        img.addEventListener("click", createOverlay);
        lbImages.appendChild(img);
    });

    function showNext() {
        lbImages.appendChild(lbImages.firstElementChild); // 첫 번째 이미지를 뒤로 이동
        currentImg = (currentImg < imgCount) ? currentImg + 1 : 1;
    }

    function showPrev() {
        lbImages.insertBefore(lbImages.lastElementChild, lbImages.firstElementChild); // 마지막 이미지를 앞으로 이동
        currentImg = (currentImg > 1) ? currentImg - 1 : imgCount;
    }

    function createOverlay() {
        let overlay = document.createElement("div");
        overlay.id = "lbOverlay";

        let figureBox = document.createElement("figure");
        overlay.appendChild(figureBox);

        let overlayImage = this.cloneNode(true);
        figureBox.appendChild(overlayImage);

        let overlayCaption = document.createElement("figcaption");
        overlayCaption.textContent = this.alt;
        figureBox.appendChild(overlayCaption);

        let closeBox = document.createElement("div");
        closeBox.id = "lbOverlayClose";
        closeBox.innerHTML = "&times;";
        closeBox.onclick = () => document.body.removeChild(overlay);
        overlay.appendChild(closeBox);

        document.body.appendChild(overlay);
    }

    lbPrev.addEventListener("click", showPrev);
    lbNext.addEventListener("click", showNext);

    lbPlay.addEventListener("click", function () {
        if (timeID) {
            clearInterval(timeID);
            timeID = null;
        } else {
            showNext();
            timeID = setInterval(showNext, 1500);
        }
    });

});
