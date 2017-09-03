const Hive_brain = require('hive_brain');


var PartCost = {
  MOVE: 50,
  CARRY: 50,
  ATTACK: 80,
  WORK: 100,
  RANGED_ATTACK: 100,
  HEAL: 250,
  CLAIM: 600
};



module.exports.loop = function() {
  //console.log(room.find(FIND_SOURCES)); Game.rooms['W29N23'].find(FIND_SOURCES)
  //  console.log(Game.creeps[Object.keys(Game.creeps)[0]]);
  //  console.log(Game.spawns['Spawn1'].room.energyAvailable);
  //let totalCreeps = _.size(Game.creeps);
  //console.log(totalCreeps);
  //let newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, CARRY, MOVE],undefined, {role:'harvester'});
  //console.log(newName);

Hive_brain.commence();
Hive_brain.work();
  //let newName = Game.spawns[spawnName].createCreep(c_body,c_name,c_memory);

  for (var names in Memory.creeps) {
    if (!Game.creeps[names]) {
      delete Memory.creeps[names];
      console.log('Clearing non-existing creep memory:', names);
    }
  }
};
