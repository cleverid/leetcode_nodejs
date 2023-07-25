async function parseStdin() {
    let result = '';
    for await (const buffer of process.stdin) result += buffer.toString();
    return result;
}

module.exports = {
    parseStdin
}