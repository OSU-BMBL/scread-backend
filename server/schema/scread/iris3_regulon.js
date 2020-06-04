/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'iris3_regulon',
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      index: {
        type: DataTypes.CHAR(50),
        allowNull: true
      },
      tf_name: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      rss: {
        type: DataTypes.FLOAT,
        allowNull: true
      },
      rss_pval: {
        type: DataTypes.FLOAT,
        allowNull: true
      },
      gene_symbol: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      gene_id: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      data_id: {
        type: DataTypes.CHAR(50),
        allowNull: true
      }
    },
    {
      tableName: 'iris3_regulon'
    }
  )
}
