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

// Creep interface
interface CreepStatus {
    unborn: boolean
    working: boolean
    workless: boolean
}

interface Creep {
    working: boolean
    source: Source
    target: Structure
    charge(target: Structure)
    doWork()
}

interface CreepMemory {
    working: boolean
    sourceId: string
    targetId: string
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

interface StaffConfig {
    
}

// Spawn interface
interface spawnTask {
    name: string
    role: string
}

interface SpawnMemory {
    tasks: spawnTask[]
}