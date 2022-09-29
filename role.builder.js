module.exports = {
    run: function (creep) {
        var roomname = creep.room.name + "-Builders";

        if (creep.room.memory.Repairables.length != 0) {
            creep.memory.repairing = true;
            creep.memory.toRepair = creep.pos.findClosestByRange(creep.room.memory.Repairables);
        }
        else creep.memory.repairing = false;
        //###################################
        if (creep.memory.repairing == true) {
            target = creep.memory.toRepair;
            if (target.hits < target.hitsMax) {
                DX.CreepMark(creep, target, "#ff00ff", "REPAIR");
                target = Game.getObjectById(target.id);
                if (creep.repair(target) == (ERR_NOT_IN_RANGE || ERR_NOT_ENOUGH_RESOURCES)) DX.CreepMove(creep, target);
            }
            else creep.memory.repairing = false;
        }
        else if (creep.room.memory.ToBuild.length != 0) {
            targets = creep.room.memory.ToBuild
            target = targets[0];
            if (target != undefined) {
                DX.CreepMark(creep, target, "#ff00ff", "BUILD " + target.progress + "/" + target.progressTotal);
                if (creep.pos.getRangeTo(target) > 3) DX.CreepMove(creep, target);
                else {
                    creep.build(target);
                    DX.ShareEnergy(creep);
                }
            }
        }
        else {
            DX.CreepMove(creep, Game.flags[roomname]);
        }
    }
};
