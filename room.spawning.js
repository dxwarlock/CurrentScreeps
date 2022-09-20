var roomtext = require('room.text');
module.exports = {
	SpawnStuff: function () {
		//#####################
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
			var PowerTotal = Game.spawns[name].room.energyCapacityAvailable;
			if (PowerTotal <= 300) {
				//console.log(Game.spawns[name].room.name + " 300" + " " + Game.spawns[name].room.energyCapacityAvailable)
				spawn.room.memory.dropped = 1;
				Memory.rooms[roomName].Population = { 'harvester': sourceCount.length, 'carry': sourceCount.length * 2, 'upgrader': 2, 'helper': 2, 'builder': 2 };
				spawn.room.memory.creepSpecs['harvester'] = [WORK, WORK, CARRY, MOVE];
				spawn.room.memory.creepSpecs['carry'] = [CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
				spawn.room.memory.creepSpecs['upgrader'] = [WORK, CARRY, MOVE];
				spawn.room.memory.creepSpecs['helper'] = [CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
				spawn.room.memory.creepSpecs['builder'] = [WORK, CARRY, MOVE];
			}
			else if (PowerTotal >= 500 && PowerTotal < 750) {
				//console.log(Game.spawns[name].room.name + " 500" + " " + Game.spawns[name].room.energyCapacityAvailable)
				spawn.room.memory.dropped = 1;
				Memory.rooms[roomName].Population = { 'carry': sourceCount.length * 2, 'harvester': sourceCount.length, 'upgrader': 1, 'helper': 1, 'builder': 1 };
				spawn.room.memory.creepSpecs['harvester'] = [WORK, WORK, WORK, WORK, CARRY, MOVE];
				spawn.room.memory.creepSpecs['carry'] = [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE];
				spawn.room.memory.creepSpecs['upgrader'] = [WORK, WORK, WORK, CARRY, MOVE];
				spawn.room.memory.creepSpecs['helper'] = [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE];
				spawn.room.memory.creepSpecs['builder'] = [WORK, CARRY, MOVE];
			}
			else if (PowerTotal >= 750 && PowerTotal < 1000) {
				//console.log(Game.spawns[name].room.name + " 750" + " " + Game.spawns[name].room.energyCapacityAvailable)
				spawn.room.memory.dropped = 200;
				Memory.rooms[roomName].Population = { 'harvester': sourceCount.length, 'builder': 1, 'guard': 1, 'upgrader': 1, 'helper': 1, 'carry': sourceCount.length * 2 };
				spawn.room.memory.creepSpecs['harvester'] = [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE];
				spawn.room.memory.creepSpecs['carry'] = [CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE];
				spawn.room.memory.creepSpecs['upgrader'] = [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE];
				spawn.room.memory.creepSpecs['helper'] = [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
				spawn.room.memory.creepSpecs['builder'] = [WORK, CARRY, MOVE];
				spawn.room.memory.creepSpecs['guard'] = [TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]
			}
			else if (PowerTotal >= 1000 && PowerTotal < 2000) {
				//console.log(Game.spawns[name].room.name + " 1000" + " " + Game.spawns[name].room.energyCapacityAvailable)
				spawn.room.memory.dropped = 250;
				Memory.rooms[roomName].Population = { 'builder': 1, 'guard': 1, 'upgrader': 1, 'helper': 1, 'carry': sourceCount.length * 2, 'harvester': sourceCount.length };
				spawn.room.memory.creepSpecs['harvester'] = [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE];
				spawn.room.memory.creepSpecs['carry'] = [CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE];
				spawn.room.memory.creepSpecs['upgrader'] = [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE];
				spawn.room.memory.creepSpecs['helper'] = [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
				spawn.room.memory.creepSpecs['builder'] = [WORK, CARRY, MOVE];
				spawn.room.memory.creepSpecs['guard'] = [TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]
			}
			else if (PowerTotal >= 2000) {
				//console.log(Game.spawns[name].room.name + " 2000" + " " + Game.spawns[name].room.energyCapacityAvailable)
				spawn.room.memory.dropped = 250;
				Memory.rooms[roomName].Population = { 'harvester': sourceCount.length, 'carry': sourceCount.length * 3, 'upgrader': 2, 'helper': 2, 'builder': 3, 'helper': 2, 'guard': 4, 'claim': 2 };
				spawn.room.memory.creepSpecs['harvester'] = [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE];
				spawn.room.memory.creepSpecs['carry'] = [CARRY, CARRY, MOVE, MOVE, MOVE];
				spawn.room.memory.creepSpecs['upgrader'] = [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE];
				spawn.room.memory.creepSpecs['helper'] = [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE];
				spawn.room.memory.creepSpecs['builder'] = [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE];
				spawn.room.memory.creepSpecs['guard'] = [TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]
				spawn.room.memory.creepSpecs['claim'] = [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CLAIM, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]
			}
			//build creeps----------------
			var spawnMem = spawn.room.memory.Population;
			var panic = _.countBy(Game.spawns[name].room.find(FIND_MY_CREEPS), 'memory.role');
			var roles = _.toArray(Object.keys(spawnMem));
			for (var i in roles) {
				var role = roles[i];
				var creeps = _.filter(Memory.creeps, function (creep) {
					if (creep.role && (creep.spawn == spawn.name)) return creep.role == role;
				});
				if (panic.harvester < 1 || panic.harvester == undefined) {
					totalCost = 300;
					var base = name + '_' + 'PANIC_harvester'.toUpperCase();
					var suffixn = '_' + Math.round(Game.time / 5);
					var title = base.concat(suffixn.toString());
					spawningText = title;
					var room = Game.spawns[name].room.name;
					Game.spawns[name].room.memory.isSpawning = title;
					Game.spawns[name].spawnCreep([WORK, CARRY, MOVE], title, { memory: { 'role': 'harvester', 'room': room, 'spawn': spawn.name } })
					break;
				}
				else if (panic.carry < 2 || panic.carry == undefined) {
					totalCost = 150;
					var base = name + '_' + 'PANIC_carry'.toUpperCase();
					var suffixn = '_' + Math.round(Game.time / 5);
					var title = base.concat(suffixn.toString());
					spawningText = title;
					var room = Game.spawns[name].room.name;
					Game.spawns[name].room.memory.isSpawning = title;
					Game.spawns[name].spawnCreep([CARRY, CARRY, MOVE], title, { memory: { 'role': 'carry', 'room': room, 'spawn': spawn.name } })
					break;
				}
				else if (creeps.length < spawnMem[role]) {
					totalCost = DX.FindCost(spawn, role);
					var base = name + '-' + role.toUpperCase();
					var suffixn = '-' + Math.round(Game.time / 5);
					var title = base.concat(suffixn.toString());
					spawningText = title;
					var room = Game.spawns[name].room.name;
					Game.spawns[name].room.memory.isSpawning = title;
					Game.spawns[name].spawnCreep(spawn.room.memory.creepSpecs[role], title, { memory: { 'role': role, 'room': room, 'spawn': spawn.name } })
					break;
				}
				else Game.spawns[name].room.memory.isSpawning = "NOTHING";
			}
			Game.spawns[name].room.memory.cost = totalCost;
			Game.spawns[name].room.memory.queued = spawningText;
			roomtext.run();
		}
	}
};