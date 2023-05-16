'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TaskStatus extends Model {
    static associate(models) {
      TaskStatus.hasMany(models.Task, { foreignKey: { name: 'statusId' } } )
    }
  }
  TaskStatus.init(
    {
      status: { 
        type: DataTypes.STRING(30),
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'TaskStatus',
      timestamps: false
    }
  );
  return TaskStatus;
};
