export default function () {
    extendRoomProperties()
    _.assign(Room.prototype, RoomExtension.prototype)
}

class RoomExtension extends Room {

}

let extendRoomProperties = () => {
    Object.defineProperties(Room.prototype, {
        'sources': {
            get: function() {
                if (!this.memory.sourceIds) {
                    const sources = this.find(FIND_SOURCES)
                    if (sources.length <= 0) {
                        console.log(`[${this.name} base] 异常访问，房间内没有找到 source`)
                        return undefined
                    }
                    this.memory.sourceIds = sources.map(s => s.id)
                }
                return this.memory.sourceIds.map(id => Game.getObjectById(id))
            },
            enumerable: false,
            configurable: true
        },
        'tower': {
            get: function() {
                if(!this._tower){
                    if(!this.memory.towerIds) {
                        const towers = this.find(FIND_STRUCTURES, {filter: (s) => s.structureType === STRUCTURE_TOWER})
                        if (towers.length <= 0) {
                            console.log(`[${this.name} base] 异常访问，房间内没有找到 tower`)
                            return undefined
                        }
                        this.memory.towerIds = towers.map(s => s.id)
                    }
                    this._tower = this.memory.towerIds.map(id => Game.getObjectById(id))
                }
                return this._tower
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
        }
    });
}