module.exports = {
    run: function (creep) {
        var roomname = creep.room.name + "-Builders";
        var toBuild = creep.room.find(FIND_CONSTRUCTION_SITES);
        //###################################
        if (creep.room.memory.Repairables.length != 0) {
            creep.memory.repairing = true;
            creep.memory.toRepair = creep.room.memory.Repairables[0];
        }
        else creep.memory.repairing = false;
        //###################################
        if (creep.memory.repairing == true) {
            creep.say('👷')
            target = creep.memory.toRepair;
            if (target.hits < target.hitsMax) {
                DX.CreepMark(creep, target, "#ff00ff", "REPAIR");
                target = Game.getObjectById(target.id);
                if (creep.repair(target) == ERR_NOT_IN_RANGE) DX.CreepMove(creep, target);
            }
            else creep.memory.repairing = false;
        }
        else if (toBuild.length != 0) {
            //creep.say('🏗️')
            targets = _.sortBy(toBuild, s => s.progressTotal);
            target = targets[0];
            if (target != undefined) {
                DX.CreepMark(creep, target, "#ff00ff", "BUILD " + target.progress + "/" + target.progressTotal);
                if (creep.build(target) == ERR_NOT_IN_RANGE) DX.CreepMove(creep, target);
                DX.ShareEnergy(creep);
            }
        }
        else {
            DX.CreepMove(creep, Game.flags[roomname]);
        }
    }
};