import role from './role'
import { roomConfig } from './config'
// import _ from 'lodash'

export default function () {
    extendRoomProperties()
    _.assign(Room.prototype, RoomExtension.prototype)
}

class RoomExtension extends Room {
    doWork(): string | number {
        this.check()
        this.work()
        this.tick()
        if(this.status.logging){
            this.showLog()
        }
        return OK
    }
    work(): void {
        // this.spawns[0].doWork()
        if(this.signal["scanStructures"] == 0){
            this.scanStructures()
        }
    }
    check() {
        // Check Memory
        this.status
        this.structures
        this.spawns
        this.sources
        this.staff
        this.tasks
        this.signal
    }
    init() {

    }
    tick() {
        for(const item in this.signal){
            if(this.memory.signal[item] > 0){
                this.memory.signal[item] -= 1
            }else{
                this.memory.signal[item] = roomConfig.signal[item]
            }
        }
    }
    showLog() {
        if(!this.logs || this.logs.length == 0){
            return
        }
        for(const log of this.logs){
            console.log(log)
        }
        this.memory.logs = []
    }
    addLog(log: string){
        if(this.logs){
            this.memory.logs.push(log)
        }
    }
    moreStaff(role: string) {
        let name = [this.name,role,this.staff[role].length+1].join('_')
        this.memory.staff[role].push(name)
        this.spawns[0].newTask(role,name)
    }
    lessStaff(role: string) {
        let name = this.memory.staff[role].pop()
        Game.creeps[name].suicide()
        delete Memory.creeps[name]
    }
    clear() {
        delete this.memory
    }
    scanStructures() {
        delete this.memory.structureIds
        this.structures
        let structures = this.find(FIND_MY_STRUCTURES)
        for(let structure of structures){
            this.memory.structureIds[structure.structureType].push(structure.id)
        }
    }
}

let extendRoomProperties = function() {
    Object.defineProperties(Room.prototype, {
        "sources": {
            get: function() {
                if(!this._sources) {
                    if(!this.memory.sourceIds){
                        this.memory.sourceIds = this.find(FIND_SOURCES).map(s=>s.id);
                    }
                    this._sources = this.memory.sourceIds.map(id => Game.getObjectById(id))
                }
                return this._sources;
            }
        },
        "spawns": {
            get: function () {
                if(!this._spawns) {
                    this._spawns = this.memory.structureIds[STRUCTURE_SPAWN].map(id => Game.getObjectById(id))
                }
                return this._spawns
            }
        },
        "tasks": {
            get: function() {
                if(!this.memory.tasks){
                    this.memory.tasks = {}
                    for(const roleName in role){
                        this.memory.tasks[roleName] = []
                    }
                }
                return this.memory.tasks
            }
        },
        "staff": {
            get: function() {
                if(!this.memory.staff){
                    this.memory.staff = {}
                    for(const roleName in role){
                        this.memory.staff[roleName] = []
                    }
                }
                return this.memory.staff
            }
        },
        "structures": {
            get: function() {
                if(!this._structures){
                    if(!this.memory.structureIds){
                        this.memory.structureIds = {}
                        const structureTypes = [
                            STRUCTURE_SPAWN,STRUCTURE_EXTENSION,STRUCTURE_CONTAINER,
                            STRUCTURE_STORAGE,STRUCTURE_TOWER,STRUCTURE_LAB,STRUCTURE_CONTROLLER,
                            STRUCTURE_FACTORY,STRUCTURE_EXTRACTOR,STRUCTURE_LINK,STRUCTURE_NUKER,
                            STRUCTURE_OBSERVER
                        ]
                        for(const structureType of structureTypes){
                            this.memory.structureIds[structureType] = []
                        }
                    }
                    this._structures = _.mapValues(this.memory.structureIds,(structureList) => {
                        return structureList.map(id => Game.getObjectById(id))
                    })
                }
                return this._structures
            }
        },
        "status": {
            get: function() {
                if(!this.memory.status){
                    this.memory.status = roomConfig.status
                }
                return this.memory.status
            }
        },
        "signal": {
            get: function() {
                if(!this.memory.signal){
                    this.memory.signal = roomConfig.signal
                }
                return this.memory.signal
            }
        },
        "logs": {
            get: function() {
                if(!this.memory.logs){
                    this.memory.logs = []
                }
                return this.memory.logs
            }
        }
    });
}