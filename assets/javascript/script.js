// fetch for YELP -- need to get search term to update according to the dropdown options
// also need price point to update according to dropdown option as well -- 1=$ 2=$$ 3=$$$ 4=$$$$
fetch("https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=losangeles&term=greek&price=2", {
    "method": "GET",
    "headers": {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer IRtkp9Z-vSrWfSJK_sb1z4enasEAraGZfotbuAK5Nc-JFs3NEhvjAmRzW2jfe6i6TrQfezNgJJzFZ0ZyN2X99ftzI-9MBhj8EV4ctw4rBfMmgwajcTuV-CW2J0ESYHYx"
    }
})
    .then((res) => res.json())
    .then(response => {
        console.log(response);
    })
    .catch(err => {
        console.error(err);
    });

// fetch for The Movie Database -- need to get genre term to update according to dropdown options
fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=068bcb78c00e7bd39492e93efa6cd1c2&language=en-US')
    .then(function (response) {
        return response.json();
    })
    .then(function (response) {
        console.log(response)
    });

    