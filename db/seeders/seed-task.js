'use strict';
const { getRndTask } = require('../../util/random')
const db = require('../models')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Populating
    const [ 
      minIid, maxIid, 
      minSid, maxSid
    ] = await Promise.all([
      db.Iteration.min('id'), db.Iteration.max('id'),
      db.TaskStatus.min('id'), db.TaskStatus.max('id')
    ])

    const tasks = []
    const nOfTasks = 5
    
    for (let iid = minIid; minIid <= maxIid; iid++) {
      for (let tid = 0; tid < nOfTasks; tid++) {
        tasks.push(getRndTask({ min: minSid, max: maxSid }, iid))
      }
      if (tasks.length > 100) break
    }

    return queryInterface.bulkInsert('Tasks', tasks, {});
  },

  async down (queryInterface, Sequelize) {
    // Reverting
    return queryInterface.bulkDelete('Tasks', null, {});
  }
};
