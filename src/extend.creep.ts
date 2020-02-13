export default function() {
    extendCreepProperties()
    _.assign(Creep.prototype,CreepExtension.prototype)
}

class CreepExtension extends Creep {
    private _working: boolean;
    private _role: string;

    public work() {

    }
    public charge(target) {
        if(this.store.getFreeCapacity() > 0){
            if(this.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                this.moveTo(target)
            }
            return OK
        }
        return ERR_FULL
    }
}

let extendCreepProperties = () => {
    Object.defineProperties(Creep.prototype,{
        'source': {
            get: function() {
                return this._source;
            }
        }
    })
}