module.exports = {
    run(creep) {
        //DX.CreepMove(creep, Game.flags[creep.memory.flag]);
        creep.signController(creep.room.controller, "Brought to you by DX!")
        const controlContainer = creep.room.find(FIND_STRUCTURES, { filter: (i) => i.structureType == STRUCTURE_CONTAINER && i.pos.inRangeTo(creep.room.controller, 3) });
        if (creep.store[RESOURCE_ENERGY] == 0 && controlContainer.length) {
            target = controlContainer[0];
            if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) DX.CreepMove(creep, target);
        }
        else {
            DX.ShareEnergy(creep);
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_ENOUGH_RESOURCES) DX.CreepMove(creep, Game.flags[creep.memory.flag]);
            else if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) DX.CreepMove(creep, creep.room.controller);
            else creep.upgradeController(creep.room.controller);


        }
    }
};