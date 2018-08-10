// Read and set environment variables
require("dotenv").config();


var keys = require("./keys.js");
var request = require("request");
var fs = require("fs");
var Twitter = require('twitter');
var Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotify);


var getArtistNames = function(artist) {
  return artist.name;
};

//Function for pulling Spotify songs
var getMeSpotify = function(songName) {

  if (songName === undefined) {
    songName = "Hey You";
  }
  spotify.search(
    {
      type: "track",
      query: songName
    },
    function(err, data) {
      if (err) {
        console.log("Error occurred: " + err);
        return;
      }
      var songs = data.tracks.items;
      for (var i = 0; i < songs.length; i++) {
        console.log(i);
        console.log("artist(s): " + songs[i].artists.map(getArtistNames));
        console.log("song name: " + songs[i].name);
        console.log("preview song: " + songs[i].preview_url);
        console.log("album: " + songs[i].album.name);
        console.log("-----------------------------------");
      }
    }
  );
};
    
  //Pull movies from API function
   
      var getMeMovie = function(movieName) {
        if (movieName === undefined) {
          movieName = "Just Friends";
        }
            
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json&tomatoes=true&apikey=trilogy";
  
     
      console.log(queryUrl);
  
      
      request(queryUrl, function(error, response, body) {
  
         //If no error, show the information below for movie
          if (!error && response.statusCode === 200) {
              var movieObject = JSON.parse(body);
  
              
              var movieResults = 
              "------------------------------ begin ------------------------------" + "\r\n" +
              "Title: " + movieObject.Title+"\r\n"+
              "Year: " + movieObject.Year+"\r\n"+
              "Imdb Rating: " + movieObject.imdbRating+"\r\n"+
              "Rotten Tomatoes Rating: " + movieObject.tomatoRating+"\r\n"+
              "Country: " + movieObject.Country+"\r\n"+
              "Language: " + movieObject.Language+"\r\n"+
              "Plot: " + movieObject.Plot+"\r\n"+
              "Actors: " + movieObject.Actors+"\r\n"+
              "------------------------------ end ------------------------------" + "\r\n";
              console.log(movieResults);
             
          } 
  
          else {
        console.log("Error :"+ error);
        return;
      }
      });
  };
 //Running Twitter
  function getMyTweets() {
    //Pulling tweets from my username
      var client = new Twitter(keys.twitter);
      var params = {
        screen_name: "DixShelby"
      };
      //Pulling tweets from client side server 
      client.get("statuses/user_timeline", params, function(
        error,
        tweets,
        response
      ) {
        //If no error console tweets
        if (!error) {
          for (var i = 0; i < tweets.length; i++) {
            console.log(tweets[i].created_at);
            console.log("");
            console.log(tweets[i].text);
          }
        }
      });
    }

  // Function for running a command based on text file
var doWhatItSays = function() {

  fs.readFile("random.txt", "utf8", function(error, data) {
    console.log(data);

    var dataArr = data.split(",");

    if (dataArr.length === 2) {
      pick(dataArr[0], dataArr[1]);

    } else if (dataArr.length === 1) {
      pick(dataArr[0]);
    }
  });
};
  
var pick = function(caseData, functionData) {

  switch (caseData) {
    case "my-tweets":
     getMyTweets();
     break;
    
    case "spotify-this-song":
     getMeSpotify(functionData);
     break;
    
    case "movie-this":
     getMeMovie(functionData);
     break;
  
     case "do-what-it-says":
     doWhatItSays();
     break;
  
    }
  }

  // Function which takes in command line arguments and executes correct function accordigly
var runThis = function(argOne, argTwo) {
  pick(argOne, argTwo);
};
// MAIN PROCESS
// =====================================
runThis(process.argv[2], process.argv[3]);