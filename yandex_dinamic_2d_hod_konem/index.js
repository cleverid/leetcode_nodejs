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
n - kol-vo strok
m - kol-vo colonok

Краевые случаи:
1) minimalyniy razmer 2x3, 3x2

Rasprostronenie - sverhu vniz
dp - xranit kol-vo petey, kotorimi mogno v etu tochku pridti

Uslivie prodolgeniya:
1 - next.length === 0
*/

function run({ n, m }) {
   const dp = Array(n).fill(0).map(_ => Array(m).fill(0))

   let next = [[0,0]]

   while(next.length > 0) {
      for (let [n, m] of next) dp[n][m]++
      next = next.map(makeNext).flat()
   }

   console.log(dp[n - 1][m - 1])

   function makeNext([nL, mL]) {
      const result= [
         [nL + 1, mL + 2], // shag 1 vniz i 2 vpravo
         [nL + 2, mL + 1], // shag 2 vniz i 1 vpravo
      ]         
      return result.filter(([nL, mL]) => nL <= n - 1 && mL <= m - 1)
   }
}
