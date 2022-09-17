'use strict';
const { Op } = require("sequelize");
const starterComments = [
  {
    userId: 3,
    songId: 3,
    body: "Man... this song takes me back."
  },
  {
    userId: 6,
    songId: 1,
    body: "cool original song, haha jk."
  },
  {
    userId: 2,
    songId: 1,
    body: "I LOVE THIS SONG!"
  }
]
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Comments', starterComments, {})
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Comments', {
      body: { [Op.in]: ['Man... this song takes me back.', 'cool original song, haha jk.', 'I LOVE THIS SONG!'] }
    })
  }
};
