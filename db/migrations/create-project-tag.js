'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ProjectTags', { 
      projectId: { 
        type: Sequelize.INTEGER,
        references: { 
          model: 'Projects',
          key: 'id'
        } 
      },
      tagId: { 
        type: Sequelize.INTEGER,
        references: {
          model: 'Tags',
          key: 'id'
        }
      } 
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ProjectTags');
  }
};
