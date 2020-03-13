declare module NodeJS {
    interface Global {
        extended: boolean
    }
}

// Room interface
interface Room {
    sources: Source[]
    spawns: StructureSpawn[]
    structures: {
        [role: string]: Structure[]
    }
    status: RoomStatus
    staff: RoomStaff
    tasks: RoomTask
    signal: RoomSignal
    logs: string[]
    newTask(role: string, id: string, priority?: number): string | void
    getTask(role: string): Structure
    doWork(): string | number
    showLog(): void
    addLog(log:string): void
}

interface RoomMemory {
    sourceIds: string[]
    spawnIds: string[]
    structureIds: {
        [role: string]: string[]
    }
    storage: string
    status: RoomStatus
    signal: RoomSignal
    staff: RoomStaff
    tasks: RoomTask
    logs: string[]
}

interface RoomStatus {
    developing: boolean
    defencing: boolean
    attacking: boolean
    inited: boolean
    logging: boolean
}

interface RoomSignal {
    scanTasks: number
    scanStaff: number
    scanStructures: number
}

interface RoomStaff {
    [role: string]: string[]
}

interface RoomTask {
    [role: string]: string[]
}

// Creep interface
interface Creep {
    status: CreepStatus
    role: string
    source: Source | Structure
    target: Structure
    getEnergy(prefer?:string): string | number
    takeRest(): void
}

interface CreepMemory {
    status: CreepStatus
    role: string
    sourceId?: string
    targetId?: string
}

interface CreepStatus {
    working: boolean
    active: boolean
}

// Spawn interface
interface StructureSpawn {
    tasks: SpawnTask[]
    newTask(role:string, name?:string, memory?:object)
}

interface SpawnMemory {
    tasks: SpawnTask[]
}

interface SpawnTask {
    name: string
    level: number
    memory: CreepMemory
}
// Structure
interface Structure {
    store?: any
    doWork()
    check()
}

interface _ {
    mapValues(obj: object, callback)
}