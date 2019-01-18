
var GIFs = ["Dogs", "Cats",];

function displayGIFs (){

    var GIF = $(this).attr("data-name");

    // Variables for building search URL
    var url = "https://api.giphy.com/v1/gifs/search?"

    var API = "api_key=2ut86fDVP8EuluoVvP5wTThTOEJxLt85"

    // var input = $("#searchInput").val().trim();

    var limit = "&limit=10"

    var queryURL = url + API + "&q=funny" + GIF + limit

    $.ajax ({
        url: queryURL,
        method: "GET"
    }).then (function(response){
        
        console.log(response);

        
        for (var j = 0; j < response.data.length; j++) {

            // Stores gifsDiv Element into a variable 
            var GIFSdiv = $(".gifsDiv");

            // Stores still image url in a variable
            var stillURL = response.data[j].images.fixed_height_still.url;
            var ratingInfo = response.data[j].rating;
                var animatedURL = response.data[0].images.downsized_medium.url;


            // Variable that creates an image element and assigns src 
            // attribute and url from each gif in loop
            var still = $("<img>").attr("src", stillURL);
            var rating = $("<p>").text("Rating: " + ratingInfo);


            // Adds an ID to each GIF so it can be styled in CSS
            still.attr("id", "still-img");
            rating.attr("id", "rating-info");

            // Appends all still to the gifsDiv
            GIFSdiv.append(still);
            GIFSdiv.append(rating);

            var imgStatusStill = true;
            

            $("#still-img").on("click", function () {

                $("#still-img").attr("src", animatedURL);
            });

        };

    });

};

function renderBtns () {

    $(".buttons").empty();

    for (var i = 0; i < GIFs.length; i++) {

        var newBtn = $("<button>");

        newBtn.addClass("animal-btn");

        newBtn.attr("data-name", GIFs[i]);

        newBtn.text(GIFs[i]);

        $(".buttons").append(newBtn);
    };
};

// Handle event when add animal button is clicked
$("#add-animal").on("click", function (event) {

    event.preventDefault();

    var GIF = $("#searchInput").val().trim();

    GIFs.push(GIF);

    renderBtns();
});

$(document).on("click", ".animal-btn", displayGIFs);

renderBtns();

// TODO: 
// 1. Get images to toggle between still and animated
// 2. Get GIFs to clear when new button is clicked
// 3. Style

// });