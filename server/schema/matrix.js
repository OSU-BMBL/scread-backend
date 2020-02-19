/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'matrix',
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      base_id: {
        type: DataTypes.CHAR(50),
        allowNull: true
      },
      collection: {
        type: DataTypes.CHAR(50),
        allowNull: true
      },
      version: {
        type: DataTypes.INTEGER(4),
        allowNull: true
      },
      motif_type: {
        type: DataTypes.CHAR(50),
        allowNull: true
      },
      motif_name: {
        type: DataTypes.CHAR(50),
        allowNull: true
      },
      ensembl: {
        type: DataTypes.CHAR(50),
        allowNull: true
      },
      entrez: {
        type: DataTypes.CHAR(50),
        allowNull: true
      },
      uniprot: {
        type: DataTypes.CHAR(50),
        allowNull: true
      },
      class: {
        type: DataTypes.CHAR(50),
        allowNull: true
      },
      family: {
        type: DataTypes.CHAR(50),
        allowNull: true
      },
      tf_name: {
        type: DataTypes.CHAR(50),
        allowNull: true
      },
      dataset_id: {
        type: DataTypes.CHAR(50),
        allowNull: true
      }
    },
    {
      tableName: 'matrix'
    }
  )
}
