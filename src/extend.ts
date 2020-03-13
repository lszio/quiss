import extendRoom from './extend.room'
import extendCreep from './extend.creep'
import extendStructure from './extend.structure'

export default function(): void {
    if (!global.extended) {
        global.extended = true
        console.log("[Global]: Load extensions")
        extendRoom()
        extendCreep()
        extendStructure()
    }
}
