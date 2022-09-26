module.exports = {
    run: function (creep) {
        var roomname = creep.memory.room + "-Guard";
        const ctarget = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        const starget = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES);
        if (Game.flags.Attack) {
            if (creep.room != Game.flags.Attack.room) DX.CreepMove(creep, Game.flags.Attack);
        }
        else if (ctarget != null) {
            if (creep.attack(ctarget) == ERR_NOT_IN_RANGE) {
                creep.rangedAttack(ctarget);
                DX.CreepMove(creep, ctarget);
            }
        }
        else if (starget != null) {
            if (creep.attack(starget) == ERR_NOT_IN_RANGE) {
                creep.rangedAttack(starget);
                DX.CreepMove(creep, starget);
            }
        }
        else if (Game.flags[roomname]) DX.CreepMove(creep, Game.flags[roomname]);
    }
};