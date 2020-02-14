export default {
    harvester: {
        work: (creep) => {
            if(creep.store.getFreeCapacity() > 0){
                if(creep.harvest(creep.source) == ERR_NOT_IN_RANGE){
                    creep.moveTo(creep.source);
                }
            }else{
                if(creep.transfer(creep.target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(creep.target);
                }
            }
            return OK
        }
    }
}