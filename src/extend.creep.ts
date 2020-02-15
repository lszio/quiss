import role from './role'

export default function() {
    extendCreepProperties()
    _.assign(Creep.prototype,CreepExtension.prototype)
}

class CreepExtension extends Creep {
    private _working: boolean;
    private _role: string;

    public work() {
        if(this.memory.role){
            role[this.memory.role].work(this)
            console.log("test")
        }
    }

    public charge(target=undefined) {
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
            get: function() {
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
                return Game.getObjectById(this.memory.targetId);
            },
            set: function(target: Structure) {
                this.memory.targetId = target.id;
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