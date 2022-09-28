module.exports = {
    everyTick: function () {
        var roleharvester = require('role.harvester');
        var roleupgrader = require('role.upgrader');
        var rolebuilder = require('role.builder');
        var rolehelper = require('role.helper');
        var rolecarry = require('role.carry');
        var roleguard = require('role.guard');
        var roleclaim = require('role.claim');
        var roletowers = require('role.towers');
        var roomspawning = require('room.spawning');
        var roomlinks = require('room.links');
        var roomterm = require('room.terminal');
        var specs = require('room.setspecs');
        //memory cleaning--
        for (var name in Game.flags) Memory.flags[name] = Game.flags[name];
        for (var name in Memory.flags) if (!Game.flags[name]) delete Memory.flags[name];
        for (var name in Memory.creeps) if (!Game.creeps[name]) delete Memory.creeps[name];
        for (var name in Memory.rooms) if (!Game.rooms[name]) delete Memory.rooms[name];
        for (var name in Memory.rooms) if (!Game.rooms[name].Links) delete Memory.rooms[name].Links;
        //run scripts
        for (var name in Game.spawns) {
            var spawn = Game.spawns[name];
            roomspawning.SpawnStuff(spawn);
            roomlinks.run(spawn);
            roletowers.run(spawn);
            roomterm.run(spawn);
            DX.FindRepairs(spawn);
            DX.FindBuilds(spawn);
            specs.setSpecs(spawn);
        }
        for (var name in Game.creeps) {
            var creep = Game.creeps[name];
            //creep.suicide();
            if (creep.ticksToLive < 50) creep.say('DYING!')
            if (creep.memory.role == 'carry') rolecarry.run(creep);
            if (creep.memory.role == 'helper') rolehelper.run(creep);
            if (creep.memory.role == 'harvester') roleharvester.run(creep);
            if (creep.memory.role == 'upgrader') roleupgrader.run(creep);
            if (creep.memory.role == 'builder') rolebuilder.run(creep);
            if (creep.memory.role == 'guard') roleguard.run(creep);
            if (creep.memory.role == 'claim') roleclaim.run(creep);
        }
    }
};