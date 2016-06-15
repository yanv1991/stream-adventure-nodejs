var concat = require('concat-stream');
process.stdin
    .pipe(concat(function(body) {
        var text = body.toString().split("").reverse().join("")
        console.log(text);
    }));
