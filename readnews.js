// readnews.js

var backToNewsButton = document.getElementById('back-to-news-selection');

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
var flag = false
// Event listener for the back-to-news button
backToNewsButton.addEventListener('click', () => {
  document.getElementById('full-article-container').style.display = 'none'; // Hide the full article container
  document.getElementById('news-container').style.display = 'block'; // Show the news container
  backToNewsButton.style.display = 'none'; // Hide the back-to-news button
  document.getElementById('back-to-canvas').style.display = 'block'; // Show the back-to-canvas button
  if (!flag){
    addFishToLocalStorage();
    flag = true;
  }

});
function addFishToLocalStorage() {
    console.log("IM RUNNIIIING")
    var picSrc = 'Fish3.png';
    var radius = 30;
    var x = Math.random() * (window.innerWidth - radius * 2) + radius;
    var y = Math.random() * (window.innerHeight - radius * 2) + radius;
    var dx = (Math.random() - 0.5)*1;
    var dy = (Math.random() - 0.5)*2;
  
    var fish = {
      x: x,
      y: y,
      dx: dx,
      dy: dy,
      radius: radius,
      pic: picSrc
    };
  
    var fishes = JSON.parse(localStorage.getItem('fishes')) || [];
    fishes.push(fish);
    localStorage.setItem('fishes', JSON.stringify(fishes));
  }