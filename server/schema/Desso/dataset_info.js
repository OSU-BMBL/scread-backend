/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'dataset_info',
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      dataset_id: {
        type: DataTypes.CHAR(50),
        allowNull: true
      },
      key: {
        type: DataTypes.STRING(10000),
        allowNull: true
      },
      value: {
        type: DataTypes.STRING(10000),
        allowNull: true
      }
    },
    {
      tableName: 'dataset_info'
    }
  )
}
