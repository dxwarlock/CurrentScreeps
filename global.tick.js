module.exports = {
    everyTick: function () {
        for (var i in Memory.flags) if (!Game.flags[i]) delete Memory.flags[i];
        for (var name in Game.flags) Memory.flags[name] = Game.flags[name];
        for (var name in Memory.creeps) if (!Game.creeps[name]) delete Memory.creeps[name];
        for (var name in Memory.rooms) if (!Game.rooms[name]) delete Memory.rooms[name];
    }
};