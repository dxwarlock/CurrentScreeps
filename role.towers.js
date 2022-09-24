module.exports = {
    run: function () {

        for (var name in Game.spawns) {
            var roomname = Game.spawns[name].room.name;
            towers = Game.spawns[name].room.find(FIND_MY_STRUCTURES, {
                filter: { structureType: STRUCTURE_TOWER }
            })
            _.forEach(towers, function (tower) {
                var woundedCreeps = _.filter(tower.room.find(FIND_CREEPS), (c) => c.hits < c.hitsMax);
                if (woundedCreeps > 0) {
                    target = woundedCreeps[0];
                    tower.heal(target);
                }
                else if (woundedCreeps == 0) {
                    var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                    if (closestHostile) tower.attack(closestHostile);
                    else if (Memory.rooms[roomname].Repairables || Memory.rooms[roomname].Repairables != undefined) {
                        targets = Memory.rooms[roomname].Repairables;
                        target = targets[Math.floor(Math.random() * targets.length)];
                        if (target) tower.repair(target);
                    }
                }
            })
        }
    }
};