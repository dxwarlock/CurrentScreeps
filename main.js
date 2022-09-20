Memory.sources = Memory.sources || {};
Memory.flags = Memory.flags || {};
Memory.sources = Memory.sources || {};
Memory.pathcolor = Memory.pathcolor || {};
//#####################
Memory.pathcolor.harvester = "#ffffff"
Memory.pathcolor.upgrader = "#ff00ff"
Memory.pathcolor.builder = "#00ffff"
Memory.pathcolor.helper = "#00ff00"
Memory.pathcolor.carry = "#ffff00"
Memory.pathcolor.guard = "#ff0000"
Memory.pathcolor.claim = "#ffaa22"
//#####################
global.DX = require('functions');
var roleharvester = require('role.harvester');
var roleupgrader = require('role.upgrader');
var rolebuilder = require('role.builder');
var rolehelper = require('role.helper');
var rolecarry = require('role.carry');
var roleguard = require('role.guard');
var roleclaim = require('role.claim');
var roletowers = require('role.towers');
var globaltick = require('global.tick');
var roomspawning = require('room.spawning');
//#####################
module.exports.loop = function () {
        roomspawning.SpawnStuff();
    	roletowers.run();
		globaltick.everyTick();
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.ticksToLive < 50) creep.say('DYING!')
        if (creep.memory.role == 'harvester') roleharvester.run(creep);
        if (creep.memory.role == 'upgrader') roleupgrader.run(creep);
        if (creep.memory.role == 'builder') rolebuilder.run(creep);
        if (creep.memory.role == 'helper') rolehelper.run(creep);
        if (creep.memory.role == 'carry') rolecarry.run(creep);
        if (creep.memory.role == 'guard') roleguard.run(creep);
        if (creep.memory.role == 'claim') roleclaim.run(creep);
    }
}