// https://coderun.yandex.ru/problem/search-in-depth?currentPage=1&pageSize=10&rowNumber=7&compiler=nodejs
const parseStdin = async () => {
   let buffers = [];
   for await (let chunk of process.stdin) buffers.push(chunk);
   return Buffer.concat(buffers).toString();
}

parseStdin().then(text => {
   const lines = text.split('\n');
   let [vertex, edge] = lines.shift().split(' ').map(Number);
   const deps = lines.map(i => i.split(' ').map(Number));
   return { vertex, edge, deps }
}).then(run)

function run({ vertex, edge, deps }) {
   const depsMap = new Map();
   const addDep = (a, b) => {
      let items = depsMap.get(a);
      if (!items) items = new Set();
      items.add(b);
      depsMap.set(a, items);
   }
   const getDeps = (a) => depsMap.get(a) ?? []; 
   for (let [a, b] of deps) {
      addDep(a, b);
      addDep(b, a);
   }

   const stack = [1];
   const result = new Set();
   while(stack.length > 0) {
      const current = stack.pop();
      result.add(current);
      for (let next of depsMap.get(current) ?? []) {
         if (!result.has(next)) stack.push(next);
      }
   }

   console.log(result.size)
   const out = [...result].sort((a, b) => a > b ? 1 : -1).join(' ');
   console.log(out);
}
