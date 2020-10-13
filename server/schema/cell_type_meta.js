/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'cell_type_meta',
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      data_id: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      cell_type: {
        type: DataTypes.STRING(50),
        allowNull: true
      }
    },
    {
      tableName: 'cell_type_meta'
    }
  )
}
