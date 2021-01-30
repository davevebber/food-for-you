const submitBtn = document.querySelector('#submitBtn');
let yelpCategory = document.querySelector('#food-category');
let yelpPrice = document.querySelector('#yelp-price');
let yelpDelivery = document.querySelector('#delivery');

// restaurant results section
const restaurantResults = document.querySelector('#restaurant-results')

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
        let randomNumber = Math.floor(Math.random() * (19-0 +1)) + 0;
        console.log(randomNumber);

        restaurantName.innerHTML = data.businesses[randomNumber].alias;
        restaurantWebsite.href = data.businesses[randomNumber].url;
        restaurantImage.src = data.businesses[randomNumber].image_url;
  })
restaurantResults.classList.remove('hide');
};

// fetch for The Movie Database -- need to get genre term to update according to dropdown options
fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=068bcb78c00e7bd39492e93efa6cd1c2&language=en-US')
    .then(function (response) {
        return response.json();
    })
    .then(function (response) {
        console.log(response)
    });

// event listeners for submitBtn
submitBtn.addEventListener('click', getFoodCategory);
submitBtn.addEventListener('click', getYelpPrice);
submitBtn.addEventListener('click', getDelivery);
submitBtn.addEventListener('click', getYelpFetch);
