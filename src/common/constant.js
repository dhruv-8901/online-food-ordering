module.exports.ROLE = {
  CUSTOMER: 1,
  STORE: 2,
};
module.exports.DROP_DOWN = {
  CATEGORY: 1,
  CUISINE: 2,
};

module.exports.APPROVED_STATUS = {
  APPROVED : 1,
  REJECTED : 2,
  PENDING : 3
};

module.exports.TAXES = 1; // TAXES value are in percentage

module.exports.ORDER_STATUS = {
  PENDING: 0,
  ACCEPT: 1,
  REJECT: -1,
  PREPARING: 2,
  ONTHEWAY: 3,
  DELIVERED: 4,
  CANCELED: 5
};

module.exports.DEFAULT_PER_PAGE = 10;
module.exports.DEFAULT_PAGE = 1;
