module.exports = {
    run(spawn) {
        var roomname = spawn.room.name;
        towers = spawn.room.find(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_TOWER } })
        var target;
        var firstList = [];
        var secondList = [];
        _.forEach(towers, function (tower) {
            var woundedCreeps = tower.room.find(FIND_MY_CREEPS, { filter: (c) => c.hits < c.hitsMax });
            if (woundedCreeps.length > 0) {
                target = woundedCreeps[0];
                tower.heal(target);
            }
            else {
                var ctarget = tower.room.find(FIND_HOSTILE_CREEPS);
                if (ctarget.length != 0) {
                    for (var i in ctarget) {
                        if (ctarget[i].getActiveBodyparts(HEAL) != 0) firstList.push(ctarget[i]);
                        else secondList.push(ctarget[i]);
                    }
                    if (firstList.length != 0) target = tower.pos.findClosestByRange(firstList);
                    else if (secondList.length != 0) target = tower.pos.findClosestByRange(secondList);
                    tower.attack(target);
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