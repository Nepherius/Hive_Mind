const Hive_autospawn = require('hive_autospawn');
const Hive_startWork = require('hive_startWork');

module.exports = {
  commence: function() {
    Hive_autospawn.run();
  },
  work: function() {
    Hive_startWork.work();
  }
};
