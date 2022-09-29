var roomtext = require('room.text');
module.exports = {
	SpawnStuff: function (spawn) {
		var spawningText = "NOTHING";
		var totalCost = 0;
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
			var totalcreeps = spawn.room.find(FIND_MY_CREEPS).length;
			if ((panic.harvester < 1 || panic.harvester == undefined) && totalcreeps == 0) {
				role = 'harvester', creepspecs = [WORK, CARRY, MOVE];
				break;
			}
			else if ((panic.carry < 1 || panic.carry == undefined) && totalcreeps == 0) {
				role = 'carry', creepspecs = [CARRY, CARRY, MOVE];
				break;
			}
			else if (creeps.length < spawnMem[role]) {
				creepspecs = spawn.room.memory.creepSpecs[role];
				break;
			}
		}
		//build creeps----------------
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