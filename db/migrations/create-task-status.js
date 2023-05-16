'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TaskStatuses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING(30),
        allowNull: false
      }, 
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('TaskStatuses');
  }
};
