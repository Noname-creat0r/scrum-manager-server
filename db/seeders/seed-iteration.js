'use strict';

const db = require('../models')
const { getRndIteration } = require('../../util/random')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Populating 
    const projectIds = await db.Project
      .findAll({ attributes: ['id'] })
      .then(projects => projects.map(project => project.id))
    
    const rndIterations = []
    const nOfIterForProj = 4
  
    for (const projectId of projectIds) {
      for (let i = 0; i < nOfIterForProj; i++) {
        rndIterations.push(getRndIteration(projectId))
      }
    }

    return queryInterface.bulkInsert('Iterations', rndIterations, {})
  },

  async down (queryInterface, Sequelize) {
    // Reverting
    return queryInterface.bulkDelete('Iterations', null, {});
  }
}
