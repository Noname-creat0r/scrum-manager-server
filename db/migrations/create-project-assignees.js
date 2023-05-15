'use strict'; 
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ProjectAssignees', {
      projectId: { 
        type: Sequelize.INTEGER,
        references: { 
          model: 'Projects',
          key: 'id'
        } 
      },
      userId: { 
        type: Sequelize.INTEGER,
        references:  { 
          model: 'Users',
          key: 'id'
        }
      } 
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ProjectAssignees');
  }
};
