/**
 * Created by alond9990 on 09/09/2018.
 */

module.exports = function(app) {
  app.dataSources.sqlDB.automigrate('TaskList', function(err) {
    if (err) throw err;

    app.models.TaskList.create([{
      name: 'TODO List 1'
    }], function(err, TaskList) {
      if (err) throw err;

      console.log('Models created: \n', TaskList);
    });
  });

  app.dataSources.sqlDB.automigrate('Task', function(err) {
    if (err) throw err;

    app.models.Task.create([{
      title: 'Task 1'
    }, {
      title: 'Task 2'
    }], function(err, Task) {
      if (err) throw err;

      console.log('Models created: \n', Task);
    });
  });

};
