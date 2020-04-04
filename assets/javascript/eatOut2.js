$("#search-btn-restaurant").on("click", function(event) {
    event.preventDefault();
    restaurantSearch($("#restaurant-location").val().trim());
})

function restaurantSearch(searchVal) {
    $("#restaurant-cards").empty();
    $("#restaurant-results").empty();

    var queryURL = "https://developers.zomato.com/api/v2.1/cities?q=" + searchVal;

    var col = $("<div>").attr("class")


    $("#restaurant-cards").append(col);

    $.ajax({
        url: queryURL,
        method: "GET",
        headers: {
            "user-key": "15c1ff3941761296695d21c6ac2374ee"
        }
    
    }).then(function(data) {
        console.log(data)
        //get coordinates of first suggested city
        var cityId = data.location_suggestions[0].id;

        //second query url
        var queryTwoURL = `https://developers.zomato.com/api/v2.1/location_details?entity_id=${cityId}&entity_type=city`;

        $.ajax({
            url: queryTwoURL,
            method: "GET",
            headers: {
                "user-key": "15c1ff3941761296695d21c6ac2374ee"
            }
        }).then(function(response) {

            $("#loading-col").detach();

            //get best rated restaurants list
            var resultsArr = response.best_rated_restaurant;
            
            //displaying results
                var firstCol = $("<div>").attr("class", "col text-center");

                var results = $("<h3>").attr("class", "text-center mx-auto").text("Results");
                
                firstCol.append(results);
                $("#restaurant-results").append(firstCol);
        
            //for loop to work with top 10 restaurants
            for (var i = 0; i < resultsArr.length; i++) {
                //new col for each card
                //console.log(resultsArr[i])
                var col = $("<div>").attr("class", "col-5 ");
                //new card for each restaurant
                var card = $("<div>").attr("class", "card mx-auto my-4 p-3");

                //restaurant img
                var restaurantImage = $("<img>").attr("src", resultsArr[i].restaurant.photos[0].photo.url);	
                restaurantImage.attr("height", "225");	
                restaurantImage.attr("width", "300");	
                restaurantImage.attr("class", "mx-auto my-2");
                //restaurant name
                var link = $("<a>").attr("href", resultsArr[i].restaurant.menu_url);
                var restaurantTitle = $("<h4>").attr("class", "card-title mx-auto text-center");	
                restaurantTitle.text(resultsArr[i].restaurant.name);
                link.append(restaurantTitle);
                //cuisine types
                var cuisines = $("<p>").text(`Cuisine: ${resultsArr[i].restaurant.cuisines}`).attr("class", "ml-3");
                //avg cost for two
                var avgCost = $("<p>").text(`Average cost for two: $${resultsArr[i].restaurant.average_cost_for_two}.00`).attr("class", "ml-3");
                //address
                var address = $("<p>").text(`Address: ${resultsArr[i].restaurant.location.address}`).attr("class", "ml-3");

                card.append(restaurantImage, link, cuisines, avgCost, address);
                col.append(card);
                $("#restaurant-cards").append(col);
            }
        })
    })
}