import Helper from '@ember/component/helper';
import Ember from 'ember';
// import { inject as service } from '@ember/service';

export default Helper.extend({

  session    : Ember.inject.service(),

  compute(params) {
    var hasRole = false;
    var roles   = this.get('session.user.roles');
    var userId  = Number(this.get('session.user.id'));
    // For super-admin always return true.
    if (userId === 1) {
      return true;
    }
    // Prepare the list of role names.
    var roleNames = [];
    roles.forEach(function (value, index) {
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