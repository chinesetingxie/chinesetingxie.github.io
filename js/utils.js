function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function()
    {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        {
            callback(xmlHttp.responseText);
        }
    }
    xmlHttp.open("GET", theUrl, true);
    xmlHttp.send(null);
    return;
}

function tenorCallback_search(responsetext)
{
    var response_objects = JSON.parse(responsetext);
    responseList = response_objects["results"];
	var rand = Math.floor(Math.random() * 5);
    document.getElementById("gif").src = responseList[rand]["media"][0]["nanogif"]["url"]; //randomize
    return;
}


function getGif()
{
    var apikey = "7EWLWQNGEFXV";
    var lmt = 5;
	var wordList = ["excited", "happy", "accomplished", "genius", "cheer"];
	shuffle(wordList);
    var search_term = wordList[0];
    var search_url = "https://api.tenor.com/v1/search?q=" + search_term + "&key=" +
            apikey + "&limit=" + lmt;

    httpGetAsync(search_url,tenorCallback_search);
    return;
}