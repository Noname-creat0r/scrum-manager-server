'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Populating 
    return queryInterface.bulkInsert('ProjectTags', [{
        projectId: 1,
        tagId: 1,
      }, {
        projectId: 1,
        tagId: 3
      }, {
        projectId: 2,
        tagId: 4,
      }, {
        projectId: 3,
        tagId: 2
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    // Reverting
    return queryInterface.bulkDelete('ProjectTags', null, {});
  }
};
