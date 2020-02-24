import role from './role'

export default function() {
    extendCreepProperties()
    _.assign(Creep.prototype,CreepExtension.prototype)
}

class CreepExtension extends Creep {

    public work() {
        // TODO Finish function work of Creep
        if(this.spawning) {
            if(!this.memory.value){
                this.memory.value = this.ticksToLive / 30 * this.store.getCapacity()
            }
            return
        }
        if(this.memory.role){
            role[this.memory.role](this)
        }
        
        if(this.ticksToLive == 1) {
            if(this.memory.active) {
                this.room.spawn.newTask(this.role, this.name, this.memory)
            }
        }
    }

    public deactive(){
        this.memory.active = false
    }

    public getTask(taskType:string, structureId: string){
        // TODO Finish function receiveTask of Creep
        
    }

    public getEnerge(source?:Source | Structure) {
        // TODO improve function getEnerge of Creep
        if(!this.source){
            if(!source){
                if(!this.room.storage){
                    this.source = this.room.sources[0]
                }else{
                    this.source = this.room.storage
                }
            }else{
                this.source = source
            }
        }

        if(this.store.getFreeCapacity() > 0){
            if(this.source instanceof Source) {
                if(this.harvest(this.source) == ERR_NOT_IN_RANGE){
                    this.moveTo(this.source)
                    return OK
                }
            }else {
                if(this.withdraw(this.source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    this.moveTo(this.source)
                }
            }
            return OK
        }
        return ERR_FULL
    }

    public charge(target?:Structure) {
        if(this.store.getFreeCapacity() > 0){
            if(!target){
                if(!this.room.storage){
                    if(this.harvest(this.room.sources[0]) == ERR_NOT_IN_RANGE){
                        this.moveTo(this.room.sources[0])
                        return OK
                    }
                }else{
                    target=this.room.storage
                }
            }else{
                if(this.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    this.moveTo(target)
                }
                return OK
            }
        }
        return ERR_FULL
    }
}

let extendCreepProperties = () => {
    Object.defineProperties(Creep.prototype, {
        'source': {
            get: function(): Source | undefined {
                if(!this.memory.sourceId){
                    return undefined;
                }
                return Game.getObjectById(this.memory.sourceId);
            },
            set: function(source: Source | Mineral | Deposit | Structure) {
                this.memory.sourceId = source.id;
                return OK
            },
            enumerable: false,
            configurable: true
        },
        'target': {
            get: function() {
                if(!this.memory.targetId){
                    return undefined;
                }
                return Game.getObjectById(this.memory.targetId);
            },
            set: function(target: Structure) {
                if(target){
                    this.memory.targetId = target.id;
                }else{
                    this.memory.targetId = undefined;
                }
                return OK
            },
            enumerable: false,
            configurable: true
        },
        'resource': {
            get: function() {
                return this.memory.resource;
            },
            set: function(resource: String) {
                this.memory.resource = resource
                return OK
            },
            enumerable: false,
            configurable: true
        }
    })
}
