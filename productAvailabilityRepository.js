'use strict';

let seededAvailability = [
  {
    productId: 1,
    inStock: true,
    quantity: 25,
    warehouses: ['MEL-AU', 'SYD-AU'],
  },
  {
    productId: 2,
    inStock: true,
    quantity: 5,
    warehouses: ['SYD-AU'],
  },
  {
    productId: 999,
    inStock: false,
    quantity: 0,
    warehouses: [],
  },
];

let availability = [...seededAvailability];

const getByProductId = (productId) =>
  availability.find((entry) => entry.productId === Number(productId)) || null;

const setAvailability = (next) => {
  availability = [...next];
};

const reset = () => {
  availability = [...seededAvailability];
};

module.exports = {
  getByProductId,
  setAvailability,
  reset,
  seededAvailability,
};
