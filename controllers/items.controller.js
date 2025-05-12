const Item = require("../modules/items.model");
const { getCurrentUser } = require("../manager/user.manager");
const { getItemControlled } = require("./utils.controller");

// ------------------- CREATE -------------------
// Eftersom inget krav har jag denna bara här för att lägga till data
const createItem = async (req, res) => {
  const purchasedPrice = req.body?.purchasedPrice;
  const name = req.body?.name;
  const description = req.body?.description;
  const category = req.body?.category;
  const type = req.body?.type;
  const publishedYear = req.body?.publishedYear;

  const user = await getCurrentUser(req);

  const item = await Item.create({
    name,
    description,
    type,
    category,
    publishedYear,
    purchasedPrice,
    ownerId: user._id,
  });
  res.status(200).json({ item });
};

// ------------------- GET -------------------
const getItems = async (_, res) => {
  const items = await Item.find({});
  res.status(200).json({ items });
};

const getItem = async (req, res) => {
  const { id } = req.params;

  const item = getItemControlled(id);

  res.status(200).json(item);
};

const getMyItems = async (req, res) => {
  const user = await getCurrentUser(req);

  const items = await Item.find({ ownerId: user._id }).sort({
    name: 1,
  });

  res.status(200).json({ items });
};

module.exports = { getItems, getItem, createItem, getMyItems };
