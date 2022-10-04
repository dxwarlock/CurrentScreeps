module.exports = {
    run(spawn) {
        var roomName = spawn.room.name;
        var x = 1, y = 1;
        var spawningCreep = [];
        spawningCreep.name = "NOTHING";
        var roomCreepCount = _.countBy(spawn.room.find(FIND_MY_CREEPS), 'memory.role');
        var roomextcount = (spawn.room.find(FIND_MY_STRUCTURES, { filter: (i) => i.structureType == STRUCTURE_EXTENSION }));
        var roomCreepText = '';
        for (const property in roomCreepCount) {
            var i = `${property}: ${roomCreepCount[property]}`
            roomCreepText = roomCreepText.concat(" " + i)
        }
        var textsize = 0.6;
        var contollerLevel = (spawn.room.find(FIND_MY_STRUCTURES, { filter: (i) => i.structureType == STRUCTURE_CONTROLLER }));
        var textFormatTop = { align: 'left', color: "#FFE400", font: 'bold ' + textsize + ' Arial', stroke: '#000000', backgroundPadding: 0.2, backgroundColor: '#223300', opacity: 0.9 };
        var textFormat2 = { align: 'left', color: "#ffffff", font: 'bold 0.5 Arial', stroke: '#000000', backgroundPadding: 0.2, backgroundColor: 'transparent', opacity: 0.9 };
        var roomPower = spawn.room.energyAvailable + "/" + spawn.room.energyCapacityAvailable;
        if (spawn.spawning) var spawningCreep = Game.creeps[spawn.spawning.name];
        //TOP TEXT
        var topText = [{ T: `${roomName} =${roomCreepText.toUpperCase()}`, X: x, Y: y, F: textFormatTop }]
        topText.push({ T: `COST: ${spawn.room.memory.cost} | HAVE: ${roomPower} ext: ${roomextcount.length} | Min to save ${spawn.room.energyAvailable}/${spawn.room.memory.minEnergy}`, X: x, Y: y, F: textFormatTop })
        topText.push({ T: `Now Spawning: ${spawningCreep.name}`, X: x, Y: y, F: textFormatTop })
        topText.push({ T: `QUEUED: ${spawn.room.memory.queued}`, X: x, Y: y, F: textFormatTop });
        topText.push({ T: `GCL: ${(Game.gcl.progress / Game.gcl.progressTotal * 100).toFixed(4)} % LEVEL: ${contollerLevel[0].level}`, X: x, Y: y, F: textFormatTop })
        var s = textsize;
        for (i in topText) {
            spawn.room.visual.text(topText[i].T, topText[i].X, topText[i].Y + s, topText[i].F);
            s++
        }
        //SPAWN TEXT
        if (spawn.room.memory.isSpawning != "NOTHING") spawn.room.visual.text(`🛑 ${spawn.room.memory.queued} ${spawn.room.energyAvailable}/${spawn.room.memory.cost}`, spawn.pos.x + 2, spawn.pos.y, textFormat2);
        else if (spawn.spawning != null) spawn.room.visual.text(spawningCreep.name, spawn.pos.x + 2, spawn.pos.y, textFormat2);
        //CONTROLLER PROGRESS
        var controlProgress = (`${(spawn.room.controller.progress / spawn.room.controller.progressTotal * 100).toFixed(4)}%`);
        spawn.room.visual.text(controlProgress, spawn.room.controller.pos.x - 1, spawn.room.controller.pos.y + 0, textFormat2);
    }
}
