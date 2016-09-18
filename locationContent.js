var fs = require("fs");
var path = require("path");

function getContent(location) {
    var content = fs.readdirSync(location)
    var dirs = [];
    var files = content
        .filter(c => {
            if(fs.statSync(`${location}/${c}`).isFile()) {
                return true;
            } else {
                dirs.push(`${location}/${c}`);
                return false
            }
        })
        .map(c => `${location}/${c}` );


    dirs.forEach(dir =>
        files = files.concat(getContent(dir)));

    return files;
}

function content(location) {
    var location = path.resolve(location);
    return getContent(location);
    //console.log(content);
}

module.exports = content;



