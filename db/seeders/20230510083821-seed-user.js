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
          password: '$2y$12$D7F3izsmjb87vyNizNPYCOCn0hpEfKhgxWUi9gZtPJPeNwThxIL7e', //123456789
          createdAt: new Date().toUTCString(),
          updatedAt: new Date().toUTCString() 
        }, {
          name: 'JustTimmy',
          email: 'timmy@gmail.com',
          password: '$2y$12$oKNAUKokEksUk/58KPEmduCb3JlDN05BGMPW2HG7Bwrq/4KvfAJ7S', //swagaomega
          createdAt: new Date().toUTCString(),
          updatedAt: new Date().toUTCString()
        }, {
          name: 'BobyLee',
          email: 'bigdude@gmail.com',
          password: '$2y$12$IX6gFQ0HEC4OKRGWoRPLSOnbafni61Y2uldmYs.naw8108gXMISnO', //ayoitsboby123
          createdAt: new Date().toUTCString(),
          updatedAt: new Date().toUTCString()
        } 
      ], { }
    );
  },

  async down (queryInterface, Sequelize) {
    // Reverting
    return queryInterface.bulkDelete('Users', null, {});
  }
};
