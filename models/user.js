var bcrypt = require('bcrypt-nodejs');

'use strict';
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
    name: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1,99],
          msg: 'Name must be between 1 and 99 characters'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Invalid email address'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [8,99],
          msg: 'Password must be between 8 and 99 characters'
        }
      }
    },
    facebookId: DataTypes.STRING,
    facebookToken: DataTypes.STRING,
    facebookName: DataTypes.STRING,
    facebookEmail: DataTypes.STRING,
    twitterId: DataTypes.STRING,
    twitterToken: DataTypes.STRING,
    twitterDisplayName: DataTypes.STRING,
    twitterUsername: DataTypes.STRING,
    googleId: DataTypes.STRING,
    googleToken: DataTypes.STRING,
    googleEmail: DataTypes.STRING,
    googleName: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: user => {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      }    
    },
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    instanceMethods: {
        generateHash(password) {
            return bcrypt.hash(password, bcrypt.genSaltSync(8));
        },
        validPassword(password) {
            return bcrypt.compareSync(password, this.password);
        }
    }
  });
  return user;
};

