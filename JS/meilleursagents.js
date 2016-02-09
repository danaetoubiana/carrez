var request = require('request'),
  cheerio = require('cheerio'),
  fs = require('fs'),
  json = require('../JSON/schemaMeilleursAgents'), 
  leboncoin = require('../result_LeBonCoin')
  url = 'https://www.meilleursagents.com/prix-immobilier/'+leboncoin.properties.town.toLowerCase()+'-'+leboncoin.properties.zip+'/#estimates'; //the url of the page;
  

request(url, function (error, response, body) { 
  if (!error) {
	var $ = cheerio.load(body);
	var table = $('.small-4.medium-2.columns');
	table = table.slice(3);
	//console.log(table[0].children[0].data);
	var pricebymeterLBC = leboncoin.properties.price/leboncoin.properties.surface;
	//console.log(pricebymeterLBC);
	
	if (leboncoin.properties.type == "Appartement") {
		table = table.slice(0, 3);
		json.properties.appartement.min = table[0].children[0].data.match(/[0-9,]/g).join("").replace(",", ".");
		json.properties.appartement.averrage = table[1].children[0].data.match(/[0-9,]/g).join("").replace(",", ".");
		json.properties.appartement.max = table[2].children[0].data.match(/[0-9,]/g).join("").replace(",", ".");
		
			if(pricebymeterLBC <= json.properties.appartement.averrage){
				//console.log("GOOD DEAL ;)");
				json.properties.deal = "good deal";              
				//console.log(jsonleboncoin.properties.deal);					
			}
			if(pricebymeterLBC > json.properties.appartement.averrage){
				//console.log("Bad deal :(");
				json.properties.deal = "bad deal";
			}
		
		}
		
		
	else if (leboncoin.property.type == "Maison") {
		table = table.slice(3, 6);
		json.properties.house.min = table[0].children[0].data.match(/[0-9,]/g).join("").replace(",", ".");
		json.properties.house.averrage = table[1].children[0].data.match(/[0-9,]/g).join("").replace(",", ".");
		json.properties.house.max = table[2].children[0].data.match(/[0-9,]/g).join("").replace(",", ".");
		
		
			if(pricebymeterLBC <= json.properties.house.averrage){
				//console.log("GOOD DEAL ;)");
				json.properties.deal = "good deal";              
				//console.log(jsonleboncoin.properties.deal);					
			}
			if(pricebymeterLBC > json.properties.house.averrage){
				//console.log("Bad deal :(");
				json.properties.deal = "bad deal";
			}
		
		
		}
		
		
	else {
		table = table.slice(6);
		json.properties.rent.min = table[0].children[0].data.match(/[0-9,]/g).join("").replace(",", ".");
		json.properties.rent.averrage = table[1].children[0].data.match(/[0-9,]/g).join("").replace(",", ".");
		json.properties.rent.max = table[2].children[0].data.match(/[0-9,]/g).join("").replace(",", ".");
		
			
			if(pricebymeterLBC <= json.properties.rent.averrage){
				//console.log("GOOD DEAL ;)");
				json.properties.deal = "good deal";              
				//console.log(jsonleboncoin.properties.deal);					
			}
			if(pricebymeterLBC > json.properties.rent.averrage){
				//console.log("Bad deal :(");
				json.properties.deal = "bad deal";
			}
		}
			
	fs.writeFile('../result_MeilleursAgents.json',JSON.stringify(json, null, 4), function(err){ 
	});
	
	
  } else {
    console.log("Error: " + error);
	
  }
  
});