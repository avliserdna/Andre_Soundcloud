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
        firstName: 'Edwin',
        lastName: 'Purificacion',
        email: 'e-dupz@gmail.com',
        username: 'astaShadow',
        password: bcrypt.hashSync('fellcleave')
      },
      {
        firstName: 'Amy',
        lastName: 'Lee',
        email: 'evanescence@band.io',
        username: 'Evanescence',
        password: bcrypt.hashSync("wakemeup")
      },
      {
        firstName: 'Mike',
        lastName: 'Shinoda',
        email: 'linkinpark@band.io',
        username: "LinkinPark",
        password: bcrypt.hashSync("ripchester2017")
      },
      {
        firstName: "Colin",
        lastName: "Robinson",
        email: 'colin_robinson@vamp.io',
        username: "EnergyVamp24",
        password: bcrypt.hashSync("boring")
      },
      {
        firstName: "Matthew",
        lastName: "Floyd",
        email: 'potsu@band.io',
        username: 'potsu',
        password: bcrypt.hashSync("lofibeats")
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
      username: { [Op.in]: ['zhengM', 'EveB', 'EnergyVamp24', 'astaShadow', 'Evanescence', 'LinkinPark'] }
    }, {});
  }
};
