$(document).ready(function () {

///array of food (i'm testing out the buttons for javascript, we totally don't have to do it) 
var foodtopics = ["Pizza", "Chinese Dishes", "Mexican Dishes", "Italian", "Indian Dishes"];

//takes array and creates buttons
function displayButtons () {
        $(".buttons-view").empty();

        for (var i = 0; i < foodtopics.length; i++) {
            var showButton = $("<button>");

            showButton.addClass("btnClass");

            showButton.attr("data-food", foodtopics[i]);

            showButton.text(foodtopics[i]);

            $(".buttons-view").append(showButton);
        }
    }       
$("#button-here").on("click", function (event) {
    //grabs user input from text box
    event.preventDefault();
    var food = $("#food-input").val().trim();
    foodtopics.push(food);
    displayButtons();
});

function displayRecipes() {
    var food = $(this).attr("data-food");

    var queryURL = "https://api.edamam.com/search?q=" + food + "&app_id=61b506d1&app_key=f0d00dcc2ff7622fe52c06579759bdd0&limit=20";

    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response) {
        console.log(response);
        $("#recipe-col-1").empty();
        $("#recipe-col-2").empty();
        $("#recipe-col-3").empty();
        var results = response.data;

        //If no information on search is available, alert the user. Need to turn this into a modal
        if (response.pagination.total_count == 0) {
            alert('Sorry, there are no Gifs for this topic');
            var itemindex = foodTopics.indexOf(food);
            // otherwise display button
            if (itemindex > -1) {
              foodTopics.splice(itemindex, 1);
              displayButtons();
              }
          }

        for (var j=0; j < results.length; j++) {
            var foodDiv = $("<div");

            var foodImage = $("<img>");
            foodImage.attr("src",results[j].recipe.image);
            foodImage.attr("url",results[j].recipe.image);
            foodImage.addClass("image");
            foodDiv.append(foodImage);
            foodDiv.addClass("card","card-img-top","card-body");
            
            if (j >= 0 && j <3) {
            $("#recipe-col-1").append(foodDiv);
            } else if (j >= 3 && j < 7) {
            $("#recipe-col-2").append(foodDiv);    
            } else {
            $("#recipe-col-3").append(foodDiv);
            }
        }
    });
}
displayButtons();

$(document).on("click", ".btnClass", displayRecipes);
})