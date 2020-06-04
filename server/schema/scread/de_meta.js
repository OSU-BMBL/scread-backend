/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('de_meta', {
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
    short_ct: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    full_ct: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    type: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    comparison_text: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    tableName: 'de_meta'
  });
};
