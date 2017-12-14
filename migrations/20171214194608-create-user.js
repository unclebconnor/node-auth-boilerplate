'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      facebookId: {
        type: Sequelize.STRING
      },
      facebookToken: {
        type: Sequelize.STRING
      },
      facebookName: {
        type: Sequelize.STRING
      },
      facebookEmail: {
        type: Sequelize.STRING
      },
      twitterId: {
        type: Sequelize.STRING
      },
      twitterToken: {
        type: Sequelize.STRING
      },
      twitterDisplayName: {
        type: Sequelize.STRING
      },
      twitterUsername: {
        type: Sequelize.STRING
      },
      googleId: {
        type: Sequelize.STRING
      },
      googleToken: {
        type: Sequelize.STRING
      },
      googleEmail: {
        type: Sequelize.STRING
      },
      googleName: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};