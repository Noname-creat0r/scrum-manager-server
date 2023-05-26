'use strict';
const { getRndProject } = require('../../util/random')
const db = require('../models')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Populating 
    const statuses = [
      { status: 'Todo' },
      { status: 'Doing' },
      { status: 'Done' }
    ]

    return queryInterface.bulkInsert('TaskStatuses', statuses, {});
  },

  async down (queryInterface, Sequelize) {
    // Reverting
    return queryInterface.bulkDelete('TaskStatuses', null, {});
  }
};
