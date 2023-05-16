'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    static associate(models) {
      Project.hasMany(models.Iteration, { foreignKey: { name: 'projectId'} })
      Project.hasOne(models.ProjectBacklog, { foreignKey: { name: 'projectId'} })
      Project.belongsToMany(models.User, { through: 'ProjectAssignees'})
      Project.belongsTo(models.User)
    }
  }
  Project.init(
    {
      title: { 
        type: DataTypes.STRING(70),
        allowNull: false,
      },
      description: DataTypes.TEXT(1000),
      private: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }
      }
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
