import { TaskPriority } from './config'

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

    }
}

class TowerExtension extends StructureTower {
    _work() {
        // defence
        let invaders = this.room.find(FIND_HOSTILE_CREEPS)
        if(invaders && invaders.length > 0){
            this.attack(invaders[0])
            return
        }
        // repaire
        let targets = this.room.find(FIND_STRUCTURES, {
            filter : (structure) => {
                return (structure.hitsMax - structure.hits) / structure.hitsMax < 0.99 && structure.structureType != STRUCTURE_WALL
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
        },
        'tag': {
            get: function() {
                return this.memory.tag
            },
            set: function (newValue: string) {
                this.memory.tag = newValue
            },
            enumerable: false,
            configurable: true
        }
    });
}