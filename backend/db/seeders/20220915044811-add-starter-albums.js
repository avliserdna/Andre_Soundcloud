'use strict';

const { query } = require("express");
const user = require("../models/user");
const { Op } = require("sequelize");

const starterAlbums = [{
  userId: 5,
  title: "Meteora",
  description: "The second studio album by American rock band Linkin Park",
  previewImage: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Linkin_Park_Meteora_Album_Cover.jpg/220px-Linkin_Park_Meteora_Album_Cover.jpg"
},
{
  userId: 4,
  title: "Fallen",
  description: "The debut studio album by American rock band Evanescence, released on March 4, 2003, by Wind-up and Epic Records.",
  previewImage: "https://upload.wikimedia.org/wikipedia/en/thumb/2/25/Evanescence_-_Fallen.png/220px-Evanescence_-_Fallen.png"
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
    await queryInterface.bulkInsert('Albums', starterAlbums, {})
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Albums', {})
  }
};
