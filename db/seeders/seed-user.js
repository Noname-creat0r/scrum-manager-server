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
          createdAt: new Date('2021-01-11T18:21:32.657+03:00'),
          updatedAt: new Date('2023-02-10T10:02:13.153+03:00') 
        }, {
          name: 'JustTimmy',
          email: 'timmy@gmail.com',
          password: '$2y$12$oKNAUKokEksUk/58KPEmduCb3JlDN05BGMPW2HG7Bwrq/4KvfAJ7S', //swagaomega
          createdAt: new Date('2022-11-08T09:47:59.537+03:00'),
          updatedAt: new Date('2023-05-08T11:23:19.212+03:00')
        }, {
          name: 'BobyLee',
          email: 'bigdude@gmail.com',
          password: '$2y$12$IX6gFQ0HEC4OKRGWoRPLSOnbafni61Y2uldmYs.naw8108gXMISnO', //ayoitsboby123
          createdAt: new Date('2020-10-17T12:27:23.366+03:00'),
          updatedAt: new Date('2022-12-17T03:11:13.316+03:00')
        },
      ], { }
    );
  },

  async down (queryInterface, Sequelize) {
    // Reverting
    return queryInterface.bulkDelete('Users', null, {});
  }
};
