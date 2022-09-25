module.exports = {
    run: function () {
        for (var i in Game.rooms) {
            var receiver = [];
            var senders = [];
            roomname = Game.rooms[i].name;
            var link = Game.rooms[i].find(FIND_STRUCTURES, { filter: (i) => i.structureType == STRUCTURE_LINK });
            for (var i in link) {
                targLink = link[i];
                var spawn = targLink.room.find(FIND_STRUCTURES, { filter: (i) => i.structureType == STRUCTURE_SPAWN });
                if (targLink.pos.inRangeTo(spawn[0], 5)) receiver.push(targLink);
                else senders.push(targLink);
            }
            for(var i in senders){
                if(senders[i].store[RESOURCE_ENERGY] > 400) senders[i].transferEnergy(receiver[0]);
            }
        }
    }
}