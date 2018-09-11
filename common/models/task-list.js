'use strict';

module.exports = function(Tasklist) {

  Tasklist.observe('before save', function createAndRelateGroup(ctx, next) {
    // only if a new list is created
    if (!ctx.instance) {
      ctx.instance.authorized_group = '';
    }
    next();
  });

};
