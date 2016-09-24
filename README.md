# location-tree
Node module for getting all files in location


## Usage

### getting files in location
```
var location = require("location-tree");
var filesInCurrentDirectory = location.getFiles("./");
```

### getting files and folders in location
```
var location = require("location-tree");
var filesInCurrentDirectory = location.getAll("./");
```

## Options

### Filter
```
var location = require("location-tree");
var filesInCurrentDirectory = location.getFiles("./", {
    filter: [function]
});
```
Function gets filename as parameter and returns true for ones it wants to keep or false for ones to be removed.

### Relative path
```
var location = require("location-tree");
var filesInCurrentDirectory = location.getFiles("./", {
    useRelative: true
});
```
Default response is list of absolute paths. If you want to use relative pass useRelative option with true as value.

### Ignore paths
```
var location = require("location-tree");
var filesInCurrentDirectory = location.getFiles("./", {
    ignore: [ path, ...]
});
```
Pass list of paths to be ignored.


