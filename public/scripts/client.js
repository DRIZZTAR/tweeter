$(document).ready(function() {

  // Focus on tweet-text textarea when "Write a New Tweet" is clicked
  $(".write-tweet-button").on("click", function(event) {
    event.preventDefault();
    $("#tweet-text").focus();
  });

  // Helper function to escape string for security and prevent XSS
  const escape = str => {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = tweet => {
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

  const formatTimeAgo = timestamp => timeago.format(timestamp);

  const renderTweets = tweets => {
    const $tweetContainer = $('.tweet-container');
    $tweetContainer.empty();
    tweets.forEach(tweet => {
      const $tweet = createTweetElement(tweet);
      $tweetContainer.prepend($tweet);
    });
  };

  const displayError = message => {
    $('.error-message').html(message);
    $('.error-container').slideDown();
  };
  

  const loadTweets = () => {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      success: data => renderTweets(data),
      error: err => {
        console.error('Failed to fetch tweets:', err);
        displayError('Failed to fetch tweets. Please try again later.');
      }      
    });
  };

  const postTweet = formData => {
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: formData,
      success: data => {
        console.log('Data sent to the server:', formData);
        console.log('Response from the server:', data);
        $('textarea[name="text"]').val('');  // Clear the textarea after posting the tweet
        loadTweets();
      },
      error: err => {
        console.error('Failed to post tweet:', err);
        displayError('Failed to post tweet. Please try again later.');
      }      
    });
  };

  $('form').submit(function(event) {
    event.preventDefault();
    $('.error-container').slideUp();
    const formData = $(this).serialize();
    const tweetText = $(this).find('textarea[name="text"]').val().trim();

    if (!tweetText) {
      $('.error-message').html('<i class="fa-solid fa-triangle-exclamation"></i> Uh Oh! Looks like you forgot to enter a tweet. <i class="fa-solid fa-triangle-exclamation"></i>');
      $('.error-container').slideDown();
    } else if (tweetText.length > 140) {
      $('.error-message').html('<i class="fa-solid fa-triangle-exclamation"></i> Oooo that\'s a long tweet. Keep it to 140 characters or less!');
      $('.error-container').slideDown();
    } else {
      postTweet(formData);
    }
  });

  loadTweets();
});