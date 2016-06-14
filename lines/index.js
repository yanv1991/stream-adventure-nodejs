var split = require('split');
var through2 = require('through2');
var arr = [];
process.stdin
    .pipe(split())
    .pipe(through2(function(line, _, next) {
        arr.push(line.toString());
        next();
    })).on('end', function() {
        arr.forEach(function(elem, index) {
            if (isOdd(index)) {
                console.log(elem.toString().toUpperCase());
            } else {
                console.log(elem.toString().toLowerCase());
            }
        })
    }).pipe(process.stdout);

function isOdd(n) {
    return Math.abs(n % 2) == 1;
}


/*
//other solution
var through = require('through2');
var split = require('split');

var lineCount = 0;
var tr = through(function (buf, _, next) {
    var line = buf.toString();
    this.push(lineCount % 2 === 0
        ? line.toLowerCase() + '\n'
        : line.toUpperCase() + '\n'
    );
    lineCount ++;
    next();
});
process.stdin
    .pipe(split())
    .pipe(tr)
    .pipe(process.stdout)
;
*/
