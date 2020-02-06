declare module NodeJS {
    interface Global {
        hasExtension: boolean
    }
}

interface RoomMemory {
    sourceIds: string[]
}