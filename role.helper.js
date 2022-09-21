module.exports = {
    run: function (creep) {
        //creep.say("📣");
        DX.SetHarv(creep);
        if (creep.memory.harv == 1) DX.getEnergy(creep);
        else DX.GiveEnergy(creep);

    }
};
