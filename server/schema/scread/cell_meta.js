/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cell_meta', {
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
    cell_type: {
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
    pca_1: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    pca_2: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    pca_3: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    data_id: {
      type: DataTypes.CHAR(50),
      allowNull: true
    }
  }, {
    tableName: 'cell_meta'
  });
};
