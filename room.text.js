module.exports = {
    run: function () {
        for (var name in Game.spawns) {
            var roomName = Game.spawns[name].room.name;
            var x = 1, y = 1;
            var spawningCreep = [];
            spawningCreep.name = "NOTHING";
            var roomCreepCount = _.countBy(Game.spawns[name].room.find(FIND_MY_CREEPS), 'memory.role');
            var roomCreepText = '';
            for (const property in roomCreepCount) {
                var i = `${property}: ${roomCreepCount[property]}`
                roomCreepText = roomCreepText.concat(" " + i)
            }
            var textFormat = { align: 'left', color: "#ffffff", font: 'bold 0.95 Arial', stroke: '#000000', backgroundPadding: 0.2, backgroundColor: '#223300', opacity: 0.9 };
            var textFormat2 = { align: 'left', color: "#ffffff", font: 'bold 0.5 Arial', stroke: '#000000', backgroundPadding: 0.2, backgroundColor: 'transparent', opacity: 0.9 };
            var roomPower = Game.spawns[name].room.energyAvailable + "/" + Game.spawns[name].room.energyCapacityAvailable;
            if (Game.spawns[name].spawning) var spawningCreep = Game.creeps[Game.spawns[name].spawning.name];
            //TOP TEXT
            Game.spawns[name].room.visual.text(roomName + " =" + roomCreepText.toUpperCase(), x, y, textFormat2);
            Game.spawns[name].room.visual.text("COST: " + Game.spawns[name].room.memory.cost + " | HAVE: " + roomPower, x, y + 2, textFormat);
            Game.spawns[name].room.visual.text("QUEUED: " + Game.spawns[name].room.memory.queued, x, y + 3, textFormat);
            Game.spawns[name].room.visual.text("Now Spawning: " + spawningCreep.name, x, y + 4, textFormat);
            //SPAWN TEXT
            if (Game.spawns[name].room.memory.isSpawning != "NOTHING") Game.spawns[name].room.visual.text("🛑"+Game.spawns[name].room.memory.queued + ' '+ Game.spawns[name].room.energyAvailable+'/'+Game.spawns[name].room.memory.cost, Game.spawns[name].pos.x + 2, Game.spawns[name].pos.y, textFormat2);
            else if (Game.spawns[name].spawning != null) Game.spawns[name].room.visual.text(spawningCreep.name, Game.spawns[name].pos.x + 2, Game.spawns[name].pos.y, textFormat2);
            //CONTROLLER PROGRESS
            var controlProgress = (Game.spawns[name].room.controller.progress /+ Game.spawns[name].room.controller.progressTotal*100).toFixed(4) + "%";
            Game.spawns[name].room.visual.text(controlProgress, Game.spawns[name].room.controller.pos.x-1, Game.spawns[name].room.controller.pos.y+0, textFormat2);
        }
    }
}
