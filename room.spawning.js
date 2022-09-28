var roomtext = require('room.text');
module.exports = {
	SpawnStuff: function (spawn) {
		//#####################
		var roomName = spawn.room.name;
		var spawningText = "NOTHING";
		var totalCost = 0;
		//##################################################################
		var roomName = spawn.room.name;
		Memory.rooms[roomName] = Memory.rooms[roomName] || {};
		Memory.rooms[roomName].creepSpecs = Memory.rooms[roomName].creepSpecs || {};
		Memory.rooms[roomName].name = roomName;
		var sourceCount = spawn.room.find(FIND_SOURCES);
		var PowerTotal = spawn.room.energyCapacityAvailable;
		var sourecount = sourceCount.length;
		if (PowerTotal <= 300) {
			spawn.room.memory.dropped = 1;
			spawn.room.memory.minEnergy = 300;
			spawn.room.memory.Population = { 'harvester': sourecount, 'carry': sourecount * 2, 'upgrader': sourecount, 'helper': sourecount * 2, 'builder': sourecount, 'guard': 0, 'claim': 0  };
			spawn.room.memory.creepSpecs['harvester'] = [WORK, WORK, CARRY, MOVE];
			spawn.room.memory.creepSpecs['carry'] = [CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
			spawn.room.memory.creepSpecs['upgrader'] = [WORK, CARRY, MOVE];
			spawn.room.memory.creepSpecs['helper'] = [CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
			spawn.room.memory.creepSpecs['builder'] = [WORK, CARRY, MOVE];
			spawn.room.memory.creepSpecs['guard'] = [ATTACK, ATTACK, MOVE, MOVE, MOVE]
		}
		else if (PowerTotal >= 500 && PowerTotal < 750) {
			spawn.room.memory.dropped = 1;
			spawn.room.memory.minEnergy = 500;
			spawn.room.memory.Population = { 'harvester': sourecount, 'carry': sourecount * 2, 'upgrader': sourecount, 'helper': sourecount * 2, 'builder': sourecount * 2, 'guard': 0, 'claim': 0 };
			spawn.room.memory.creepSpecs['harvester'] = [WORK, WORK, WORK, WORK, CARRY, MOVE];
			spawn.room.memory.creepSpecs['carry'] = [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE];
			spawn.room.memory.creepSpecs['upgrader'] = [WORK, WORK, CARRY, MOVE];
			spawn.room.memory.creepSpecs['helper'] = [CARRY, CARRY, CARRY,MOVE, MOVE, MOVE, MOVE];
			spawn.room.memory.creepSpecs['builder'] = [WORK, WORK, CARRY, MOVE, MOVE];
			spawn.room.memory.creepSpecs['guard'] = [MOVE, MOVE, MOVE, ATTACK, ATTACK]
		}
		else if (PowerTotal >= 750 && PowerTotal < 1000) {
			spawn.room.memory.dropped = 200;
			spawn.room.memory.minEnergy = 650;
			spawn.room.memory.Population = { 'harvester': sourecount, 'carry': sourecount * 2, 'upgrader': sourecount, 'helper': sourecount * 2, 'builder': sourecount * 2, 'guard': 1, 'claim': 0 };
			spawn.room.memory.creepSpecs['harvester'] = [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE];
			spawn.room.memory.creepSpecs['carry'] = [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK];
			spawn.room.memory.creepSpecs['upgrader'] = [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE];
			spawn.room.memory.creepSpecs['helper'] = [CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE];
			spawn.room.memory.creepSpecs['builder'] = [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE];
			spawn.room.memory.creepSpecs['guard'] = [MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, ATTACK]
		}
		else if (PowerTotal >= 1000 && PowerTotal < 2000) {
			spawn.room.memory.dropped = 250;
			spawn.room.memory.minEnergy = 700;
			spawn.room.memory.Population = { 'harvester': sourecount, 'carry': sourecount * 2, 'upgrader': sourecount, 'helper': sourecount * 2, 'builder': sourecount * 2, 'guard': 1, 'claim': 0 };
			spawn.room.memory.creepSpecs['harvester'] = [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE];
			spawn.room.memory.creepSpecs['carry'] = [CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, ATTACK];
			spawn.room.memory.creepSpecs['upgrader'] = [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE];
			spawn.room.memory.creepSpecs['helper'] = [CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE];
			spawn.room.memory.creepSpecs['builder'] = [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
			spawn.room.memory.creepSpecs['guard'] = [MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, ATTACK];
			if (Game.flags.Claim) spawn.room.memory.creepSpecs['claim'] = [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CLAIM];
			else spawn.room.memory.creepSpecs['claim'] = [MOVE];
		}
		else if (PowerTotal >= 2000 && PowerTotal < 3000) {
			spawn.room.memory.dropped = 250;
			spawn.room.memory.minEnergy = 700;
			spawn.room.memory.Population = { 'harvester': sourecount, 'carry': sourecount * 2, 'upgrader': sourecount, 'helper': sourecount * 2, 'builder': sourecount * 2, 'guard': 2, 'claim': 1 };
			spawn.room.memory.creepSpecs['harvester'] = [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE];
			spawn.room.memory.creepSpecs['carry'] = [CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK];
			spawn.room.memory.creepSpecs['upgrader'] = [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
			spawn.room.memory.creepSpecs['helper'] = [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE];
			spawn.room.memory.creepSpecs['builder'] = [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY]
			spawn.room.memory.creepSpecs['guard'] = [TOUGH, TOUGH, TOUGH, TOUGH, HEAL, HEAL, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK];
			if (Game.flags.Claim) spawn.room.memory.creepSpecs['claim'] = [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CLAIM];
			else spawn.room.memory.creepSpecs['claim'] = [MOVE];
		}
		else if (PowerTotal >= 3000) {
			spawn.room.memory.dropped = 250;
			spawn.room.memory.minEnergy = 700;
			spawn.room.memory.Population = { 'harvester': sourecount, 'carry': sourecount * 2, 'upgrader': 1, 'helper': 2, 'builder': 2, 'guard': 4, 'claim': 1 };
			spawn.room.memory.creepSpecs['harvester'] = [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE];
			spawn.room.memory.creepSpecs['carry'] = [CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK];
			spawn.room.memory.creepSpecs['upgrader'] = [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
			spawn.room.memory.creepSpecs['helper'] = [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE];
			spawn.room.memory.creepSpecs['builder'] = [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY]
			spawn.room.memory.creepSpecs['guard'] = [TOUGH, TOUGH, TOUGH, TOUGH, HEAL, HEAL, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK];
			if (Game.flags.Claim) spawn.room.memory.creepSpecs['claim'] = [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CLAIM];
			else spawn.room.memory.creepSpecs['claim'] = [MOVE];
		}
		//build creeps----------------
		var spawnMem = spawn.room.memory.Population;
		var panic = _.countBy(spawn.room.find(FIND_MY_CREEPS), 'memory.role');
		var roles = _.toArray(Object.keys(spawnMem));
		var name = spawn.room.name;
		var creepspecs;
		for (var i in roles) {
			var role = roles[i];
			var creeps = _.filter(Memory.creeps, function (creep) {
				if (creep.role && (creep.spawn == spawn.name)) return creep.role == role;
			});
			if (panic.harvester == 0 && spawn.room.energyAvailable < 300) {
				role = 'harvester', creepspecs = [WORK, CARRY, MOVE];
				break;
			}
			else if (panic.carry == 0 && spawn.room.energyAvailable < 300) {
				role = 'carry', creepspecs = [CARRY, CARRY, MOVE];
				break;
			}
			else if (creeps.length < spawnMem[role]) {
				creepspecs = spawn.room.memory.creepSpecs[role];
				break;
			}
		}
		if (creepspecs != undefined) {
			totalCost = DX.FindCost(spawn, role);
			var base = name + '-' + role.toUpperCase();
			var suffixn = '-' + Math.round(Game.time / 5);
			var title = base.concat(suffixn.toString());
			spawningText = title;
			var room = spawn.room.name;
			spawn.room.memory.isSpawning = title;
			spawn.spawnCreep(creepspecs, title, { memory: { 'role': role, 'room': room, 'spawn': spawn.name } })
		}
		else spawn.room.memory.isSpawning = "NOTHING";
		spawn.room.memory.cost = totalCost;
		spawn.room.memory.queued = spawningText;
		roomtext.run(spawn);
	}
};