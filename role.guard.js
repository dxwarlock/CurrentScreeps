module.exports = {
    run(creep) {
        const ctarget = creep.room.find(FIND_HOSTILE_CREEPS);
        const starget = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES);
        var firstList = [];
        var secondList = [];
        var target;
        if (Game.flags.Stage) DX.CreepMove(creep, Game.flags.Stage);
        if (Game.flags.Attack) if (creep.room != Game.flags.Attack.room) DX.CreepMove(creep, Game.flags.Attack);

        var woundedCreeps = creep.room.find(FIND_MY_CREEPS, { filter: (c) => c.hits < c.hitsMax });
        if (woundedCreeps.length > 0) {
            target = _.sortBy(woundedCreeps, s => s.hits);
            target = woundedCreeps[0];
            creep.heal(target);
        }
        else if (ctarget.length != 0) {
            for (var i in ctarget) {
                if (ctarget[i].getActiveBodyparts(HEAL) != 0) firstList.push(ctarget[i]);
                else secondList.push(ctarget[i]);
            }
            if (firstList.length != 0) target = creep.pos.findClosestByRange(firstList);
            else if (secondList.length != 0) target = creep.pos.findClosestByRange(secondList);
            if (creep.attack(target) == ERR_NOT_IN_RANGE) {
                creep.rangedAttack(target);
                DX.CreepMove(creep, target);
            }
        }
        else if (starget != null) {
            if (creep.attack(starget) == ERR_NOT_IN_RANGE) {
                creep.rangedAttack(starget);
                DX.CreepMove(creep, starget);
            }
        }
        else if (Game.flags[creep.memory.flag]) DX.CreepMove(creep, Game.flags[creep.memory.flag]);
    }
};