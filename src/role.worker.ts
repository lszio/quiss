export default {
    harvester: (creep: Creep) => {
        if(!creep.memory.working){
            let targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_CONTAINER ||
                        (
                            (
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_EXTENSION 
                            ) &&
                            structure.room.controller.level <= 2
                        ) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0 
                }
            });
            creep.target = targets[0];
            creep.memory.working=true;
        }else{
            if(creep.store.getFreeCapacity() > 0){
                if(creep.harvest(creep.room.sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }else{
                let result = creep.transfer(creep.target, RESOURCE_ENERGY)
                if( result == ERR_NOT_IN_RANGE){
                    creep.moveTo(creep.target)
                }else if( result == ERR_FULL){
                    creep.memory.working=false
                }
            }
        }
        return OK
    },
    charger: function(creep) {
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
            creep.source = creep.target.pos.findClosestByRange(FIND_STRUCTURES,{
                    filter: (s) => {
                        return s.structureType == STRUCTURE_CONTAINER
                    }
                })
        }else{
            if(creep.store.getFreeCapacity() > 0){
                if(creep.withdraw(creep.source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.source, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }else{
                let result = creep.transfer(creep.target, RESOURCE_ENERGY)
                if( result == ERR_NOT_IN_RANGE){
                    creep.moveTo(creep.target)
                }else if( result == ERR_FULL){
                    creep.memory.working=false;
                }
            }
        }
        
    },
    builder: (creep) => {
        return OK
    }
}
