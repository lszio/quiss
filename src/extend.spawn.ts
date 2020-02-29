import { bodyConfigs } from './config'

export default function () {
    extendSpawnProperties()
    _.assign(Spawn.prototype, SpawnExtension.prototype)
}

class SpawnExtension extends Spawn {
    work() {
        // TODO Improve function work of Spawn
        if(this.spawning){
            return ERR_BUSY
        }
        this.finishTask()
    }

    finishTask(){
        if(!this.tasks || this.tasks.length == 0){
            return OK
        }
        let task = this.memory.tasks[0]
        if(!task.memory.role){
            task.memory.role = task.name.split("_")[1]
        }
        let body = (bodyConfigs[task.memory.role])[task.level]
        let result = this.spawnCreep(body, task.name, { memory: task.memory })
        if(result == OK ){
            this.memory.tasks.shift()
            console.log(`[Room ${this.room.name}]: ${task.name} spawned,level: ${task.level}`)
            return OK
        }else if((result = ERR_NOT_ENOUGH_ENERGY) && this.memory.tasks[0].level>1){
            this.memory.tasks[0].level -= 1
        }else if(result = ERR_NAME_EXISTS){
            console.log(`[Room ${this.room.name}]: Already have ${task.name}`)
            this.memory.tasks.shift()
        }
    }

    newTask(role, name?, memory?:Object) {
        if(!name){
            name = [this.room.name , role , ++this.room.memory.staff[role]].join("_")
        }
        let level = this.room.controller.level
        let newMemory = {
            "role": role,
            "active": true,
            "working": false
        }
        let spawnTask = {
            "name": name,
            "level": level,
            "memory":{
               ...memory,
               ...newMemory
            }
        }
        this.memory.tasks.push(spawnTask)
    }
}

let extendSpawnProperties = () => {
    Object.defineProperties(Spawn.prototype, {
        "tasks": {
            get: function() {
                if(!this.memory.tasks){
                    this.memory.tasks = []
                }
                return this.memory.tasks
            },
            enumerable: false,
            configurable: true
        } 
    });
}
