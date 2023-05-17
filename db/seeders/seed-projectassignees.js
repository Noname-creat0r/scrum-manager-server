'use strict';

const db = require('../models')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Populating 
    const [ userMin, userMax, projectMin, projectMax ] = await Promise.all([
      db.User.min('id'), db.User.max('id'),
      db.Project.min('id'), db.Project.max('id')
    ])

    return queryInterface.bulkInsert('ProjectAssignees', rndAssignees, {})
  },

  async down (queryInterface, Sequelize) {
    // Reverting
    return queryInterface.bulkDelete('ProjectAssignees', null, {});
  }
};
