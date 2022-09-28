module.exports = {
	run: function (creep) {
		const target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
		if (target) {
			if (creep.attack(target) == ERR_NOT_IN_RANGE) {
				DX.CreepMove(creep, target);
			}
		}
		else {
			DX.SetHarv(creep);
			DX.pickupEnergy(creep);
		}
	}
};