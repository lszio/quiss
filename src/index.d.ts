declare module NodeJS {
    interface Global {
        Extended: boolean
    }
}
// Room interface
interface Room {
    sources: Source[],
    tower: StructureTower,
    factory: StructureFactory
}

interface RoomMemory {
    tasks: RoomTask,
    staff: RoomStaff,
}

interface RoomTask {
    [taskType: string]: string[],
}

interface RoomStaff {
    [role:string]:number
}
// Creep interface
interface CreepStatus {
    working: boolean
    workless: boolean
}

interface Creep {
    role: string
    source: Source
    target: Structure
    charge(target: Structure)
    work()
}

interface CreepMemory {
    role?: string
    charging?: boolean
    working?: boolean
    sourceId?: string
    targetId?: string
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
    work()
    newTask(role:string, name?:string, level?:number)
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
    mode: Mode
}

// Structure
interface Structure {
    workers: number
}

interface StructureMemory {
    workers: number
}