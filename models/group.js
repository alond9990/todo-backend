/**
 * Created by alond9990 on 09/09/2018.
 */

export default (sequelize, DataTypes) => {
    const Group = sequelize.define('Group', {
        name: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true,
            validate: {
                notEmpty: true
            }
        }
    });
    return Group;
};