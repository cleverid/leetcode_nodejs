// https://coderun.yandex.ru/problem/knight-move?currentPage=1&pageSize=10&rowNumber=4
const parseStdin = async () => {
    let buffers = []
    for await (let chunk of process.stdin) buffers.push(chunk)
    const result = Buffer.concat(buffers).toString()
    return result
}

parseStdin().then(text => {
    const lines = text.split('\n')
   const [n, m] = lines[0].split(' ').map(Number)
    return { n, m }
}).then(run)

/**
n - кол-во строк
m - кол-во колонок

Краевые случаи:
1) минимальный размер 2x3, 3x2

Распространение - сверху вниз
dp - хранит кол-во путей, которыи можно в эту точку придти

dp имеет нулевую колонку и строчку с индексами 0, чтобы не делать дополнительные условия в цикле
*/

function run({ n, m }) {
   const dp = Array(n + 1).fill(0).map(_ => Array(m + 1).fill(0))

   dp[1][1] = 1;
   for (let nL = 2; nL <= n; nL++) {
      for (let mL = 2; mL <= m; mL++) {
         dp[nL][mL] = dp[nL - 1][mL - 2] + dp[nL - 2][mL - 1]
      }
   }

   console.log(dp[n][m])
}
