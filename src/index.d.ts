declare module NodeJS {
    interface Global {
        hasExtension: boolean
    }
}

interface RoomMemory {
    sourceIds: string[],
    mineralId: string
}

interface CreepMemory {
    working: boolean
}