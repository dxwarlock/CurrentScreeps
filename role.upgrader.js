module.exports = {
    run: function (creep) {
        creep.signController(creep.room.controller, "Brought to you by DX!")
        if (creep.pos.getRangeTo(creep.room.controller) > 1) {
            DX.CreepMove(creep, creep.room.controller);
        }
        else {
            creep.upgradeController(creep.room.controller);
            DX.ShareEnergy(creep);
        }
    }
};