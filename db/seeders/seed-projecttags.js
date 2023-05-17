'use strict';
const { getRndNumber } = require('../../util/random')
const db = require('../models')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Populating 
    const tagIds = await db.Tag
      .findAll({ attributes: ['id'] })
      .then(tags => tags.map(tag => tag.id))

    const projectIds = await db.Project
      .findAll({ attributes: ['id'] })
      .then(projects => projects.map(project => project.id))
   
    const rndProjectsTags = [];

    for (const projectId of projectIds){
      const projectTags = []
      
      for (let i = 0; i < 2; i++) {
        const nextId = getRndNumber(Math.min(...tagIds), Math.max(...tagIds));
        
        if (projectTags.find(id => id === nextId)) {
          i--
        } else {
          projectTags.push(nextId)
        } 
      }

      for (const tagId of projectTags ) {
        rndProjectsTags.push({
          projectId: projectId,
          tagId: tagId
        })
      }
    }

    return queryInterface.bulkInsert('ProjectTags', rndProjectsTags, {})
  },

  async down (queryInterface, Sequelize) {
    // Reverting
    return queryInterface.bulkDelete('ProjectTags', null, {});
  }
};
