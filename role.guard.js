module.exports = {
    run: function (creep) {
        var targets = creep.room.find(FIND_HOSTILE_CREEPS, 20);
        if (targets.length == 0) targets = creep.room.find(FIND_HOSTILE_STRUCTURES);
        if (targets.length > 0 && targets[0].owner.username != "REBRANDED") {
            var target = creep.pos.findClosestByRange(targets);
            if (creep.attack(target) == ERR_NOT_IN_RANGE) creep.moveTo(target);
            creep.room.visual.text("HERE " + target.hits + "/" + target.hitsMax, target.pos.x, target.pos.y, {
                align: 'center',
                font: 'bold italic 0.3 Arial',
                backgroundPadding: 0.1,
                backgroundColor: "#ff0000",
                stroke: "#000000",
                opacity: 0.7
            });
        }
        else {
            var target = Game.flags.Guard;
        }
        DX.CreepMove(creep, target);
    }
};