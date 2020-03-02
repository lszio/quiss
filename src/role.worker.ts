export default {
    "Harvester": (creep: Creep) => {
        if(!creep.memory.working){
            if(creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0){
                creep.getEnergy("Source")
            }else{
                creep.memory.working=true;
            }
        }else{
            if(!creep.target){
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
                if(targets.length == 0){
                    creep.taskRest()
                    return OK
                }
                creep.target = targets[0];
            }else{
                let result = creep.transfer(creep.target, RESOURCE_ENERGY)
                if( result == ERR_NOT_IN_RANGE){
                    creep.moveTo(creep.target)
                }else if( result == ERR_FULL){
                    creep.target=undefined
                }else if(creep.target.structureType != STRUCTURE_CONTAINER){
                    creep.target=undefined
                }
                if(creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0){
                    creep.memory.working = false
                    creep.say("Harvesting!")
                }
            }
        }
        return OK
    },
    "Charger": function(creep) {
        if(!creep.memory.working) {
            if(creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0){           
                creep.getEnergy("Container")
            }else{
                creep.memory.working=true;
                creep.say("Charging!")
            }
        }else{
            if(!creep.target){     
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
                    creep.taskRest()
                    return OK
                }
                creep.target = targets[0]
                creep.memory.working=true;
                creep.memory.timeToChange = 21 
            }else{
                let result = creep.transfer(creep.target, RESOURCE_ENERGY)
                if( result == ERR_NOT_IN_RANGE){
                    creep.moveTo(creep.target)
                }else if(result == ERR_FULL){
                    creep.target = undefined
                }else if(creep.memory.timeToChange-- < 0 || creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0){
                    creep.memory.working=false;
                }
            }
        }
        
    },
    "Builder": (creep) => {
        if(!creep.memory.working){
            creep.getEnergy("Storage")
            if(creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0){
                creep.memory.working = true
            }
        } else {
            if(!creep.target){
                creep.target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
                if(!creep.target){
                    creep.taskRest()
                    return OK
                }
                creep.say("Building!")
            }
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
                creep.say("Upgrading!")
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
            if(!creep.target){
                let targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (s) => { 
                        return s.hitsMax > s.hits
                    }
                })
                targets.sort((b,a) => {
                    return ((a.hitsMax - a.hits)/ a.hitsMax) - ((b.hitsMax - b.hits) / b.hitsMax)
                })
                if(targets.length == 0){
                    creep.taskRest()
                    return OK
                }
                creep.target = targets[0]
                creep.say("Reapiring!")
            }
            let result = creep.repair(creep.target)
            if(result == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.target, {visualizePathStyle: {stroke: '#ffffff'}});
            }else if(result == ERR_INVALID_TARGET || creep.target.hitsMax == creep.target.hits){
                creep.target = undefined;
            }
            if(creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0) {
                creep.memory.working = false
            }
        }
    }
}
