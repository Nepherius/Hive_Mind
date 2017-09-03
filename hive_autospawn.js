//const cRoles = ['harvester', 'upgrader', 'builder', 'carrier'];
const CRoles = {
  harvester: {
    min: 3,
    main_body: 'WORK',
    type: 'basic'
  },
  upgrader: {
    min: 1,
    main_body: 'WORK',
    type: 'basic'
  },
  builder: {
    min: 2,
    main_body: 'WORK',
    type: 'basic'
  }
};

const Autospawn = {
  run: function() { // TODO: Check for no sources
    for (let spawn in Game.spawns) {
      let spawnName = spawn;
      let sources = Game.spawns[spawn].room.find(FIND_SOURCES);
      let energyAvailable = Game.spawns[spawn].room.energyAvailable;
      let energyCapacityAvailable = Game.spawns[spawn].room.energyCapacityAvailable;
      for (let role in CRoles) {
        let creepsFound = _.filter(Game.creeps, (creep) => creep.memory.role == role);
        // If energy capacity is 300 then only basic creeps should be spawned
        if (energyCapacityAvailable === 300 && creepsFound.length < CRoles[role].min &&
          CRoles[role].type === 'basic') {
          // If there are multiple sources split them between the workers
          assignSource(sources, spawnName, role);
        }
      }


      // Spawn display
      if (Game.spawns[spawn].spawning) {
        var spawningCreep = Game.creeps[Game.spawns[spawn].spawning.name];
        Game.spawns[spawn].room.visual.text(
          '🛠️' + spawningCreep.memory.role,
          Game.spawns[spawn].pos.x + 1,
          Game.spawns[spawn].pos.y, {
            align: 'left',
            opacity: 0.8
          });
      }

      /*
            for(let i = 0, r = cRoles.length; i < r; i++) {
              let creepsFound = _.filter(Game.creeps, (creep) => creep.memory.role == cRoles[i]);

              if (energyCapacityAvailable === 300 && creepsFound < 1 ) {
                let newName = Game.spawns[spawnName].createCreep(c_body,c_name,c_memory);
                console.log('Spawning new ' + c_memory.role + ': ' + newName);
              }
            }
      */
    }
  }
};

// Search for a source where less than half of the existing creeps are assigned
function assignSource(Sources, spawn, role) {
  if (Sources.length === 1) {
    let newName = Game.spawns[spawn].createCreep([WORK, CARRY, MOVE],
      undefined, {
        role: role,
        sourceId: Sources[0].id
      });
  } else if (Sources.length > 1) {
    for (let source in Sources) {
      let creepsOnSource = _.filter(Game.creeps, (creep) => creep.memory.sourceId == Sources[source].id);
      if (creepsOnSource.length < _.size(Game.creeps) / 2 || creepsOnSource.length === 0) {
        let newName = Game.spawns[spawn].createCreep([WORK, CARRY, MOVE],
          undefined, {
            role: role,
            sourceId: Sources[source].id
          });
        break;
      }
    }
  }
}


/*
let ch_base = [WORK,CARRY,MOVE];
let c_name = undefined;
let ch_memory = {
  role: 'harvester'
};
if (energyAvailable === energyCapacityAvailable) {
  // Deduct cost of base creep(work,carry,move)
  energyAvailable -= 200;
  //Assuming that 150 energy is needed to add WORK + MOVE Part, energyLeft
  // will equal the number of creeps that can be spawned
  let energyLeft = Math.floor(energyAvailable / 150);
  if (energyLeft >= 1) {
    let c_body = [
      ...Array(energyLeft).fill(WORK),
      ...c_base,
      ...Array(energyLeft).fill(MOVE)
    ];
    let newName = Game.spawns[spawnName].createCreep(c_body,c_name,c_memory);
    console.log('Spawning new ' + c_memory.role + ': ' + newName);
  }

}

if (Game.spawns[spawn].spawning) {
    var spawningCreep = Game.creeps[Game.spawns[spawn].spawning.name];
    Game.spawns[spawn].room.visual.text(
      '🛠️' + spawningCreep.memory.role,
      Game.spawns[spawn].pos.x + 1,
      Game.spawns[spawn].pos.y, {
        align: 'left',
        opacity: 0.8
      });
  }
}
*/
module.exports = Autospawn;
