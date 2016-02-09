var request = require('request'),
  cheerio = require('cheerio'),
  fs = require('fs'),
  json = require('../JSON/schemaLeBonCoin'), //load the scheama
  url = 'http://www.leboncoin.fr/ventes_immobilieres/915412170.htm?ca=12_s'; 
  
request(url, function (error, response, body) { //make the request to the web page
  if (!error) {
	//load the body of the html code
    var $ = cheerio.load(body);
	
	//find what we are interested in the page web.
	json.properties.price = $('span[class=price]').attr('content')+"";   
	json.properties.town = $("[itemprop='addressLocality']").text();
    json.properties.zip = $("[itemprop='postalCode']").text();
	var table = $("[class='lbcParams criterias']>table > tr >td");
    json.properties.type = table[0].children[0].data;
    json.properties.room = table[1].children[0].data;
    surface = table[2].children[0].data.replace(/ /g,"");
	json.properties.surface=surface.replace(/(\s+)?.$/, '');
	
	//write the result in a new JSON file called result_LeBonCoin
	fs.writeFile('../result_LeBonCoin.json', JSON.stringify(json, null, 4), function(err){ 

})
  } else {
    console.log("Error: " + error);
	
  }
 
});
