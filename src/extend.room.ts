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
        let temp = this.staff
        if(this.spawn.tasks.length == 0){
            for(const role of roleTypes){
                this.staff[role] = 0
            }
            for(const name in Memory.creeps){
                if(name.split('_')[0] == this.name && Memory.creeps[name].active){
                    this.memory.staff[name.split('_')[1]] += 1
                    if(!Game.creeps[name])
                    this.spawn.newTask(Memory.creeps[name].role,name,Memory.creeps[name])
                }
            }
        }
        // Check Demand
        const chargeDemands = this.find(FIND_STRUCTURES, {filter: (s) => { 
            return  (s.structureType == STRUCTURE_TOWER ||
                    s.structureType == STRUCTURE_SPAWN ||
                    s.structureType == STRUCTURE_EXTENSION) && 
                    s.store.getFreeCapacity(RESOURCE_ENERGY) > 0
        }})
        if(chargeDemands.length > 0 && chargeDemands.length/this.memory.staff["Charger"] < 3){
            this.moreStaff["Charger"]
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

    updateTask(taskType: string, structureId: string) {
        //TODO Finish function updateTask of room

    }
    assignTask(taskType: string, creepName: string) {
        //TODO Finish function assignTask of room

    }
    cleanDemands() {
        this.demand = undefined;
    }
    init() {
        this.clear()
        this.spawn.tasks
        this.staff
        if(!this.memory.inited){
            // this.initStaff()
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
        for(const name in Game.creeps){
            if (Game.creeps[name].room.name == name.split("_")[0]){
                Game.creeps[name].memory = undefined
                Game.creeps[name].suicide()
            }
        }
        this.spawn.memory = undefined
        this.memory = undefined
        console.log("[Room " + this.name + "]: cleared")
        return OK
    }
    clearTasks() {

    }
    clearCreeps(){
        
    }
    scan() {

    }
    scanTasks() {
        
    }
    scanCreeps() {

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
                if(!this._tasks){
                    if(!this.memory.tasks){
                        this.memory.tasks = {}
                        for(const role of roleTypes){
                            this.memory.task[role] = {}
                        }
                    }
                    this._tasks = this.memory.tasks
                }
                return this._tasks;
            },
            set: function(newValue: object) {
                let oldValue = this.memory.task
                this.memory.tasks = {...oldValue, ...newValue}
            },
            enumerable: false,
            configurable: true
        },
        'staff': {
            get: function() {
                if(!this._staff) {
                    if(!this.memory.staff) {
                        this.memory.staff = {}
                        for(const role of roleTypes) {
                            this.memory.staff[role] = 0
                        }
                    }
                    this._staff = this.memory.staff
                }
                return this._staff
            },
            set: function(newValue: object) {
                let oldValue = this.memory.staff
                this.memory.staff = {...oldValue, ...newValue}
            },
            enumerable: false,
            configurable: true
        },
        'demand': {
            get: function() {
                if(!this._demand){
                    if(!this.memory.demand){
                        this.memory.demand = {}
                        for(const role of roleTypes){
                            this.memory.demand[role] = 0
                        }
                    }
                    this._demand = this.memory.demand
                }
                return this._demand
            },
            set: function(newValue: object) {
                let oldValue = this.memory.demand
                this.memory.demand = {...oldValue, ...newValue}
            },
            enumerable: false,
            configurable: true
        }
    });
}
