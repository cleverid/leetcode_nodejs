// https://coderun.yandex.ru/problem/the-path-in-the-graph?currentPage=2&difficulty=EASY&pageSize=10&rowNumber=11
const parseStdin = async () => {
    let buffers = []
    for await (let chunk of process.stdin) buffers.push(chunk)
    const result = Buffer.concat(buffers).toString()
    return result
}

parseStdin().then(text => {
    const lines = text.split('\n')
    const [vertexes] = lines.shift().split(' ').map(Number)
    const [start, end] = lines.pop().split(' ').map(Number)
    const deps = lines.map(line => line.split(' ').map(Number))
    return { vertexes, start, end, deps }
}).then(run)

/**
vertexes - кол-во вершин в графе
deps - матрица связей
start - начало в графе
end - конечное значение в графе
*/

function run({ vertexes, deps, start, end }) {
    console.dir({ vertexes, deps, start, end })
}
