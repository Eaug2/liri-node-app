require("dotenv").config();
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var keys = require("./key.js")
var fs = require("fs");
var client = new Twitter(keys.twitter);
// console.log(keys.twitter);
var spotify = new Spotify(keys.spotify);
// console.log(keys.spotify);
console.log("----------------------------------------------");
console.log("Type my-tweets, spotify-this-song, movie-this, or do-what-it-says");
console.log("----------------------------------------------");

var userCommand = process.argv[2];
var choiceCommand = process.argv[3];
//for multiple words 
for (i = 4; i < process.argv.length; i++) {
    choiceCommand += '+' + process.argv[i];
}

function Switch() {
    switch (userCommand) {

        case "my-tweets":
            getTweets();
            break;

        case "spotify-this-song":
            getSpotify();
            break;

        case "movie-this":
            getMovie();
            break;

        case "do-what-it-says":
            doItNow();
            break;

    }
};


var count = 0;
function getTweets() {
    var params = { screen_name: 'AugieFresh2' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (i = 0; i < tweets.length; i++) {
                if (count < 20) {
                    console.log(JSON.stringify("Tweet Created on : " + tweets[i].created_at +
                        " Which said: " + tweets[i].text));
                    console.log("----------------------------------------------");
                    count++;
                }
            }
        }
        else {
            console.log(error);
        }
    });
    // console.log("checkT");
}


function getSpotify() {
    // console.log("checkS");
    var searchSong;
    if (choiceCommand === undefined) {
        searchSong = "The Sign Ace of Base";
    }
    else {
        searchSong = choiceCommand;
    }

    spotify.search({ type: 'track', query: searchSong }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        else if (!err) {
            console.log(JSON.stringify("Artist is: " + data.tracks.items[0].artists[0].name, null, 2));
            console.log("Song's name is: " + JSON.stringify(data.tracks.items[0].name, null, 2));
            console.log("Here is a Preview of the song: " + JSON.stringify(data.tracks.items[0].preview_url, null, 2));
            console.log("Album name: " + JSON.stringify(data.tracks.items[0].album.name, null, 2));
        }
    });
}

function getMovie() {
    // console.log("checkM");
    var searchMovie;
    if (choiceCommand === undefined) {
        console.log("----------------------------------------------------------------")
        console.log("If you haven't watched My.Nobody then you should:<http://www.imdb.com/title/tt0485947/>");
        console.log("----------------------------------------------------------------")
        console.log("It's on Netflix!");
        console.log("-----------------")
        searchMovie = "Mr. Nobody";

    } else {
        searchMovie = choiceCommand;
    };

    var url = 'http://www.omdbapi.com/?t=' + searchMovie + '&y=&plot=long&apikey=trilogy&r=json';
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("-----------------")
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("-----------------")
            console.log("Actors: " + JSON.parse(body).Actors);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);

        }
    });
}

function doItNow() {
    // console.log("checkD");
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            // console.log(data);
            var dataArr = data.split(",");
            // console.log(dataArr);
            userCommand = dataArr[0];
            choiceCommand = dataArr[1];
            // console.log(dataArr[0]);
            // console.log(dataArr[1]);
        }
        // Re-Run switch with dataArr inputs
        Switch();
        // console.log(data);
    })
}

Switch();

