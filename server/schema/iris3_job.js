/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('iris3_job', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    data_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'iris3_job'
  });
};
