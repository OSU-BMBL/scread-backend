/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'dataset',
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      data_id: {
        type: DataTypes.CHAR(50),
        allowNull: true
      },
      file_name: {
        type: DataTypes.STRING(128),
        allowNull: true
      },
      species: {
        type: DataTypes.STRING(128),
        allowNull: true
      },
      condition: {
        type: DataTypes.STRING(128),
        allowNull: true
      },
      region: {
        type: DataTypes.STRING(128),
        allowNull: true
      },
      gender: {
        type: DataTypes.STRING(128),
        allowNull: true
      },
      stage: {
        type: DataTypes.STRING(128),
        allowNull: true
      },
      age: {
        type: DataTypes.STRING(128),
        allowNull: true
      },
      mice_model: {
        type: DataTypes.STRING(128),
        allowNull: true
      },
      public_id: {
        type: DataTypes.STRING(128),
        allowNull: true
      },
      n_cell: {
        type: DataTypes.INTEGER(11),
        allowNull: true
      },
      n_original_cell: {
        type: DataTypes.INTEGER(11),
        allowNull: true
      },
      n_cluster: {
        type: DataTypes.INTEGER(11),
        allowNull: true
      },
      iris3_jobid: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      silhouette_score: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      ari_score: {
        type: DataTypes.STRING(50),
        allowNull: true
      }
    },
    {
      tableName: 'dataset'
    }
  )
}
