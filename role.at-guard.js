module.exports = {
    run(creep) {
        const ctarget = creep.room.find(FIND_HOSTILE_CREEPS);
        const starget = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES);
        const towers = creep.room.find(FIND_HOSTILE_STRUCTURES, { filter: (i) => i.structureType == STRUCTURE_TOWER });
        var firstList = [];
        var secondList = [];
        var target;
        if (Game.flags.Attack && Game.flags.Stage && creep.room != Game.flags.Attack.room) DX.CreepMove(creep, Game.flags.Stage);
        else if (Game.flags.Attack && creep.room != Game.flags.Attack.room) DX.CreepMove(creep, Game.flags.Attack);
        else {
            if (towers.length) {
                target = creep.pos.findClosestByRange(towers);
                if (creep.rangedAttack(target) == ERR_NOT_IN_RANGE) DX.CreepMove(creep, target);
                creep.rangedAttack(target);
            }
            else if (ctarget.length != 0) {
                for (var i in ctarget) {
                    if (ctarget[i].getActiveBodyparts(HEAL) != 0) firstList.push(ctarget[i]);
                    else secondList.push(ctarget[i]);
                }
                if (firstList.length != 0) target = creep.pos.findClosestByRange(firstList);
                else if (secondList.length != 0) target = creep.pos.findClosestByRange(secondList);
                if (creep.attack(target) == ERR_NOT_IN_RANGE) DX.CreepMove(creep, target);
                creep.rangedAttack(target);
            }
            else if (starget != null) {
                if (creep.attack(starget) == ERR_NOT_IN_RANGE) DX.CreepMove(creep, starget);
                creep.rangedAttack(starget);
            }
            else if (!Game.flags.Attack && Game.flags[creep.memory.flag]) DX.CreepMove(creep, Game.flags[creep.memory.flag]);
        }
    }
};