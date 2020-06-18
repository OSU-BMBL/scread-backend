/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'subcluster_meta',
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
      }
    },
    {
      tableName: 'subcluster_meta'
    }
  )
}
