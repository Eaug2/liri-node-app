var requireENV = require("dotenv").config();

var twitterR = require("twitter");
var spotifyR = require("spotify");
var request = require("request");

console.log("Type my-tweets, spotify-this-song, movie-this,or do-what-it-says");

var userCommand = process.argv[2];
var secondCommand = process.argv[3];
//for multiple words 
/* for(i=4; i<process.argv.length; i++){
    secondCommand += '+' + process.argv[i];
} */
function Switch(){
    switch(userCommand){

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



function getTweets(){
    console.log("checkT");
}


function getSpotify(){
console.log("checkS");
}

function getMovie(){
    console.log("checkM");
}

function doItNow(){
    console.log("checkD");

}

Switch();
// var spotify = new Spotify(keys.spotify);
// var client = new Twitter(keys.twitter);