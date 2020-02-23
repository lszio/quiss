export default function () {
    extendStructureProperties()
    _.assign(StructureTower.prototype, TowerExtension.prototype)
    _.assign(Structure.prototype, StructureExtension.prototype)
}

class StructureExtension extends Structure {
    work() {
        if(this._work) {
            this._work()
        }
        this.check()
    }

    check() {
        // if(this.store) {
        //     if(this.store.getFreeCapacity() > 0){
        //         this.room.memory.demand["charger"] += this.store.getFreeCapacity() / this.store.getCapacity() * 100
        //     }else{
        //         this.room.memory.demand["charger"] -= 1
        //     }
        // }
        // if(this.hits < this.hitsMax){
        //     this.room.memory["repairer"] += 1
        // }else{
        //     this.room.memory["repairer"] -= 1
        // }
    }
}

class TowerExtension extends StructureTower {
    _work() {
        // repaire
        let targets = this.room.find(FIND_STRUCTURES, {
            filter : (structure) => {
                return (structure.hitsMax - structure.hits) / structure.hitsMax < 0.99
            }
        });
        targets.sort((b,a) => {
            return ((a.hitsMax - a.hits)/ a.hitsMax) - ((b.hitsMax - b.hits) / b.hitsMax)
        })
        this.repair(targets[0])
    }
}

let extendStructureProperties = () => {
    Object.defineProperties(Structure.prototype, {
        'workers': {
            // TODO Improve property workers of Structure
            get: function() {
                if(!this.memory.workers){
                    this.memory.workers = 0
                }
                return this.memory.workers
            },
            set: function(newValue) {
                // let oldValue = this.memory.workers
                this.memory.workers = newValue
            },
            enumerable: false,
            configurable: true
        },
        'memory': {
            get: function() {
                if(!this.memory) {
                    if(!Memory.structures){
                        Memory.structures = {}
                    }
                    if(!Memory.structures[this.id]){
                        Memory.structures[this.id] = {}
                    }
                    this.memory = Memory.structures[this.id]
                }
                return this.memory
            },
            set: function (newValue: Object) {
                let oldValue = this.memory
                this.memory = {...oldValue, newValue}
            },
            enumerable: false,
            configurable: true
        }
    });
}