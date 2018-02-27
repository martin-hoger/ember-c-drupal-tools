import Ember from 'ember';

// Makes array like: Auto-Moto, ..and child categories of Auto-moto.
// Then Bydlení and its child cateriories, etc. :
// Auto Moto 25
// Auta   9
// Jachty 4
// ...
// Bydlení 26
// Bytový design	15
// Nemovitosti	4
// ...
export function sortCategoriesByStructure([categories]) {
    var sortedCategories = [];
    var sortedByWeight = categories.sortBy('weight');

    sortedByWeight.forEach((category1) => {
      if (category1.get('parent') == 0) {
        sortedCategories.push(category1);  //insert the parent category

        // and find its children categories (parent == category1), then insert it also
        sortedByWeight.forEach((category2) => {
          if (category2.get('parent') == category1.get('id') ) {
            sortedCategories.push(category2);  //insert the child category
          }
        })

      }
    })

    return sortedCategories
}

export default Ember.Helper.helper(sortCategoriesByStructure);
