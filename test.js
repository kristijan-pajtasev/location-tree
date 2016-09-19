var locationModule = require("./locationContent");
content = locationModule.getFiles("./scripts");
console.log(content);
var content = locationModule.getAll("./scripts");
console.log(content);

content = locationModule.getAll("./scripts", {
    filter: e => e.indexOf("sub_3") > 0
});
console.log(content);

//console.log(process.argv.slice(2))