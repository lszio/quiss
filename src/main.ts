// screeps 代码入口
module.exports.loop = function(): void {
    console.log(sayHello('world!'))
}

// 定义一个 ts 风格的方法
function sayHello(str: string): string {
    return 'hello' + str
}