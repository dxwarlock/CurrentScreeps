var roomtext = require('room.text');
module.exports = {
	SpawnStuff(spawn) {
		var spawningText = "NOTHING";
		var totalCost = 0;
		var spawnMem = spawn.room.memory.Population;
		var panic = _.countBy(spawn.room.find(FIND_MY_CREEPS), 'memory.role');
		var roles = _.toArray(Object.keys(spawnMem));
		var name = spawn.room.name;
		var creepspecs;
		var mem;
		for (var i in roles) {
			var role = roles[i];
			var creeps = _.filter(Memory.creeps, function (creep) {
				if (creep.role && (creep.spawn == spawn.name)) return creep.role == role;
			});
			var totalcreeps = spawn.room.find(FIND_MY_CREEPS).length;
			spawn.room.memory.totalcreeps = totalcreeps;
			if ((panic.harvester < 1 || panic.harvester == undefined) && totalcreeps == 0) {
				mem = { memory: { 'type': 'panic', 'role': 'harvester', 'room': name, 'spawn': spawn.name, 'flag': (spawn.room.name + '-harvester').toUpperCase() } }
				creepspecs = [WORK, CARRY, MOVE];
				break;
			}
			else if ((panic.carry < 1 || panic.carry == undefined)) {
				mem = { memory: { 'type': 'panic', 'role': 'carry', 'room': name, 'spawn': spawn.name, 'flag': (spawn.room.name + '-carry').toUpperCase() } }
				creepspecs = [CARRY, CARRY, MOVE];
				break;
			}
			else if (creeps.length < spawnMem[role]) {
				mem = { memory: { 'type': 'norm', 'role': role, 'room': name, 'spawn': spawn.name, 'flag': (spawn.room.name + '-' + role).toUpperCase() } }
				creepspecs = spawn.room.memory.creepSpecs[role];
				break;
			}
		}
		//build creeps----------------
		if (creepspecs != undefined) {
			totalCost = DX.FindCost(creepspecs);
			var base = name + '-' + role.toUpperCase();
			var suffixn = '-' + Math.round(Game.time / 5);
			var title = base.concat(suffixn.toString());
			spawningText = title;
			spawn.room.memory.isSpawning = title;
			spawn.spawnCreep(creepspecs, title, mem);
		}
		else spawn.room.memory.isSpawning = "NOTHING";
		spawn.room.memory.cost = totalCost;
		spawn.room.memory.queued = spawningText;
		roomtext.run(spawn);
	}
};