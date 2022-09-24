module.exports = {
    run: function (creep) {
        const target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (target) {
            if (creep.attack(target) == ERR_NOT_IN_RANGE) {
                DX.CreepMove(creep, target);
            }
        }
        else {
            var flag1 = Game.flags.Defend1;
            var flag2 = Game.flags.Defend2;
            if (!creep.memory.flag) creep.memory.flag = flag1
            if (creep.pos.inRangeTo(creep.memory.flag.pos.x, creep.memory.flag.pos.y, 1)) creep.memory.flag = flag2;
            if (creep.pos.inRangeTo(creep.memory.flag.pos.x, creep.memory.flag.pos.y, 1)) creep.memory.flag = flag1;
            DX.CreepMove(creep, new RoomPosition(creep.memory.flag.pos.x, creep.memory.flag.pos.y, creep.memory.flag.room.name));
        }
    }
};