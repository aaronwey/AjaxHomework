    // initial animal array
    var animals = ["dogs", "cats", "birds", "snakes", "rabbits", "goats", "llamas", "donkeys"];
    var stillImg = [];
    var animateImg = [];

    //displayGifs re-renders html to display the appropriate content
    function displayGifs() {
      var animal = $(this).attr("data-name");
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=10";

    //creating an AJAX call for the animal being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response){
      console.log(response);

      var results = response.data;

      for (var i = 0; i < results.length; i++) {

        if (results[i].rating !== "r" && results[i].rating !== "pg-13"){
      //create a div to hold the animal gifs
         var animalDiv = $("<div class = 'item'>"); 

         var animalImgGif = $("<img class = 'animalG'>").attr('data-num', i);

         var gifAnimate = results[i].images.fixed_height.url;

         var gifStill = results[i].images.fixed_height_still.url;

         stillImg.push(gifStill);

         animateImg.push(gifAnimate);

         animalImgGif.attr("src", gifStill);
         // animalImgStill.attr("src", results[i].images.fixed_height_still.url);

         animalDiv.append(animalImgGif);

         $("#animal-view").prepend(animalDiv);


        }
      }

      $(".animalG").on("click", function(){

        var num = $(this).attr('data-num');
        var currentURL = $(this).attr('src');

        if (currentURL === stillImg[num]) {
          $(this).attr("src", animateImg[num]);
        } else {
          $(this).attr("src", stillImg[num]);
        }


      })

    });
    }

    //function for displaying animals
    function renderButtons() {
      //deletes the animals prior to adding more to avoid repeats
      $("#buttons-view").empty();
      //loop for animal array
      for (var i = 0; i < animals.length; i++){
        //generate buttons for each animal in array
        var a = $("<button>");
        //add a class to the button
        a.addClass("animal");
        // add the data-attribute
        a.attr("data-name", animals[i]);
        // adding the text to the button
        a.text(animals[i]);
        // add the button to the buttons-view div
        $("#buttons-view").append(a);

      }
    }
    // click handler to add input to array and then buttons
    $("#add-animal").on("click", function(event) {
      event.preventDefault();
      var animal = $("#animal-input").val().trim();
      animals.push(animal);
      renderButtons();
    });
    // click handler when clicking buttons 
    $(document).on("click", ".animal", displayGifs);

    //rendering initial array

    renderButtons();