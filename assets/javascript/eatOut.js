$(document).ready(function () {

///
    var foodTopics = [];

     //takes array and creates buttons
     function displayButtons() {
        $(".buttons-view").empty();

        for (var i = 0; i < foodtopics.length; i++) {
            var showButton = $("<button>");

            showButton.addClass("btnClass");
            //added button animation (see eatin.css)
            showButton.addClass("animation-target")

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

    function displayRestaurants() {
    var food = $(this).attr("data-food");

    var queryURL = 
}

var uiCoords = document.getElementById("button-here");
if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        uiCoords.innerHTML = "Location: " + position.coords.latitude + "," + position.coords.longitude;
    });
} else {
    console.log("Geolocation is not supported by this browser.");
};

