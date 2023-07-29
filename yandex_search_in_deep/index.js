// https://coderun.yandex.ru/problem/search-in-depth?currentPage=1&pageSize=10&rowNumber=7&compiler=nodejs
const TIME = true;

const parseStdin = async () => {
    TIME && console.time('parseStdin')
    let buffers = [];
    for await (let chunk of process.stdin) buffers.push(chunk);
    const result = Buffer.concat(buffers).toString();
    TIME && console.timeEnd('parseStdin')
    return result;
}

parseStdin().then(text => {
    TIME && console.time('params')
    const lines = text.split('\n');
    let [vertex, edge] = lines.shift().split(' ').map(Number);
    const deps = lines.map(i => i.split(' ').map(Number));
    TIME && console.timeEnd('params')
    return { vertex, edge, deps }
}).then(run)

function run({ vertex, edge, deps }) {
    TIME && console.time('cash')
    const depsMap = Object.create(null);
    const addDep = (a, b) => {
        if (depsMap[a]) depsMap[a].push(b)
        else depsMap[a] = [b]
    }
    const getDeps = (a) => depsMap[a] ?? [];
    for (let [a, b] of deps) {
        addDep(a, b);
        addDep(b, a);
    }
    TIME && console.timeEnd('cash')

    TIME && console.time('algorithm')
    const stack = [1];
    const result = {};
    while (stack.length > 0) {
        const current = stack.pop();
        result[current] = 1;
        for (let next of getDeps(current)) {
            if (!result[next]) {
                stack.push(next);
            }
        }
    }
    TIME && console.timeEnd('algorithm')

    TIME && console.time('out')
    const size = Object.values(result).length;
    const out = [];
    for (let i = 0; i <= vertex; i++) {
        if (result[i]) out.push(i);
    }

    console.log(size)
    console.log(out.join(' '))
    TIME && console.timeEnd('out')
} 
