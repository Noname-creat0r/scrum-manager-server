'use strict';

const db = require('../models')
const { getRandomInt } = require('../../util/random')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Populating 
    const [ userMin, userMax, projectMin, projectMax ] = await Promise.all([
      db.User.min('id'), db.User.max('id'),
      db.Project.min('id'), db.Project.max('id')
    ])

    const rndAssignees = Array((userMax - userMin)*2)
      .fill()
      .map((v) => ({
        userId: getRandomInt(userMin, userMax + 1),
        projectId: getRandomInt(projectMin, projectMax + 1)
      }))
    
    return queryInterface.bulkInsert('ProjectAssignees', rndAssignees, {})
  },

  async down (queryInterface, Sequelize) {
    // Reverting
    return queryInterface.bulkDelete('ProjectAssignees', null, {});
  }
};
