$(document).ready(function() {
  const createTweetElement = function(tweet) {
    const html = `
      <article class="tweet">
        <header>
          <img class="user-avatar" src="${tweet.user.avatars}" alt="profile-picture">
          <h2 class="user-name">${tweet.user.name}</h2>
          <span class="user-handle">${tweet.user.handle}</span>
        </header>
        <div class="tweet-content">
          <p>${tweet.content.text}</p>
        </div>
        <footer>
          <span class="timestamp">${formatTimeAgo(tweet.created_at)}</span>
          <div class="icons">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
        </footer>
      </article>
    `;
  
    // Create a jQuery element from the HTML string
    return $(html);
  };

  // Helper function to format the timestamp as "X days ago"
  const formatTimeAgo = function(timestamp) {
    const currentTime = Date.now();
    const timeDiff = currentTime - timestamp;
    // 86400000 to represent the number of milliseconds in a day
    const daysAgo = Math.floor(timeDiff / 86400000);
  
    return `${daysAgo} days ago`;
  };

  // Test / driver code (temporary). Eventually will get this from the server.
  // const tweetData = [
  //   {
  //     "user": {
  //       "name": "Raphael",
  //       "avatars": "/images/ninja-turtle.png",
  //       "handle": "@TurtleTime"
  //     },
  //     "content": {
  //       "text": "New pizza place is top notch!"
  //     },
  //     "created_at": 1697324184304
  //   },
  //   {
  //     "user": {
  //       "name": "Newton",
  //       "avatars": "https://i.imgur.com/73hZDYK.png",
  //       "handle": "@SirIsaac"
  //     },
  //     "content": {
  //       "text": "If I have seen further it is by standing on the shoulders of giants"
  //     },
  //     "created_at": 1697324184304
  //   },
  //   {
  //     "user": {
  //       "name": "Descartes",
  //       "avatars": "https://i.imgur.com/nlhLi3I.png",
  //       "handle": "@rd"
  //     },
  //     "content": {
  //       "text": "Je pense, donc je suis"
  //     },
  //     "created_at": 1697410584304
  //   },
  //   // Add more tweet objects as needed here
  // ];

  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('.tweet-container').append($tweet);
    }
  };

  // Function to load tweets from the server
  const loadTweets = function() {
    $.get('/tweets', function(data) {
      renderTweets(data);
    });
  };

  // Add an event listener for form submission and prevent default behavior
  $('form').submit(function(event) {
    event.preventDefault();
    const formData = $(this).serialize();
    $.post('/tweets', formData, function(data) {
      console.log('Data sent to the server:', formData);
      console.log('Response from the server:', data);
      // After posting the new tweet, load tweets from the server
      loadTweets();
    });
  });

  // Load tweets from the server on page load
  loadTweets();
});

