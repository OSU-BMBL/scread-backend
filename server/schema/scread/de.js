/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'de',
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      p_val: {
        type: 'DOUBLE',
        allowNull: true
      },
      avg_logFC: {
        type: DataTypes.FLOAT,
        allowNull: true
      },
      pct_1: {
        type: DataTypes.FLOAT,
        allowNull: true
      },
      pct_2: {
        type: DataTypes.FLOAT,
        allowNull: true
      },
      p_val_adj: {
        type: 'DOUBLE',
        allowNull: true
      },
      cluster: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      gene: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      data_id: {
        type: DataTypes.CHAR(50),
        allowNull: true
      },
      ct: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      type: {
        type: DataTypes.STRING(50),
        allowNull: true
      }
    },
    {
      tableName: 'de'
    }
  )
}
