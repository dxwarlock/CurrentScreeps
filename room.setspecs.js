module.exports = {
	setSpecs(spawn) {
		var roomName = spawn.room.name;
		Memory.rooms[roomName] = Memory.rooms[roomName] || {};
		Memory.rooms[roomName].creepSpecs = Memory.rooms[roomName].creepSpecs || {};
		Memory.rooms[roomName].name = roomName;
		var sourceCount = spawn.room.find(FIND_SOURCES);
		var PowerTotal = spawn.room.energyCapacityAvailable;
		Memory.rooms[roomName].power = PowerTotal;
		var sourecount = sourceCount.length;
		var level1 = 300, level2 = 550, level3 = 800, level4 = 1300, level5 = 1800, level6 = 2300, level7 = 5300, level8 = 12300;
		spawn.room.memory.minEnergy = Math.round(spawn.room.energyCapacityAvailable / 3);
		if (PowerTotal <= level1 && PowerTotal < level2) {
			//LEVEL 1
			spawn.room.memory.dropped = 1;
			spawn.room.memory.Population = { 'harvester': sourecount, 'carry': sourecount * 2, 'upgrader': sourecount, 'helper': sourecount, 'builder': sourecount, 'guard': 0, 'claim': 0 };
			spawn.room.memory.creepSpecs['harvester'] = [WORK, WORK, CARRY, MOVE];
			spawn.room.memory.creepSpecs['carry'] = [CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
			spawn.room.memory.creepSpecs['upgrader'] = [WORK, CARRY, MOVE];
			spawn.room.memory.creepSpecs['helper'] = [CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
			spawn.room.memory.creepSpecs['builder'] = [WORK, WORK, CARRY, MOVE];
			spawn.room.memory.creepSpecs['guard'] = [ATTACK, ATTACK, MOVE, MOVE, MOVE];
		}
		else if (PowerTotal >= level2 && PowerTotal < level3) {
			//LEVEL 2 550
			spawn.room.memory.dropped = 100;
			spawn.room.memory.Population = { 'harvester': sourecount, 'carry': sourecount * 2, 'upgrader': sourecount * 2, 'helper': sourecount, 'builder': sourecount + 1, 'guard': 0, 'claim': 0 };
			spawn.room.memory.creepSpecs['harvester'] = [WORK, WORK, WORK, WORK, CARRY, MOVE];
			spawn.room.memory.creepSpecs['carry'] = [CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE];
			spawn.room.memory.creepSpecs['upgrader'] = [WORK, WORK, WORK, CARRY, CARRY, MOVE];
			spawn.room.memory.creepSpecs['helper'] = [CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE];
			spawn.room.memory.creepSpecs['builder'] = [WORK, WORK, WORK, CARRY, MOVE, MOVE];
			spawn.room.memory.creepSpecs['guard'] = [MOVE, MOVE, MOVE, ATTACK, ATTACK];
		}
		else if (PowerTotal >= level3 && PowerTotal < level4) {
			//LEVEL 3 800
			spawn.room.memory.dropped = 100;
			spawn.room.memory.Population = { 'harvester': sourecount, 'carry': sourecount + 1, 'upgrader': sourecount * 2, 'helper': sourecount, 'builder': sourecount + 1, 'guard': 0, 'claim': 0 };
			spawn.room.memory.creepSpecs['harvester'] = [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE];
			spawn.room.memory.creepSpecs['carry'] = [CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE];
			spawn.room.memory.creepSpecs['upgrader'] = [WORK, WORK, WORK, WORK, CARRY, MOVE];
			spawn.room.memory.creepSpecs['helper'] = [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE];
			spawn.room.memory.creepSpecs['builder'] = [WORK, WORK, CARRY, MOVE, MOVE];
			spawn.room.memory.creepSpecs['guard'] = [MOVE, MOVE, MOVE, ATTACK, ATTACK];
		}
		else if (PowerTotal >= level4 && PowerTotal < level5) {
			//LEVEL 4 1300
			spawn.room.memory.dropped = 140;
			spawn.room.memory.Population = { 'harvester': sourecount, 'carry': sourecount + 1, 'upgrader': sourecount * 2, 'helper': sourecount, 'builder': sourecount + 1, 'guard': 1, 'claim': 0 };
			spawn.room.memory.creepSpecs['harvester'] = [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE];
			spawn.room.memory.creepSpecs['carry'] = [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK];
			spawn.room.memory.creepSpecs['upgrader'] = [WORK, WORK, WORK, WORK, CARRY, MOVE];
			spawn.room.memory.creepSpecs['helper'] = [CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE];
			spawn.room.memory.creepSpecs['builder'] = [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE];
			spawn.room.memory.creepSpecs['guard'] = [MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, ATTACK];
			if (Game.flags.Claim) spawn.room.memory.creepSpecs['claim'] = [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, CARRY, CARRY, CLAIM];
			else spawn.room.memory.creepSpecs['claim'] = [MOVE];
		}
		else if (PowerTotal >= level5 && PowerTotal < level6) {
			//LEVEL 5 1800
			spawn.room.memory.dropped = 140;
			spawn.room.memory.Population = { 'harvester': sourecount, 'carry': sourecount + 1, 'upgrader': sourecount + 1, 'helper': sourecount + 1, 'builder': sourecount + 1, 'guard': 1, 'claim': 0 };
			spawn.room.memory.creepSpecs['harvester'] = [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE];
			spawn.room.memory.creepSpecs['carry'] = [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK];
			spawn.room.memory.creepSpecs['upgrader'] = [WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE];
			spawn.room.memory.creepSpecs['helper'] = [CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE];
			spawn.room.memory.creepSpecs['builder'] = [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
			spawn.room.memory.creepSpecs['guard'] = [MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, ATTACK];
			if (Game.flags.Claim) spawn.room.memory.creepSpecs['claim'] = [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, CARRY, CARRY, CLAIM];
			else spawn.room.memory.creepSpecs['claim'] = [MOVE];
		}
		else if (PowerTotal >= level6 && PowerTotal < level7) {
			//LEVEL 6 2300
			spawn.room.memory.dropped = 140;
			spawn.room.memory.Population = { 'harvester': sourecount, 'carry': sourecount + 1, 'upgrader': sourecount + 1, 'helper': sourecount + 1, 'builder': sourecount + 1, 'guard': 2, 'claim': 1 };
			spawn.room.memory.creepSpecs['harvester'] = [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE];
			spawn.room.memory.creepSpecs['carry'] = [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK];
			spawn.room.memory.creepSpecs['upgrader'] = [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
			spawn.room.memory.creepSpecs['helper'] = [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE];
			spawn.room.memory.creepSpecs['builder'] = [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
			spawn.room.memory.creepSpecs['guard'] = [TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, ATTACK, RANGED_ATTACK, RANGED_ATTACK];
			if (Game.flags.Claim) spawn.room.memory.creepSpecs['claim'] = [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CLAIM];
			else spawn.room.memory.creepSpecs['claim'] = [MOVE];
		}
		else if (PowerTotal >= level7 && PowerTotal < level8) {
			//LEVEL 7 5300
			spawn.room.memory.dropped = 140;
			spawn.room.memory.Population = { 'harvester': sourecount, 'carry': sourecount + 1, 'upgrader': sourecount, 'helper': sourecount, 'builder': 2, 'guard': 3, 'claim': 1 };
			spawn.room.memory.creepSpecs['harvester'] = [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE];
			spawn.room.memory.creepSpecs['carry'] = [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK];
			spawn.room.memory.creepSpecs['upgrader'] = [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
			spawn.room.memory.creepSpecs['helper'] = [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE];
			spawn.room.memory.creepSpecs['builder'] = [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
			spawn.room.memory.creepSpecs['guard'] = [TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, ATTACK, RANGED_ATTACK, RANGED_ATTACK];
			if (Game.flags.Claim) spawn.room.memory.creepSpecs['claim'] = [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CLAIM];
			else spawn.room.memory.creepSpecs['claim'] = [MOVE];
		}
		else if (PowerTotal >= level8) {
			//LEVEL 8 12300
			spawn.room.memory.dropped = 140;
			spawn.room.memory.Population = { 'harvester': sourecount, 'carry': sourecount + 1, 'upgrader': sourecount, 'helper': sourecount, 'builder': 2, 'guard': 3, 'claim': 1 };
			spawn.room.memory.creepSpecs['harvester'] = [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE];
			spawn.room.memory.creepSpecs['carry'] = [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK];
			spawn.room.memory.creepSpecs['upgrader'] = [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
			spawn.room.memory.creepSpecs['helper'] = [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE];
			spawn.room.memory.creepSpecs['builder'] = [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
			spawn.room.memory.creepSpecs['guard'] = [TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, ATTACK, RANGED_ATTACK, RANGED_ATTACK];
			if (Game.flags.Claim) spawn.room.memory.creepSpecs['claim'] = [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CLAIM];
			else spawn.room.memory.creepSpecs['claim'] = [MOVE];
		}
	}
};