module.exports = {
    run: function (creep) {
        //creep.say("📣");
        creep.moveTo(Game.flags.Claim);
        if (creep.room != Game.flags.Claim.room) creep.moveTo(Game.flags.Claim);
        else if (creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) DX.CreepMove(creep, creep.room.controller);
        else {
            var toBuild = creep.room.find(FIND_CONSTRUCTION_SITES);
            DX.SetHarv(creep);
            if (creep.memory.harv == 1) {
                var target = creep.pos.findClosestByRange(FIND_SOURCES);
                if (!creep.pos.inRangeTo(target, 1)) DX.CreepMove(creep, target);
                else creep.harvest(target);
            }
            else if (!creep.memory.harv == 1) {
                if (toBuild.length != 0) {
                    {
                        target = creep.pos.findClosestByRange(toBuild);
                        if (creep.build(target) == ERR_NOT_IN_RANGE) DX.CreepMove(creep, target)
                    }
                }
            }
        }
    }
};