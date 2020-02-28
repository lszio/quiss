import base from './base'
import extend from './extend'
import { doWork } from './utils'

module.exports.loop = function(): void {
    // load extensions
    extend()
    // base creeps
    // base()
    // all units do it's work
    doWork(Game.rooms)
    doWork(Game.creeps)
    doWork(Game.structures)
}
