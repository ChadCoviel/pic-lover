/******************************************************************************************
* Author: Chad M. Coviel
* 
* The provided properties file must specify the location to insert the search term before
* processing the request.
******************************************************************************************/
const fs = require('fs');
const axios = require('axios')
let rpf = require(__dirname + "/readPropFile.js");
let scrapers = require(__dirname + "/scrapers.js");

function constructQueries(search,propPath) {
	let queries = [], map = rpf(propPath)
	for (const entry of map.entries()) {
		if (!scrapers.hasOwnProperty(`scrape${entry[0]}`)) {
			console.log(`WARNING: No web scraper found for '${entry[0]}'`)
			continue
		}
		if (!entry[1].includes('INSERTHERE')) {
			console.log(`WARNING: no place found in URL '${entry[1]}' to insert search term '${search}'. Please specify the location to add the search term with 'INSERTHERE'.`)
			continue
		}
  		queries.push({ 
  			source: entry[0],
  			query: entry[1].replace('INSERTHERE',search)
  		});
	}
	return queries
}

module.exports = async function getImages(search) {
	let images = []
	let queries = constructQueries(search,'../webpages.properties')
	if (queries.length === 0 ) {
		throw new Error("ERROR: No queries available to scrape from")
	}
	console.log(queries)

	queries.forEach((query) => {
		axios.get(query['query'])
			.then((content) => {
				return scrapers[`scrape${query['source']}`](content.data)
			})
			.then((imageResults) => {
				console.log(imageResults)
				images.push(imageResults)
			})
			.catch((error) => {
				throw error
			});
		});
}

