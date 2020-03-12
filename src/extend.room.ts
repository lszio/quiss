import role from './role'
import { roomConfig } from './config'

export default function () {
    extendRoomProperties()
    _.assign(Room.prototype, RoomExtension.prototype)
}

class RoomExtension extends Room {
    doWork(): string | number {
        this.check()
        this.work()
        this.tick()
        return OK
    }
    work(): void {

    }
    check() {
        // Check Memory
        this.status
        this.spawns
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
}

let extendRoomProperties = function() {
    Object.defineProperties(Room.prototype, {
        "sources": {
            get: function() {
                if(!this._sources) {
                    if(!this.memory.sourceIds){
                        this.memory.sourceIds = this.room.find(FIND_SOURCES).map(s=>s.id);
                    }
                    this._sources = this.memory.sourceIds.map(id => Game.getObjectById(id))
                }
                return this._sources;
            }
        },
        "spawns": {
            get: function () {
                if(!this._spawns) {
                    if(!this.memory.spawnIds) {
                        this.memory.spawnIds = this.room.find(FIND_MY_STRUCTURES, {filter: (s) => {
                            return s.structureType === STRUCTURE_SPAWN
                        }}).map(s=>s.id)
                    }
                    this._spawns = this.memory.spawnIds.map(id => Game.getObjectById(id))
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
                    return this.memory.tasks
                }
            }
        },
        "status": {
            get: function() {

            }
        }
    });
}