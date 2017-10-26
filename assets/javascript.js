
$( document ).ready(function() {
// Array of buttons that the user can press. Premade so the user can see the functionality
var giphs = ["Metal", "Singing", "Game of Thrones", "Pulp Fiction", "Video Games", "Motorcycles", "Eating", "Life", "Amazing", "Creepy","Scary", "Technology", "Coding"];

// Function to display the buttons in the array. For loop will add and append those buttons to the top.
function addButtons(){
    // this div will be emptied in order to not have anything get in the way.
    $("#gifButtons").empty();
    for (var i = 0; i < giphs.length; i++){
        //creating a var holding a button tag
        var gifButton = $("<button>");
        gifButton.addClass("action");
        gifButton.addClass("btn btn-primary")
        gifButton.attr("data-name", giphs[i]);
        gifButton.text(giphs[i]);
        $("#gifButtons").append(gifButton);
    }
}
// Function to add a new action button. Make it on click so the user has a choice of adding a new one.
function addNewButton(){
    $("#addGiph").on("click", function(){
        //making sure the user can't add any extra spaces to search field
    var action = $("#action-input").val().trim();
    // this first part doesn't allow the user to search blank
    if (action == ""){
      return false;
    }
    giphs.push(action);

    addButtons();
    return false;
    });
}
// this function removes all the searches for the user and resets the buttons.
function removeAllButton(){
    $("removeGif").on("click", function(){
    giphs.pop(action);
    addButtons();
    return false;
    });
}
// Function that makes the page display the gifs. This part of the function also holds my API key.
// Made sure to limit the amount of gifs on the page to 10 at the end of the URL.
function displayGiphs(){
    var action = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + action + "&api_key=dc6zaTOxFJmzC&limit=10";
    // double check work by console logging the URL.
    console.log(queryURL);
    // ajax call. Important to pull the right gifs using API. The var queryURL holds the URL
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
    // wait until page is done loading. Asynchronous code.
    .done(function(response) {
        // another double check. Making sure it works.
        console.log(response);
        //select div and empty.
        $("#gifsView").empty(); 
        // holding the seleted gifs in a var called results from the search
        var results = response.data;
        //making sure to give user an error if their word doesn't return search
        if (results == ""){
          alert("There are no gifs for this! Search again!");
        }
        for (var i=0; i<results.length; i++){

            var gifDiv = $("<div>");
            gifDiv.addClass("gifDiv");
            //add rating to the "p" tag. FOR LOOP EACH RATING.
            var gifRating = $("<p>").text("Rating: " + results[i].rating);
            gifDiv.append(gifRating);

            //Learned from class. Set the data-still or data animate. Changes the URL. Allows user to pause or play.
            //made them still by default
            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height_small_still.url); 
            gifImage.attr("data-still",results[i].images.fixed_height_small_still.url);
            gifImage.attr("data-animate",results[i].images.fixed_height_small.url);
            gifImage.attr("data-state", "still");
            gifImage.addClass("image");
            gifDiv.append(gifImage);
            $("#gifsView").prepend(gifDiv);
        }
    });
}
//lastly, calling all functions. Refer to functions on top.
addButtons();
addNewButton();
removeAllButton();
//on click functions that set the attr of each gif in the div. If on click it's still then animate, else just leave still.
$(document).on("click", ".action", displayGiphs);
$(document).on("click", ".image", function(){
    var state = $(this).attr('data-state');
    if ( state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});
});