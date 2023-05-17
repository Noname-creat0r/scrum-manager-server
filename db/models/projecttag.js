'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProjectTags extends Model {
    static associate(models) {
    }
  }
  ProjectTags.init(
    {
      projectId: { 
        type: DataTypes.INTEGER,
        references: { 
          model: 'Projects',
          key: 'id'
        } 
      },
      tagId: { 
        type: DataTypes.INTEGER,
        references: {
          model: 'Tags',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      modelName: 'ProjectTags',
      timestamps: false
    }
  );
  return ProjectTags;
};
