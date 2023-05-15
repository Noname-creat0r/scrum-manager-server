'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    static associate(models) {
      Tag.belongsToMany(models.Project, { through: 'ProjectTags' })   
    }
  }
  Tag.init(
    {
      title: { 
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true
      }
    },
    {
      sequelize,
      modelName: 'Tag', 
      timestamps: false
    }
  );

  return Tag;
};
