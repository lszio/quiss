import mount from './mount'
import base from './base'

module.exports.loop = function(): void {
    mount()
    base()
}

