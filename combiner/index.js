var combine = require('stream-combiner');
var split = require('split');
var zlib = require('zlib');
var through = require('through');

module.exports = function() {
    var current;
    var grouper = through(write, end);

    function write(buf) {
        if (buf.length > 0) {
            var row = JSON.parse(buf.toString());
            if (row.type == 'genre') {
                if (current)
                    this.queue(JSON.stringify(current) + '\n');
                current = { name: row.name, books: [] };
            } else if (row.type == 'book') {
                current.books.push(row.name);

            }
        }
    }

    function end() {
        if (current)

            this.queue(JSON.stringify(current) + '\n');
        this.queue(null);
    }
    return combine(split(), grouper, zlib.createGzip());
};
