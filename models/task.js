/**
 * Created by alond9990 on 09/09/2018.
 */

export default (sequelize, DataTypes) => {
    const Task = sequelize.define('Task', {
        title: {
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
                notEmpty: true
            }
        },
        taskList: {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: {
                model: TaskList,
                key: 'id'
            }
        }
    });
    return Task;
};