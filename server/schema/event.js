/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'event',
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: DataTypes.INTEGER(11),
        allowNull: true
      },
      user_name: {
        type: DataTypes.CHAR(50),
        allowNull: true
      },
      category: {
        type: DataTypes.CHAR(50),
        allowNull: false,
        defaultValue: '0'
      },
      organizer: {
        type: DataTypes.CHAR(50),
        allowNull: false,
        defaultValue: '0'
      },
      title: {
        type: DataTypes.CHAR(50),
        allowNull: false,
        defaultValue: '0'
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      location: {
        type: DataTypes.CHAR(50),
        allowNull: false,
        defaultValue: '0'
      },
      date: {
        type: DataTypes.CHAR(50),
        allowNull: false,
        defaultValue: '0'
      },
      time: {
        type: DataTypes.CHAR(50),
        allowNull: false,
        defaultValue: '0'
      }
    },
    {
      tableName: 'event'
    }
  )
}
