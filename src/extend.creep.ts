import role from './role'

export default function() {
    extendCreepProperties()
    _.assign(Creep.prototype,CreepExtension.prototype)
}

class CreepExtension extends Creep {

    public work() {
        // TODO Finish function work of Creep
        if(this.spawning) {
            return
        }
        if(this.memory.role){
            role[this.memory.role](this)
        }
    }

    public getTask(taskType:string, structureId: string){
        // TODO Finish function receiveTask of Creep
        
    }

    public getEnergy(prefer?:string) {
        // TODO improve function getEnergy of Creep
        if(!this.source){
            if(prefer=="Source"){
                if(this.target){
                    this.source = this.pos.findClosestByRange(FIND_SOURCES)[0]
                }else{
                    this.source = this.room.sources[Game.time%this.room.sources.length]
                }
            }else{
                if(!prefer || prefer=="Storage"){
                    if(this.room.storage && this.room.storage.store.getUsedCapacity(RESOURCE_ENERGY) > 0){
                        this.source = this.room.storage
                    }
                }
                if(prefer=="Container" || !this.source){
                    this.source = this.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: (s) => {
                            return s.structureType == STRUCTURE_CONTAINER &&
                                s.store.getUsedCapacity(RESOURCE_ENERGY) > 0
                        }
                    })
                }
            }
            if(!this.source){
                this.source = this.room.sources[Game.time%this.room.sources.length]
            }
        }
        if(this.source instanceof Source) {
            const result = this.harvest(this.source)
            if(result == ERR_NOT_IN_RANGE){
                this.moveTo(this.source)
            }
            if(this.store.getFreeCapacity(RESOURCE_ENERGY) == 0 && prefer != "Source"){
                this.source = undefined
            }
        } else {
            const result = this.withdraw(this.source, RESOURCE_ENERGY)
            if(result == ERR_NOT_IN_RANGE){
                this.moveTo(this.source)
            }else if(result == ERR_NOT_ENOUGH_RESOURCES){
                this.source = undefined
            }
            return OK
        }
        return ERR_FULL
    }

    taskRest(){
        let park = Game.flags["P_"+this.room.name]
        if(park){
            this.moveTo(park)
        }
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
                if(!source){
                    this.memory.sourceId = undefined;
                    return
                }
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
