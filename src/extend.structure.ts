export default function () {
    extendTowerProperties()
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

let extendTowerProperties = () => {
    Object.defineProperties(StructureTower.prototype, {

    });
}