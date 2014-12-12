function downloadFileAndSaveToDirectory(source,destination){
    var http = require('http');
    var fs = require('fs');
    var file = fs.createWriteStream(destination);
    var request = http.get(source, function(response) {
        response.pipe(file);
    });
}

function downloadFileAndSaveToDirectoryByWget(source,destination,afterDownLoad){
    var spawn = require('child_process').spawn;
    var prc = spawn('wget', ['-q',source, '-O', destination]);
    prc.stdout.setEncoding('utf8');
    prc.stdout.on('data', function (data) {
        var str = data.toString()
        var lines = str.split(/(\r?\n)/g);
        console.log(lines.join(""));
    });
    prc.on('close', function (code) {
        afterDownLoad();
        console.log('download process exit code ' + code);
    });
}

function getFilelistByExtension(dataDir, extension) {
    var allFilesList = [];
    var fs = require('fs');
    var fileslist = fs.readdirSync(dataDir);
    for (var i = 0; i < fileslist.length; i++) {
        console.log(fileslist[i]);
        if (fileslist[i].lastIndexOf("."+extension) != -1) {
            allFilesList.push(fileslist[i]);
        }
    }
    return allFilesList;
}

module.exports = {
    downloadFileAndSaveToDirectory:downloadFileAndSaveToDirectory,
    downloadFileAndSaveToDirectoryByWget:downloadFileAndSaveToDirectoryByWget,
    getFilelistByExtension:getFilelistByExtension
}