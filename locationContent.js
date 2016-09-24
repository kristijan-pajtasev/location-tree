var fs = require("fs");
var path = require("path");

function filterIgnored(content, ignoredPaths) {
    return content.filter(p => {
        var keepFile = true;
        ignoredPaths.forEach(ignored => {
            if(path.resolve(p).startsWith(ignored)) {
                keepFile = false
            }
        });
        return keepFile;
    })
}

function getFiles(location, ignorePaths) {
    var content = fs.readdirSync(location);
    content = filterIgnored(content.map(e => `${location}/${e}`), ignorePaths);

    var dirs = [];
    var files = content
        .filter(c => {
            if(fs.statSync(`${c}`).isFile()) {
                return true;
            } else {
                dirs.push(`${c}`);
                return false
            }
        })
        .map(c => `${c}` );


    dirs.forEach(dir =>
        files = files.concat(getFiles(dir, ignorePaths)));

    return files;
}



function getAll(location, ignorePaths) {
    var content = fs.readdirSync(location);
    var allContent = content.map(e => `${location}/${e}`);
    allContent = filterIgnored(allContent, ignorePaths);

    content
        .filter(c => fs.statSync(`${location}/${c}`).isDirectory())
        .map(dir => `${location}/${dir}` )
        .forEach(dir => {
            allContent = allContent.concat(getAll(dir, ignorePaths))
        });


    return allContent;
}

module.exports = getFiles;

module.exports.getFiles = function (location, options) {
    var locationPath = path.resolve(location);
    var ignorePaths = [];
    if(options && options.ignore) {
        ignorePaths = options.ignore.map(e => path.resolve(e));
    }
    var content = getFiles(locationPath, ignorePaths);

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
    var ignorePaths = [];
    if(options && options.ignore) {
        ignorePaths = options.ignore.map(e => path.resolve(e));
    }
    var content = getAll(locationPath, ignorePaths);

    if(options && options.filter) {
        content = content.filter(options.filter);
    }

    if(options && options.useRelative) {
        if(location == "./") { location = "."; }
        content = content.map(p => p.replace(__dirname, location));
    }

    return content;
};