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
