// https://coderun.yandex.ru/problem/search-in-depth?currentPage=1&pageSize=10&rowNumber=7&compiler=nodejs
const TIME = true;

const parseStdin = async () => {
    let buffers = []
    for await (let chunk of process.stdin) buffers.push(chunk)
    const result = Buffer.concat(buffers).toString()
    return result
}

parseStdin().then(text => {
    const lines = text.split('\n')
    let [n, m] = lines.shift().split(' ').map(Number)
    const matrix = lines.map(i => i.split(' ').map(Number))
    return { n, m, matrix }
}).then(run)

/**  
Краевые случаи:
- матрица 1 на 1
- матрица квадратная
- матрица прямоугольная 

n - кол-во строк - вертикаль
m - кол-во В строке - горизонталь
*/

function run({ n, m, matrix }) {
    for (let i = 0; i < n || i < m; i++) {
        // по горизонтали
        for (let g = i; g < m; g++) calcCell(g, i)
        // по вертикали
        for (let v = i + 1; v < n; v++) calcCell(i, v)
    }

    console.log(matrix[n - 1][m - 1])

    function calcCell(g, v) {
        const cell = matrix[v][g]
        const result = []
        // берем из левой ячейки
        if (g > 0) result.push(cell + matrix[v][g - 1])
        // берем из верхней ячейки
        if (v > 0) result.push(cell + matrix[v - 1][g])
        if (result.length) matrix[v][g] = Math.min(...result)
    }
}

