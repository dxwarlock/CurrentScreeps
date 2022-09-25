module.exports = {
    run: function (creep) {
        //creep.say("📣");
        creep.signController(creep.room.controller, "Brought to you by DX!")
        if (creep.pos.getRangeTo(creep.room.controller) > 1) {
            DX.CreepMove(creep, creep.room.controller);
            DX.ShareEnergy(creep);
        }
        else creep.upgradeController(creep.room.controller);

    }
};