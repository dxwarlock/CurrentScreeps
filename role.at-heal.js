module.exports = {
    run(creep) {
        var target;
        if (Game.flags.Attack && Game.flags.Stage && creep.room != Game.flags.Attack.room) DX.CreepMove(creep, Game.flags.Stage);
        else if (Game.flags.Attack && creep.room != Game.flags.Attack.room) DX.CreepMove(creep, Game.flags.Attack);
        else {
            var woundedCreeps = creep.room.find(FIND_MY_CREEPS, { filter: (c) => c.hits < c.hitsMax });
            if (woundedCreeps.length > 0) {
                target = creep.pos.findClosestByRange(woundedCreeps);
                DX.CreepMove(creep, target);
                creep.heal(target);
            }
            else if (!Game.flags.Attack && Game.flags[creep.memory.flag]) DX.CreepMove(creep, Game.flags[creep.memory.flag]);
        }
    }
};