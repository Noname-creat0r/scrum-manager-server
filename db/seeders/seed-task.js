'use strict';
const { getRndTask, getRndNumber } = require('../../util/random')
const db = require('../models')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Populating
    const [ 
      minIid, maxIid, 
      minPid, maxPid,
      minSid, maxSid
    ] = await Promise.all([
      db.Iteration.min('id'), db.Iteration.max('id'),
      db.Project.min('id'), db.Project.max('id'),
      db.TaskStatus.min('id'), db.TaskStatus.max('id')
    ])

    const tasks = []
    
    for (let pid = minPid; pid <= maxPid; pid++ ) {
      const nOfTasks = getRndNumber(5, 10)
      for (let tid = 0; tid < nOfTasks; tid++) {
        tasks.push(getRndTask({ min: minSid, max: maxSid }, tid, null, pid))
      }
    }
    
    return queryInterface.bulkInsert('Tasks', tasks, {});
  },

  async down (queryInterface, Sequelize) {
    // Reverting
    return queryInterface.bulkDelete('Tasks', null, {});
  }
};
