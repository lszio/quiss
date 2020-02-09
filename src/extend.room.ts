export default function () {

    // 再挂载 Room 拓展
    _.assign(Room.prototype, RoomExtension.prototype)
}

class RoomExtension extends Room {
    private _factory: StructureFactory
    private _sources: Source[]
    private _mineral: Mineral

    public sourcesGetter(): Source[] | undefined {
        if (this._sources) return this._sources
        if (this.memory.sourceIds) {
            this._sources = this.memory.sourceIds.map(id => Game.getObjectById(id))
            return this._sources
        }
        const sources = this.find(FIND_SOURCES)
        if (sources.length <= 0) {
            console.log(`[${this.name} base] 异常访问，房间内没有找到 source`)
            return undefined
        }
        this.memory.sourceIds = sources.map(s => s.id)
        this._sources = sources
        return this._sources
    }
    public mineralGetter(): Mineral | undefined {
        if (this._mineral) return this._mineral

        if (this.memory.mineralId) {
            this._mineral = Game.getObjectById(this.memory.mineralId)
            return this._mineral
        }

        const mineral = this.find(FIND_MINERALS)[0]
        if (!mineral) {
            console.log(`[${this.name} base] 异常访问，房间内没有找到 mineral`)
            return undefined
        }

        this.memory.mineralId = mineral.id
        this._mineral = mineral
        return this._mineral
    }
}