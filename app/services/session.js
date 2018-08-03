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

});
