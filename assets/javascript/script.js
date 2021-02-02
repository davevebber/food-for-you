const submitBtn = document.querySelector('#submitBtn');
let yelpCategory = document.querySelector('#food-category');
let yelpPrice = document.querySelector('#yelp-price');
let yelpDelivery = document.querySelector('#delivery');
let movieGenre = document.querySelector('.movie-genre-dropdown');
console.log(movieGenre.value)

//modal
modalPopup = document.querySelector('#error-modal')
modalBackground = document.querySelector('#modal-background')

// restaurant results section 
const restaurantResults = document.querySelector('#restaurant-results'); // ~Replaced restaurant with overall~

const movieResults = document.querySelector('#movie-results');

// saves the food category for yelp fetch request
function getFoodCategory() {
    localStorage.setItem('food-category', yelpCategory.value);
}

// saves the price point for the yelp fetch request
function getYelpPrice() {
    localStorage.setItem('yelp-price', yelpPrice.value);
}

// saves the delivery option for yelp fetch request
function getDelivery() {
    localStorage.setItem('delivery', yelpDelivery.value);
}

// fetch for YELP -- need to get search term to update according to the dropdown options
// also need price point to update according to dropdown option as well -- 1=$ 2=$$ 3=$$$ 4=$$$$

function getYelpFetch() {
    let foodSearch = localStorage.getItem('food-category');
    let yelpPrice = localStorage.getItem('yelp-price');
    let deliveryOption = localStorage.getItem('delivery');

    fetch("https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=losangeles&term=" + foodSearch + "&price=" + yelpPrice, {
        "method": "GET",
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Bearer IRtkp9Z-vSrWfSJK_sb1z4enasEAraGZfotbuAK5Nc-JFs3NEhvjAmRzW2jfe6i6TrQfezNgJJzFZ0ZyN2X99ftzI-9MBhj8EV4ctw4rBfMmgwajcTuV-CW2J0ESYHYx"
        }
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);




            // show list of businesses from array of chosen options
            let restaurantName = document.querySelector('#restaurant-name')
            let restaurantWebsite = document.querySelector('#restaurant-website')
            let restaurantImage = document.querySelector('#restaurant-image')
            let restaurantRating = document.querySelector('#yelp-rating')
            let randomNumber = Math.floor(Math.random() * (data.businesses.length));
            console.log(randomNumber);

            if (data.total == 0) {
                modalPopup.classList.add('is-active')
            } else{

            restaurantName.innerHTML = "Restaurant: " + data.businesses[randomNumber].alias;
            restaurantWebsite.href = data.businesses[randomNumber].url;
            restaurantImage.src = data.businesses[randomNumber].image_url;
            restaurantRating.innerHTML = "Rating: " + data.businesses[randomNumber].rating
            restaurantResults.classList.remove('hide'); // ~Changed function to match overall~

        }
    })
    let movieValue = movieGenre.value;
    if (movieValue !== "Select Genre") {
        movieResults.classList.remove("hide");
    }
};

// fetch for The Movie Database -- need to get genre term to update according to dropdown options

let getMovie = function () {
    let movieKey = "068bcb78c00e7bd39492e93efa6cd1c2"
    let genre = document.querySelector(".movie-genre-dropdown").value;
    console.log(genre);

    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${movieKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genre}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            console.log(response)
            //let randomPage = Math.floor(Math.random()*(response.total_pages-1)+1); // ~Unleashes all 500 pages of movies~
            let randomPage = Math.floor(Math.random() * (2) + 1); // ~Top 60 Movies~
            console.log(randomPage)
            fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${movieKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${randomPage}&with_genres=${genre}`)
                .then(function (response) {
                    return response.json();
                })
                .then(function (response) {
                    console.log(response)
                    let randomMovie = Math.floor(Math.random() * (response.results.length - 1) + 1);
                    let movieTitle = response.results[randomMovie].title;
                    console.log(randomMovie);
                    console.log(movieTitle);

                    let movieName = document.querySelector('#movie-name')
                    let movieWebsite = document.querySelector('#movie-link')
                    let moviePoster = document.querySelector('#poster-image')
                    let movieRating = document.querySelector('#movie-rating')
                    let moviePosterURL = "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/" + response.results[randomMovie].poster_path
                    let movieWebURL = "https://www.themoviedb.org/movie/" + response.results[randomMovie].id + "-" + movieTitle
                    console.log(moviePosterURL);

                    movieName.innerHTML = movieTitle;
                    movieWebsite.href = movieWebURL;
                    moviePoster.src = moviePosterURL;
                    movieRating.innerHTML = "Average Rating: " + response.results[randomMovie].vote_average + "/10";
                });
        });

};

// event listeners for submitBtn
submitBtn.addEventListener('click', getFoodCategory);
submitBtn.addEventListener('click', getYelpPrice);
submitBtn.addEventListener('click', getDelivery);
submitBtn.addEventListener('click', getYelpFetch);

// ~Event listener for movie dropdown~
movieGenre.addEventListener('change', getMovie)

// event listener for modal
modalBackground.addEventListener('click', () => {
    modalPopup.classList.remove('is-active');
})