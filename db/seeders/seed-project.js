'use strict';
const { getRndProject } = require('../../util/random')
const db = require('../models')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Populating 
    const [ min, max ] = await Promise.all([ db.User.min('id'), db.User.max('id') ])
    const rndProjects = Array(15).fill().map(() => getRndProject({ min, max }))
   
    return queryInterface.bulkInsert('Projects', rndProjects, {});
  },

  async down (queryInterface, Sequelize) {
    // Reverting
    return queryInterface.bulkDelete('Projects', null, {});
  }
};
