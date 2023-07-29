// https://coderun.yandex.ru/problem/pin?currentPage=1&pageSize=10&rowNumber=1
const parseStdin = async () => {
    let buffers = []
    for await (let chunk of process.stdin) buffers.push(chunk)
    const result = Buffer.concat(buffers).toString()
    return result
}

parseStdin().then(text => {
    const lines = text.split('\n')
    let n = Number(lines[0])
    const points = lines[1].split(' ').map(Number)
    return { n, points }
}).then(run)

/**  
Краевые случаи: 

baza:

shag:
dp[i][0] = dp[i - 1][1] - esli na shage ne privajazivaem nitochku,
                          to berem dlinu iz n - 1 shaga gde nitocka privjazana
dp[i][1] = Math.min(dp[i - 1][0], dp[i - 1][1]) + points[i] - points[i - 1]

n - kol-vo gvozdikov
points - koordimati 
*/

function run({ n, points }) {
   points.sort((a, b) => a > b ? 1 : -1)
   const dp = Array(n).fill(0).map(_ => [0, 0])
   
   // pervij shag dlina dlja privazana/net odinakova
   dp[1][0] = points[1] - points[0]
   dp[1][1] = points[1] - points[0]

   for(let i = 2; i < n; i++) {
      const min = Math.min(dp[i - 1][0], dp[i - 1][1])
      const length = points[i] - points[i - 1]
      dp[i][1] = min + length
      dp[i][0] = dp[i - 1][1]
   }

   console.log(dp[n - 1][1])
}

