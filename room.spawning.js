var roomtext = require('room.text');
module.exports = {
	SpawnStuff: function (spawn) {
		//#####################
		var roomName = spawn.room.name;
		var spawningText = "NOTHING";
		var totalCost = 0;
		//##################################################################
		var roomName = spawn.room.name;
		Memory.rooms[roomName].Population = Memory.rooms[roomName].Population || {};
		spawn.room.memory.creepSpecs = spawn.room.memory.creepSpecs || {};
		var sourceCount = spawn.room.find(FIND_SOURCES);
		Memory.rooms[roomName].name = roomName;
		var PowerTotal = spawn.room.energyCapacityAvailable;
		var sourecount = sourceCount.length;
		if (PowerTotal <= 300) {
			spawn.room.memory.dropped = 1;
			Memory.rooms[roomName].Population = { 'harvester': sourecount, 'carry': sourecount * 2, 'upgrader': 2, 'helper': 1, 'builder': 1 };
			spawn.room.memory.creepSpecs['harvester'] = [WORK, WORK, CARRY, MOVE];
			spawn.room.memory.creepSpecs['carry'] = [CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
			spawn.room.memory.creepSpecs['upgrader'] = [WORK, CARRY, MOVE];
			spawn.room.memory.creepSpecs['helper'] = [CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
			spawn.room.memory.creepSpecs['builder'] = [WORK, CARRY, MOVE];
			spawn.room.memory.creepSpecs['guard'] = [ATTACK, ATTACK, MOVE, MOVE, MOVE]
		}
		else if (PowerTotal >= 500 && PowerTotal < 750) {
			spawn.room.memory.dropped = 1;
			Memory.rooms[roomName].Population = { 'harvester': sourecount, 'carry': sourecount * 2, 'upgrader': 2, 'helper': 3, 'builder': 3 };
			spawn.room.memory.creepSpecs['harvester'] = [WORK, WORK, WORK, WORK, CARRY, MOVE];
			spawn.room.memory.creepSpecs['carry'] = [CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE];
			spawn.room.memory.creepSpecs['upgrader'] = [WORK, WORK, WORK, CARRY, MOVE];
			spawn.room.memory.creepSpecs['helper'] = [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE];
			spawn.room.memory.creepSpecs['builder'] = [WORK, WORK, CARRY, CARRY, MOVE, MOVE];
			spawn.room.memory.creepSpecs['guard'] = [MOVE, MOVE, MOVE, ATTACK, ATTACK]
		}
		else if (PowerTotal >= 750 && PowerTotal < 1000) {
			spawn.room.memory.dropped = 200;
			Memory.rooms[roomName].Population = { 'harvester': sourecount, 'carry': sourecount * 2, 'upgrader': 2, 'helper': 3, 'builder': 3, 'guard': 2 };
			spawn.room.memory.creepSpecs['harvester'] = [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE];
			spawn.room.memory.creepSpecs['carry'] = [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK];
			spawn.room.memory.creepSpecs['upgrader'] = [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE];
			spawn.room.memory.creepSpecs['helper'] = [CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE];
			spawn.room.memory.creepSpecs['builder'] = [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE];
			spawn.room.memory.creepSpecs['guard'] = [MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, ATTACK]
		}
		else if (PowerTotal >= 1000 && PowerTotal < 2000) {
			spawn.room.memory.dropped = 250;
			Memory.rooms[roomName].Population = { 'harvester': sourecount, 'carry': sourecount * 2, 'upgrader': 2, 'helper': 2, 'builder': 2, 'guard': 2 };
			spawn.room.memory.creepSpecs['harvester'] = [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE];
			spawn.room.memory.creepSpecs['carry'] = [CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, ATTACK];
			spawn.room.memory.creepSpecs['upgrader'] = [WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE];
			spawn.room.memory.creepSpecs['helper'] = [CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE];
			spawn.room.memory.creepSpecs['builder'] = [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
			spawn.room.memory.creepSpecs['guard'] = [MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, ATTACK]
		}
		else if (PowerTotal >= 2000) {
			spawn.room.memory.dropped = 250;
			Memory.rooms[roomName].Population = { 'harvester': sourecount, 'carry': sourecount * 3, 'upgrader': 3, 'helper': 2, 'builder': 2, 'guard': 2, 'claim': 1 };
			spawn.room.memory.creepSpecs['harvester'] = [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE];
			spawn.room.memory.creepSpecs['carry'] = [CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK];
			spawn.room.memory.creepSpecs['upgrader'] = [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
			spawn.room.memory.creepSpecs['helper'] = [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE];
			spawn.room.memory.creepSpecs['builder'] = [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY]
			spawn.room.memory.creepSpecs['guard'] = [TOUGH, TOUGH, TOUGH, TOUGH, HEAL, HEAL, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK];
			if (Game.flags.Claim) {
				spawn.room.memory.creepSpecs['claim'] = [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CLAIM];
			}
			else spawn.room.memory.creepSpecs['claim'] = [MOVE];
		}
		//build creeps----------------
		var spawnMem = spawn.room.memory.Population;
		var panic = _.countBy(spawn.room.find(FIND_MY_CREEPS), 'memory.role');
		var roles = _.toArray(Object.keys(spawnMem));
		var name = spawn.room.name;
		for (var i in roles) {
			var role = roles[i];
			var creeps = _.filter(Memory.creeps, function (creep) {
				if (creep.role && (creep.spawn == spawn.name)) return creep.role == role;
			});
			if (panic.harvester < 1 || panic.harvester == undefined) {
				totalCost = 300;
				var base = name + '-' + 'PANIC-harvester'.toUpperCase();
				var suffixn = '_' + Math.round(Game.time / 5);
				var title = base.concat(suffixn.toString());
				spawningText = title;
				var room = spawn.room.name;
				spawn.room.memory.isSpawning = title;
				spawn.spawnCreep([WORK, CARRY, MOVE], title, { memory: { 'role': 'harvester', 'room': room, 'spawn': spawn.name } })
				break;
			}
			else if (panic.carry < 1 || panic.carry == undefined) {
				totalCost = 150;
				var base = name + '-' + 'PANIC-carry'.toUpperCase();
				var suffixn = '_' + Math.round(Game.time / 5);
				var title = base.concat(suffixn.toString());
				spawningText = title;
				var room = spawn.room.name;
				spawn.room.memory.isSpawning = title;
				spawn.spawnCreep([CARRY, CARRY, MOVE], title, { memory: { 'role': 'carry', 'room': room, 'spawn': spawn.name } })
				break;
			}
			else if (creeps.length < spawnMem[role]) {
				totalCost = DX.FindCost(spawn, role);
				var base = name + '-' + role.toUpperCase();
				var suffixn = '-' + Math.round(Game.time / 5);
				var title = base.concat(suffixn.toString());
				spawningText = title;
				var room = spawn.room.name;
				spawn.room.memory.isSpawning = title;
				spawn.spawnCreep(spawn.room.memory.creepSpecs[role], title, { memory: { 'role': role, 'room': room, 'spawn': spawn.name } })
				break;
			}
			else spawn.room.memory.isSpawning = "NOTHING";
		}
		spawn.room.memory.cost = totalCost;
		spawn.room.memory.queued = spawningText;
		roomtext.run(spawn);
	}
};