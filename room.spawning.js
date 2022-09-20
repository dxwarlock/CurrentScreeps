var roomtext = require('room.text');
module.exports = {
	SpawnStuff: function (creepsCount) {
		for (var name in Game.spawns) {
			var spawn = Game.spawns[name];
			var spawningText = "NOTHING";
			var totalCost = 0;
			//##################################################################
			var roomName = Game.spawns[name].room.name;
			Memory.rooms[roomName].Population = Memory.rooms[roomName].Population || {};
			Memory.rooms[roomName].name = roomName;
			var sourceCount = Game.spawns[name].room.find(FIND_SOURCES);
			spawn.room.memory.creepSpecs = spawn.room.memory.creepSpecs || {};
			const Power = Game.spawns[name].room.find(FIND_MY_STRUCTURES, { filter: (i) => i.structureType == STRUCTURE_EXTENSION });
			const PowerTotal = (Power.length);
			if (PowerTotal < 1) {
				Memory.rooms[roomName].Population = { 'harvester': sourceCount.length, 'carry': sourceCount.length * 2, 'builder': 1, 'upgrader': 1, 'helper': 1, 'guard': 1 };
				spawn.room.memory.creepSpecs['harvester'] = [WORK, CARRY, MOVE, MOVE];
				spawn.room.memory.creepSpecs['carry'] = [CARRY, CARRY, MOVE, MOVE, MOVE];
				spawn.room.memory.creepSpecs['upgrader'] = [WORK, WORK, CARRY, MOVE];
				spawn.room.memory.creepSpecs['helper'] = [CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
				spawn.room.memory.creepSpecs['builder'] = [WORK, CARRY, MOVE];
				spawn.room.memory.creepSpecs['guard'] = [ATTACK, MOVE, MOVE];
			}
			else if (PowerTotal <= 5) {
				Memory.rooms[roomName].Population = { 'harvester': sourceCount.length, 'carry': sourceCount.length * 3, 'builder': 3, 'upgrader': 2, 'helper': 2, 'guard': 2 };
				spawn.room.memory.creepSpecs['harvester'] = [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE];
				spawn.room.memory.creepSpecs['carry'] = [CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE];
				spawn.room.memory.creepSpecs['upgrader'] = [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE];
				spawn.room.memory.creepSpecs['helper'] = [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
				spawn.room.memory.creepSpecs['builder'] = [WORK, CARRY, MOVE];
				spawn.room.memory.creepSpecs['guard'] = [TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]
			}
			else if (PowerTotal <= 10) {
				Memory.rooms[roomName].Population = { 'harvester': sourceCount.length, 'carry': sourceCount.length * 3, 'builder': 3, 'upgrader': 2, 'helper': 2, 'guard': 3 };
				spawn.room.memory.creepSpecs['harvester'] = [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE];
				spawn.room.memory.creepSpecs['carry'] = [CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE];
				spawn.room.memory.creepSpecs['upgrader'] = [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE];
				spawn.room.memory.creepSpecs['helper'] = [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
				spawn.room.memory.creepSpecs['builder'] = [WORK, CARRY, MOVE];
				spawn.room.memory.creepSpecs['guard'] = [TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]
			}
			else if (PowerTotal <= 20) {
				Memory.rooms[roomName].Population = { 'harvester': sourceCount.length, 'carry': sourceCount.length * 3, 'builder': 3, 'upgrader': 2, 'helper': 2, 'guard': 4 };
				spawn.room.memory.creepSpecs['harvester'] = [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE];
				spawn.room.memory.creepSpecs['carry'] = [CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE];
				spawn.room.memory.creepSpecs['upgrader'] = [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE];
				spawn.room.memory.creepSpecs['helper'] = [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
				spawn.room.memory.creepSpecs['builder'] = [WORK, CARRY, MOVE];
				spawn.room.memory.creepSpecs['guard'] = [TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]
			}
			else {
				Memory.rooms[roomName].Population = { 'harvester': sourceCount.length, 'carry': sourceCount.length * 3, 'builder': 3, 'upgrader': 2, 'helper': 2, 'guard': 5, 'claim': 2};
				spawn.room.memory.creepSpecs['harvester'] = [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE];
				spawn.room.memory.creepSpecs['carry'] = [CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE];
				spawn.room.memory.creepSpecs['upgrader'] = [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE];
				spawn.room.memory.creepSpecs['helper'] = [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
				spawn.room.memory.creepSpecs['builder'] = [WORK, CARRY, MOVE];
				spawn.room.memory.creepSpecs['guard'] = [TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]
				spawn.room.memory.creepSpecs['claim'] = [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY,CLAIM, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]
			}
			//build creeps----------------
			var spawnMem = spawn.room.memory.Population;
			var roles = _.toArray(Object.keys(spawnMem));
			for (var i in roles) {
				var role = roles[i];
				var creeps = _.filter(Memory.creeps, function (creep) {
					if (creep.role) return creep.role == role;
				});
				if (creeps.length < spawnMem[role]) {
					totalCost = DX.FindCost(spawn, role);
					//-----------
					var base = name + '_' + role.toUpperCase() + '_';
					var suffixn = Math.round(Game.time / 5);
					var title = base.concat(suffixn.toString());
					spawningText = title;
					Game.spawns[name].room.memory.isSpawning = title;
					Game.spawns[name].spawnCreep(spawn.room.memory.creepSpecs[role], title, { memory: { 'role': role, 'script': role, 'spawn': spawn.name}})
					//----------
					break;
				}
				else Game.spawns[name].room.memory.isSpawning = "NOTHING";
			}
			roomtext.run("QUEUED: " + spawningText, totalCost, creepsCount);
		}
	}
};