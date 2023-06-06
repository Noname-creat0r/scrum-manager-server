'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: { 
        type: Sequelize.STRING(40),
        allowNull: false
      },
      description: { 
        type: Sequelize.TEXT,
        allowNull: true,
      },
      projectId: { 
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Projects',
          key: 'id'
        }
      },
      iterationId: { 
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Iterations',
          key: 'id'
        }
      },
      statusId: { 
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'TaskStatuses',
          key: 'id'
        }
      },
      storyPoints: { 
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tasks');
  }
};
