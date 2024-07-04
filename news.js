// news.js

var newsContainer = document.getElementById('news-container');
var backButton = document.getElementById('back-to-canvas');
var backToNewsButton = document.getElementById('back-to-news-selection');
var canvas = document.getElementById('tank');

// Function to load news from a JSON file
function loadNewsFromFile() {
  fetch('news.json')
    .then(response => response.json())
    .then(data => {
      displayNewsButtons(data.headlines);
    })
    .catch(error => {
      console.error('Error loading news:', error);
    });
}

// Function to display news buttons
function displayNewsButtons(headlines) {
  newsContainer.innerHTML = ''; // Clear previous news
  headlines.forEach(newsItem => {
    var newsButton = document.createElement('button');
    newsButton.className = 'news-button';
    newsButton.innerText = newsItem.title;
    newsButton.onclick = function() {
        // Add a delay of 0.2 seconds before loading the full article
        setTimeout(() => {
          loadFullArticle(newsItem); // Load the full article on click
        }, 100); // 200 milliseconds = 0.2 seconds
      };
    newsContainer.appendChild(newsButton);
  });
  newsContainer.style.display = 'block'; // Show the news container
  canvas.style.display = 'none'; // Hide the canvas
  backButton.style.display = 'block'; // Show the back button
}

// Function to load the full article script
function loadFullArticle(newsItem) {
  var script = document.createElement('script');
  script.src = 'readnews.js';
  script.onload = function() {
    displayFullArticle(newsItem); // Pass the newsItem to readnews.js
  };
  document.body.appendChild(script);
}

// Load and display news when the script is loaded
loadNewsFromFile();

// Event listener for the back button
backButton.addEventListener('click', () => {
  newsContainer.style.display = 'none'; // Hide the news container
  backButton.style.display = 'none'; // Hide the back button
  backToNewsButton.style.display = 'none'; // Hide the back-to-news button
  document.getElementById('full-article-container').style.display = 'none'; // Hide the full article container
  canvas.style.display = 'block'; // Show the canvas
  var script = document.createElement('script');
  script.src = 'canvas.js';
  document.body.appendChild(script);
});
