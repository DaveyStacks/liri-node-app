require("dotenv").config();
const fs = require('fs');
var keys = require("./keys");
const request = require('request');
var Twitter = require('twitter');
var moment = require('moment');
var spotifyKeys = keys.spotify;
var twitter = keys.twitter;
var Spotify = require('node-spotify-api');

let blankTitleArray = [];
var client = new Twitter({
    consumer_key: twitter.consumer_key,
    consumer_secret: twitter.consumer_secret,
    access_token_key: twitter.access_token_key,
    access_token_secret: twitter.access_token_secret
});


const errorMessage = () => {
    console.log("I'm sorry that information is not available");
};

const searchLiri = (action, title) => {

    switch (action) {
        case "my-tweets":
            showTweets(title);
            break;
        case "spotify-this-song":
            spotifySong(title);
            break;
        case "movie-this":
            searchMovie(title);
            break;
        case "do-what-it-says":
            fs.readFile('random.txt', 'utf8', function (error, data) {

                if (error) {
                    return console.log(error);
                }

                var titleProb = data.split(/\s*"\s*/);
                var titleProbArr = (" " + titleProb[1]).split(" ");
                title = titleProbArr;
                spotifySong(title);
            });
            break;
        default:
            console.log(`Please enter one of the following arguments -- my-tweets, spotify-this-song, movie-this, do-what-it-says.`)
            break;
    }
};

const searchMovie = (title) => {
    console.log(title);
    let movieTitle = (title.slice(1));
    console.log(movieTitle);
    let encodedTitle = movieTitle.join("+");
    let printedTitle = movieTitle.join(' ')
    const queryUrl = "http://www.omdbapi.com/?t=" + encodedTitle + "&y=&plot=short&apikey=trilogy";
    if (encodedTitle === "") {
        encodedTitle = "Mr.Nobody";
        printedTitle = "Mr.Nobody";
    }

    request(`http://www.omdbapi.com/?t=${encodedTitle}&y=&plot=short&apikey=trilogy`, function (e, r, b) {

        if (!e && r.statusCode === 200) {
            if ((JSON.parse(b).Error) === "Movie not found!") {

                console.log("We cannot find a move of that name! Sorry!");
                console.log(`If you are trying to search using \' please use the escape key \\\ before the \' `);
            } else {
                const jp = JSON.parse(b)

                if (jp.Year) {
                    console.log(`The movie ${printedTitle} was released ${jp.Year}`);
                }

                else {
                    errorMessage();
                };

                if (jp.imdbRating) {
                    console.log(`The IMDB rating of ${printedTitle} is: ${jp.imdbRating}`);
                }

                else {
                    errorMessage();
                };

                if (jp.Ratings[1]) {
                    console.log(`The Rotten Tomatoes rating of ${printedTitle} is ${jp.Ratings[1].Value}`)
                }

                else {
                    errorMessage();
                };

                if (jp.Country) {
                    console.log(`The country in which ${printedTitle} was made is ${jp.Country}`)
                }

                else {
                    errorMessage();
                };

                if (jp.Language) {
                    console.log(`You can hear ${jp.Language} spoken in ${printedTitle}`);
                }

                else {
                    errorMessage();
                };

                if (jp.Plot) {
                    console.log(`${printedTitle} Plot Summary: ${jp.Plot}`);
                }

                else {
                    errorMessage();
                };

                if (jp.Actors) {
                    console.log(`The cast of ${printedTitle} is: ${jp.Actors}`)
                }

                else {
                    errorMessage();
                }

            }
        }
    });
}

const showTweets = () => {
    var params = { screen_name: 'AliasDavey' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {

            function parseTwitterDate(aDate) {
                return new Date(Date.parse(aDate.replace(/( \+)/, ' UTC$1')));
            }

            for (let index = 0; index < tweets.length; index++) {
                console.log("----------------------------------------------------------")
                console.log(moment(parseTwitterDate(tweets[index].created_at)).format('dddd, MMMM Do YYYY @ h:mm A'));
                console.log(tweets[index].text);
            }
        }
    });
}


const spotifySong = (title) => {

    let songTitle = (title.slice(1));
    if (songTitle.length < 1) {
        songEncodedTitle = "Ace+of+Base+The+Sign";
    }
    else {
        songEncodedTitle = songTitle.join("+");
    }

    var spotify = new Spotify({
        id: spotifyKeys.id,
        secret: spotifyKeys.secret
    });

    spotify.search({ type: 'track', query: songEncodedTitle }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        for (let index = 0; index < data.tracks.items.length; index++) {

            const element = data.tracks.items[index];
            console.log("---------------------------------------------");
            console.log(`Artist: ${element.artists[0].name}`);
            console.log(`Song Title: ${element.name}`);
            console.log(`Copy and paste to your browser: ${element.external_urls.spotify}`);
            console.log(`From the album: ${element.album.name}`);

        }

    });

}


searchLiri(process.argv[2], process.argv.slice(2));

