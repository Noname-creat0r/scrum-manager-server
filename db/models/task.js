'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      Task.belongsTo(models.TaskStatus, { as: 'status' })
      Task.belongsTo(models.Project)
      Task.belongsTo(models.Iteration)
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
      projectId: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Projects',
          key: 'id'
        }
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
