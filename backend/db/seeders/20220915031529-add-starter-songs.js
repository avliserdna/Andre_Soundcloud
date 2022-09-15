'use strict';

const { query } = require("express");
const { Op } = require("sequelize");

const starterSongs = [{
  userId: 5,
  albumId: 1, // fallen
  title: "Bring Me to Life",
  description: "Really Edgy music.",
  url: "https://soundcloud.com/raife-duarte/evanescence-bring-me-to-life",
  previewImage: null
},
{
  userId: 6,
  albumId: 2, // meteora
  title: "Breaking The Habit",
  description: "Very old Linkin Park music.",
  url: "https://soundcloud.com/jes-s-madrid-1/breaking-the-habit-linkin-parkguitar-cover-intrumental",
  previewImage: "https://i1.sndcdn.com/artworks-000235892531-osgk53-t500x500.jpg"
},
{
  userId: 6,
  albumId: 2, //meteora,
  title: "Numb",
  description: "edgy music",
  url: "https://upload.wikimedia.org/wikipedia/en/b/b9/Linkin_Park_-_Numb_CD_cover.jpg",
  previewImage: "https://upload.wikimedia.org/wikipedia/en/b/b9/Linkin_Park_-_Numb_CD_cover.jpg"
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
    await queryInterface.bulkInsert('Songs', starterSongs)
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Songs', {
      title: { [Op.in]: ['Numb', 'Break The Habit'] }
    })
  }
};
