import { bodyConfigs } from './config'

export default function () {
    extendSpawnProperties()
    _.assign(Spawn.prototype, SpawnExtension.prototype)
}

class SpawnExtension extends Spawn {
    work() {
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
        }
    }

    newTask(spawnTask) {
        if(!this.memory.tasks){
            this.memory.tasks = new Array()
            this.memory.tasks.push(spawnTask)
        }
    }
}

let extendSpawnProperties = () => {
    Object.defineProperties(Spawn.prototype, {

    });
}