'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      name: {  
        type: DataTypes.STRING(55),
        allowNull: false
      },
      email: { 
        type: DataTypes.STRING(55),
        allowNull: false,
        unique: true,
      },
      password: { 
        type: DataTypes.STRING(55),
        allowNull: false,
        set(value) {
          const salt = bcrypt.genSaltSync(12);
          const hash = bcrypt.hashSync(value, salt);
          this.setDataValue('password', hash);
        }
      }  
    }, 
    {
      sequelize,
      modelName: 'User',
      createdAt: true,
      updatedAt: true
    }
  );

  return User;
};
