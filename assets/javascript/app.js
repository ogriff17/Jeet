$(document).ready(function () {

    ///array of food (i'm testing out the buttons for javascript, we totally don't have to do it) 
    var foodtopics = ["American", "Chinese", "Mexican", "Japanese", "Italian", "Indian", "Barbecue", "Vegan"];

    //takes array and creates buttons
    function displayButtons() {
        $(".buttons-view").empty();

        for (var i = 0; i < foodtopics.length; i++) {
            /*Do we want to put in a clear input field?
                       anytime they look for a new food-that way they dont have to re-type this*/
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

    function displayRecipes() {
        var food = $(this).attr("data-food");

        var queryURL = "https://api.spoonacular.com/recipes/complexSearch?apiKey=af0218eedd114716bee05b4c6cc69e87&limitLicense=true&instructionsRequired=true&addRecipeInformation=true&number=25&query=" + food;

        console.log(queryURL);

        $.ajax({
                url: queryURL,
                method: "GET"
            })
            .then(function (response) {
                console.log(response);
                $("#recipe-col-1").empty();
                $("#recipe-col-2").empty();
                $("#recipe-col-3").empty();
                var foodResults = response.results;

                //If no information on search is available, alert the user. Need to turn this into a modal
                if (foodResults.length === 0) {
                    alert('Sorry, there are no recipe for this topic');
                    var itemindex = foodTopics.indexOf(food);
                    // otherwise display button
                    if (itemindex > -1) {
                        foodTopics.splice(itemindex, 1);
                        displayButtons();
                    }
                }

                for (var j = 0; j < foodResults.length; j++) {

                    var foodDiv = $("<div>");
                    var q = $("<h5>").text(foodResults[j].title);
                    // var u = $("<href>").text(results[j].recipe.url);

                    // var foodDiv = $("<a href=" + results[j].recipe.url + "</a>");
                    var foodImage = $("<img>");
                    foodImage.attr("src", foodResults[j].image);
                    foodImage.attr("url", foodResults[j].image);
                    foodImage.addClass("image");
                    foodDiv.append(foodImage);
                    foodDiv.addClass("card", "card-img-top", "card-body");
                    foodDiv.append(q);
                    // foodDiv.append(u);
                    // u.attr("href");
                    // var modalLink = foodResults[j].summary;
                    foodDiv.attr("data-summary", foodResults[j].summary);
                    //used bounce.js for animation of card
                    foodDiv.addClass("animation-target");

                    foodDiv.click(function () {
                        console.log($(this));
                        $("#modalWindow").modal("show");
                        // CHASE - Fetch the summary
                        var summary = $(this).attr('data-summary')
                        // CHASE - Put summary in body
                        $(".modal-body").html(summary);
                    });

                    if (j >= 0 && j < 8) {
                        $("#recipe-col-1").append(foodDiv);
                    } else if (j >= 8 && j < 17) {
                        $("#recipe-col-2").append(foodDiv);
                    } else {
                        $("#recipe-col-3").append(foodDiv);
                    }
                }
            })

    }
    displayButtons();

    $(document).on("click", ".btnClass", displayRecipes);
})