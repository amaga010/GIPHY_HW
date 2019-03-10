//API Key: 5zUFcwzIdK78hLVHYX8xjVfP4nww5BbJ

//GIPHY Website: "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=5zUFcwzIdK78hLVHYX8xjVfP4nww5BbJ&limit=10"

//Array of original buttons

var animals = ["cat", "dog", "rabbit", "dolphin", "lion", "falcon", "bear", "frog"]
function animalButton() {
    for (var i = 0; i < animals.length; i++) {
       var button = document.createElement("button");
       button.setAttribute("id", animals[i]);
       var orignalAnimal = document.createTextNode(animals[i]);
       button.appendChild(orignalAnimal);
       $("#animals").append(button);
    }
}

//Search Button that creates new buttons from search

$(document).ready(
function addButton() {
    $("#search").click(function(e){
        e.preventDefault();
        console.log("click");
        var search = document.getElementById("text").value;
        var newButton = document.createElement("button");
        var newAnimal = document.createTextNode(search);
        newButton.setAttribute("id", search);
        newButton.appendChild(newAnimal);
        $("#animals").append(newButton);
    })

//What happens when the animal button is clicked 

$(document).on("click", "button", function(){
        var animal = $(this).attr("id");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=5zUFcwzIdK78hLVHYX8xjVfP4nww5BbJ&limit=11";
        $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function(response) {
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                console.log(response);
                if (results[i].rating === "g" || results[i].rating === "pg-13") {
                    var gifDiv = $("<div>");
                    var rating = results[i].rating;
                    var p = $("<p>").text("Rating: " + rating);
                    var animalImage = $("<img>");
                    animalImage.attr("src", results[i].images.fixed_height.url);
                    gifDiv.append(p);
                    gifDiv.append(animalImage);
                    $("#gifs").prepend(gifDiv);
                }
            }
        })
    })
})