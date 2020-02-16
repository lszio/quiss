export default {
    harvester: {
        work: (creep) => {
            if(!creep.target){
                if(!creep.room.memory.tasks || creep.room.memory.tasks["harvest"].length == 0){
                    return
                }
                creep.target = Game.getObjectById(creep.room.memory.tasks["harvest"].shift());
                // creep.target.workers = creep.target.workers + 1
            }else{
                if(creep.store.getFreeCapacity() > 0){
                    if(creep.harvest(creep.room.memory.sources[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.memory.sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                }else{
                    let status = creep.transfer(creep.target, RESOURCE_ENERGY)
                    if( status == ERR_NOT_IN_RANGE){
                        creep.moveTo(creep.target)
                    }else if( status == ERR_FULL){
                        // creep.target.workers = creep.target.workers - 1
                        creep.target = undefined;
                    }
                }
            }
            return OK
        }
    },
    charger: {
        work: function(creep) {
            if(creep.target == undefined) {
                if(creep.room.memory.tasks["charge"].length == 0){
                    return
                }
                creep.target = Game.getObjectById(creep.room.memory.tasks["charge"].shift());
                // creep.target.workers = creep.target.workers + 1
                creep.source = Game.getObjectById(creep.target.pos.findClosestByRange(FIND_STRUCTURES,{
                        filter: (s) => {
                            return s.structureType == STRUCTURE_CONTAINER
                        }
                    }))
            }else{
                if(creep.store.getFreeCapacity() > 0){
                    if(creep.withdraw(creep.source) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.source, {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                }else{
                    let status = creep.transfer(creep.target, RESOURCE_ENERGY)
                    if( status == ERR_NOT_IN_RANGE){
                        creep.moveTo(creep.target)
                    }else if( status == ERR_FULL){
                        // creep.target.workers = creep.target.workers - 1
                        creep.target = undefined;
                    }
                }
            }
        }
    },
    builder: {
        work: (creep) => {
            return OK
        }
    }
}