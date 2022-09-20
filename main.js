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
Memory.pathcolor.claim = "#ff0000"
//#####################
global.DX = require('functions');
var roleharvester = require('role.harvester');
var roleupgrader = require('role.upgrader');
var rolebuilder = require('role.builder');
var rolehelper = require('role.helper');
var rolecarry = require('role.energycarry');
var roleguard = require('role.guard');
var roleclaim = require('role.claim');
var roletowers = require('role.towers');
var globaltick = require('global.tick');
var roomspawning = require('room.spawning');

//#####################
module.exports.loop = function () {
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var helpers = _.filter(Game.creeps, (creep) => creep.memory.role == 'helper');
    var carrys = _.filter(Game.creeps, (creep) => creep.memory.role == 'carry');
    var guards = _.filter(Game.creeps, (creep) => creep.memory.role == 'guard');
    var totalCreeps = harvesters.length + upgraders.length + builders.length + helpers.length + carrys.length + guards.length;
    var creepsCount = "Ha:" + harvesters.length + "|B:" + builders.length + "|U:" + upgraders.length + "|He:" + helpers.length;
//#####################
    roletowers.run();
    globaltick.everyTick();
    roomspawning.SpawnStuff(creepsCount);
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