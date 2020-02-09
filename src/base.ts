
export default function() {
    let sources = Game.spawns['Spawn1'].room.find(FIND_SOURCES);
    if(!Game.creeps['Harvester']) {
        Game.spawns['Spawn1'].spawnCreep([MOVE,WORK,CARRY],'Harvester')
    }else{
        let harvester = Game.creeps['Harvester']
        if(harvester.store.getFreeCapacity() > 0) {
            if(harvester.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                harvester.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            let targets = harvester.room.find(FIND_STRUCTURES, {
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
    let upgrading = false;
    if(!Game.creeps['Upgrader']){
        Game.spawns['Spawn1'].spawnCreep([MOVE,WORK,CARRY],'Upgrader')
    }else{
        let upgrader = Game.creeps['Upgrader'];
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
            if(upgrader.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                upgrader.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
    let building = false;
    if(!Game.creeps['Builder']) {
        Game.spawns['Spawn1'].spawnCreep([MOVE,WORK,CARRY],'Builder')
    }else{
        let builder = Game.creeps['Builder'];
        if(building && builder.store[RESOURCE_ENERGY] == 0) {
            building = false;
            builder.say('🔄 harvest');
        }
        if(!building && builder.store.getFreeCapacity() == 0) {
            building = true;
            builder.say('⚡ build');
        }

        if(building) {
            let sites = builder.room.find(FIND_CONSTRUCTION_SITES);
            if(builder.build(sites[0]) == ERR_NOT_IN_RANGE) {
                builder.moveTo(sites[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            if(builder.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                builder.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
    let repairing = false;
    if(!Game.creeps['Repairer']) {
        Game.spawns['Spawn1'].spawnCreep([MOVE,WORK,CARRY],'Repairer')
    }else{
        let repairer = Game.creeps['Repairer'];
        if(repairing && repairer.store[RESOURCE_ENERGY] == 0) {
            repairing = false;
            repairer.say('🔄 harvest');
        }
        if(!repairing && repairer.store.getFreeCapacity() == 0) {
            repairing = true;
            repairer.say('⚡ repair');
        }

        if(repairing) {
            let targets = repairer.room.find(FIND_STRUCTURES, {
                filter : (structure) => {
                    return (structure.hitsMax - structure.hits) / structure.hitsMax < 0.9
                }
            });
            if(repairer.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                repairer.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            if(repairer.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                repairer.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
}
