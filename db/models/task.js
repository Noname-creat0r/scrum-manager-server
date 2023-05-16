'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      Task.belongsTo(models.TaskStatus)
      Task.belongsTo(models.Iteration)
      Task.belongsTo(models.ProjectBacklog)
    }
  }
  Task.init(
    {
      title: { 
        type: DataTypes.STRING(40),
        allowNull: false
      },
      description: { 
        type: DataTypes.TEXT,
        allowNull: true,
      },
      iterationId: { 
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Iterations',
          key: 'id'
        }
      },
      statusId: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'TaskStatuses',
          key: 'id'
        }
      },
      backlogId: { 
        type:DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'ProjectBacklogs',
          key: 'id'
        }
      },
      storyPoints: { 
        type: DataTypes.INTEGER,
        allowNull: true,
      }
    },
    {
      sequelize,
      modelName: 'Task',
      createdAt: true,
      updatedAt: true
    }
  );
  return Task;
};
