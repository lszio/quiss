import extend from "./extend"

module.exports.loop = function() {
    extend()
    for(const roomName in Game.rooms){
        if(Game.rooms[roomName].doWork() != OK){
            console.log("Error")
        }
    }
}