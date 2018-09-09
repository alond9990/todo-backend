/**
 * Created by alond9990 on 09/09/2018.
 */

export default (sequelize, DataTypes) => {
    const TaskList = sequelize.define('TaskList', {
        name: {
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
                notEmpty: true
            }
        },
        group: {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: {
                model: Group,
                key: 'id'
            }
        }
    });
    return TaskList;
};