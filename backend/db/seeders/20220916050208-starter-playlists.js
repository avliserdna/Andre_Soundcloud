'use strict';
const { Op } = require("sequelize");
const starterPlaylists = [{
  userId: 1,
  name: "Lofi-Hip Hop Beats",
  previewImage: "https://s1.zerochan.net/Skadi.%28Arknights%29.600.2711692.jpg"
},
{
  userId: 2,
  name: "gonna fist fite u",
  previewImage: null
}]

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
    await queryInterface.bulkInsert('Playlists', starterPlaylists, {})
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Playlists', {
      name: { [Op.in]: ['Lofi-Hip Hop Beats', 'gonna fist fite u'] }
    })
  }
};
