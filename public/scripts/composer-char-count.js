$(document).ready(function() {
  // Select the textarea within the form inside the .new-tweet section
  var $textarea = $('.new-tweet textarea');
  // Register an event handler for the input event on the textarea
  $textarea.on('input', function() {
    var textLength = $(this).val().length;// Use 'this' to refer to the textarea element
    var charactersRemaining = 140 - textLength;// Calculate the number of characters remaining
    var $counter = $(this).siblings('.button-container').find('.counter');// Update the counter on the page
    $counter.text(charactersRemaining);
    // Change the counter color to red if it's negative
    if (charactersRemaining < 0) {
      $counter.addClass('negative');
    } else {
      $counter.removeClass('negative');
    }
  });
});