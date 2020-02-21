let staffConfig = {
    "harvester": 2,
    "charger": 2,
    "builder": 2,
    "upgrader": 3
}

const roleList = ["harvester","charger"]

export default function () {
    extendRoomProperties()
    _.assign(Room.prototype, RoomExtension.prototype)
}

class RoomExtension extends Room {
    work() {
        // TODO Finish function work of room
        this.check()
        // for(const role of roleList){
        //     this.staff[role].alive = 0
        // }
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
        console.log("[Room "+this.name+"]: Regular check")
        let result = ""
        // for(const role of roleList){
        //     if(this.staff[role].active > this.staff[role].alive) {
                
        //     }
        //     if(this.demand[role] < -1000 || this.demand[role] > 1000){
        //         this.demand[role] = 0
        //     }
        //     console.log("[Room "+this.name+"]: "+role+" active="+this.staff[role].active+", alive="+this.staff[role].alive)
        //     console.log("[Room "+this.name+"]: "+role+" demand="+this.demand[role])
        // }
        // if(true) {
        //     console.log(result)
        // }
        // Hard code for creep respawn
        if(Game.spawns["Spawn1"].memory.tasks.length == 0){
            console.log("Check creeps")
            let staff = {
                "harvester": 2,
                "charger": 2,
                "builder": 2,
                "upgrader": 3
            }
            for(const name in Memory.creeps){
                if(!Game.creeps[name] && Memory.creeps[name].active){
                    this.spawn.newTask(Memory.creeps[name].role,name,Memory.creeps[name])
                }
            }
        }

    }
    updateTask(taskType: string, structureId: string) {
        //TODO Finish function updateTask of room

    }
    assignTask(taskType: string, creepName: string) {
        //TODO Finish function assignTask of room

    }
}

let extendRoomProperties = () => {
    Object.defineProperties(Room.prototype, {
        'sources': {
            get: function() {
                if(!this._sources){
                    if (!this.memory.sourceIds) {
                        console.log("[Room ]"+this.name+"]: Find sources")
                        const sources = this.find(FIND_SOURCES)
                        if (sources.length <= 0) {
                            console.log(`[${this.name} base] 异常访问，房间内没有找到 source`)
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
        },
        'spawn': {
            get: function(){
                if(!this._spawn) {
                    if(!this.memroy.spawnId) {
                        console.log("[Room ]"+this.name+"]: Find spawn")
                        this.memroy.spawnId = this.room.find(FIND_STRUCTURES, {filter: (s)=>{return s.structureType === STRUCTURE_SPAWN}})[0].id
                        
                    }
                    this._spawn = Game.getObjectById(this.memory.spawnId)
                }
                return this._spawn
            },
            enumerable: false,
            configurable: true
        },
        'tasks': {
            get: function() {
                if(!this._tasks){
                    if(!this.memory.tasks){
                        this.memory.tasks = {
                            "harvest": {},
                            "charge": {},
                            "upgrade": {},
                            "repair": {},
                            "build": {},
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
                        for(const role of roleList) {
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
                        for(const role of roleList){
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
