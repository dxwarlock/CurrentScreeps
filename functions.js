//--------------------------------------
module.exports = {
    CreepMove: function creepMove(creep, target) {
        var pColor = creep.memory.role
        creep.moveTo(target, { reusePath: 8, visualizePathStyle: { stroke: Memory.pathcolor[pColor], strokeWidth: .1, opacity: 0.7 } })
    },
    CreepMark: function creepMark(creep, target, color) {
        creep.room.visual.text("HERE", target.pos.x, target.pos.y, {
            align: 'center',
            font: 'bold italic 0.3 Arial',
            backgroundPadding: 0.1,
            backgroundColor: color,
            stroke: "#000000",
            opacity: 0.7
        });
    },
    //ENERGY FUNCTIONS########################################################################################################
    pickupEnergy: function pickupEnergy(creep) {
        if (creep.memory.harv == 1) {
            var target;
            if (!creep.memory.target) {
                const roomContainers = creep.room.find(FIND_MY_STRUCTURES, { filter: (i) => i.structureType == STRUCTURE_CONTAINER && i.store[RESOURCE_ENERGY] > 0 });
                var droppedtargets = creep.room.find(FIND_DROPPED_RESOURCES, { filter: (r) => r.resourceType == RESOURCE_ENERGY && r.amount >= creep.room.memory.dropped });
                if (droppedtargets.length > 0) creep.memory.target = droppedtargets[_.random(0, droppedtargets.length - 1)];
                else if (roomContainers) {
                    target = _.sortBy(roomContainers, "energy");
                    creep.memory.target = target[0];
                }
            }
            else if (creep.memory.target) {
                target = Game.getObjectById(creep.memory.target.id);
                if (target == null || (creep.memory.target.structureType == STRUCTURE_CONTAINER && creep.memory.target.store[RESOURCE_ENERGY] == 0)) {
                    creep.say("LOST");
                    delete creep.memory.target;
                    return;
                }
                else if (creep.pickup(target) == ERR_NOT_IN_RANGE) DX.CreepMove(creep, target);
                else if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) DX.CreepMove(creep, target);
                creep.say("C:🢁");
            }
        }
        //----------------
        else {
            delete creep.memory.target;
            DX.storeEnergy(creep);
        }
    },
    storeEnergy: function storeEnergy(creep) {
        var target;
        const roomSpawn = creep.room.find(FIND_MY_STRUCTURES, { filter: (i) => i.room == creep.room && i.structureType == STRUCTURE_SPAWN && i.store.getFreeCapacity(RESOURCE_ENERGY) > 0 });
        const roomExt = creep.room.find(FIND_MY_STRUCTURES, { filter: (i) => i.room == creep.room && i.structureType == STRUCTURE_EXTENSION && i.store.getFreeCapacity(RESOURCE_ENERGY) > 0 });
        const roomStorage = creep.room.find(FIND_MY_STRUCTURES, { filter: (i) => i.room == creep.room && i.structureType == STRUCTURE_STORAGE && i.store.getFreeCapacity(RESOURCE_ENERGY) > 0 });
        const roomTowers = creep.room.find(FIND_MY_STRUCTURES, { filter: (i) => i.room == creep.room && i.structureType == STRUCTURE_TOWER && i.energy < i.energyCapacity - 200 });
        if (roomSpawn.length) target = roomSpawn;
        else if (roomExt.length) target = roomExt;
        else if (roomTowers.length) target = roomTowers;
        else if (roomStorage.length) target = roomStorage;
        else DX.CreepMove(creep, Game.flags.Helpers);
        target = creep.pos.findClosestByRange(target);
        if (target) {
            DX.CreepMark(creep, target, "#ff0000");
            if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) DX.CreepMove(creep, target);
            creep.say("C:🢃");
        }
    },
    //HELPER FUNCTIONS--------------------
    getEnergy: function getEnergy(creep) {
        if (creep.room.memory.isSpawning != "NOTHING") {
            creep.say("🛑");
            return;
        }
        var target;
        const roomContainers = creep.room.find(FIND_MY_STRUCTURES, { filter: (i) => i.room == creep.room && i.structureType == STRUCTURE_CONTAINER && i.store.getFreeCapacity(RESOURCE_ENERGY) < 0 });
        const roomStorage = creep.room.find(FIND_MY_STRUCTURES, { filter: (i) => i.room == creep.room && i.structureType == STRUCTURE_STORAGE && i.store[RESOURCE_ENERGY] > 0 });
        const roomExt = creep.room.find(FIND_MY_STRUCTURES, { filter: (i) => i.room == creep.room && i.structureType == STRUCTURE_EXTENSION && i.store[RESOURCE_ENERGY] > 0 });
        const roomSpawn = creep.room.find(FIND_MY_STRUCTURES, { filter: (i) => i.room == creep.room && i.structureType == STRUCTURE_SPAWN && i.store[RESOURCE_ENERGY] > 0 });
        if (creep.room.memory.isSpawning != "NOTHING" && creep.store[RESOURCE_ENERGY] == 0) DX.CreepMove(creep, Game.flags.Helpers);
        else if (roomContainers.length) target = roomContainers;
        else if (roomStorage.length) target = roomStorage;
        else if (roomExt.length) target = roomExt;
        else if (roomSpawn.length) target = roomSpawn;
        else DX.CreepMove(creep, Game.flags.Helpers);
        target = creep.pos.findClosestByRange(target);
        if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) DX.CreepMove(creep, target);
        creep.say("H:🢁");
    },

    GiveEnergy: function GiveEnergy(creep) {
        let foundUpgraderCreeps = creep.room.find(FIND_MY_CREEPS, {
            filter: (creep) => {
                return ((creep.memory.role === 'upgrader') && creep.store.energy <= 30);
            }
        });
        let foundBuilderCreeps = creep.room.find(FIND_MY_CREEPS, {
            filter: (creep) => {
                return ((creep.memory.role === 'builder') && creep.store.energy <= 30);
            }
        });
        var target;
        foundBuilderCreeps = _.sortBy(foundBuilderCreeps, s => s.store.energy);
        foundUpgraderCreeps = _.sortBy(foundUpgraderCreeps, s => s.store.energy);
        if (foundBuilderCreeps.length != 0) target = foundBuilderCreeps[0];
        else if (foundUpgraderCreeps.length != 0) target = foundUpgraderCreeps[0];
        if (target) {
            DX.CreepMark(creep, target, "#00ff00");
            if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) DX.CreepMove(creep, target);
            creep.say("H:🢃");
        }
    },
    //MINING FUNCTIONS########################################################################################################
    getOpenSource: function getOpenSource(creep) {
        var source = creep.pos.findClosestByRange(FIND_SOURCES, {
            filter: function (source) {
                if (Memory.sources[source.id] == undefined || Memory.sources[source.id].miner == undefined || Memory.sources[source.id].miner == creep.id) return true;
                if (Game.getObjectById(Memory.sources[source.id].miner) == null) return true;
                return false;
            }
        });
        return source;
    },
    setSourceToMine: function setSourceToMine(source, creep) {
        if (!source) return;
        if (Memory.sources[source.id] == undefined) Memory.sources[source.id] = {
            id: source.id
        };
        Memory.sources[source.id].miner = creep.id;
        Memory.sources[source.id].room = creep.room.name;
        creep.memory.source = source.id;
    },
    SetHarv: function setHarv(creep) {
        creep.memory.harv = creep.memory.harv || '';
        if (creep.store[RESOURCE_ENERGY] == 0) creep.memory.harv = 1;
        if (creep.store.getFreeCapacity() == 0) creep.memory.harv = 0;
    },
    //OTHER FUNCTIONS########################################################################################################
    JSONs: function JSONs(string) {
        console.log(JSON.stringify(string));
    },
    randomValueOf: function randomValueOf(obj) {
        var keys = Object.keys(obj);
        var len = keys.length;
        var rnd = Math.floor(Math.random() * len);
        var key = keys[rnd];
        return obj[key];
    },
    FindRepairs: function FindRepairs(creep) {
        var repairs = creep.room.find(FIND_MY_STRUCTURES, { filter: (i) => i.structureType && i.hits < i.hitsMax / 2 });
        var repairs = _.sortBy(repairs, "hits" / "HitsMax");
        return repairs;
    },
    FindBuilds: function FindBuilds(Room) {
        var builds = [];
        var builds = Room.find(FIND_CONSTRUCTION_SITES);
        Room.memory.ToBuild = builds;
    },
    FindCost: function FindCost(spawn, role) {
        var totalCost = 0;
        for (var i in spawn.room.memory.creepSpecs[role]) {
            var Part = spawn.room.memory.creepSpecs[role][i];
            if (Part == MOVE) totalCost += 50;
            else if (Part == CLAIM) totalCost += 600;
            else if (Part == HEAL) totalCost += 250;
            else if (Part == RANGED_ATTACK) totalCost += 150;
            else if (Part == WORK) totalCost += 100;
            else if (Part == ATTACK) totalCost += 80;
            else if (Part == CARRY) totalCost += 50;
            else if (Part == TOUGH) totalCost += 10;
        }
        return totalCost;
    },
    Build_Time: function Build_Time(creep, target, offset) {
        if (Game.time % 3 !== 0) return;
        if (creep.carry.energy === 0) return;
        var B = target.pos.findInRange(FIND_MY_CREEPS, 1, {
            filter: function (object) {
                return object.memory.role === creep.memory.role;
            }
        });
        var time = Math.round(((target.progressTotal - target.progress) / creep.getActiveBodyparts(WORK) / B.length / offset));
        var timeS = DX.minTommss(time * 1.3 / 60 / 60);
        creep.say(timeS);
    },
    minTommss: function minTommss(minutes) {
        var Hour = Math.floor(Math.abs(minutes))
        var Min = Math.floor((Math.abs(minutes) * 60) % 60);
        var Sec = Math.floor((Math.abs(minutes) * 60 * 60) % 60);
        return (Hour < 10 ? "0" : "") + Hour + ":" + (Min < 10 ? "0" : "") + Min + ":" + (Sec < 10 ? "0" : "") + Sec;
    },
    Claim: function Claim(creep) {
        if (!creep.room.controller.my && creep.room.find(FIND_HOSTILE_SPAWNS) !== '') {
            creep.moveTo(creep.room.controller);
            creep.claimController(creep.room.controller);
        }
    },
};
