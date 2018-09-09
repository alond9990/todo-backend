/**
 * Created by alond9990 on 09/09/2018.
 */

export default (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        username: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true,
            validate: {
                notEmpty: true
            }
        },
        phone: {
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
                not: ['[a-z]', 'i']
            }
        },
        email: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
                notEmpty: true
            }
        }
    });
    User.associate = (models) => {
        User.belongsToMany(models.Groups, {
            through: 'GroupUsers',
            as: 'groups',
            foreignKey: 'userId'
        });
    };
    return User;
};