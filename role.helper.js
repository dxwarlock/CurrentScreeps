module.exports = {
    run: function (creep) {
        DX.SetHarv(creep);
        if (creep.memory.harv == 1 && creep.room.memory.isSpawning == "NOTHING") DX.getEnergy(creep);
        if(creep.room.memory.isSpawning != "NOTHING") {
            creep.say("W");
            return;
        }
        else DX.GiveEnergy(creep);

    }
};
