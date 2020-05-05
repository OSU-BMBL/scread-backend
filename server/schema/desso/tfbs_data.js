/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'tfbs_data',
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
      row: {
        type: DataTypes.INTEGER(11),
        allowNull: true
      },
      chrom: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      start: {
        type: DataTypes.INTEGER(11),
        allowNull: true
      },
      end: {
        type: DataTypes.INTEGER(11),
        allowNull: true
      },
      sequence: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      near_gene: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      distance_near_gene: {
        type: DataTypes.STRING(50),
        allowNull: true
      }
    },
    {
      tableName: 'tfbs_data'
    }
  )
}
