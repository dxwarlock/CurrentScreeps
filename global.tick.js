module.exports = {
    everyTick: function () {
        if (Game.time % 1 === 0) {
            for (var name in Game.spawns) {
                var spawn = Game.spawns[name];
                DX.FindRepairs(spawn);
                DX.FindBuilds(spawn);
            }
        }
        for (var i in Memory.flags) if (!Game.flags[i]) delete Memory.flags[i];
        for (var name in Game.flags) Memory.flags[name] = Game.flags[name];
        for (var name in Memory.creeps) if (!Game.creeps[name]) delete Memory.creeps[name];
        for (var name in Memory.rooms) if (!Game.rooms[name]) delete Memory.rooms[name];
        var roleharvester = require('role.harvester');
        var roleupgrader = require('role.upgrader');
        var rolebuilder = require('role.builder');
        var rolehelper = require('role.helper');
        var rolecarry = require('role.carry');
        var roleguard = require('role.guard');
        var roleclaim = require('role.claim');
        var roletowers = require('role.towers');
        var roomspawning = require('room.spawning');
        roomspawning.SpawnStuff();
        roletowers.run();
        var textFormat = { align: 'center', color: "#ffffff", font: 'bold 0.4 Arial', stroke: '#000000', backgroundPadding: 0.2, backgroundColor: 'transparent', opacity: 0.6 };
        for (var name in Game.creeps) {
            var creep = Game.creeps[name];
            //creep.room.visual.text(creep.memory.role, creep.pos.x, creep.pos.y-0.5, textFormat);
            //creep.suicide();
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
};