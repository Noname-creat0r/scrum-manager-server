'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProjectAssignees extends Model {
    static associate(models) {
    }
  }
  ProjectAssignees.init(
    {
      projectId: { 
        type: DataTypes.INTEGER,
        references: { 
          model: 'Projects',
          key: 'id'
        } 
      },
      userId: { 
        type:DataTypes.INTEGER,
        references:  { 
          model: 'Users',
          key: 'id'
        }
      }
    }, 
    {
      sequelize,
      modelName: 'ProjectAssignees',
    }
  );
  return ProjectAssignees;
};
