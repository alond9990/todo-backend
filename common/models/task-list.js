'use strict';

module.exports = function(Tasklist) {

  Tasklist.observe('before save', function createAndRelateGroup(ctx, next) {
    // only if a new list is created
    if (ctx.isNewInstance) {
      var Group = Tasklist.app.models.Group;
      Group.create({}, function(err, obj) {
        var instanceOrData = ctx.data ? 'data' : 'instance';
        ctx[instanceOrData].authorized_group = obj.id;
      });
    }
    next();
  });

  //Tasklist.observe('access', function limitToGroupUsers(ctx, next) {
  //  ctx.query.where.authorized_group = ;
  //  next();
  //});

};
