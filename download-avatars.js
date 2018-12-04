var request = require('request');
var tokens = require('./secrets.js')

console.log('Welcome to the Github Avatar Downloader!')

function getRepoContributors(repoOwner, repoName, cb){

  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" +repoName + "/contributors",
    headers: {
      'User-agent': 'request',
      'Authorization':' token ' + tokens.GITHUB_TOKEN

    }
  };

  request(options, function(err, res, body){
    var data = JSON.parse(body);
    cb(err, data);
  });

}

getRepoContributors("jquery", "jquery", function(err, result){
  console.log("Error: " + err);
  result.forEach(function(item){
    console.log("Avatar URL: " + item.avatar_url);
  })

})