'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProjectBacklog extends Model {
    static associate(models) {
      ProjectBacklog.belongsTo(models.Project)
      ProjectBacklog.hasMany(models.Task, { foreignKey: { name: 'backlogId' } })
    }
  }
  ProjectBacklog.init(
    {
      projectId: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Projects',
          key: 'id'
        }
      }
    },
     {
      sequelize,
      modelName: 'ProjectBacklog',
      createdAt: true,
      updatedAt: true
    }
  );
  return ProjectBacklog;
};
