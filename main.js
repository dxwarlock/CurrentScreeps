global.DX = require('basic.functions');
Memory.sources = Memory.sources || {};
Memory.flags = Memory.flags || {};
Memory.sources = Memory.sources || {};
Memory.pathcolor = Memory.pathcolor || {};
Memory.terminals = Memory.terminals || {};
//#####################
Memory.pathcolor.harvester = "#ffffff"
Memory.pathcolor.upgrader = "#ff00ff"
Memory.pathcolor.builder = "#00ffff"
Memory.pathcolor.helper = "#ffff00"
Memory.pathcolor.carry = "#00ff00"
Memory.pathcolor.guard = "#ff0000"
Memory.pathcolor.claim = "#ffaa22"
//OTHER ROLES#####################
var specs = require('room.setspecs');
var spawning = require('room.spawning');
var links = require('room.links');
var term = require('room.terminal');
var towers = require('role.towers');
//CREEP ROLES#####################
var harvester = require('role.harvester');
var upgrader = require('role.upgrader');
var builder = require('role.builder');
var helper = require('role.helper');
var carry = require('role.carry');
var guard = require('role.guard');
var claim = require('role.claim');
//#####################
module.exports.loop = function () {
	//memory cleaning--
	for (var name in Game.flags) Memory.flags[name] = Game.flags[name];
	for (var name in Memory.flags) if (!Game.flags[name]) delete Memory.flags[name];
	for (var name in Memory.creeps) if (!Game.creeps[name]) delete Memory.creeps[name];
	for (var name in Memory.rooms) if (!Game.rooms[name]) delete Memory.rooms[name];
	//run scripts
	for (var name in Game.spawns) {
		var spawn = Game.spawns[name];
		specs.setSpecs(spawn);
		spawning.SpawnStuff(spawn);
		towers.run(spawn);
		links.run(spawn);
		term.run(spawn);
		DX.FindRepairs(spawn);
		DX.FindBuilds(spawn);
	}
	for (var name in Game.creeps) {
		var creep = Game.creeps[name];		
		//creep.suicide();
		if (creep.ticksToLive < 20) creep.say('💀');
		if (creep.memory.type == 'panic' && creep.memory.role == 'harvester' && creep.room.memory.totalcreeps > 7) creep.suicide();
		var runRole = creep.memory.role;
		if (runRole) eval(runRole).run(creep);
		else creep.suicide();
	}
}