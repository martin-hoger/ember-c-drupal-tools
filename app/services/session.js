import Service from '@ember/service';
import { inject } from '@ember/service';
import { computed } from '@ember/object';

export default Service.extend({

  store  : inject(),
  intl   : inject(),

  // Actual user.
  user: null,

  // Is user authenticated?
  // Returns value from the user model.
  isAuthenticated: computed('user', function () {
     return this.get('user.id') > 0;
  }),

  // The app waits for this promise to be full-filled in application/router.js
  // to make sure it is loaded before any other route is called.
  promise: null,

  // When the service is created, load the actual user.
  init() {
    this._super(...arguments);
    // Load the actual user.
    var promise = this.get('store').queryRecord('user', {}).then((user) => {
      this.set('user', user);
      // Set language according the user.
      var intl = this.get('intl');
      if (intl) {
        // Set language according the user.
        // Set EN as fallback language.
        let userLanguage     = this.get('user.language');
        let fallbackLanguage = 'en';
        this.get('intl').setLocale([ userLanguage, fallbackLanguage]);
      }
    });

    this.set('promise', promise);
  },

  // Usage in template:
  // {{if (has-role "admin-projects") "" "disabled"}}
  // Usage in .js:
  // if (this.session.hasRole(['admin-projects'])) { ...
  hasRole(params) {
    var hasRole = false;
    var roles   = this.get('user.roles');
    var userId  = Number(this.get('user.id'));
    // For super-admin always return true.
    if (userId === 1) {
      return true;
    }
    // Prepare the list of role names.
    var roleNames = [];
    for (var roleKey in roles) {
      roleNames.push(roles[roleKey]);
    }
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
