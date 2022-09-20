module.exports = {
    run: function () {
        for (var name in Game.spawns) {
            var roomName = Game.spawns[name].room.name;
            var x = 2,y = 2;
            var spawningCreep = [];
            spawningCreep.name = "NOTHING";
            var roomCreepCount = _.countBy(Game.spawns[name].room.find(FIND_MY_CREEPS), 'memory.role');
            var roomCreepText = '';
            for (const property in roomCreepCount) {
                var i = `${property}: ${roomCreepCount[property]}`
                roomCreepText = roomCreepText.concat(" "+i)
            }
            var textFormat = { align: 'left', color: "#ffffff", font: 'bold 0.9 Arial', backgroundPadding: 0.2, backgroundColor: '#000000', opacity: 0.9 };
            var roomPower = Game.spawns[name].room.energyAvailable + "/" + Game.spawns[name].room.energyCapacityAvailable;
            if (Game.spawns[name].spawning) var spawningCreep = Game.creeps[Game.spawns[name].spawning.name];
            Game.spawns[name].room.visual.text(roomName + " ="+ roomCreepText.toUpperCase(), x, y, textFormat);
            Game.spawns[name].room.visual.text("COST: " + Game.spawns[name].room.memory.cost + " | HAVE: " + roomPower, x, y + 2, textFormat);
            Game.spawns[name].room.visual.text("QUEUED: " + Game.spawns[name].room.memory.queued, x, y + 3, textFormat);
            Game.spawns[name].room.visual.text("Now Spawning: " + spawningCreep.name, x, y + 4, textFormat);
        }

    }
}
