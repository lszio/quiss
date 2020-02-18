import base from './base'
import extend from './extend'
import { doWork } from './utils'

module.exports.loop = function(): void {
    extend()
    base()
    doWork(Game.rooms)
    doWork(Game.spawns)
    // doWork(Game.creeps)
    doWork(Game.structures)
}