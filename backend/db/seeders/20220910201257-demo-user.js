'use strict';
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");

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
    await queryInterface.bulkInsert('Users', [
      {
        firstName: 'Andre',
        lastName: 'Silva',
        email: 'andre.christian.silva@gmail.com',
        username: 'zhengM',
        password: bcrypt.hashSync('ivalice')
      },
      {
        firstName: 'Lily',
        lastName: 'Cui',
        email: 'lilycui@gmail.com',
        username: 'EveB',
        password: bcrypt.hashSync('missymoo')
      },
      {
        firstName: 'Colin',
        lastName: 'Robinson',
        email: 'colinrobinson@wwdits.com',
        username: 'EnergyVamp24',
        password: bcrypt.hashSync('password3')
      }
    ], {})
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['zhengM', 'EveB', 'EnergyVamp24'] }
    }, {});
  }
};
