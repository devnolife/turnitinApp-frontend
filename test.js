const graph = {
    a: { b: 5, c: 2 },
    b: { a: 5, c: 7, d: 8 },
    c: { a: 2, b: 7, d: 4, e: 8 },
    d: { b: 8, c: 4, e: 6, f: 4 },
    e: { c: 8, d: 6, f: 3 },
    f: { e: 3, d: 4 },
};

const formatGraph = (g) => {
    const tmp = {};
    Object.keys(g).forEach((k) => {
        const obj = g[k];
        const arr = [];
        Object.keys(obj).forEach((v) => arr.push({ vertex: v, cost: obj[v] }));
        tmp[k] = arr;
    });
    return tmp;
};

const dijkstra = (graph, start, end) => {
    console.log("jalan ?");
    var map = formatGraph(graph);

    var visited = [];
    var unvisited = [start];
    // set distance of source to 0
    var shortestDistances = { [start]: { vertex: start, cost: 0 } };
    console.log(shortestDistances);
}