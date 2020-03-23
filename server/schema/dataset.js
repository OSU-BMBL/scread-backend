/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'dataset',
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
      data_id: {
        type: DataTypes.CHAR(50),
        allowNull: true
      },
      tf_name: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      tf_class: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      tf_family: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      collection: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      version: {
        type: DataTypes.INTEGER(4),
        allowNull: true
      },
      motif_type: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      tf_name_jaspar: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      ensembl_jaspar: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      entrez_jaspar: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      uniprot_jaspar: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      tf_name_hocomoco: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      ensembl_hocomoco: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      entrez_hocomoco: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      uniprot_hocomoco: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      tf_name_transfac: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      ensembl_transfac: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      entrez_transfac: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      uniprot_transfac: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      create_time: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
      },
      update_time: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
      }
    },
    {
      tableName: 'dataset'
    }
  )
}
