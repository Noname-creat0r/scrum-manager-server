'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Populating 
    queryInterface.bulkUpdate
    return queryInterface.bulkInsert('Users', 
      [
        {
          name: 'BigBro',
          email: 'admin@admin.admin',
          password: '123456789',
          createdAt: Date.now(),
          updatedAt: Date.now()
        }, {
          name: 'JustTimmy',
          email: 'timmy@gmail.com',
          password: 'swagaomega',
          createdAt: Date.now(),
          updatedAt: Date.now()
        }, {
          name: 'BobyLee',
          email: 'bigdude@gmail.com',
          password: 'ayoitsboby123',
          createdAt: Date.now(),
          updatedAt: Date.now()
        } 
      ], { }
    );
  },

  async down (queryInterface, Sequelize) {
    // Reverting
    return queryInterface.bulkDelete('Users', null, {});
  }
};
