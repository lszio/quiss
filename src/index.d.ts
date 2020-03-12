declare module NodeJS {
    interface Global {
        extended: boolean
    }
}

// Room interface
interface Room {
    sources: Source[]
    spawns: StructureSpawn[]
    status: RoomStatus
    staff: RoomStaff
    tasks: RoomTask
    signal: RoomSignal
    newTask(role: string, id: string, priority?: number): string | void
    getTask(role: string): Structure
    doWork(): string | number
}

interface RoomMemory {
    sourceIds: string[]
    spawnIds: string[]
    storage: string
    status: RoomStatus
    signal: RoomSignal
    staff: RoomStaff
    tasks: RoomTask
}

interface RoomStatus {
    developing: boolean
    defencing: boolean
    attacking: boolean
    inited: boolean
}

interface RoomSignal {
    scanTasks: number
    scanStaff: number
    scanStructure: number
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
    sourceId: string
    targetId: string
}

interface CreepStatus {
    working: boolean
    active: boolean
    spawning: boolean
}

// Spawn interface
interface Spawn {
    tasks: SpawnTask[]
}

interface SpawnMemory {
    tasks: SpawnTask[]
    newTask(role:string, name?:string, memory?:object)
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