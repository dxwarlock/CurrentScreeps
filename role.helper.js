module.exports = {
    run(creep) {
        DX.SetHarv(creep);
        if (creep.memory.harv == 1) DX.getEnergy(creep);
        else {
            DX.GiveEnergy(creep);
        }
    }
};
