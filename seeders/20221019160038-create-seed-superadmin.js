'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert('users', [{
        username: 'SuperAdmin',
        password: '$2a$10$lrQYOn2Cq8hlMhjQ7o2aheUGmdYbmOSQKgBnKC7dKNa7OF9LVOC2y', // 123456
        role: 'superadmin',
        createdAt: new Date(),
        updatedAt: new Date()
     }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('People', null, {})
  }
};
