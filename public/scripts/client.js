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

// Helper function to format the timestamp using Timeago
  const formatTimeAgo = function(timestamp) {
    return timeago.format(timestamp); // Use Timeago to format the timestamp
  };

  const renderTweets = function(tweets) {
    const $tweetContainer = $('.tweet-container');
    const $newTweet = createTweetElement(tweets[tweets.length - 1]);
    $tweetContainer.prepend($newTweet);
  };
  

  const loadTweets = function() {
    $.get('/tweets', function(data) {
      renderTweets(data);
    });
  };

  // event listener for form submission and prevent default behavior
  $('form').submit(function(event) {
    event.preventDefault();
    const formData = $(this).serialize();
        
        // Basic data validation to alert user
        const tweetText = $(this).find('textarea[name="text"]').val();
        if (!tweetText) {
          alert('Uh Oh! Looks like you forgot to enter a tweet. Thats ok, please enter your tweet.');
        } else if (tweetText.length > 140) {
          alert('Ooo thats a long tweet. Keep it to 140 characters or less');
        } else {

    $.post('/tweets', formData, function(data) {
      console.log('Data sent to the server:', formData);
      console.log('Response from the server:', data);
      // After posting the new tweet, load tweets from the server
      loadTweets();
    });
  }
  });

  loadTweets();
});

