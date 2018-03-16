import Component from '@ember/component';
import { computed } from '@ember/object';
import { sortCategoriesByStructure } from 'ember-c-drupal-tools/helpers/sort-categories-by-structure';

export default Component.extend({
  tagName: '',
  searchField: 'fullName',
  sortByStructure: true,
  onlyChildren: false,

  filteredOptions: computed('options', function () {
    var options = this.get('options');

    // If we should keep only children.
    if (this.get('onlyChildren')) {
      options = options.filter(function (category) {
        return category.get('depth') > 0;
      });
      this.set('sortByStructure', false);
    }

    // Sort by structure.
    if (this.get('sortByStructure')) {
      options = sortCategoriesByStructure([options]);
    }

    return options;
  }),

});
