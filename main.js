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
var globaltick = require('global.tick');
//#####################
module.exports.loop = function () {
		globaltick.everyTick();
}