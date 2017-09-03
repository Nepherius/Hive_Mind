const harvester = require('role.harvester');



const Work = {
  work: function() {
    for (let name in Game.creeps) {
      let creep = Game.creeps[name];
      let job = creep.memory.role;
      eval(job).run(creep);
    }
  }
};


module.exports = Work;
