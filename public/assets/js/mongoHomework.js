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
