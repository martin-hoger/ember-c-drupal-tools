import Ember from 'ember';

const helper = Ember.Helper.extend({

  session    : Ember.inject.service(),

  compute(params) {
    var hasRole = false;
    var roles   = this.get("session.user.roles");
    var userId  = Number(this.get("session.user.id"));
    // For super-admin always return true.
    if (userId === 1) {
      return true;
    }
    // Prepare the list of role names.
    var roleNames = [];
    $.each(roles, function (key, value) {
      roleNames.push(value);
    });
    // Test passed params.
    // If role is in the list, finish.
    params.forEach(function (roleName) {
      if (roleNames.indexOf(roleName) > 0) {
        hasRole = true;
        return false;
      }
    });

   return hasRole;
  }
});

export default helper;
