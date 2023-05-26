'use strict';

const db = require('../models')
const { getRndNumber } = require('../../util/random')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Populating 
    const [minPid, maxPid] = await Promise.all([
      db.Project.min('id'), db.Project.max('id')
    ])

    const userIds = await db.User
      .findAll({ attributes: ['id'] })
      .then(users => users.map(user => user.id))

    const rndAssignees = []
    const nOfProjForUser = 4
    for (const userId of userIds) {
      for (let i = 0; i < nOfProjForUser; i++) {
        const rndPid = getRndNumber(minPid, maxPid)
        
        if (!rndAssignees.find(assignee => assignee.userId === userId && assignee.projectId === rndPid )) {
          rndAssignees.push({
            userId: userId,
            projectId: rndPid 
          })
        }
      
      }
    } 

    return queryInterface.bulkInsert('ProjectAssignees', rndAssignees, {})
  },

  async down (queryInterface, Sequelize) {
    // Reverting
    return queryInterface.bulkDelete('ProjectAssignees', null, {});
  }
};
