/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('expression', {
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
    gene: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    cell_name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    expression: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'expression'
  });
};
