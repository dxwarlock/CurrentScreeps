module.exports = {
    run: function () {
        towers = Game.spawns.Spawn1.room.find(FIND_MY_STRUCTURES, {
            filter: { structureType: STRUCTURE_TOWER }
        })
        _.forEach(towers, function (tower) {
            var woundedCreeps = _.filter(tower.room.find(FIND_CREEPS), (c) => c.hits < c.hitsMax);
            if (woundedCreeps > 0) target = woundedCreeps[0];
            else if (woundedCreeps == 0) {
                var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                if (closestHostile) tower.attack(closestHostile);
                else {
                    var closestDamagedStructure = tower.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                        filter: (structure) => structure.hits < structure.hitsMax
                    });
                    if (closestDamagedStructure) tower.repair(closestDamagedStructure);
                }
            }
        })
    }
};