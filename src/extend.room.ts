import { roleTypes, staffConfig } from './config'

export default function () {
    extendRoomProperties()
    _.assign(Room.prototype, RoomExtension.prototype)
}

class RoomExtension extends Room {
    work() {
        // TODO Finish function work of room
        if(!this.memory.inited){
            this.init()
        }
        this.check()
        this.clearTasks()
    }
    check() {
        // TODO Finish function check of room
        if(!this.memory.ticketToCheck || this.memory.ticketToCheck <= 0 ){
            this.memory.ticketToCheck = 21
        }else{
            this.memory.ticketToCheck -= 1
            return
        }
        // Do check
        if(this.staff && this.spawn.tasks.length == 0 && Game.time%100 == 0){
            this.scanStaff()
        }
    }

    moreStaff(role: string){
        let name = [this.name , role , ++this.memory.staff[role]].join("_")
        this.spawn.newTask(role, name)
        return `[Room ${this.name}]: New staff ${name}`
    }

    lessStaff(role: string){
        let name = [this.name , role , this.memory.staff[role]--].join("_")
        Game.creeps[name].memory.active = false
        return `[Room ${this.name}]: Staff ${name} retired`
    }

    init() {
        this.clear()
        this.spawn.tasks
        this.staff
        if(!this.memory.inited){
            this.initStaff()
            this.memory.inited = true
        }
        console.log("[Room " + this.name + "]: inited")
        return OK
    }

    initStaff() {
        for(const role in staffConfig){
            if(this.staff[role]<staffConfig[role]){
                for(let i=0;i<staffConfig[role];i++){
                    this.moreStaff(role)
                }
            }
        }
    }

    clear() {
        this.spawn.memory = undefined
        this.memory = undefined
        this.clearCreeps()
        console.log("[Room " + this.name + "]: cleared")
        return OK
    }

    clearTasks() {
        this.memory.tasks = undefined
        this.tasks
    }

    clearCreeps(){
        for(const name in Game.creeps){
            if (Game.creeps[name].room.name == name.split("_")[0]){
                Game.creeps[name].memory = undefined
                Game.creeps[name].suicide()
            }
        }
    }

    scan() {

    }

    scanStaff() {
        if(this.spawn.tasks.length > 0){
            return `[Room ${this.name}]: Spawn still have tasks`
        }
        this.memory.staff = undefined
        this.staff
        for(const name in Game.creeps){
            if (Game.creeps[name].room.name == name.split("_")[0]){
                let role = name.split("_")[1]
                this.memory.staff[role] +=1
            }
        }
        for(const role of roleTypes){
            console.log(`[Room ${this.name}]: Staff ${role}: ${this.memory.staff[role]}`)
        }
        return OK
    }

    newTask(role: string,id: string) {
        this.memory.tasks[role].push(id)
    }

    getTask(role: string){
        if(!this.memory.tasks.sorted){
            this.memory.tasks["Charger"]
        }
        if(this.memory.tasks[role].length == 0){
            return
        }
        return Game.getObjectById(this.memory.tasks[role][0])
    }
}

let extendRoomProperties = () => {
    Object.defineProperties(Room.prototype, {
        'sources': {
            get: function() {
                if(!this._sources){
                    if (!this.memory.sourceIds) {
                        console.log("[Room "+this.name+"]: Find sources")
                        const sources = this.find(FIND_SOURCES)
                        if (sources.length <= 0) {
                            console.log(`[Room ${this.name}]: 异常访问，房间内没有找到 source`)
                            return undefined
                        }
                        this.memory.sourceIds = sources.map(s => s.id)
                    }
                    this._sources = this.memory.sourceIds.map(id => Game.getObjectById(id))
                }
                return this._sources
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
                            console.log(`[Room ${this.name}]: 异常访问，房间内没有找到 factory`)
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
        },
        'spawn': {
            get: function() {
                if(!this._spawn) {
                    if(!this.memory.spawnId) {
                        let spawn = this.find(FIND_STRUCTURES, {filter: (s) => { return s.structureType === STRUCTURE_SPAWN}})
                        if(spawn instanceof StructureSpawn) {
                            spawn = [spawn]
                        }
                        this.memory.spawnId = spawn.map(s => s.id)
                    }
                    this._spawn = this.memory.spawnId.map(id => Game.getObjectById(id))
                }
                return this._spawn[0]
            },
            enumerable: false,
            configurable: true
        },
        'tasks': {
            get: function() {
                if(!this.memory.tasks){
                    this.memory.tasks = {}
                    for(const role of roleTypes){
                        this.memory.tasks[role] = []
                    }
                }
                return this.memory.tasks
            },
            enumerable: false,
            configurable: true
        },
        'staff': {
            get: function() {
                    if(!this.memory.staff) {
                        this.memory.staff = {}
                        for(const role of roleTypes) {
                            this.memory.staff[role] = 0
                        }
                    }
                return this.memory.staff
            },
            enumerable: false,
            configurable: true
        },
        'demand': {
            get: function() {
                if(!this.memory.demand){
                    this.memory.demand = {}
                    for(const role of roleTypes){
                        this.memory.demand[role] = 0
                    }
                }
                return this.memory.demand
            },
            enumerable: false,
            configurable: true
        }
    });
}
