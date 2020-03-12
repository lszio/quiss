import extendRoom from './extend.room'
// import extendCreep from './extend.creep'
// import extendSpawn from './extend.spawn'
// import extendStructure from './extend.structure'

export default function(): void {
    if (!global.extended) {
        global.extended = true
        extendRoom()
        // extendCreep()
        // extendSpawn()
        // extendStructure()
    }
}
