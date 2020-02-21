import base from './base'
import extend from './extend'
import { doWork, init } from './utils'

module.exports.loop = function(): void {
    // load extensions
    extend()
    // base creeps
    base()
    init(Game.spawns["Spawn1"].room)
    // all units do work
    doWork(Game.rooms)
    doWork(Game.spawns)
    doWork(Game.creeps)
    doWork(Game.structures)
}
