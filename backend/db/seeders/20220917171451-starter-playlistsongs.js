'use strict';
const { Op } = require("sequelize");
const starterPlaylistSongs = [
  {
    songId: 4,
    playlistId: 1
  },
  {
    songId: 1,
    playlistId: 2
  },
  {
    songId: 2,
    playlistId: 2
  },
  {
    songId: 3,
    playlistId: 2
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
    await queryInterface.bulkInsert('PlaylistSongs', starterPlaylistSongs, {})
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('PlaylistSongs', {
      playlistId: { [Op.in]: [1, 2] }
    })
  }
};
