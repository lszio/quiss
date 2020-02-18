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
        if(!this.memory.tasks || this.memory.tasks.length === 0){
            return OK
        }
        let task = this.memory.tasks[0]
        let body = (bodyConfigs[task.memory.role])[task.level]
        let spawnResult = this.spawnCreep(body, task.name, { memory: task.memory })
        if(spawnResult == OK ){
            this.memory.tasks.shift()
            return OK
        }else if(spawnResult = ERR_NOT_ENOUGH_ENERGY){
            this.memory.tasks[0].level = 1
        }
    }

    newTask(role, name?, memory?:Object) {
        if(!name){
            name = this.room.name + role + this.room.memory.staff[role] + 1
        }
        let level = this.room.controller.level
        let spawnTask = {
            name: name,
            level: level,
            active: true,
            memory:{
                role: role,
                ...memory
            }
        }
        if(!this.memory.tasks){
            this.memory.tasks = []
        }
        this.memory.tasks.push(spawnTask)
    }
}

let extendSpawnProperties = () => {
    Object.defineProperties(Spawn.prototype, {

    });
}