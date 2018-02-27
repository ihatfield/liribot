var keys = require("./keys.js");
var request = require("request")
var fs = require("fs")
var Spot = require("node-spotify-api")
var Twit = require("twitter")
var input = process.argv;
var userInput = input[2];
var userInput2 = "";



function getTweets() {
    var client = new Twit(keys.twitterKeys);
    client.get("statuses/user_timeline", function (error, tweets, response) {
        if (error) {
            console.log(error);
        }

        for (i = 0; i < tweets.length; i++) {
            console.log(tweets.text + " " + tweets.created_at);
        }
    })
}

function getSong(song) {
    if (song === '') {
        song = "The Sign Ace of Base"
    }
    var spotifySearch = new Spot(keys.spotifyKeys);

    spotifySearch.search({
        type: 'track',
        query: song
    }, function (err, data) {
        if (!err) {
            console.log("Name: " + data.tracks.items[0].name);
            console.log("Album: " + data.tracks.items[0].album.name);
            console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
            console.log("Preview: " + data.tracks.items[0].preview_url);
        } else {
            return console.log(err)
        }
    })
}



function movieInfo() {
    for (var i = 3; i < process.argv.length; i++) {
        if (userInput2 === "") {
            userInput2 = userInput2 + process.argv[i];
        } else {
            userInput2 = userInput2 + " " + process.argv[i]
        }
    }
    if (userInput2 === "") {
        userInput2 = "Mr. Nobody"
    }
    var url = "http://www.omdbapi.com/?t=" + userInput2 + "&apikey=40e9cece";
    request(url, function (error, response, body) {
        if (error) {
            console.log(error)
        }
        if (response.statusCode === 200) {
            var infoJson = JSON.parse(body)
            console.log("Movie Title is: " + infoJson.Title);
            console.log("Movie was made in the year: " + infoJson.Year);
            console.log("Movie was made in: " + infoJson.Country);
            console.log("Plot of this movie is: " + infoJson.Plot);
            console.log("Actors in this movie are: " + infoJson.Actors);
        }
    })
}

function randomTxt() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            console.log(error)
        }

        var split = data.split(",")
        action = split[0];
        randomMovie = split[1];
        cmdListen(action, randomMovie);

    })
}

function cmdListen(request, userInput) {
    console.log("Please enter an action" +
        "\n get-tweets" +
        "\n get-song" +
        "\n get-movie" +
        "\n do-what-it-says");
    switch (request) {
        case "get-tweets":
            getTweets();
            break;
        case "get-song":
            for (var i = 3; i < process.argv.length; i++) {
                if (userInput2 === '') {
                    userInput2 = userInput2 + process.argv[i];
                } else {
                    userInput2 = userInput2 + ' ' + process.argv[i];
                }
            }
            getSong(userInput2);
            break;
        case "get-movie":
            movieInfo(userInput);
            break;
        case "do-what-it-says":
            randomTxt();
            break;

    }
}
cmdListen(userInput, userInput2);