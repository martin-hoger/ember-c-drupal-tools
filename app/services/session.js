import Ember from 'ember';

export default Ember.Service.extend({

  store  : Ember.inject.service(),
  intl   : Ember.inject.service(), 

  // Actual user.
  user: {},

  // Is user authenticated?
  // Returns value from the user model.
  isAuthenticated: Ember.computed('user', function () {
     return this.get("user.id") > 0;
  }),

  // When the service is created, load the actual user.
  init() {
    this._super(...arguments);
    // Load the actual user.
    this.get('store').queryRecord('user', {}).then((user) => {
      this.set("user", user);
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

  },

});
