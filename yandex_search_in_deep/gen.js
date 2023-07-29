const SIZE = 1000000

console.log(`${SIZE} 500000`)

for (let i = 0; i < SIZE * 10; i++) {
    let a = Math.round(Math.random() * SIZE)
    if (i === 0) a = 1;
    const b = Math.round(Math.random() * SIZE)
    console.log(`${a} ${b}`)
}