import extendRoom from './extend.room'
import extendCreep from './extend.creep'

export default function(): void {
    if (!global.Extended) {
        console.log('[extend] 挂载拓展')
        global.Extended = true

        extendRoom()
        extendCreep()
    }
}