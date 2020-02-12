export default function() {
    _.assign(Creep.prototype,CreepExtension)
}

class CreepExtension extends Creep {
    private _working: boolean;
    private _role: string;

    public work() {

    }
    public charge() {
        
    }
}