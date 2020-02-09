export default function() {
    _.assign(Creep.prototype,CreepExtension.prototype)
}

class CreepExtension extends Creep {
    private _working: boolean;
    private _role: string;

    public workingGetter() {
        if(!this._working){
            if (!this.memory.working){
                this.memory.working = false;
            }
            this._working = this.memory.working
        }
        return this._working
    }

    public work() {

    }
}