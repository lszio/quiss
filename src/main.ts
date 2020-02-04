
module.exports.loop = function(): void {
    console.log(sayHello('world!'))
}

function sayHello(str: string): string {
    return 'hello' + str
}