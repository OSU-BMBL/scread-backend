/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'spot_meta',
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      cell_name: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      umap_1: {
        type: DataTypes.FLOAT,
        allowNull: true
      },
      umap_2: {
        type: DataTypes.FLOAT,
        allowNull: true
      },
      tissue: {
        type: DataTypes.INTEGER(11),
        allowNull: true
      },
      row: {
        type: DataTypes.INTEGER(11),
        allowNull: true
      },
      col: {
        type: DataTypes.INTEGER(11),
        allowNull: true
      },
      imagerow: {
        type: DataTypes.INTEGER(11),
        allowNull: true
      },
      imagecol: {
        type: DataTypes.INTEGER(11),
        allowNull: true
      },
      layer: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      cluster: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      subcluster: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      data_id: {
        type: DataTypes.CHAR(50),
        allowNull: true
      }
    },
    {
      tableName: 'spot_meta'
    }
  )
}
