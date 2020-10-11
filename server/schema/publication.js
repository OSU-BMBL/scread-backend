/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('publication', {
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
    public_id: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    pmid: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    protocol: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    methodology: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    title: {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    author: {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    citation: {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    abstract: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    doi: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    tableName: 'publication'
  });
};
