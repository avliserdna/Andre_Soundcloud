'use strict';

const { DataTypes } = require("sequelize");

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('Users', "firstName", {
      type: DataTypes.STRING,
      allowNull: false
    })
    await queryInterface.addColumn('Users', "lastName", {
      type: DataTypes.STRING,
      allowNull: false
    })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('Users', "firstName", {})
    await queryInterface.removeColumn('Users', "lastName", {})
  }
};
