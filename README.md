
PROJECT LIRI
LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

Requirements
For development, you will only need Node.js installed on your environment

Node
Node is really easy to install & now include NPM. You should be able to run the following command after the installation procedure below.

API KEYS
You will need to supply your own keys within a .env file -- follow the example provided:
# Spotify API keys

SPOTIFY_ID="YOUR SPOTIFY ID"
SPOTIFY_SECRET="YOUR SPOTIFY SECRET"

# Twitter API keys

TWITTER_CONSUMER_KEY="YOUR TWITTER CONSUMER KEY"
TWITTER_CONSUMER_SECRET="YOUR CONSUMER SECRET KEY"
TWITTER_ACCESS_TOKEN_KEY="YOUR TWITTER ACCESS TOKEN KEY"
TWITTER_ACCESS_TOKEN_SECRET="YOUR ACCESS TOKEN SECRET"
--Save this as .env file within the same folder as the application. This will allow you to run the app!


$ node --version
v0.10.24

$ npm --version
1.3.21
Node installation on OS X
You will need to use a Terminal. On OS X, you can find the default terminal in /Applications/Utilities/Terminal.app.

Install
$ git clone https://github.com/DaveyStacks/liri-node-app.git

liri.js can take in one of the following commands:

* `my-tweets`
    - $node liri.js my-tweets  >> Will display my latest 15 tweets

* `spotify-this-song`
    - $node liri.js spotify-this-song (ENTER A SONGNAME HERE OR LEAVE BLANK)
        --This will show the following information about the song in your terminal/bash window
            Artist(s)
            The song's name
            A preview link of the song from Spotify
            The album that the song is from
            If no song is provided then your program will default to "The Sign" by Ace of Base.

* `movie-this`
    - $node liri.js movie-this (ENTER A MOVIE TITLE HERE OR LEAVE IT BLANK)
                * Title of the movie.
                * Year the movie came out.
                * IMDB Rating of the movie.
                * Rotten Tomatoes Rating of the movie.
                * Country where the movie was produced.
                * Language of the movie.
                * Plot of the movie.
                * Actors in the movie.
    --If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'


* `do-what-it-says'
    - $node liri.js do-what-it-says


Languages & tools
JavaScript
JSHint is used to prevent JavaScript error.
