$(document).ready(function() {
  var $textarea = $('.new-tweet textarea');

  $textarea.on('input', function() {
    var textLength = $(this).val().length;
    var charactersRemaining = 140 - textLength;
    var $counter = $(this).siblings('.button-container').find('.counter');
    $counter.text(charactersRemaining);

    if (charactersRemaining < 0) {
      $counter.addClass('negative');
    } else {
      $counter.removeClass('negative');
    }
  });

  $(document).on('tweetPosted', function() {
    var $counter = $textarea.siblings('.button-container').find('.counter');
    $counter.text(140).removeClass('negative'); // Reset counter to 140 and remove the negative class if its set to negative
  });

});
