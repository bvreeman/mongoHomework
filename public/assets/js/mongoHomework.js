// Handle Scrape button
$('#submitScrape').on('click', function() {
  $.ajax({
    method: 'GET',
    url: '/scrape',
  }).done(function(data) {
    console.log(data);
    window.location = '/';
  });
});

// Handle Save Article button
$('.saveArticle').on('click', function() {
  const thisId = $(this).attr('data-id');
  console.log('this is thisId ********', thisId);
  $.ajax({
    method: 'POST',
    url: `/articles/save/${thisId}`,
  }).done(function() {
    window.location = '/';
  });
});

// Handle Delete Article button
$('.deleteArticle').on('click', function() {
  const thisId = $(this).attr('data-id');
  $.ajax({
    method: 'POST',
    url: `/articles/delete/${thisId}`,
  }).done(function() {
    window.location = '/saved';
  });
});

// Handle Save Note button
$('.saveNote').on('click', function() {
  const thisId = $(this).attr('data-id');
  if (!$(`#noteText${thisId}`).val()) {
    alert('please enter a note to save');
  } else {
    $.ajax({
      method: 'POST',
      url: `/notes/save/${thisId}`,
      data: {
        text: $(`#noteText${thisId}`).val(),
      },
    }).done(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $(`#noteText${thisId}`).val('');
      $('.modalNote').modal('hide');
      window.location = '/saved';
    });
  }
});

// Handle Delete Note button
$('.deleteNote').on('click', function() {
  const noteId = $(this).attr('data-note-id');
  const articleId = $(this).attr('data-article-id');
  $.ajax({
    method: 'DELETE',
    url: `/notes/delete/${noteId}/${articleId}`,
  }).done(function(data) {
    console.log(data);
    $('.modalNote').modal('hide');
    window.location = '/saved';
  });
});
