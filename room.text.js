module.exports = {
    run: function (spawningText, totalCost, creepsCount) {
        for (var roomSpawns in Game.spawns) {
            var roomName = Game.spawns[roomSpawns].room.name;
            var x = 3
            var y = 3
            var spawningCreep = [];
            spawningCreep.name = "NOTHING";
            var textFormat = {align: 'left', color: "#000000", font: 'bold 0.5 Arial', backgroundPadding: 0.2, backgroundColor: '#ffffff',opacity: 0.9};
            var roomPower = roomName + ":" + Game.spawns[roomSpawns].room.energyAvailable + "/" + Game.spawns[roomSpawns].room.energyCapacityAvailable;
            if (Game.spawns[roomSpawns].spawning) var spawningCreep = Game.creeps[Game.spawns[roomSpawns].spawning.name];
            Game.spawns[roomSpawns].room.visual.text(roomPower, x, y, textFormat);
            Game.spawns[roomSpawns].room.visual.text(creepsCount, x, y + 1, textFormat);
            Game.spawns[roomSpawns].room.visual.text(spawningText + " -- Cost: " + totalCost + " HAVE: " +Game.spawns[roomSpawns].room.energyAvailable, x, y + 2, textFormat);
            Game.spawns[roomSpawns].room.visual.text("Now Spawning: " + spawningCreep.name, x, y + 3, textFormat);
        }

    }
}
