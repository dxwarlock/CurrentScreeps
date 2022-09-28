module.exports = {
    run: function (spawn) {
        var link = spawn.room.find(FIND_STRUCTURES, { filter: (i) => i.structureType == STRUCTURE_TERMINAL });
        
        for (var i in link) {
            if (spawn.name == 'Spawn1') {
                Memory.containers.recv = link[i];
            }
            else {
                target = Game.getObjectById(Memory.containers.recv.id);
                if(spawn.room.terminal.store[RESOURCE_ENERGY] > 3000) spawn.room.terminal.send(RESOURCE_ENERGY, 3000, target.room.name);
            }
        }


    }
}