export default {
    "Harvester": (creep: Creep) => {
        if(!creep.memory.working){
            let targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (   
                            structure.structureType == STRUCTURE_CONTAINER || 
                            structure.structureType == STRUCTURE_SPAWN ||
                            structure.structureType == STRUCTURE_EXTENSION
                        ) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0 
                }
            });
            if(targets.length > 0){
                creep.target = targets[0];
                creep.memory.working=true;
            }
        }else{
            if(creep.store.getFreeCapacity() > 0){
                creep.getEnergy("Source")
            }else{
                let result = creep.transfer(creep.target, RESOURCE_ENERGY)
                if( result == ERR_NOT_IN_RANGE){
                    creep.moveTo(creep.target)
                }else if( result == ERR_FULL){
                    creep.memory.working=false
                }
                if(creep.target.structureType != STRUCTURE_CONTAINER){
                    creep.memory.working = false
                }
            }
        }
        return OK
    },
    "Charger": function(creep) {
        if(!creep.memory.working) {
            let targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_TOWER ||
                            structure.structureType == STRUCTURE_SPAWN ||
                            structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_STORAGE
                        ) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0 
                }
            });
            if(targets.length == 0) {
                return
            }
            creep.target = targets[0]
            creep.memory.working=true;
            creep.memory.timeToChange = 21
        }else{
            if(creep.store.getFreeCapacity() > 0){           
                creep.getEnergy("Container")
            }else{
                let result = creep.transfer(creep.target, RESOURCE_ENERGY)
                if( result == ERR_NOT_IN_RANGE){
                    creep.moveTo(creep.target)
                }else if(creep.memory.timeToChange-- == 0 || result == ERR_FULL){
                    creep.memory.working=false;
                }
            }
        }
        
    },
    "Builder": (creep) => {
        if(!creep.memory.working){
            creep.getEnergy()
            if(creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0){
                creep.target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
                creep.memory.working = true
            }
        } else {
            const result = creep.build(creep.target)
            if(result == ERR_NOT_IN_RANGE){
                creep.moveTo(creep.target)
            }else if(result == ERR_NOT_ENOUGH_ENERGY || result == ERR_INVALID_TARGET){
                creep.memory.working = false
            }
        }
    },
    "Upgrader": (creep) => {
        if(!creep.memory.working) {
            creep.getEnergy("Storage")
            if(creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0 ){
                creep.memory.working = true
            }
        }else{
            let result = creep.upgradeController(creep.room.controller)
            if(result == ERR_NOT_IN_RANGE){
                creep.moveTo(creep.room.controller)
            }else if(result == ERR_NOT_ENOUGH_ENERGY){
                creep.memory.working = false
            }
        }
    },
    "Repairer": (creep) => {
        if(!creep.memory.working){
            creep.getEnergy("Storage")
            if(creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0){
                creep.memory.working = true
            }
        }else{
            let targets = creep.room.find(FIND_STRUCTURES, {
                filter: (s) => { 
                    return s.hitsMax > s.hits
                }
            })
            targets.sort((b,a) => {
                return ((a.hitsMax - a.hits)/ a.hitsMax) - ((b.hitsMax - b.hits) / b.hitsMax)
            })
            if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
    }
}
