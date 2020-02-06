
export default function() {
    if(!Game.creeps['Harvester']) {
        Game.spawns['Spawn1'].spawnCreep([MOVE,WORK,CARRY],'Harvester')
    }else{
        var harvester = Game.creeps['Harvester']
        if(harvester.store.getFreeCapacity() > 0) {
            var sources = harvester.room.find(FIND_SOURCES);
            if(harvester.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                harvester.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            var targets = harvester.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
            });
            if(targets.length > 0) {
                if(harvester.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    harvester.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
    }
    let upgrading = false
    if(!Game.creeps['Upgrader']){
        Game.spawns['Spawn1'].spawnCreep([MOVE,WORK,CARRY],'Upgrader')
    }else{
        var upgrader = Game.creeps['Upgrader'];
        if(upgrading && upgrader.store[RESOURCE_ENERGY] == 0) {
            upgrading = false;
            upgrader.say('🔄 harvest');
        }
        if(!upgrading && upgrader.store.getFreeCapacity() == 0) {
            upgrading = true;
            upgrader.say('⚡ upgrade');
        }

        if(upgrading) {
            if(upgrader.upgradeController(upgrader.room.controller) == ERR_NOT_IN_RANGE) {
                upgrader.moveTo(upgrader.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            var sources = upgrader.room.find(FIND_SOURCES);
            if(upgrader.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                upgrader.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
    
}
