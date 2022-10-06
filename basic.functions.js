//--------------------------------------
module.exports = {
    CreepMove(creep, target) {
        var pColor = creep.memory.role
        creep.moveTo(target, { reusePath: 2, visualizePathStyle: { lineStyle: 'dotted', stroke: Memory.pathcolor[pColor], strokeWidth: 0.1, opacity: 0.4 } })
    },
    CreepMark(creep, target, color, text) {
        creep.room.visual.text(text, target.pos.x, target.pos.y, {
            align: 'center',
            font: '0.4 Arial',
            backgroundPadding: 0.01,
            backgroundColor: color,
            stroke: "#000000",
            opacity: 0.6
        });
    },
    //CARRY ENERGY FUNCTIONS#######################################################################################################
    pickupEnergy(creep) {
        var flagname = creep.room.name + "-Carry";
        if (creep.memory.harv == 1) {
            var target;
            if (!creep.memory.target) this.findEnergy(creep);
            else {
                target = Game.getObjectById(creep.memory.target.id);
                if (target == null || target == undefined) this.findEnergy(creep);
                else if (creep.pickup(target) == ERR_NOT_IN_RANGE) {
                    DX.CreepMark(creep, target, "#6A1717", "G");
                    DX.CreepMove(creep, target);
                }
                else if ('store' in target) {
                    if (target.store[RESOURCE_ENERGY] == 0) this.findEnergy(creep);
                    else {
                        if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_ENOUGH_RESOURCES) this.findEnergy(creep);
                        else if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            DX.CreepMark(creep, target, "#6A1717", "🢁");
                            DX.CreepMove(creep, target);
                        }
                    }
                }
            }
        }
        //----------------
        else {
            delete creep.memory.target;
            DX.storeEnergy(creep);
        }
    },
    findEnergy(creep) {
        const roomSpawn = creep.room.find(FIND_MY_STRUCTURES, { filter: (i) => (i.structureType == STRUCTURE_SPAWN) });
        var flagname = creep.room.name + "-Carry";
        const notFull = creep.room.energyAvailable < creep.room.energyCapacityAvailable;
        const droppedtargets = creep.room.find(FIND_DROPPED_RESOURCES, { filter: (r) => r.resourceType == RESOURCE_ENERGY && r.amount >= creep.room.memory.dropped });
        const roomLinks = creep.room.find(FIND_STRUCTURES, { filter: (i) => i.structureType == STRUCTURE_LINK && i.store[RESOURCE_ENERGY] > 300 && i.pos.inRangeTo(roomSpawn[0], 5) });
        const roomStorage = creep.room.find(FIND_MY_STRUCTURES, { filter: (i) => i.structureType == STRUCTURE_STORAGE && i.store[RESOURCE_ENERGY] > 0 });
        const roomTerm = creep.room.find(FIND_MY_STRUCTURES, { filter: (i) => i.structureType == STRUCTURE_TERMINAL && i.store[RESOURCE_ENERGY] > 0 });
        const roomContainers = creep.room.find(FIND_STRUCTURES, { filter: (i) => i.structureType == STRUCTURE_CONTAINER && i.store[RESOURCE_ENERGY] > 0 && !i.pos.inRangeTo(creep.room.controller, 3) });
        if (droppedtargets.length > 0) creep.memory.target = droppedtargets[_.random(0, droppedtargets.length - 1)];
        else if (notFull == true && (roomLinks.length != 0 || roomStorage.length != 0)) {
            if (roomLinks.length != 0) creep.memory.target = roomLinks[0];
            else if (roomStorage.length != 0) creep.memory.target = roomStorage[0];
            else DX.CreepMove(creep, Game.flags[creep.memory.flag]);
        }
        else if (roomLinks.length != 0) {

            target = _.sortBy(roomLinks, s => s.store[RESOURCE_ENERGY]).reverse();
            ranTarget = Math.floor(Math.random() * target.length);
            creep.memory.target = target[ranTarget];
        }
        else if (roomTerm.length) creep.memory.target = roomTerm[0];
        else if (roomContainers.length != 0) {
            target = _.sortBy(roomContainers, s => s.store[RESOURCE_ENERGY]).reverse();
            ranTarget = Math.floor(Math.random() * target.length);
            creep.memory.target = target[0];
        }
        else DX.CreepMove(creep, Game.flags[creep.memory.flag]);
    },
    storeEnergy(creep) {
        var target;
        var flagname = creep.room.name + "-Carry";
        const roomBase = creep.room.find(FIND_MY_STRUCTURES, { filter: (i) => (i.structureType == STRUCTURE_EXTENSION || i.structureType == STRUCTURE_SPAWN) && i.store.getFreeCapacity(RESOURCE_ENERGY) > 0 });
        const roomTowers = creep.room.find(FIND_MY_STRUCTURES, { filter: (i) => i.structureType == STRUCTURE_TOWER && i.energy < i.energyCapacity - 200 });
        const roomTerm = creep.room.find(FIND_MY_STRUCTURES, { filter: (i) => i.structureType == STRUCTURE_TERMINAL && i.store[RESOURCE_ENERGY] < 10000 });
        const roomStorage = creep.room.find(FIND_MY_STRUCTURES, { filter: (i) => i.structureType == STRUCTURE_STORAGE && i.store[RESOURCE_ENERGY] < 50000 });
        if (roomBase.length) target = roomBase;
        else if (roomTowers.length) target = roomTowers;
        else if (roomStorage.length) target = roomStorage;
        else if (roomTerm.length) target = roomTerm;
        else DX.CreepMove(creep, Game.flags[creep.memory.flag]);
        //------------
        target = creep.pos.findClosestByRange(target);
        if (target) {
            DX.CreepMark(creep, target, "#00ff00", "🢃");
            if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) DX.CreepMove(creep, target);
        }
        else DX.CreepMove(creep, Game.flags[creep.memory.flag]);
    },
    //HELPER ENERGY FUNCTIONS########################################################################################################
    getEnergy(creep) {
        var flagname = creep.room.name + "-HELPER";
        const Full = creep.room.energyAvailable < creep.room.memory.minEnergy;
        if (creep.room.memory.isSpawning != "NOTHING" || Full) {
            //creep.say("🛑");
            DX.CreepMove(creep, Game.flags[creep.memory.flag]);
        }
        else {
            var target;
            var flagname = creep.room.name + "-HELPER";
            const TerminalRoom = creep.room.find(FIND_STRUCTURES, { filter: (i) => i.structureType == STRUCTURE_TERMINAL });
            const roomTerm = creep.room.find(FIND_MY_STRUCTURES, { filter: (i) => i.structureType == STRUCTURE_TERMINAL && i.store[RESOURCE_ENERGY] > 0 && creep.room.name == TerminalRoom });
            const roomContainers = creep.room.find(FIND_STRUCTURES, { filter: (i) => i.structureType == STRUCTURE_CONTAINER && i.store[RESOURCE_ENERGY] > 1000 });
            const roomStorage = creep.room.find(FIND_MY_STRUCTURES, { filter: (i) => i.structureType == STRUCTURE_STORAGE && i.store[RESOURCE_ENERGY] > 0 });
            const roomExt = creep.room.find(FIND_MY_STRUCTURES, { filter: (i) => i.structureType == STRUCTURE_EXTENSION && i.store[RESOURCE_ENERGY] > 0 });
            const roomSpawn = creep.room.find(FIND_MY_STRUCTURES, { filter: (i) => i.structureType == STRUCTURE_SPAWN && i.store[RESOURCE_ENERGY] > 0 });
            if (creep.room.memory.isSpawning != "NOTHING" && creep.store[RESOURCE_ENERGY] == 0) DX.CreepMove(creep, Game.flags.Helpers);
            else if (roomTerm.length) target = roomTerm;
            else if (roomStorage.length) target = roomStorage;
            else if (roomSpawn.length && roomExt.length == 0) target = roomSpawn;
            else if (roomExt.length) target = roomExt;
            else if (roomContainers.length) target = roomContainers;
            else DX.CreepMove(creep, Game.flags.Helpers);
            target = creep.pos.findClosestByRange(target);
            if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) DX.CreepMove(creep, target);
            DX.CreepMark(creep, target, "#0000ff", "🢁");
        }
    },
    GiveEnergy(creep) {
        var flagname = creep.room.name + "-HELPER";
        let foundBuilderCreeps = creep.room.find(FIND_MY_CREEPS, { filter: (i) => (i.memory.role === 'builder' && i.store.getFreeCapacity(RESOURCE_ENERGY) > 0) });
        let foundUpgraderCreeps = creep.room.find(FIND_MY_CREEPS, { filter: (i) => (i.memory.role === 'upgrader') });
        var target;
        foundBuilderCreeps = _.sortBy(foundBuilderCreeps, s => s.store[RESOURCE_ENERGY]);
        foundUpgraderCreeps = _.sortBy(foundUpgraderCreeps, s => s.store[RESOURCE_ENERGY]);
        if (foundBuilderCreeps.length != 0) target = foundBuilderCreeps[0];
        else if (foundUpgraderCreeps.length != 0) {
            const controlContainer = creep.room.find(FIND_STRUCTURES, { filter: (i) => i.structureType == STRUCTURE_CONTAINER && i.store.getFreeCapacity(RESOURCE_ENERGY) > 0 && i.pos.inRangeTo(creep.room.controller, 5) });
            if (controlContainer.length != 0) target = controlContainer[0];
            else target = foundUpgraderCreeps[0];
        }
        if (target) {
            //DX.CreepMark(creep, target, "#ffaa00", "🢃");
            if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) DX.CreepMove(creep, target);
        }
        else DX.CreepMove(creep, Game.flags[flagname]);
    },
    //SHARE TO OTHERS LIKE YOU-------------------------------------------------------------
    ShareEnergy(creep) {
        var targets = creep.pos.findInRange(FIND_MY_CREEPS, 1, { filter: (i) => i.memory.role == creep.memory.role && i.store[RESOURCE_ENERGY] < creep.store[RESOURCE_ENERGY] })
        var targets = _.sortBy(targets, s => s.store[RESOURCE_ENERGY]);
        if (targets.length && targets != null) {
            target = targets[0];
            if (creep.transfer(target, RESOURCE_ENERGY, creep.store[RESOURCE_ENERGY] * 0.1) == ERR_NOT_IN_RANGE) DX.CreepMove(creep, target);
        }
    },
    //MINING FUNCTIONS########################################################################################################
    getOpenSource(creep) {
        var source = creep.pos.findClosestByRange(FIND_SOURCES, {
            filter(source) {
                if (Memory.sources[source.id] == undefined || Memory.sources[source.id].miner == undefined || Memory.sources[source.id].miner == creep.id) return true;
                if (Game.getObjectById(Memory.sources[source.id].miner) == null) return true;
                return false;
            }
        });
        return source;
    },
    setSourceToMine(source, creep) {
        if (!source) return;
        if (Memory.sources[source.id] == undefined) Memory.sources[source.id] = {
            id: source.id
        };
        Memory.sources[source.id].miner = creep.id;
        Memory.sources[source.id].room = creep.room.name;
        creep.memory.source = source.id;
    },
    SetHarv(creep) {
        creep.memory.harv = creep.memory.harv || '';
        if (creep.store[RESOURCE_ENERGY] == 0) creep.memory.harv = 1;
        if (creep.store.getFreeCapacity() == 0) creep.memory.harv = 0;
    },
    MineEnergy(creep) {
        if (creep.store.getFreeCapacity() == 0) {
            const roomContainers = creep.room.find(FIND_STRUCTURES, { filter: (i) => i.structureType == STRUCTURE_CONTAINER && creep.pos.inRangeTo(i, 3) });
            const links = creep.room.find(FIND_STRUCTURES, { filter: (i) => i.structureType == STRUCTURE_LINK && creep.pos.inRangeTo(i, 3) });
            if (links.length != 0) {
                target = creep.pos.findClosestByRange(links);
                if ((target || target != null)) {
                    if (target.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
                        if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) DX.CreepMove(creep, target);
                    }
                    else {
                        creep.say("🛑");
                        return;
                    }
                }
            }
            else if (roomContainers.length != 0) {
                target = creep.pos.findClosestByRange(roomContainers);
                if ((target || target != null)) {
                    if (target.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
                        if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) DX.CreepMove(creep, target);
                    }
                    else {
                        creep.say("🛑");
                        return;
                    }
                }
            }
            else if (roomContainers.length == 0) creep.drop(RESOURCE_ENERGY);
        }
        var source = Game.getObjectById(creep.memory.source);
        if (source == null) {
            var source = DX.getOpenSource(creep);
            if (!source) return;
            DX.setSourceToMine(source, creep);
        }
        if (Memory.sources[source.id] == undefined) Memory.sources[source.id] = { id: source.id };
        Memory.sources[source.id].miner = creep.id;
        if (!creep.pos.inRangeTo(source, 1)) DX.CreepMove(creep, source);
        else creep.harvest(source);
    },
    //BUILDER FUNCTIONS########################################################################################################
    FindRepairs(spawn) {
        var repairs = [];
        var repairs = spawn.room.find(FIND_STRUCTURES, { filter: (i) => (i.hits < i.hitsMax / 3 && i.structureType != STRUCTURE_WALL) || (i.structureType == STRUCTURE_WALL && i.hits < 1000) });
        var repairs = _.sortBy(repairs, s => s.hits);
        spawn.room.memory.Repairables = repairs;
    },
    FindBuilds(spawn) {
        spawn.room.memory.ToBuild = spawn.room.memory.ToBuild || {};
        var builds = spawn.room.find(FIND_CONSTRUCTION_SITES) || [];
        builds = _.sortBy(builds, s => s.progressTotal).reverse();
        spawn.room.memory.ToBuild = builds;
    },
    //OTHER FUNCTIONS########################################################################################################
    JSONs(string) {
        console.log(JSON.stringify(string));
    },
    randomValueOf(obj) {
        var keys = Object.keys(obj);
        var len = keys.length;
        var rnd = Math.floor(Math.random() * len);
        var key = keys[rnd];
        return obj[key];
    },
    getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    FindCost(role) {
        var totalCost = 0;
        for (var i in role) {
            var Part = role[i];
            if (Part == MOVE) totalCost += 50;
            else if (Part == CARRY) totalCost += 50;
            else if (Part == WORK) totalCost += 100;
            else if (Part == TOUGH) totalCost += 10;
            else if (Part == ATTACK) totalCost += 80;
            else if (Part == RANGED_ATTACK) totalCost += 150;
            else if (Part == HEAL) totalCost += 250;
            else if (Part == CLAIM) totalCost += 600;
        }
        return totalCost;
    },
    Build_Time(creep, target, offset) {
        if (Game.time % 3 !== 0) return;
        if (creep.store[RESOURCE_ENERGY] === 0) return;
        var B = target.pos.findInRange(FIND_MY_CREEPS, 1, {
            filter(object) {
                return object.memory.role === creep.memory.role;
            }
        });
        var time = Math.round(((target.progressTotal - target.progress) / creep.getActiveBodyparts(WORK) / B.length / offset));
        var timeS = DX.minTommss(time * 1.3 / 60 / 60);
        creep.say(timeS);
    },
    minTommss(minutes) {
        var Hour = Math.floor(Math.abs(minutes))
        var Min = Math.floor((Math.abs(minutes) * 60) % 60);
        var Sec = Math.floor((Math.abs(minutes) * 60 * 60) % 60);
        return (Hour < 10 ? "0" : "") + Hour + ":" + (Min < 10 ? "0" : "") + Min + ":" + (Sec < 10 ? "0" : "") + Sec;
    },
    Claim(creep) {
        if (!creep.room.controller.my && creep.room.find(FIND_HOSTILE_SPAWNS) !== '') {
            creep.moveTo(creep.room.controller);
            creep.claimController(creep.room.controller);
        }
    },
};
