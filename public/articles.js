
// Grab the articles as a json
getArticles();

function getArticles () {
console.log("searching database")
  $.getJSON("/articles", function(data) {
      if (data.length > 0) {
        $(".article-container").empty();
        // For each one
        for (var i = 0; i < data.length; i++) {
          // Display the apropos information on the page
          $(".article-container").append(
            `<div data-id='${data[i]._id}' class='card'>
              <div class='card-header'>
                <h3>
                  <a class='article-link' target='_blank' rel='noopener noreferrer' href='${data[i].link}'>${data[i].title}</a>
                  <a class='btn btn-success save'>Save Article</a>
                </h3>
              </div>
              <div class='card-body'>${data[i].synopsis}
              </div>
            </div>`);
        }
      } else {
        return
      }
    
  });
}
// Whenever someone clicks "SCRAPE NEW ARTICLES!"
$(".scrape-new").click(function(event) {
  
  event.preventDefault();

  $.ajax({
    method: "GET",
    url: "/scrape"
  }).then(
    function() {
      console.log("successfully scraped");
      // Reload the page to get the updated list
      location.reload();
    }
  );
})



$(".clear").click(function(event) {
  event.preventDefault();

  $(".article-container").empty().append(
    `<div class="alert alert-warning text-center">
      <h4>Uh Oh. Looks like we don't have any new articles.</h4>
    </div>
    <div class="card">
      <div class="card-header text-center">
        <h3>What Would You Like To Do?</h3>
      </div>
      <div class="card-body text-center">
        <h4>
          <a class="scrape-new">Try Scraping New Articles</a>
        </h4>
        <h4>
          <a href="/saved">Go to Saved Articles</a>
        </h4>
      </div>
    </div>`
  )
  $.ajax({
    method: "DELETE",
    url: "/deleteAll"
  })
})


// // Whenever someone clicks a p tag
// $(document).on("click", "p", function() {
//   // Empty the notes from the note section
//   $("#notes").empty();
//   // Save the id from the p tag
//   var thisId = $(this).attr("data-id");

//   // Now make an ajax call for the Article
//   $.ajax({
//     method: "GET",
//     url: "/articles/" + thisId
//   })
//     // With that done, add the note information to the page
//     .then(function(data) {
//       console.log(data);
//       // The title of the article
//       $("#notes").append("<h2>" + data.title + "</h2>");
//       // An input to enter a new title
//       $("#notes").append("<input id='titleinput' name='title' >");
//       // A textarea to add a new note body
//       $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
//       // A button to submit a new note, with the id of the article saved to it
//       $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

//       // If there's a note in the article
//       if (data.note) {
//         // Place the title of the note in the title input
//         $("#titleinput").val(data.note.title);
//         // Place the body of the note in the body textarea
//         $("#bodyinput").val(data.note.body);
//       }
//     });
// });

// // When you click the savenote button
// $(document).on("click", "#savenote", function() {
//   // Grab the id associated with the article from the submit button
//   var thisId = $(this).attr("data-id");

//   // Run a POST request to change the note, using what's entered in the inputs
//   $.ajax({
//     method: "POST",
//     url: "/articles/" + thisId,
//     data: {
//       // Value taken from title input
//       title: $("#titleinput").val(),
//       // Value taken from note textarea
//       body: $("#bodyinput").val()
//     }
//   })
//     // With that done
//     .then(function(data) {
//       // Log the response
//       console.log(data);
//       // Empty the notes section
//       $("#notes").empty();
//     });

//   // Also, remove the values entered in the input and textarea for note entry
//   $("#titleinput").val("");
//   $("#bodyinput").val("");
// });
