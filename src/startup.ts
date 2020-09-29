export default function (): void {
  // role Upgrader
  if (!Game.creeps.Upgrader && !Game.spawns.Lily.spawning) {
    console.log("Spawning Upgrader...");
    Game.spawns.Lily.spawnCreep([WORK, CARRY, MOVE], "Upgrader");
  }
  const upgrader = Game.creeps.Upgrader;
  if (!upgrader.memory.status) {
    upgrader.memory.status = "charge";
  }
  if (upgrader.memory.status === "charge") {
    const source = upgrader.room.find(FIND_SOURCES)[0];
    if (upgrader.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
      if (upgrader.harvest(source) === ERR_NOT_IN_RANGE) {
        upgrader.moveTo(source);
      }
    } else {
      upgrader.memory.status = "work";
    }
  } else {
    // const controller = Game.spawns.Lily.room.find(FIND_MY_STRUCTURES, {
    //   filter: { structureType: STRUCTURE_CONTROLLER }
    // })[0];
    const controller = upgrader.room.controller;
    const result = upgrader.upgradeController(controller);
    if (result === ERR_NOT_IN_RANGE) {
      upgrader.moveTo(controller);
    } else if (result === ERR_NOT_ENOUGH_ENERGY) {
      upgrader.memory.status = "charge";
      console.log("Harvest");
    }
  }
}
