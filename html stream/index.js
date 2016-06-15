var trumpet = require('trumpet');
var through = require('through2');
var fs = require('fs');
var tr = trumpet();
var loud = tr.select('.loud').createStream();
var tr = through(function(buf, _, next) {
    this.push(buf.toString().toUpperCase());
    next();
});
process.stdin.pipe(loud).pipe(process.stdout);