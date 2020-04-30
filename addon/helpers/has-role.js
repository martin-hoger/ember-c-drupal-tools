/*
  Usage in template:
  {{if (has-role "admin-projects") "" "disabled"}}
  Usage in .js:
  if (this.session.hasRole(['admin-projects'])) { ...
*/

import Helper from '@ember/component/helper';
import { inject } from '@ember/service';

export default Helper.extend({

  // uses: /lib/ember-c-drupal-tools/app/services/session.js
  session    : inject(),

  compute(params) {
    return this.session.hasRole(params);
  }

});
