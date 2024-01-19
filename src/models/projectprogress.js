'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProjectProgress extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProjectProgress.init({
    projectId: DataTypes.STRING,
    progressPercentage: DataTypes.INTEGER,
    currentStage: DataTypes.STRING,
    updateDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'ProjectProgress',
  });
  return ProjectProgress;
};