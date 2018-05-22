// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(document).ready(function() {
  console.log('test');
  $('.devour-button').on('click', function(event) {
    event.preventDefault();
    console.log('test the button');
    const id = $(this).data('id');
    // const newEaten = $(this).data('burgerName');
    console.log(id);
    // console.log(newEaten);

    const devouredState = {
      devoured: true,
    };

      // Send the PUT request.
    $.ajax(`/api/burgers/${id}`, {
      type: 'PUT',
      data: devouredState,
    }).then(function(data) {
      console.log(data);
    //   console.log('changed sleep to', newEaten);
      // Reload the page to get the updated list
    //   window.location.reload();
    });
  });

  $('.add-burger-button').on('submit', function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    const newBurger = {
      burger_name: $('#newBurger').val().trim(),
      devoured: false,
    };
    console.log(`this is newBurger${newBurger}`);
    // Send the POST request.
    $.ajax('/api/burgers', {
      type: 'POST',
      data: newBurger,
    }).then(function() {
      console.log('created a new burger');
      // Reload the page to get the updated list
      // location.reload();
    });
  });
});
