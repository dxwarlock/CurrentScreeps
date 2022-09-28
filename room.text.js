module.exports = {
    run: function (spawn) {
        var roomName = spawn.room.name;
        var x = 1, y = 1;
        var spawningCreep = [];
        spawningCreep.name = "NOTHING";
        var roomCreepCount = _.countBy(spawn.room.find(FIND_MY_CREEPS), 'memory.role');
        var roomCreepText = '';
        for (const property in roomCreepCount) {
            var i = `${property}: ${roomCreepCount[property]}`
            roomCreepText = roomCreepText.concat(" " + i)
        }
        var textFormatTop = { align: 'left', color: "#FFE400", font: 'bold 0.95 Arial', stroke: '#000000', backgroundPadding: 0.2, backgroundColor: '#223300', opacity: 0.9 };
        var textFormat2 = { align: 'left', color: "#ffffff", font: 'bold 0.5 Arial', stroke: '#000000', backgroundPadding: 0.2, backgroundColor: 'transparent', opacity: 0.9 };
        var roomPower = spawn.room.energyAvailable + "/" + spawn.room.energyCapacityAvailable;
        if (spawn.spawning) var spawningCreep = Game.creeps[spawn.spawning.name];
        //TOP TEXT
        spawn.room.visual.text(roomName + " =" + roomCreepText.toUpperCase(), x, y, textFormatTop);
        spawn.room.visual.text("COST: " + spawn.room.memory.cost + " | HAVE: " + roomPower, x, y + 1, textFormatTop);
        spawn.room.visual.text("QUEUED: " + spawn.room.memory.queued, x, y + 2, textFormatTop);
        spawn.room.visual.text("Now Spawning: " + spawningCreep.name, x, y + 3, textFormatTop);
        spawn.room.visual.text("GCL: " + (Game.gcl.progress/Game.gcl.progressTotal*100).toFixed(4)+'%', x, y + 4.1, textFormatTop);
        //SPAWN TEXT
        if (spawn.room.memory.isSpawning != "NOTHING") spawn.room.visual.text("🛑" + spawn.room.memory.queued + ' ' + spawn.room.energyAvailable + '/' + spawn.room.memory.cost, spawn.pos.x + 2, spawn.pos.y, textFormat2);
        else if (spawn.spawning != null) spawn.room.visual.text(spawningCreep.name, spawn.pos.x + 2, spawn.pos.y, textFormat2);
        //CONTROLLER PROGRESS
        var controlProgress = (spawn.room.controller.progress / + spawn.room.controller.progressTotal * 100).toFixed(4) + "%";
        spawn.room.visual.text(controlProgress, spawn.room.controller.pos.x - 1, spawn.room.controller.pos.y + 0, textFormat2);
    },
}
