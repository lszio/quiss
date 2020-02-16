export default function () {
    extendStructureProperties()
    _.assign(StructureTower.prototype, TowerExtension.prototype)
}

class TowerExtension extends StructureTower {
    work() {
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
                this.memory.workers = newValue
            },
            enumerable: false,
            configurable: true
        }
    });
}