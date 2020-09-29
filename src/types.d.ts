// example declaration file - remove these and add your own custom typings

// memory extension samples
interface CreepMemory {
  role: string;
  room: string;
  working: boolean;
  status: string;
}

// `global` extension samples
declare namespace NodeJS {
  interface Global {
    log: any;
  }
}
