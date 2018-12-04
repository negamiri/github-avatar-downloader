var request = require('request');
var tokens = require('./secrets.js')
var fs = require('fs');


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

// function downloadImageByURL(url, filepath){
  request.get("https://avatars2.githubusercontent.com/u/2741?v=3&s=466")
          .on('error', function(err){
            throw err;
          })
          .pipe(fs.createWriteStream("./example.jpg"))
// }

getRepoContributors("jquery", "jquery", function(err, result){
  console.log("Error: " + err);
  result.forEach(function(item){
    downloadImageByURL(item.avatar_url, filepath);
  })

})