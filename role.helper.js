module.exports = {
    run: function (creep) {
        DX.SetHarv(creep);
        if (creep.memory.harv == 1) DX.getEnergy(creep);
        else DX.GiveEnergy(creep);
    }
};
