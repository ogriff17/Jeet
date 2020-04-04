$(document).ready(function () {
    //Array for possible menu items
    var menuOptions = [];

    //Display searched items
    function displayButtons() {
        $(".buttons-view").empty();

        for (var i=0; i < menuOptions.length; i++) {
            var showButton = $("<button>");

        showButton.addClass("btnClass");
        //Adding button animations?
        //showButton.addClass("animation-target");
        showButton.attr("data-menu", menuOptions[i]);

        $(".buttons-view").append(showButton);
        }
    }
    //Adds searched items
    $("#button-here").on("click", function(event) {
        event.preventDefault();
        var dish = $("#dish-input").val().trim();
        menuOptions.push(dish);
        displayButtons();
    });

    //Query the DailyMenu API
    function displayAllMenus() {
        var dish = $(this).attr("data-menu");

        var queryUrl = "https://developers.zomato.com/api/v2.1/dailymenu?" + dish;
        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET",
            headers: {
                "userkey": "15c1ff3941761296695d21c6ac2374ee"
            }
        })
        .then(function(response) {
            console.log(response);
        })

    }
})

//var uiCoords = document.getElementById("button-here");
//if(navigator.geolocation) {
   // navigator.geolocation.getCurrentPosition(position => {
        //uiCoords.innerHTML = "Location: " + position.coords.latitude + "," + position.coords.longitude;
    //});
//} else {
   // console.log("Geolocation is not supported by this browser.");
//};

