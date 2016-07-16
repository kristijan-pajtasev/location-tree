var fs = require("fs");

//C:\Users\Kristijan\Documents\javascript\location-tree
module.exports = function(p, level) {
    //return readPath(__dirname);
    //console.log(path.resolve("../date-helper/"))
    //return readPath(path.resolve("../date-helper/"));
    return readContent("../date-helper/")
    //return readFile("C:\\Users\\Kristijan\\Documents\\javascript");
}


function readContent(location) {
    var content = fs.readdirSync(location)
    var concatContent = [];
    //if(fs.lstatSync(location).isSymbolicLink()) {
    //    console.log("hello")
    //} else {
    //    console.log("none")
    //}
    for(var i = 0, length = content.length; i < length; i++) {
        var item = "/" + content[i];
        var isDir = fs.lstatSync(location + item).isDirectory();
        var type = isDir ? "directory" : "file";

        if(isDir) {
            var subContent = readContent(location + item);
            concatContent = concatContent.concat(subContent);
        } else {
            concatContent.push(location + item);
        }
    }

    return concatContent;
}
//module.exports = readContent;
