var gulp = require("gulp");


gulp.task("0-transpile", function (callback) {
    "use strict";
    var spawn = require('child_process').spawn;
    var ls;
    if (/^win/.test(process.platform)) {
        ls = spawn('cmd.exe', ['/c', 'tsc -w']);
    }
    else {
        ls = spawn('sh', ['-c', 'tsc -w']);
    }


    ls.stdout.on('data', function (data) {
        console.log('stdout: ' + data);
    });

    ls.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
    });

    ls.on('exit', function (code) {
        console.log('child process exited with code ' + code);
    });
});