var fs = require("fs");
var path = require("path");

function getFiles(location) {
    var content = fs.readdirSync(location);
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
        files = files.concat(getFiles(dir)));

    return files;
}



function getAll(location) {
    var content = fs.readdirSync(location);
    var allContent = content.map(e => `${location}/${e}`);

    content
        .filter(c => fs.statSync(`${location}/${c}`).isDirectory())
        .map(dir => `${location}/${dir}` )
        .forEach(dir => {
            allContent = allContent.concat(getAll(dir))
        });


    return allContent;
}

module.exports = getFiles;

module.exports.getFiles = function (location) {
    var location = path.resolve(location);
    return getFiles(location);
};

module.exports.getAll = function (location) {
    var location = path.resolve(location);
    return getAll(location);
};