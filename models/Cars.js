// import objectionSoftDelete from 'objection-js-soft-delete';
// import { Model } from 'objection';

// const softDelete = objectionSoftDelete( idUser,{
//     columnName: 'deletedBy',
//     deletedValue: idUser,
//     notDeletedValue: null,
// });

module.exports = (sequelize, DataTypes) => {
    const Car = sequelize.define('Car', { 
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        createdBy: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id'
          }
        },
        editedBy: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: 'users',
            key: 'id'
          }
        },
        deleted:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        deletedBy: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: 'users',
            key: 'id'
          }
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false
        }
      }, {
        tableName: 'cars'
      });
    Car.associate = function(models) {
        Car.belongsTo(
            models.User, 
            { as:'createdByUser', foreignKey : 'createdBy' }, 
        );
        Car.belongsTo(
          models.User, 
          { as:'editedByUser', foreignKey : 'editedBy' }, 
        );
        Car.belongsTo(
          models.User, 
          { as:'deletedByUser', foreignKey : 'deletedBy' }
        );
    };

    return Car;
}