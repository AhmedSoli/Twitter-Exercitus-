// app.js
var Twitter = require('twitter');
var config = require('./config.js');

var T = new Twitter(config);

// Set up your search parameters
var params = {
  q: 'brave browser',
  count: 100,
  result_type: 'top',
  lang: 'en'
};

T.get('search/tweets', params, function(err, data, response) {
  if(!err){
    // Loop through the returned tweets
    var id,username,tweetID;
    for(var i = 0; i < data.statuses.length; i++){
      // Get the tweet Id from the returned data
      id = { id: data.statuses[i].id_str };
      // Try to Favorite the selected Tweet
      T.post('favorites/create', id, function(err, response){
        // If the favorite fails, log the error message
        if(err){
          console.log(err);
        }
        // If the favorite is successful, log the url of the tweet
        else{
          username = response.user.screen_name;
          tweetId = response.id_str;
          console.log('Favorited: ', 'https://twitter.com/' + username + '/status/' + tweetId);
        }
      });
    }
  } else {
    console.log(err);
  }
});