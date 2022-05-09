/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'de_meta',
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
      b_data_id: {
        type: DataTypes.CHAR(50),
        allowNull: true
      },
      description: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      hint: {
        type: DataTypes.STRING(512),
        allowNull: true
      },
      value: {
        type: DataTypes.STRING(50),
        allowNull: true
      }
    },
    {
      tableName: 'de_meta'
    }
  )
}
