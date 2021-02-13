/******************************************************************************************
* Author: Chad M. Coviel
* 
* This module reads a .properties file (ignoring comments), constructs a map of key/value pairs, and returns the map
* NOTE: Does not support multiline values or backslashes
******************************************************************************************/

let fs = require("fs")

module.exports = function readPropFileSync(path) {
	let map = new Map();
	let text = fs.readFileSync(path, "utf8")
	text.split("\n")
		.forEach( keyVal => {
			console.log(keyVal)
			if ( keyVal.match(/(?<!\\)=/) || keyVal.match(/(?<!\\):/) && ! keyVal.match(/^#/) && ! keyVal.match(/^ .*#/) && ! keyVal.match(/^!/) && ! keyVal.match(/^ .*!/)) {
				if (keyVal.match(/(?<!\\)=/).index < keyVal.match(/(?<!\\):/).index) {
					map.set(keyVal.split(/(?<!\\)=/)[0].replace(/\\/g, '').trim(), keyVal.split(/(?<!\\)=/).slice(1).join("=").replace(/\\/g, '').trim());
				} else {
					map.set(keyVal.split(/(?<!\\):/)[0].replace(/\\/g, '').trim(), keyVal.split(/(?<!\\):/).slice(1).join("=").replace(/\\/g, '').trim());
				}
				
			}
		});
	if (map.size === 0) {
		console.log("WARNING: No key/value pairs found!");
	}
	return map;	
};