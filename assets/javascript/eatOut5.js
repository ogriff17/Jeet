$(document).ready(function() {

$("#search-btn-restaurant").on("click", function (event) {

    event.preventDefault();
   
    restaurantSearch($("#restaurant-location").val().trim());

});

function restaurantSearch(cityName) {
    
    $("#restaurant-cards").empty();
    $("#restaurant-results").empty();

    var queryURL = "https://developers.zomato.com/api/v2.1/locations?query=" + cityName;

    console.log(queryURL);
    foodType = $("#food-search").val().trim();
 
    $.ajax({
        url: queryURL,
        method: "GET",
        headers: {
            "user-key": "15c1ff3941761296695d21c6ac2374ee"
        }

    }).then(function(response) {
    console.log(response);
    var entityID= response.location_suggestions[0].entity_id;
    var citylat= response.location_suggestions[0].latitude;  
    var citylong= response.location_suggestions[0].longitude;
    
    console.log(entityID);
    console.log(citylat);
    console.log(citylong);
    

    var queryURL2 = "https://developers.zomato.com/api/v2.1/search?q=" + foodType + "&entity_id=" + entityID + "&lat="+ citylat + "&lon=" + citylong + "&apikey=15c1ff3941761296695d21c6ac2374ee"

            $.ajax({
                url: queryURL2,
                method: "GET",
                header: {
                    "user-key": "15c1ff3941761296695d21c6ac2374ee"
                }
            }).then(function(foodResponse) {
            console.log(foodResponse);
        })

    
})





}
// CHASE
// // get type of food value from search bar
// var foodType
// var cityName
// $.ajax(
//   // code to fetch lat/lon for this city
// ).then(function(cityResults) {
//   $.ajax(
//     method: "GET",
//     url: "zomato.api/search?q=" + foodType + "&lat=" + cityResults.lat + "&lon=" + cityResults.lon
//   ).then(function(results) {
//     for loop over results {
//       create a new div with image and url
//     }
//   })
})
