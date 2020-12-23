export default function (): void {
  // role Upgrader
  let spawn = "Spawn1";
  for (let name in Game.spawns) {
    spawn = name;
  }
  if (!Game.creeps.Upgrader && !Game.spawns[spawn].spawning) {
    Game.spawns[spawn].spawnCreep([WORK, CARRY, MOVE], "Upgrader");
  }
  if (!Game.creeps.Builder && !Game.spawns[spawn].spawning) {
    Game.spawns[spawn].spawnCreep([WORK, CARRY, MOVE], "Builder");
  }
  if (!Game.creeps.Repairer && !Game.spawns[spawn].spawning) {
    Game.spawns[spawn].spawnCreep([WORK, CARRY, MOVE], "Repairer");
  }

  const source = Game.spawns[spawn].room.find(FIND_SOURCES)[0];
  const upgrader = Game.creeps.Upgrader;
  const repairer = Game.creeps.Builder;
  const builder = Game.creeps.Builder;
  const controller = upgrader.room.controller;
  const sites = Game.spawns[spawn].room.find(FIND_CONSTRUCTION_SITES);
  const structures = Game.spawns[spawn].room.find(FIND_STRUCTURES, {
    filter: structure => {
      return structure.hits < structure.hitsMax;
    }
  });

  const harvest = (creep: Creep, source: Source) => {
    if (creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
      if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
        creep.moveTo(source);
      }
    } else {
      creep.memory.status = "work";
    }
  };

  const upgrade = (creep: Creep, controller: StructureController) => {
    if (creep.memory.status === "work") {
      const result = creep.upgradeController(controller);
      if (result === ERR_NOT_IN_RANGE) {
        creep.moveTo(controller);
      } else if (result === ERR_NOT_ENOUGH_ENERGY) {
        creep.memory.status = "charge";
      }
    } else {
      harvest(creep, source);
    }
  };

  const build = (creep: Creep, site: ConstructionSite) => {
    if (creep.memory.status === "work") {
      const result = creep.build(site);
      if (result === ERR_NOT_IN_RANGE) {
        creep.moveTo(site);
      } else if (result === ERR_NOT_ENOUGH_ENERGY) {
        creep.memory.status = "charge";
      }
    } else {
      harvest(creep, source);
    }
  };

  const repair = (creep: Creep, structure: Structure) => {
    if (creep.memory.status === "work") {
      const result = creep.repair(structure);
      if (result === ERR_NOT_IN_RANGE) {
        creep.moveTo(structure);
      } else if (result === ERR_NOT_ENOUGH_ENERGY) {
        creep.memory.status = "charge";
      }
    } else {
      harvest(creep, source);
    }
  };

  if (controller) {
    upgrade(upgrader, controller);
  }
  if (sites.length > 0) {
    build(builder, sites[0]);
  } else if (controller) {
    upgrade(builder, controller);
  }
  if (structures.length > 0) {
    repair(repairer, structures[0]);
  } else if (controller) {
    upgrade(repairer, controller);
  }
}
