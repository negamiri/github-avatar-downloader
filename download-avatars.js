var request = require('request');
var tokens = require('./secrets.js')

console.log('Welcome to the Github Avatar Downloader!')

function getRepoContributors(repoOwner, repoName, cb){

  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + "repoName" + "/contributors",
    headers: {
      'User-agent': 'request',
      'Accesskey': 'token ' + tokens.GITHUB_TOKEN
    }
  };

  request(url, function(err, res, body){
    cb(err, body);
  });

}

getRepoContributors("jquery", "jquery", function(err, result){
  console.log("Errors: " + err);
  console.log("Result: " + result);
})