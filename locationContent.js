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

module.exports.getFiles = function (location, options) {
    var locationPath = path.resolve(location);
    var content = getFiles(locationPath);

    if(options && options.filter) {
        content = content.filter(options.filter);
    }

    if(options && options.useRelative) {
        if(location == "./") { location = "."; }
        content = content.map(p => p.replace(__dirname, location));
    }

    content = content.map(e => e.replace(locationPath + "/", ""));
    return content;
};

module.exports.getAll = function (location, options) {
    var locationPath = path.resolve(location);
    var content = getAll(locationPath);

    if(options && options.filter) {
        content = content.filter(options.filter);
    }

    if(options && options.useRelative) {
        if(location == "./") { location = "."; }
        content = content.map(p => p.replace(__dirname, location));
    }


    // relative path
    //content = content.map(e => e.replace(location + "/", originalLocation));
    return content;
};