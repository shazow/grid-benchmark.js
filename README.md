There are many ways to represent a bitmap-style grid in Javascript.

I compiled a collection of implementations.

Some of which were obvious but I thought were inefficient (array full of arrays, turned out it is the fastest overall).
Some of which I suspected would be most efficient (grid_array_1d, turned out it is mediocre).
Some of which I had no idea how they would compare (hash-based, might actually be better for sparse grids).
Some of which I was hoping would yield surprising results (grid_canvas, completely disappointed).

Needless to say, the results were very surprising to me.

If there are any corrections or additions, please fork and request a pull.

## Results

YMMV, but I found generally the same trends across machines and browsers. These particular results are from my Macbook Pro on Chrome 8.0.552.231.

size = [1200,800]

    grid_array_1d
    create: 0ms
    write: 154ms
    read: 39ms
    total: 194ms

    grid_array_1d_bitwise
    create: 1ms
    write: 89ms
    read: 65ms
    total: 156ms

    grid_array_2d
    create: 12ms
    write: 48ms
    read: 38ms
    total: 101ms

    grid_array_2d_lazy
    create: 6ms
    write: 78ms
    read: 38ms
    total: 123ms

    grid_canvas
    create: 2ms
    write: 1702ms
    read: 4727ms
    total: 6433ms

    grid_hash
    create: 177ms
    write: 55ms
    read: 35ms
    total: 270ms

    grid_hash_2d
    create: 25ms
    write: 50ms
    read: 39ms
    total: 116ms

    grid_hash_lazy_2d
    create: 0ms
    write: 86ms
    read: 45ms
    total: 134ms
