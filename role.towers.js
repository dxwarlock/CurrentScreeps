module.exports = {
    run: function (spawn) {
        var roomname = spawn.room.name;
        towers = spawn.room.find(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_TOWER } })
        _.forEach(towers, function (tower) {
            var woundedCreeps = tower.room.find(FIND_MY_CREEPS, { filter: (c) => c.hits < c.hitsMax });
            if (woundedCreeps.length > 0) {
                target = woundedCreeps[0];
                tower.heal(target);
            }
            else {
                var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                if (closestHostile) {
                    tower.attack(closestHostile);
                }
                else if (Memory.rooms[roomname].Repairables || Memory.rooms[roomname].Repairables != undefined) {
                    targets = Memory.rooms[roomname].Repairables;
                    target = targets[0];
                    if (target) {
                        target = Game.getObjectById(target.id);
                        tower.repair(target);
                    }
                }
            }
        })

    }
};