export const roomConfig = {
    status: {
        developing: true,
        attacking: false,
        defencing: false,
        inited: false,
        logging: true
    },
    signal: {
        scanTasks: 21,
        scanStaff: 42,
        scanStructures: 63
    },
    taskPriority: {
        Harvester: {
            "container": 1,
            "spawn": 2,
            "extension": 2,
            "tower": 3
        },
        Transfer: {
            "spawn": 1,
            "extension": 1,
            "tower": 2,
            "storage": 9
        }
    }
}

export const defaultBody = {
    1: [ WORK, CARRY, MOVE ], 
    2: [ WORK, CARRY, MOVE, WORK, CARRY, MOVE ], 
    3: [ WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE ], 
    4: [ WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE ], 
    5: [ WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE ], 
    6: [ WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE ], 
    7: [ WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE ], 
    8: [ WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE ]
}

export const creepConfig = {
    status: {
        working: false,
        active: true
    },
    bodyConfig: {
        Harvester: {
            ...defaultBody
        },
        Transfer: {
            ...defaultBody
        },
        Builder: {
            ...defaultBody
        },
        Repairer: {
            ...defaultBody
        },
        Upgrader: {
            ...defaultBody
        }
    }
}
