import role from './role'

export default function() {
    extendCreepProperties()
    _.assign(Creep.prototype,CreepExtension.prototype)
}

class CreepExtension extends Creep {
    private _working: boolean;
    private _role: string;

    public work() {
        // TODO Finish function work of Creep
        if(this.spawning) return;
        if(this.memory.role){
            role[this.memory.role].work(this)
        }
        if(this.ticksToLive == 1) {
            this.room.memory.staff[this.memory.role] -= 1
        }
    }

    public receiveTask(taskType){
        // TODO Finish function receiveTask of Creep
        
    }

    public getEnerge(source=undefined) {
        // TODO improve function getEnerge of Creep
        if(!source){
            if(!this.room.storage){
                if(this.harvest(this.room.sources[0]) == ERR_NOT_IN_RANGE){
                    this.moveTo(this.room.sources[0])
                    return OK
                }
            }else{
                source=this.room.storage
            }
        }
        if(this.store.getFreeCapacity() > 0){
            if(this.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                this.moveTo(source)
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
    Object.defineProperties(Creep.prototype,{
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