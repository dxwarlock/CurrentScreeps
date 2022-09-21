module.exports = {
	run: function (creep) {
		//creep.say("📣");
		DX.SetHarv(creep);
		DX.pickupEnergy(creep);
	}
};