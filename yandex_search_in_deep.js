// https://coderun.yandex.ru/problem/search-in-depth?currentPage=1&pageSize=10&rowNumber=7&compiler=nodejs
const { parseStdin } = require("./utils/parse_stdin");

parseStdin().then(text => {
    const lines = text.split('\n');
    let [vertex, edge] = lines.shift().trim().split(' ');
    const deps = lines.map(i => i.trim().split(' '))
    return { vertex, edge, deps }
}).then(run)

function run({ vertex, edge, deps }) {
    console.log(vertex, edge, deps)
}