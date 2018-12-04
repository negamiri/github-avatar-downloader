var request = require('request');
var tokens = require('./secrets.js')
var fs = require('fs');
var path = require ('path');
var args = process.argv.splice(2,2);

if (args.length < 2) {
  console.log("Not enough arguments provided");
  process.exit();
}


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

function downloadImageByURL(url, filepath){
  request.get(url)
          .on('error', function(err){
            throw err;
          })
          .pipe(fs.createWriteStream(filepath))
}

getRepoContributors(process.argv[2], process.argv[3], function(err, result){
  console.log("Error: " + err);
  result.forEach(function(item){
    downloadImageByURL(item.avatar_url, path.resolve(__dirname, 'avatars/' + item.login + ".jpg"));
  })
})