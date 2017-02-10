var node = function(i, parent, g, h, a) {
    return {
        g:g,
        h:h,
        a:a,
        i:i,
        parent:parent,
    };
};
var h = function(i, j) {
    return Math.abs(game.index.from(i)[0]-game.index.from(j)[0])+Math.abs(game.index.from(i)[1]-game.index.from(j)[1]);
};
var add = function(n) {//node(i, null, 0, h(i, t), g.armies[i])
    var i = n.i;
    //tera[i] = n;
    c.push(n);
    if(allow.includes(game.terrain[game.index.left(i)]) && !o.some(function(e, i, a) {return e.i === this.i;}, {i:game.index.left(i)}) && !c.some(function(e, i, a) {return e.i === this.i;}, {i:game.index.left(i)})) {
        o.push(node(game.index.left(i), n, n.g+1, h(game.index.left(i), t), g.armies[game.index.left(i)]));
    }
    if(allow.includes(game.terrain[game.index.right(i)]) && !o.some(function(e, i, a) {return e.i === this.i;}, {i:game.index.right(i)}) && !c.some(function(e, i, a) {return e.i === this.i;}, {i:game.index.right(i)})) {
        o.push(node(game.index.right(i), n, n.g+1, h(game.index.right(i), t), g.armies[game.index.right(i)]));
    }
    if(allow.includes(game.terrain[game.index.up(i)]) && !o.some(function(e, i, a) {return e.i === this.i;}, {i:game.index.up(i)}) && !c.some(function(e, i, a) {return e.i === this.i;}, {i:game.index.up(i)})) {
        o.push(node(game.index.up(i), n, n.g+1, h(game.index.up(i), t), g.armies[game.index.up(i)]));
    }
    if(allow.includes(game.terrain[game.index.down(i)]) && !o.some(function(e, i, a) {return e.i === this.i;}, {i:game.index.down(i)}) && !c.some(function(e, i, a) {return e.i === this.i;}, {i:game.index.down(i)})) {
        o.push(node(game.index.down(i), n, n.g+1, h(game.index.down(i), t), g.armies[game.index.down(i)]));
    }
};
var allow = [-1, 0, -3, 1, 2, 3, 4, 5, 6, 7, 8];
var game;
var bot;
var tera = [];
var o = [];
var c = [];
var t;
var addParent = function(array, n) {
    array.unshift(n.i);
    if(n.parent !== null) {
        addParent(array, n.parent);
    }
};
var findPath = function(g, b, i, target) {
    game = g;
    bot = b;
    t = target;
    add(node(i, null, 0, h(i, t), g.armies[i]), {g:-1});//add start w/ g:0
    var cur;
    while(!done) {
        cur = o.reduce((iMax, x, i, arr) => x.v < arr[iMax].v ? i : iMax, 0);
        if(o[cur].i === t) {
            done = true;
        }else {
            add(o[cur]);
        }
    }
    var path = [];//list of indexes in order from start to finish
    addParent(path, o[cur]);
};