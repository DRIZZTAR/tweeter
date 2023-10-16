$(document).ready(function() {
  const createTweetElement = function(tweet) {
    // Create a new tweet article element
    const $tweet = $('<article>').addClass('tweet');

    // Create the header section of the tweet
    const $header = $('<header>');
    $header.append($('<img>').addClass('user-avatar').attr('src', tweet.user.avatars));
    $header.append($('<h2>').addClass('user-name').text(tweet.user.name));
    $header.append($('<span>').addClass('user-handle').text(tweet.user.handle));
    $header.appendTo($tweet);

    // Create the tweet content section
    const $content = $('<div>').addClass('tweet-content');
    $content.append($('<p>').text(tweet.content.text));
    $content.appendTo($tweet);

    // Create the footer section of the tweet
    const $footer = $('<footer>');
    $footer.append($('<span>').addClass('timestamp').text(formatTimeAgo(tweet.created_at)));
    const $icons = $('<div>').addClass('icons');
    $icons.append($('<i>').addClass('fa-solid fa-flag'));
    $icons.append($('<i>').addClass('fa-solid fa-retweet'));
    $icons.append($('<i>').addClass('fa-solid fa-heart'));
    $footer.append($icons);
    $footer.appendTo($tweet);

    return $tweet;
  };

  // Helper function to format the timestamp as "X days ago"
  const formatTimeAgo = function(timestamp) {
    const currentTime = Date.now();
    const timeDiff = currentTime - timestamp;
    const daysAgo = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    return `${daysAgo} days ago`;
  };

  // Test / driver code (temporary). Eventually will get this from the server.
  const tweetData = [
    {
      "user": {
        "name": "Raphael",
        "avatars": "/images/ninja-turtle.png",
        "handle": "@TurtleTime"
      },
      "content": {
        "text": "New pizza place is top notch!"
      },
      "created_at": 1611116232227
    },
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1697324184304
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense, donc je suis"
      },
      "created_at": 1697410584304
    },
    // Add more tweet objects as needed here
  ];

  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('.tweet-container').append($tweet);
    }
  };

  // Call the renderTweets function to display the tweets.
  renderTweets(tweetData);
});