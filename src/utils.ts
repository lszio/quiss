
export function newNameId(){
    return (Game.time%1000).toString()
}

export function doWork(hashMap: object):void {
    // 遍历执行 work
    Object.values(hashMap).forEach(item => {
        if (item.work) item.work()
    })
}

export function init(room: Room) {
    if(!Memory.inited){
        let staffConfig = {
            "harvester": 2,
            "charger": 0,
            "builder": 0,
            "upgrader": 0,
        }
        for(const role in staffConfig){
                if(room.staff[role]<staffConfig[role]){
                    for(let i=0;i<staffConfig[role];i++){
                        Game.spawns["Spawn1"].newTask("harvester")
                        console.log("new spawn task" + role)
                }
            }
        }
        Memory.inited = true
    }
}
