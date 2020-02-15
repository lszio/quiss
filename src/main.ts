import base from './base'
import extend from './extend'
import test from './test'
import { doWork } from './utils'

module.exports.loop = function(): void {
    extend()
    base()
    test()
    doWork(Game.spawns)
    doWork(Game.creeps)
}

