'use strict';

const repository = require('./productAvailabilityRepository');

const baseEntries = [...repository.seededAvailability];

module.exports = {
  'inventory for product ID 2 exists with quantity 5': async () => {
    repository.setAvailability(
      baseEntries.map((entry) =>
        entry.productId === 2 ? { ...entry, inStock: true, quantity: 5 } : entry
      )
    );
  },
  'inventory for product ID 2 is not available': async () => {
    repository.setAvailability(
      baseEntries.map((entry) =>
        entry.productId === 2 ? { ...entry, inStock: false, quantity: 0 } : entry
      )
    );
  },
  'inventory for product ID 999 does not exist': async () => {
    repository.setAvailability(baseEntries.filter((entry) => entry.productId !== 999));
  },
};
