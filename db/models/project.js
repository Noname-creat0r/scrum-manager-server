'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    static associate(models) {
      Project.belongsToMany(models.User, { through: 'ProjectAssignees'})  
    }
  }
  Project.init(
    {
      title: DataTypes.STRING(70),
      allowNull: false,
    }, 
    {
      sequelize,
      modelName: 'Project',
      createdAt: true,
      updatedAt: true,
    }, 
  );

  return Project;
};
