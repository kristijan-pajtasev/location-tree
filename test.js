var locationModule = require("./locationContent");
content = locationModule.getFiles("./");
//console.log(content);
var content = locationModule.getAll("./scripts");
//console.log(content);

content = locationModule.getAll("../", {
    filter: e => e.indexOf(".js") > 0
});

console.log(content[0]);
console.log(content.length);
//console.log(content);

//console.log(process.argv.slice(2))

var path = require("path");
//console.log(__dirname)
//console.log(path.normalize(__dirname))

// todo cleanup
// todo ignore paths