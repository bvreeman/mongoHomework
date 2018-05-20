// // Make sure we wait to attach our handlers until the DOM is fully loaded.
// $(document).ready(function() {
//   $(function() {
//     $('.devour-button').on('click', function(event) {
//       const id = $(this).data('id');
//       const newEaten = $(this).data('newEaten');

//       const devouredState = {
//         devoured: true,
//       };

//       // Send the PUT request.
//       $.ajax(`/api/burgers/${id}`, {
//         type: 'PUT',
//         data: devouredState,
//       }).then(function() {
//         console.log('changed sleep to', newEaten);
//         // Reload the page to get the updated list
//         location.reload();
//       });
//     });

//     $('.create-form').on('submit', function(event) {
//     // Make sure to preventDefault on a submit event.
//       event.preventDefault();

//       const newCat = {
//         name: $('#ca').val().trim(),
//         sleepy: $('[name=sleepy]:checked').val().trim(),
//       };

//       // Send the POST request.
//       $.ajax('/api/cats', {
//         type: 'POST',
//         data: newCat,
//       }).then(function() {
//         console.log('');
//         // Reload the page to get the updated list
//         location.reload();
//       });
//     });
//   });
// });
