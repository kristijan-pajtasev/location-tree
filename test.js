var locationModule = require("./locationContent");
content = locationModule.getFiles("./");
console.log(content);
var content = locationModule.getAll("./scripts");
console.log(content);

content = locationModule.getAll("./", {
    filter: e => e.indexOf(".js") > 0
});
console.log(content);

//console.log(process.argv.slice(2))