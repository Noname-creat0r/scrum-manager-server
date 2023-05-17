'use strict';
const { getRndUser } = require('../../util/random')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Populating 
    const rndUsers = Array(20).fill().map(() => getRndUser())
    return queryInterface.bulkInsert('Users', rndUsers, { });
  },

  async down (queryInterface, Sequelize) {
    // Reverting
    return queryInterface.bulkDelete('Users', null, {});
  }
};
