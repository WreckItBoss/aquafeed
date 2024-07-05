var backToNewsButton = document.getElementById('back-to-news-selection');

var fishImagesNormal = { 'Fish3.png': 'Fish3_1.png' };
var fishImagesUncommon = { 'Fish4.png': 'Fish4_1.png', 'Fish5.png': 'Fish5_1.png' };
var fishImagesEpic = { 'Fish6.png': 'Fish6_1.png', 'Fish7.png': 'Fish7_1.png' };
var fishImagesLegendary = { 'Fish8.png': 'Fish8_1.png' };

function displayFullArticle(newsItem) {
    var fullArticleContainer = document.getElementById('full-article-container');
    fullArticleContainer.innerHTML = ''; // Clear previous content

    var titleElement = document.createElement('h1');
    titleElement.innerText = newsItem.title;
    fullArticleContainer.appendChild(titleElement);

    var sourceElement = document.createElement('p');
    sourceElement.innerText = "Source: " + newsItem.source;
    fullArticleContainer.appendChild(sourceElement);

    var bodyElement = document.createElement('p');
    bodyElement.innerText = newsItem.body;
    fullArticleContainer.appendChild(bodyElement);

    fullArticleContainer.style.display = 'block'; // Show the full article container
    document.getElementById('news-container').style.display = 'none'; // Hide the news container
    document.getElementById('back-to-canvas').style.display = 'none'; // Hide the back-to-canvas button
    backToNewsButton.style.display = 'block'; // Show the back-to-news button
}

var flag = false;

function getRandomFishImage() {
    var chance = Math.random();
    var selectedFishImages;
    if (chance < 0.25) {
        // 25% chance for Legendary
        selectedFishImages = fishImagesLegendary;
    } else if (chance < 0.50) {
        // 25% chance for Epic
        selectedFishImages = fishImagesEpic;
    } else if (chance < 0.75) {
        // 25% chance for Uncommon
        selectedFishImages = fishImagesUncommon;
    } else {
        // 25% chance for Normal
        selectedFishImages = fishImagesNormal;
    }
    
    var keys = Object.keys(selectedFishImages);
    var randomKey = keys[Math.floor(Math.random() * keys.length)];
    return { normal: randomKey, inverse: selectedFishImages[randomKey] };
}

// Event listener for the back-to-news button
backToNewsButton.addEventListener('click', () => {
    document.getElementById('full-article-container').style.display = 'none'; // Hide the full article container
    document.getElementById('news-container').style.display = 'block'; // Show the news container
    backToNewsButton.style.display = 'none'; // Hide the back-to-news button
    document.getElementById('back-to-canvas').style.display = 'block'; // Show the back-to-canvas button
    if (!flag) {
        addFishToLocalStorage();
        flag = true;
    }
});

function addFishToLocalStorage() {
    console.log("IM RUNNIIIING")

    var fishImages = getRandomFishImage();
    var picSrc = fishImages.normal;
    var picSrc2 = fishImages.inverse;
    console.log('Selected fish images:', { normal: picSrc, inverse: picSrc2 });
    var radius = 30;
    var x = Math.random() * (window.innerWidth - radius * 2) + radius;
    var y = Math.random() * (window.innerHeight - radius * 2) + radius;
    var dx = (Math.random() - 0.5) * 1;
    var dy = (Math.random() - 0.5) * 2;

    var fish = {
        x: x,
        y: y,
        dx: dx,
        dy: dy,
        radius: radius,
        pic: picSrc,
        pic2: picSrc2
    };

    var fishes = JSON.parse(localStorage.getItem('fishes')) || [];
    fishes.push(fish);
    localStorage.setItem('fishes', JSON.stringify(fishes));
}
