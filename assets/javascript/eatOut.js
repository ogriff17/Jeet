var uiCoords = document.getElementById("button-here");
if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        uiCoords.innerHTML = "Location: " + position.coords.latitude + "," + position.coords.longitude;
    });
} else {
    console.log("Geolocation is not supported by this browser.");
};