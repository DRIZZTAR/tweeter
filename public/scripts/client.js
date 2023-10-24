$(document).ready(function() {

  // Focus on tweet-text textarea when "Write a New Tweet" is clicked
  $(".write-tweet-button").on("click", function(event) {
    event.preventDefault();
    $("#tweet-text").focus();
  });
  
  // Helper function to escape string for security and prevent XSS
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function(tweet) {
    const html = `
      <article class="tweet">
        <header>
          <img class="user-avatar" src="${escape(tweet.user.avatars)}" alt="profile-picture">
          <h2 class="user-name">${escape(tweet.user.name)}</h2>
          <span class="user-handle">${escape(tweet.user.handle)}</span>
        </header>
        <div class="tweet-content">
          <p>${escape(tweet.content.text)}</p>
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
    return $(html);
  };

  // Helper function to format the timestamp using Timeago
  const formatTimeAgo = function(timestamp) {
    return timeago.format(timestamp);
  };

  // Render tweets on the page
  const renderTweets = function(tweets) {
    const $tweetContainer = $('.tweet-container');
    $tweetContainer.empty();  // Empty the tweet container to prevent duplicate tweets
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $tweetContainer.prepend($tweet);
    }
  };
  
  const loadTweets = function() {
    $.get('/tweets', function(data) {
      renderTweets(data);
    });
  };

  // Event listener for form submission
  $('form').submit(function(event) {
    event.preventDefault();
    $('.error-container').slideUp();
    const formData = $(this).serialize();
    const tweetTextArea = $(this).find('textarea[name="text"]');
    const tweetText = tweetTextArea.val();
        
    // Basic data validation to alert user
    if (!tweetText) {
      $('.error-message').html('<i class="fa-solid fa-triangle-exclamation"></i> Uh Oh! Looks like you forgot to enter a tweet. <i class="fa-solid fa-triangle-exclamation"></i>');
      $('.error-container').slideDown();
    } else if (tweetText.length > 140) {
      $('.error-message').html('<i class="fa-solid fa-triangle-exclamation"></i> Oooo that\'s a long tweet. Keep it to 140 characters or less!');
      $('.error-container').slideDown();
    } else {
      $.post('/tweets', formData, function(data) {
        console.log('Data sent to the server:', formData);
        console.log('Response from the server:', data);
        tweetTextArea.val('');  // Clear the textarea after posting the tweet
        loadTweets();           // Load tweets from the server
      });
    }
  });

  // Initial load of tweets when the page is ready
  loadTweets();
});

