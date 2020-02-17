import { runInThisContext } from "vm";

export default function () {
    extendRoomProperties()
    _.assign(Room.prototype, RoomExtension.prototype)
}

class RoomExtension extends Room {
    work() {
        // TODO Finish function work of room
        if(Game.time%10 === 0){
            this.check()
            return
        }
        // harvest
        if (this.memory.tasks["harvest"].length*2 > this.memory.staff["harvester"]){
            Game.spawns.Spawn1.newTask("harvester")
        }
        // charge
        if(this.memory.tasks["charge"].length/5 > this.memory.staff["charger"]){
            Game.spawns.Spawn1.newTask("charger")
        }
    }
    check() {
        // TODO Finish function check() of room
        if(!this.memory.tasks) {
            this.memory.tasks = {"harvest":[], "charge":[]};
        }
        if(!this.memory.staff) {
            this.memory.staff = {"harvester":0,"charger":0};
        }
        if(Game.spawns.Spawn1.memory.tasks.length == 0) {
            this.memory.staff = {"harvester":0,"charger":0};
            for(const name in Game.creeps){
                this.memory.staff[Game.creeps[name].memory.role] += 1
            }
        }
        // harvest
        let targets = this.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_CONTAINER ||
                    (
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_EXTENSION &&
                        structure.room.controller.level <= 2
                    ) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0 
            }
        });
        this.memory.tasks["harvest"] = targets.map(s=>s.id)
        // charge
        targets = this.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_TOWER ||
                        structure.structureType == STRUCTURE_STORAGE
                    ) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0 
            }
        });
        this.memory.tasks["charge"] = targets.map(s=>s.id)
    }
}

let extendRoomProperties = () => {
    Object.defineProperties(Room.prototype, {
        'sources': {
            get: function() {
                if (!this.memory.sourceIds) {
                    const sources = this.find(FIND_SOURCES)
                    if (sources.length <= 0) {
                        console.log(`[${this.name} base] 异常访问，房间内没有找到 source`)
                        return undefined
                    }
                    this.memory.sourceIds = sources.map(s => s.id)
                }
                return this.memory.sourceIds.map(id => Game.getObjectById(id))
            },
            enumerable: false,
            configurable: true
        },
        'tower': {
            get: function() {
                if(!this._tower){
                    if(!this.memory.towerIds) {
                        const towers = this.find(FIND_STRUCTURES, {filter: (s) => s.structureType === STRUCTURE_TOWER})
                        if (towers.length <= 0) {
                            console.log(`[${this.name} base] 异常访问，房间内没有找到 tower`)
                            return undefined
                        }
                        this.memory.towerIds = towers.map(s => s.id)
                    }
                    this._tower = this.memory.towerIds.map(id => Game.getObjectById(id))
                }
                return this._tower
            },
            enumerable: false,
            configurable: true
        },
        'factory': {
            get: function() {
                if(!this._factory){
                    if(!this.memory.factoryIds) {
                        const factorys = this.find(FIND_STRUCTURES, {filter: (s) => s.structureType === STRUCTURE_STORAGE})
                        if (factorys.length <= 0) {
                            console.log(`[${this.name} base] 异常访问，房间内没有找到 factory`)
                            return undefined
                        }
                        this.memory.factoryIds = factorys.map(s => s.id)
                    }
                    this._factory = this.memory.factoryIds.map(id => Game.getObjectById(id))
                }
                return this._factory
            },
            enumerable: false,
            configurable: true
        }
    });
}