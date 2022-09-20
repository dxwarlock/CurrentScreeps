module.exports = {
    run: function (creep) {
        var source = Game.getObjectById(creep.memory.source);
        if (source == null) {
            var source = DX.getOpenSource(creep);
            if (!source) return;
            DX.setSourceToMine(source, creep);
        }
        if (Memory.sources[source.id] == undefined) Memory.sources[source.id] = {id: source.id};
        Memory.sources[source.id].miner = creep.id;
        if (!creep.pos.inRangeTo(source, 1)) DX.CreepMove(creep, source);
        else creep.harvest(source);
        if (creep.store.getFreeCapacity() == 0) {
            const roomContainers = creep.room.find(FIND_STRUCTURES, { filter: (i) => i.structureType == STRUCTURE_CONTAINER });
            if (roomContainers) {
                target = creep.pos.findClosestByRange(roomContainers);
                if (target && creep.pos.inRangeTo(target, 3)) {
                    creep.transfer(target, RESOURCE_ENERGY)
                    if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) DX.CreepMove(creep, target);
                }
            }
            else creep.drop(RESOURCE_ENERGY);
        }
    }
};
