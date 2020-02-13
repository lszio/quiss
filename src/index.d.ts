declare module NodeJS {
    interface Global {
        Extended: boolean
    }
}

interface Room {
    sources: Source[],
    tower: StructureTower,
    factory: StructureFactory
}

interface Creep {
    working: boolean
    source: Source
    charge(target: Structure)
}

interface CreepMemory {
    working: boolean
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