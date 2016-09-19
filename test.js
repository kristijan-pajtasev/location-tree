var locationModule = require("./locationContent");
var content = locationModule.getFiles("./scripts");
console.log(content);
var content = locationModule.getAll("./scripts");
console.log(content);

var content = locationModule.getAll("./scripts", {

});
console.log(content);

//console.log(process.argv.slice(2))