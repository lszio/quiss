export default function () {
    extendSpawnProperties()
    _.assign(Spawn.prototype, SpawnExtension.prototype)
}

class SpawnExtension extends Spawn {
    doSpawn() {
        if(this.spawning){
            return ERR_BUSY
        }
        if(this.memory.tasks.length === 0){
            return OK
        }
        
    }
    newTask(spawnTask) {
        if(!this.memory.tasks){
            this.memory.tasks = new Array()
            this.memory.tasks.push(spawnTask)
        }
    }
}

let extendSpawnProperties = () => {
    Object.defineProperties(Spawn.prototype, {

    });
}