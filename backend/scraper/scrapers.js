/******************************************************************************************
* Author: Chad M. Coviel
*
* This file defines the image scrapers available to search from. The scrapers take in the html 
* data object and returns an array of image links scraped from the document.
******************************************************************************************/
const axios = require('axios')
const cheerio = require('cheerio')

const scrapeWikicommons = (data) => {
	return new Promise((resolve,reject) => {
		let imageResults = [];
		try {
			const $ = cheerio.load(data);
			$('ul.mw-search-results li.mw-search-result a.image img').each((_idx, el) => {
				const imageResult = $(el).attr("src")
				imageResults.push(imageResult)
			});
			resolve(imageResults)
		} catch(error) {
			reject(error)
		}
	});
}

const scrapeFlickr = (data) => {
	// console.log("second") 
	return new Promise((resolve,reject) => {
		let imageResults = [];
		try {
			const $ = cheerio.load(data);
			$('div.view').each((_idx, el) => {
				if (el.attribs.style !== undefined && el.attribs.style.match(/.*live.staticflickr.com.*/)) {
					let myMatch = el.attribs.style.match(/live.staticflickr.com/)
					let start = myMatch.index
					let end = myMatch.input.substring(start).indexOf(')') + myMatch.index
					const imageResult = $(el).attr("src")
					imageResults.push(myMatch.input.substring(start,end))
				}
			});
			resolve(imageResults)
		} catch(error) {
			reject(error)
		}
	});
}

module.exports = { 
	scrapeWikicommons, 
	scrapeFlickr
}