
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
                        return (structure.structureType == STRUCTURE_SPAWN || 
                                structure.structureType == STRUCTURE_CONTAINER || 
                                structure.structureType == STRUCTURE_EXTENSION || 
                                structure.structureType == STRUCTURE_TOWER ||
                                structure.structureType == STRUCTURE_STORAGE ) &&
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

    if(!Game.creeps['Upgrader']){
        Game.spawns['Spawn1'].spawnCreep([MOVE,WORK,CARRY],'Upgrader')
    }else{
        let upgrader = Game.creeps['Upgrader'];
        if (!upgrader.memory.working) {
            upgrader.memory.working = false;
        }
        if(upgrader.memory.working && upgrader.store[RESOURCE_ENERGY] == 0) {
            upgrader.memory.working = false;
            upgrader.say('🔄 harvest');
        }
        if(!upgrader.memory.working && upgrader.store.getFreeCapacity() == 0) {
            upgrader.memory.working = true;
            upgrader.say('⚡ upgrade');
        }

        if(upgrader.memory.working) {
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
    if(!Game.creeps['Builder']) {
        Game.spawns['Spawn1'].spawnCreep([MOVE,WORK,CARRY],'Builder')
    }else{
        let builder = Game.creeps['Builder'];
        if(!builder.memory.working){
            builder.memory.working = false;
        }
        if(builder.memory.working && builder.store[RESOURCE_ENERGY] == 0) {
            builder.memory.working = false;
            builder.say('🔄 harvest');
        }
        if(!builder.memory.working && builder.store.getFreeCapacity() == 0) {
            builder.memory.working = true;
            builder.say('⚡ build');
        }

        if(builder.memory.working) {
            let sites = builder.room.find(FIND_CONSTRUCTION_SITES);
            if(builder.build(sites[0]) == ERR_NOT_IN_RANGE) {
                builder.moveTo(sites[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            // if(builder.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
            //     builder.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            // }
            builder.charge(builder.room.storage)
        }
    }
    if(!Game.creeps['Repairer']) {
        Game.spawns['Spawn1'].spawnCreep([MOVE,WORK,CARRY],'Repairer')
    }else{
        let repairer = Game.creeps['Repairer'];
        if(!repairer.memory.working){
            repairer.memory.working = false;
        }
        if(repairer.memory.working && repairer.store[RESOURCE_ENERGY] == 0) {
            repairer.memory.working = false;
            repairer.say('🔄 harvest');
        }
        if(!repairer.memory.working && repairer.store.getFreeCapacity() == 0) {
            repairer.memory.working = true;
            repairer.say('⚡ repair');
        }

        if(repairer.memory.working) {
            let targets = repairer.room.find(FIND_STRUCTURES, {
                filter : (structure) => {
                    return (structure.hitsMax - structure.hits) / structure.hitsMax < 0.99 // && structure.structureType != STRUCTURE_ROAD
                }
            });
            targets.sort((b,a) => {
                return ((a.hitsMax - a.hits)/ a.hitsMax) - ((b.hitsMax - b.hits) / b.hitsMax)
            })
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
