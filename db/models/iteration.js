'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Iteration extends Model {
    static associate(models) {
      Iteration.hasMany(models.Task, { foreignKey: { name: 'iterationId'} })
      Iteration.belongsTo(models.Project)
    }
  }
  Iteration.init(
    {
      title:  {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      description: DataTypes.TEXT,
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
      modelName: 'Iteration',
      createdAt: true,
      updatedAt: true,
    }
  );
  return Iteration;
};
