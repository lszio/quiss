declare module NodeJS {
    interface Global {
        Extended: boolean
    }
}
// Room interface
interface Room {
    sources: Source[],
    tower: StructureTower,
    factory: StructureFactory,
    spawn: StructureSpawn,
    staff: RoomStaff,
    tasks: RoomTask,
    demand: RoomDemand,
    signal: RoomSignal,
    newTask(role: string, id: string, priority?: number),
    getTask(role: string)
}

interface RoomMemory {
    inited: boolean,
    tasks: RoomTask,
    staff: RoomStaff,
    ticketToCheck: number,
    status: RoomStatus,
    spawnId: string,
    demand: RoomDemand,
    signal: RoomSignal
}

interface RoomStatus {
    developing: boolean,
    building: boolean,
    upgrading: boolean,
    attacking: boolean,
    defending: boolean
}

interface RoomSignal {
    scanTasks: number,
    check: number
}

interface RoomDemand {
    [roleType: string]: number
}

interface RoomTask {
    [taskType: string]: RoomTaskItem[],
}

interface RoomTaskItem {
    id: string,
    priority?: number
}

interface RoomStaff {
    [role:string]: number
}
// Creep interface

interface Creep {
    role: string
    source: Source | Structure
    target: Structure
    charge(target: Structure)
    getEnergy(prefer: string)
    work()
    taskRest()
}

interface CreepMemory {
    role?: string
    charging?: boolean
    working?: boolean
    sourceId?: string
    targetId?: string
    value?: number
    active?: boolean
    timeToChange?: number
}
interface RoleConfig {
    work?: (creep: Creep) => any
    body?: BodyConfig
}

interface BodyConfig {
    [MOVE]?: number
    [CARRY]?: number
    [ATTACK]?: number
    [RANGED_ATTACK]?: number
    [WORK]?: number
    [CLAIM]?: number
    [TOUGH]?: number
    [HEAL]?: number
}

// Spawn interface
interface StructureSpawn {
    tasks: SpawnTask[]
    work()
    newTask(role:string, name?:string, memory?:object)
}

interface SpawnTask {
    name: string
    level: number
    memory: CreepMemory
}

interface SpawnMemory {
    tasks: SpawnTask[]
}

interface SpawnOptions {
}

interface Mode {
    develop: boolean
    defence: boolean
    attack: boolean
}

// Memory
interface Memory {
    mode: Mode,
    structures: Object,
    brain: Object
    inited: boolean
}

// Structure
interface Structure {
    workers: number,
    store?: any
    _work()
    check()
    work()
}

interface StructureMemory {
    workers: number,
    tag: string
}
