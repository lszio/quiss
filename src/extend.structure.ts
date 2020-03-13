import { creepConfig } from './config'

export default function () {
    extendStructureProperties()
    extendSpawnProperties()
    _.assign(Structure.prototype, StructureExtension.prototype)
    _.assign(Spawn.prototype, SpawnExtension.prototype)
    _.assign(StructureTower.prototype, TowerExtension.prototype)
}

class StructureExtension extends Structure {
    doWork() {
        this.check()
        this.work()
        this.check()
    }

    check() {
        console.log("Super")
    }

    work() {

    }
}

class TowerExtension extends StructureTower {
    work() {
        // defence
        let invaders = this.room.find(FIND_HOSTILE_CREEPS)
        if(invaders && invaders.length > 0){
            this.attack(invaders[0])
            return
        }
        // repaire
        let targets = this.room.find(FIND_STRUCTURES, {
            filter : (structure) => {
                return (structure.hitsMax - structure.hits) / structure.hitsMax < 0.99 && structure.structureType != STRUCTURE_WALL
            }
        });
        targets.sort((b,a) => {
            return ((a.hitsMax - a.hits)/ a.hitsMax) - ((b.hitsMax - b.hits) / b.hitsMax)
        })
        this.repair(targets[0])
    }
}

let extendStructureProperties = () => {
    Object.defineProperties(Structure.prototype, {
        
    });
}

class SpawnExtension extends Spawn {
    work() {
        // TODO Improve function work of Spawn
        if(this.spawning){
            return ERR_BUSY
        }
        this.finishTask()
    }

    check() {
        console.log("Spawn")
        // Check Memory
        this.tasks
    }
    finishTask(){
        if(!this.memory.tasks || this.memory.tasks.length == 0){
            return OK
        }
        let task = this.memory.tasks[0]
        if(!creepConfig.bodyConfig[task.memory.role]){
            this.memory.tasks.shift()
        }
        if(!task.memory.role){
            task.memory.role = task.name.split("_")[1]
        }
        if(Game.creeps[task.name]){
            if(Game.creeps[task.name].ticksToLive > 10){
                console.log(`[Room ${this.room.name}]: Already have ${task.name}`)
                this.memory.tasks.shift()
            }
            return
        }
        let body = (creepConfig.bodyConfig[task.memory.role])[task.level]
        let result = this.spawnCreep(body, task.name, { memory: task.memory })
        if(result == OK ){
            this.memory.tasks.shift()
            console.log(`[Room ${this.room.name}]: ${task.name} spawned,level: ${task.level}`)
            return OK
        }else if((result = ERR_NOT_ENOUGH_ENERGY) && this.memory.tasks[0].level>1){
            this.memory.tasks[0].level -= 1
        }
    }

    newTask(role, name, memory?:CreepMemory) {
        let level = this.room.controller.level
        let spawnTask = {
            "name": name,
            "level": level,
            "memory": {
                ...memory,
                "role": role,
                "status": creepConfig.status
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
