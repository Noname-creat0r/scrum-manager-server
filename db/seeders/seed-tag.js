'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Populating 
    return queryInterface.bulkInsert('Tags', [
      { title: 'important' }, 
      { title: 'deadline' },
      { title: 'small'}, 
      { title: 'big'}
    ], {})
  },

  async down (queryInterface, Sequelize) {
    // Reverting
    return queryInterface.bulkDelete('Tags', null, {});
  }
};
