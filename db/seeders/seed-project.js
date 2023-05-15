'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Populating 
    queryInterface.bulkUpdate
    return queryInterface.bulkInsert('Projects', 
      [
        {
          title: 'scrum-manager',
          createdAt: new Date('2023-03-08T09:47:59.537+03:00'),
          updatedAt: new Date('2023-05-11T10:30:12.123+03:00') 
        }, {
          title: 'websocket-web-chat',
          createdAt: new Date('2023-05-01T01:21:42.614+03:00'),
          updatedAt: new Date('2023-05-12T02:12:12.136+03:00')
        }, {
          title: 'dream-project',
          createdAt: new Date('2020-10-17T12:27:23.366+03:00'),
          updatedAt: new Date('2023-01-03T08:11:11.145+03:00')
        } 
      ], { }
    );
  },

  async down (queryInterface, Sequelize) {
    // Reverting
    return queryInterface.bulkDelete('Projects', null, {});
  }
};
