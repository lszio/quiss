
export function newNameId(){
    return (Game.time%1000).toString()
}

export function doWork(hashMap: object):void {
    // 遍历执行 work
    Object.values(hashMap).forEach(item => {
        if (item.work) item.work()
    })
}
