var structs = {};

structs.grid_array_2d = function(size) {
    var grid = [];
    var w = size[0], h = size[1];
    for (var x=w; x>=0; x--) {
        var row = [];
        for(var y=h; y>=0; y--) row.push(0);
        grid.push(row);
    }

    return {
        set: function(pos, value) {
            grid[pos[0]][pos[1]] = value;
        },
        get: function(pos) {
            return grid[pos[0]][pos[1]];
        }
    }
}


structs.grid_array_2d_lazy = function(size) {
    var grid = [];

    for (var x=0, width=size[0]; x<width; x++) {
        var row = [];
        row[size[1] - 1] = undefined; // Accessing element n is supposed to initialize the array to size n-1
        grid.push(row);
    }

    return {
        set: function(pos, value) {
            grid[pos[0]][pos[1]] = value;
        },
        get: function(pos) {
            return grid[pos[0]][pos[1]];
        }
    }
}

structs.grid_array_1d = function(size) {
    var w = size[0], h = size[1];
    var a = [];
    for(var i=0, ii=w*size[1]; i<ii; i++) {
        a.push(0);
    }

    return {
        set: function(pos, value) {
            a[pos[1] * w + pos[0]] = value;
        },
        get: function(pos) {
            return a[pos[1] * w + pos[0]];
        }
    }
}

structs.grid_array_1d_bitwise = function(size) {
    var MAX_BITS = 32;
    var a = [], w = size[0], h = size[1];
    for(var i=0, ii = Math.ceil((w * h) / MAX_BITS); i<ii; i++) {
        a.push(0);
    }

    return {
        set: function(pos, value) {
            var i = pos[0] * w + pos[1];
            var shift = i % MAX_BITS;
            var j = Math.floor(i / MAX_BITS);
            a[j] ^= (value << shift);
        },
        get: function(pos) {
            var i = pos[0] * w + pos[1];
            var shift = i % MAX_BITS;
            var j = Math.floor(i / MAX_BITS);
            return (a[j] & (1 << shift)) >> shift;
        }
    }
}

structs.grid_hash = function(size) {
    var d = {};

    var w = size[0], h = size[1];
    for (var x=w; x>=0; x--) {
        for(var y=h; y>=0; y--) d[x*w+y] = 0;
    }

    return {
        set: function(pos, value) {
            d[pos[0] * w + pos[1]] = value;
        },
        get: function(pos) {
            return d[pos[0] * w + pos[1]];
        }
    }
}


structs.grid_hash_2d = function(size) {
    var d = {};
    var w = size[0], h = size[1];
    for (var x=w; x>=0; x--) {
        d[x] = {};
        for(var y=h; y>=0; y--) d[x][y] = 0;
    }

    return {
        set: function(pos, value) {
            d[pos[0]][pos[1]] = value;
        },
        get: function(pos) {
            return d[pos[0]][pos[1]];
        }
    }
}


structs.grid_hash_lazy_2d = function(size) {
    var d = {};

    return {
        set: function(pos, value) {
            var row = d[pos[0]];
            if(row === undefined) {
                var k = pos[1];
                d[pos[0]] = {k: value};
                return;
            }
            row[pos[1]] = value;
        },
        get: function(pos) {
            var row = d[pos[0]];
            return row && row[pos[1]];
        }
    }
}


structs.grid_canvas = function(size) {
    var canvas = document.createElement("canvas");

    canvas.width = size[0];
    canvas.height = size[1];

    var ctx = canvas.getContext("2d");

    var data = ctx.createImageData(1, 1);
    data[3] = 255;

    return {
        set: function(pos, value) {
            data[0] = value;
            ctx.putImageData(data, pos[0], pos[1]);
        },
        get: function(pos) {
            return ctx.getImageData(pos[0], pos[1], 1, 1).data[0];
        }
    }
}
