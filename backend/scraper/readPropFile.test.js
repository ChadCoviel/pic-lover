let func = require(__dirname + "/readPropFile.js");

let newmap = func("test.properties")
console.log(newmap)