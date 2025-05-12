const Item = require("../modules/items.model");

const getItem = async (id) => {
  if (!id) return null;

  const item = await Item.findById({ id });

  return item;
};

module.exports = { getItem };
