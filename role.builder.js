module.exports = {
    run: function (creep) {
        //creep.say("📣");
        var roomname = creep.room.name + "-Builders";
        var repairs;
        if (Game.time % 2 == 0) {
            repairs = DX.FindRepairs(creep);
            if (repairs != undefined) creep.room.memory.Repairables = repairs;
        }
        var toBuild = creep.room.find(FIND_CONSTRUCTION_SITES);
        //###################################
        if (creep.room.memory.Repairables.length != 0) {
            creep.memory.repairing = true;
            creep.memory.toRepair = creep.room.memory.Repairables[0];
        }
        else creep.memory.repairing = false;
        //###################################
        if (creep.memory.repairing == true) {
            target = creep.memory.toRepair;
            if (target.hits < target.hitsMax) {
                DX.CreepMark(creep, target, "#ff00ff");
                target = Game.getObjectById(target.id);
                creep.say('R')
                if (creep.repair(target) == ERR_NOT_IN_RANGE || creep.repair(target) == ERR_NOT_ENOUGH_RESOURCES) DX.CreepMove(creep, target)
            }
            else {
                creep.memory.repairing = false;
            }
        }
        else if (toBuild.length != 0) {
            {
                target = creep.pos.findClosestByRange(toBuild);
                if (creep.build(target) == ERR_NOT_IN_RANGE || creep.build(target) == ERR_NOT_ENOUGH_RESOURCES) DX.CreepMove(creep, target)
            }
        }

        else DX.CreepMove(creep, Game.flags[roomname]);
    }
};