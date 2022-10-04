module.exports = {
    run(spawn) {
        return;
        var link = spawn.room.find(FIND_STRUCTURES, { filter: (i) => i.structureType == STRUCTURE_TERMINAL });
        if (link.length != 0) {
            for (var i in link) {
                var term = link[i]
                Memory.terminals[term] = link[i].id;
            }
            var terms = Memory.terminals;
            var totalTerms = [];
            for (var i in terms) {
                target = Game.getObjectById(terms[i]);
                totalTerms.push(target);
            }
            target = _.sortBy(totalTerms, s => s.store[RESOURCE_ENERGY]);

            for (var i in target) {
                var targetRoomTerm = target[0];
                var thisRoomTerm = target[i];
                if (spawn.room.name == thisRoomTerm.room.name) {
                    var roomStorage = thisRoomTerm.room.find(FIND_MY_STRUCTURES, { filter: (i) => i.structureType == STRUCTURE_STORAGE && i.store[RESOURCE_ENERGY] > 50000 });
                    if (roomStorage.length != 0 && thisRoomTerm.store.energy > 1000 && thisRoomTerm.room.name != targetRoomTerm.room.name && targetRoomTerm.room.energyAvailable < targetRoomTerm.room.energyCapacityAvailable) {
                        if (thisRoomTerm.cooldown == 0) {
                            thisRoomTerm.send(RESOURCE_ENERGY, 500, targetRoomTerm.room.name);
                            //console.log(thisRoomTerm.room.name + ' -> ' + targetRoomTerm.room.name + ' ' + targetRoomTerm.room.energyAvailable + '/' + targetRoomTerm.room.energyCapacityAvailable)
                            //console.log('-------------------')
                        }
                    }
                }
            }

        }
    }
}
