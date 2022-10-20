module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', { 
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false
        },
        role: {
          type: DataTypes.STRING,
          allowNull: false
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
        tableName: 'users'
      });
    User.associate = function(models) {
      User.hasMany(models.Car, { as:'createdByUser', foreignKey: 'createdBy'});
      User.hasMany(models.Car, { as:'editedByUser' ,foreignKey: 'editedBy'});
      User.hasMany(models.Car, { as:'deletedByUser' ,foreignKey: 'deletedBy'});
    };
    return User;
};
    