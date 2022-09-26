module.exports = {
    run: function (creep) {
        var roomname = creep.room.name + "-Guard";
        const target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (Game.flags['Gather']) DX.CreepMove(creep, Game.flags['Gather']);
        else if (target) {
            if (creep.attack(target) == ERR_NOT_IN_RANGE) {
                creep.rangedAttack(target);
                DX.CreepMove(creep, target);
            }
        }
        else if (Game.flags[roomname]) DX.CreepMove(creep, Game.flags[roomname]);
    }
};