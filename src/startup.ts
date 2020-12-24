export default function (): void {
  const harvest = (creep: Creep, source: Source) => {
    if (creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
      if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
        creep.moveTo(source);
      }
    } else {
      creep.memory.status = "work";
    }
  };

  const store = (creep: Creep, structure: Structure, source: Source) => {
    if (creep.memory.status === "work") {
      const result = creep.transfer(structure, RESOURCE_ENERGY);
      if (result === ERR_NOT_IN_RANGE) {
      } else if (result === ERR_NOT_ENOUGH_ENERGY) {
        creep.memory.status = "charge";
      }
    } else {
      harvest(creep, source);
    }
  };

  const upgrade = (creep: Creep, controller: StructureController, source: Source) => {
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

  const build = (creep: Creep, site: ConstructionSite, source: Source) => {
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

  const repair = (creep: Creep, structure: Structure, source: Source) => {
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
  for (const name in Game.rooms) {
    const room = Game.rooms[name];
    const spawn = Game.spawns.Spawn1;
    const source = room.find(FIND_SOURCES)[0];
    const harvester = Game.creeps.Harvester;
    const upgrader = Game.creeps.Upgrader;
    const repairer = Game.creeps.Repairer;
    const builder = Game.creeps.Builder;
    const controller = room.controller;
    const sites = spawn.room.find(FIND_CONSTRUCTION_SITES);
    const structures = spawn.room.find(FIND_STRUCTURES, {
      filter: structure => {
        return structure.hits < structure.hitsMax;
      }
    });

    if (!Game.creeps.Harvester && !spawn.spawning) {
      spawn.spawnCreep([WORK, CARRY, MOVE], "Harvester");
    } else if (!Game.creeps.Upgrader && !spawn.spawning) {
      spawn.spawnCreep([WORK, CARRY, MOVE], "Upgrader");
    } else if (!Game.creeps.Builder && !spawn.spawning) {
      spawn.spawnCreep([WORK, CARRY, MOVE], "Builder");
    } else if (!Game.creeps.Repairer && !spawn.spawning) {
      spawn.spawnCreep([WORK, CARRY, MOVE], "Repairer");
    }

    if (spawn.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
      store(harvester, spawn, source);
    } else if (controller) {
      upgrade(harvester, controller, source);
    }

    if (controller) {
      upgrade(upgrader, controller, source);
    }

    if (sites.length > 0) {
      build(builder, sites[0], source);
    } else if (controller) {
      upgrade(builder, controller, source);
    }

    if (structures.length > 0) {
      repair(repairer, structures[0], source);
    } else if (controller) {
      upgrade(repairer, controller, source);
    }
  }
}
